/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { Type } from '@google/genai';

dotenv.config();

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const PORT = 3000;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Lazy initializer for Google GenAI SDK
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is missing. Please configure it in your Secrets settings.');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Resilient content generation with helper retries for 503 High Demand spiked traffic
async function generateWithRetry(ai: GoogleGenAI, params: any, maxRetries = 3, baseDelayMs = 2000): Promise<any> {
  let attempt = 0;
  while (true) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (error: any) {
      attempt++;
      const errorMessage = String(error.message || '').toLowerCase();
      const errorCode = error.status || error.code || 0;
      
      const is503 = errorCode === 503 || 
                    errorMessage.includes('503') || 
                    errorMessage.includes('demand') || 
                    errorMessage.includes('unavailable') || 
                    errorMessage.includes('capacity') ||
                    errorMessage.includes('overloaded') ||
                    errorMessage.includes('overworked') ||
                    errorMessage.includes('resource exhausted') ||
                    errorMessage.includes('rate limit');

      if (is503 && attempt < maxRetries) {
        const delay = baseDelayMs * attempt;
        console.warn(`[Gemini API] 503/High-demand warning on attempt ${attempt}/${maxRetries}. Retrying in ${delay}ms... Error: ${errorMessage}`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// In-memory / File-system storage for rebuilt Custom Curriculums
const CUSTOM_DIR = path.resolve('./src/data/custom');
if (!fs.existsSync(CUSTOM_DIR)) {
  fs.mkdirSync(CUSTOM_DIR, { recursive: true });
}

// Support reading all curriculums
function getCustomCurriculums() {
  const list: any[] = [];
  try {
    const files = fs.readdirSync(CUSTOM_DIR);
    for (const f of files) {
      if (f.endsWith('.json')) {
        const data = fs.readFileSync(path.join(CUSTOM_DIR, f), 'utf-8');
        try {
          list.push(JSON.parse(data));
        } catch (_) {}
      }
    }
  } catch (err) {
    console.error('Error reading custom directory:', err);
  }
  return list;
}

// --- API ROUTES ---

// 1. Get List of Curriculums
app.get('/api/curriculums', (req, res) => {
  const custom = getCustomCurriculums();
  res.json({ success: true, custom });
});

// 2. Fetch Single Curriculum
app.get('/api/curriculums/:id', (req, res) => {
  const { id } = req.params;
  const customFile = path.join(CUSTOM_DIR, `${id}.json`);
  if (fs.existsSync(customFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(customFile, 'utf-8'));
      return res.json({ success: true, curriculum: data });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: 'Malformed custom curriculum file' });
    }
  }
  return res.status(404).json({ success: false, error: 'Curriculum not found' });
});

// 3. Save Custom Curriculum
app.post('/api/curriculums', (req, res) => {
  try {
    const { curriculum } = req.body;
    if (!curriculum || !curriculum.id) {
      return res.status(400).json({ success: false, error: 'Missing curriculum resource object or ID' });
    }
    curriculum.isCustom = true;
    const dest = path.join(CUSTOM_DIR, `${curriculum.id}.json`);
    fs.writeFileSync(dest, JSON.stringify(curriculum, null, 2), 'utf-8');
    return res.json({ success: true, curriculum });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Delete Custom Curriculum
app.delete('/api/curriculums/:id', (req, res) => {
  const { id } = req.params;
  const target = path.join(CUSTOM_DIR, `${id}.json`);
  if (fs.existsSync(target)) {
    try {
      fs.unlinkSync(target);
      return res.json({ success: true, message: 'Custom curriculum deleted' });
    } catch (err: any) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }
  return res.status(404).json({ success: false, error: 'Curriculum not found' });
});

// 5. Reconstruct Curriculum from Text or File
app.post('/api/reconstruct', async (req, res) => {
  try {
    const { title, sourceText, fileBase64, fileMimeType, difficultyLevel } = req.body;

    if (!sourceText && !fileBase64) {
      return res.status(400).json({ success: false, error: 'Please provide either raw chapter text or upload a PDF/text file.' });
    }

    const ai = getGeminiClient();

    let parts: any[] = [];
    if (fileBase64 && fileMimeType) {
      parts.push({
        inlineData: {
          data: fileBase64,
          mimeType: fileMimeType
        }
      });
    }

    const userPrompt = `Reconstruct this textbook chapter into an A2ACurriculum following the rules specified below. 
Target title for reconstructed document: "${title || 'Reconstructed A2A Curriculum'}"
Target comprehension boundary: Junior High math background (floor) escalating to high rigor university mathematics (ceiling).

Chapter Source Material:
${sourceText || 'See attached document for chapter content.'}
`;

    const systemInstruction = `You are an expert curriculum architect operating under the Axiom-to-Application (A2A) framework.
Your sole function is to take a chapter as input and completely rebuild it into a highly structured, logically inevitable educational document.
Do not summarize. Dismantle and rebuild from the ground up:

CHAPTER DECOMPOSITION & LEVEL RULES:
1. Decompose into logical Levels (Level 1, Level 2, ...) based on conceptual dependencies. 
2. Levels MUST escalate. Avoid introducing a level name before its content.
3. Every Level from L2 onwards MUST open with an "axiomaticBridge" which links the previous Level's conclusion with a limitation or edge case making the current level logically inevitable.
4. Each Level has precisely three phases:
   - Phase 1: Atomic Concepts. Pinpoint 2 to 3 atomic concepts. For each, describe the logical Socratic steps, the reasoning, false steps, corrections, and formal definition. Provide text-based visual scaffolding (e.g. a coordinate_table showing a grid, a numerical_sequence showing progression, or a verbose verbal_description). NEVER generate images, diagrams, or charts.
   - Phase 2: Conceptual Trials. Always exactly 10 problems per Level. No domain framing, no physical contexts or names, pure abstract algebra/relations/coordinates. Ordered from accessible to deep.
   - Phase 3: Deep Real-World Application. Number of problems MUST equal: (L - 1) * 5 + 10.
     - L1 Phase 3: 10 problems
     - L2 Phase 3: 15 problems
     - L3 Phase 3: 20 problems
     - Simple 1-sentence physical scenario for non-experts, followed by deep math constraints and a specific question.
5. All problems must have EMPTY solutions (blank answer fields for students).
6. Use cold, precise, engineering tone. Avoid filler or encouragement.
7. MATHEMATICAL RIGOR & LATEX RULES:
   - ALL equations, variables, constants, functions, coordinates, vectors, intervals, or mathematical operations MUST be wrapped in standard LaTeX markup.
   - Inline math (variables e.g. $x$, $y$, Greek letters e.g. $\theta$, $\Delta$, simple operations) MUST be enclosed in single dollar signs like $a \times b$ or $x^2 + y^2 = r^2$.
   - Never write plain text math variables like "theta", "thetaa", "x", "y". Write them strictly as $\theta$, $x$, $y$.
   - Never use "*" for multiplication. Use $\times$ or $\cdot$ in LaTeX.
   - Block equations and formulas MUST be enclosed in double dollar signs like $$\int_{a}^{b} f(x) dx = F(b) - F(a)$$.
   - Ensure all scaffoldings, concept definitions, trials, and application constraints conform fully to these LaTeX rules outputting publication-grade formatting.`;

    // Structured output schema matching Types interface
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        chapterTitle: { type: Type.STRING },
        originalOverview: { type: Type.STRING },
        levels: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              levelNumber: { type: Type.INTEGER },
              levelName: { type: Type.STRING },
              axiomaticBridge: {
                type: Type.OBJECT,
                properties: {
                  previousLevelConclusion: { type: Type.STRING },
                  limitationOrEdgeCase: { type: Type.STRING },
                  logicalInevitabilityOfNewConcept: { type: Type.STRING }
                },
                required: ["previousLevelConclusion", "limitationOrEdgeCase", "logicalInevitabilityOfNewConcept"]
              },
              phase1: {
                type: Type.OBJECT,
                properties: {
                  atomicConcepts: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        conceptName: { type: Type.STRING },
                        socraticQuestion: { type: Type.STRING },
                        honestReasoning: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        formalDefinition: { type: Type.STRING },
                        scaffolding: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              type: { type: Type.STRING }, // coordinate_table, numerical_sequence, verbal_description
                              title: { type: Type.STRING },
                              content: { type: Type.STRING }
                            },
                            required: ["type", "title", "content"]
                          }
                        }
                      },
                      required: ["id", "conceptName", "socraticQuestion", "honestReasoning", "formalDefinition", "scaffolding"]
                    }
                  }
                },
                required: ["atomicConcepts"]
              },
              phase2: {
                type: Type.OBJECT,
                properties: {
                  problems: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.INTEGER },
                        problemText: { type: Type.STRING },
                        logicalCore: { type: Type.STRING }
                      },
                      required: ["id", "problemText", "logicalCore"]
                    }
                  }
                },
                required: ["problems"]
              },
              phase3: {
                type: Type.OBJECT,
                properties: {
                  problems: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.INTEGER },
                        scenario: { type: Type.STRING },
                        constraints: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING }
                        },
                        problemText: { type: Type.STRING }
                      },
                      required: ["id", "scenario", "constraints", "problemText"]
                    }
                  }
                },
                required: ["problems"]
              }
            },
            required: ["levelNumber", "levelName", "phase1", "phase2", "phase3"]
          }
        }
      },
      required: ["chapterTitle", "originalOverview", "levels"]
    };

    parts.push({ text: userPrompt });

    const response = await generateWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema
      }
    });

    const bodyText = response.text;
    if (!bodyText) {
      throw new Error("Could not parse reconstruction schema from Gemini.");
    }

    const reconstructed = JSON.parse(bodyText);
    
    // Assign a unique generated ID
    reconstructed.id = `custom-${Date.now()}`;
    reconstructed.isCustom = true;

    // Save to custom directory for persistence
    const dest = path.join(CUSTOM_DIR, `${reconstructed.id}.json`);
    fs.writeFileSync(dest, JSON.stringify(reconstructed, null, 2), 'utf-8');

    return res.json({ success: true, curriculum: reconstructed });
  } catch (err: any) {
    console.error("Reconstruction failure:", err);
    let errorMsg = err.message || "Failed during curriculum reconstruction process.";
    const errText = String(err.message || '').toLowerCase();
    
    if (errText.includes('503') || errText.includes('demand') || errText.includes('unavailable') || errText.includes('rate limit') || errText.includes('exhausted')) {
      errorMsg = "The Gemini AI service is currently experiencing high demand. We initiated 3 automatic retries, but servers remain fully overloaded. Please wait a moment and click 'Trigger Engine' again to try again.";
    }
    return res.status(500).json({ success: false, error: errorMsg });
  }
});

// 6. Socratic Verify Student Answer
app.post('/api/verify-answer', async (req, res) => {
  try {
    const { curriculumTitle, levelName, phase, problemText, scratchpad } = req.body;

    if (!scratchpad || scratchpad.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Please write some mathematical proof or reasoning before submitting." });
    }

    const ai = getGeminiClient();

    const promptText = `Review this student’s mathematical scratchpad deduction work.
    
    Curriculum: ${curriculumTitle}
    Level: ${levelName}
    Phase: Phase ${phase}
    Problem description: ${problemText}
    
    Student scratchpad submission:
    """
    ${scratchpad}
    """
    
    A2A Socratic Guidance Directive:
    - Assess accuracy, mathematical consistency, and logical rigor.
    - Check if they respected the Axioms from Phase 1.
    - Offer Socratic feedback. If they are correct, praise their step-by-step logic. If incorrect or straying, point out the logical friction point, ask a guiding question, but DO NOT give them the final numeric or algebraic answer outright! Let them fix it themselves.
    `;

    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        isCorrect: { type: Type.BOOLEAN },
        feedback: { type: Type.STRING }
      },
      required: ["isCorrect", "feedback"]
    };

    const response = await generateWithRetry(ai, {
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: "You are a demanding, pristine A2A Socratic AI Tutor who values mathematical discipline. Assess and respond rigorously.",
        responseMimeType: "application/json",
        responseSchema
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, evaluation: parsed });
  } catch (err: any) {
    console.error("Socratic verification failure:", err);
    let errorMsg = err.message || "Failed Socratic analysis.";
    const errText = String(err.message || '').toLowerCase();
    
    if (errText.includes('503') || errText.includes('demand') || errText.includes('unavailable') || errText.includes('rate limit') || errText.includes('exhausted')) {
      errorMsg = "Socratic Assessment was interrupted by a temporary high API load on the Gemini servers. Please try submitting your proof again in a couple of seconds.";
    }
    return res.status(500).json({ success: false, error: errorMsg });
  }
});


// Serve React application with Vite integration (development) or direct static assets (production)
async function startDevServer() {
  // ESM dynamic import handling for development
  const { createServer: createViteServer } = await import('vite');
  try {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Development full-stack server running on http://0.0.0.0:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to create Vite dev server:', err);
  }
}

if (!isProd) {
  startDevServer();
} else {
  // Production express hosting
  app.use(express.static(path.resolve('dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
  });
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production full-stack server running on http://0.0.0.0:${PORT}`);
  });
}
