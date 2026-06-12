/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { 
  BookOpen, 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Download, 
  ChevronRight, 
  ChevronDown, 
  Terminal, 
  Play, 
  Cpu, 
  AlertCircle, 
  HelpCircle,
  Hash,
  Trash2,
  BookmarkCheck,
  Check,
  RefreshCw
} from 'lucide-react';
import { A2ACurriculum, A2ALevel, UserAnswerStore } from './types';
import { sampleCurriculums } from './data/sampleCurriculums';

export default function App() {
  // Lists of curriculums (preloaded samples + fetched custom ones)
  const [customCurriculums, setCustomCurriculums] = useState<A2ACurriculum[]>([]);
  const [selectedCurriculum, setSelectedCurriculum] = useState<A2ACurriculum | null>(sampleCurriculums[0]);
  
  // Navigation inside the active curriculum
  const [selectedLevelIdx, setSelectedLevelIdx] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'bridge' | 'phase1' | 'phase2' | 'phase3'>('phase1');
  
  // Creation States
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newText, setNewText] = useState<string>('');
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileBase64, setNewFileBase64] = useState<string>('');
  const [newFileMimeType, setNewFileMimeType] = useState<string>('');
  const [difficultyFloor, setDifficultyFloor] = useState<string>('Junior High');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Engine working states
  const [reconstructing, setReconstructing] = useState<boolean>(false);
  const [engineLogs, setEngineLogs] = useState<string[]>([
    '[SYS_LOG] Axiomatic-Linear parsing engine initialized.',
    '[SYS_LOG] System ready to receive source chapters.'
  ]);
  const [reconstructError, setReconstructError] = useState<string | null>(null);

  // Interactive Workbook state
  const [answers, setAnswers] = useState<UserAnswerStore>({});
  const [verifyingProblemKey, setVerifyingProblemKey] = useState<string | null>(null);

  // Active expanded problem ID in interactive trails/applications
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);

  // Bottom info status
  const [statusText, setStatusText] = useState<string>('Reconstruction Idle');

  // Load list of custom curriculums upon boot
  useEffect(() => {
    fetchCustomCurriculums();
  }, []);

  const fetchCustomCurriculums = async () => {
    try {
      addLog('[SYS_LOG] Querying cloud repository for custom documents...');
      const res = await fetch('/api/curriculums');
      const data = await res.json();
      if (data.success) {
        setCustomCurriculums(data.custom);
        addLog(`[SYS_LOG] Loaded ${data.custom.length} custom curriculum layers.`);
      }
    } catch (err: any) {
      addLog(`[SYS_LOG] Error reading cloud database: ${err.message}`);
    }
  };

  const addLog = (log: string) => {
    setEngineLogs(prev => [...prev, log].slice(-10)); // Keep last 10 logs
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    setNewFile(file);
    addLog(`[SYS_LOG] File attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      setNewFileBase64(base64);
      setNewFileMimeType(file.type);
      addLog(`[SYS_LOG] File encoded to Base64 (mimeType: ${file.type})`);
    };
    reader.readAsDataURL(file);
  };

  const triggerReconstruction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() && !newFileBase64) {
      setReconstructError('You must enter core chapter text or upload a document file (PDF, TXT, etc.)');
      return;
    }

    setReconstructing(true);
    setReconstructError(null);
    setStatusText('Reconstruction Active');
    addLog(`[SYS_LOG] Demolishing target: "${newTitle || 'Untitled Chapter'}"`);
    addLog(`[SYS_LOG] Injecting Axiom-to-Application (A2A) instruction system into model...`);

    try {
      const res = await fetch('/api/reconstruct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTitle,
          sourceText: newText,
          fileBase64: newFileBase64,
          fileMimeType: newFileMimeType,
          difficultyLevel: difficultyFloor
        })
      });

      const data = await res.json();
      if (data.success) {
        addLog(`[SYS_LOG] Chapter dismantled. Structural hierarchy verified.`);
        addLog(`[SYS_LOG] Reconstruction complete! Level matrices saved.`);
        
        // Refresh custom list
        await fetchCustomCurriculums();
        
        // Show newly generated curriculum
        setSelectedCurriculum(data.curriculum);
        setSelectedLevelIdx(0);
        setSelectedTab('phase1');
        setIsCreating(false);
        // Clear forms
        setNewTitle('');
        setNewText('');
        setNewFile(null);
        setNewFileBase64('');
        setNewFileMimeType('');
      } else {
        throw new Error(data.error || 'Unknown server error during generation');
      }
    } catch (err: any) {
      console.error(err);
      setReconstructError(err.message || 'Fatal generation crash. Please check your Gemini API configuration.');
      addLog(`[SYS_LOG] CRITICAL ERROR: Reconstruction aborted.`);
    } finally {
      setReconstructing(false);
      setStatusText('Reconstruction Idle');
    }
  };

  const handleSocraticVerify = async (level: A2ALevel, phase: number, problemId: number, problemText: string) => {
    const key = `${selectedCurriculum?.id}-L${level.levelNumber}-P${phase}-Pr${problemId}`;
    const value = answers[key]?.scratchpad;

    if (!value || !value.trim()) {
      alert("Please write down your scratchpad deduction reasoning before submitting for Socratic analysis!");
      return;
    }

    setVerifyingProblemKey(key);
    addLog(`[SYS_LOG] Testing Socratic bounds for L${level.levelNumber} P${phase} Problem ${problemId}...`);

    try {
      const res = await fetch('/api/verify-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          curriculumTitle: selectedCurriculum?.chapterTitle,
          levelName: level.levelName,
          phase,
          problemText,
          scratchpad: value
        })
      });

      const data = await res.json();
      if (data.success) {
        setAnswers(prev => ({
          ...prev,
          [key]: {
            ...prev[key],
            isSubmitted: true,
            verificationResult: data.evaluation
          }
        }));
        addLog(`[SYS_LOG] Socratic evaluation completed. isCorrect: ${data.evaluation.isCorrect}`);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Socratic query failed: ${err.message || 'Check Server Logs'}`);
    } finally {
      setVerifyingProblemKey(null);
    }
  };

  const handleScratchpadChange = (key: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        scratchpad: value
      }
    }));
  };

  const deleteCurriculum = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you absolutely sure you want to delete this custom reconstructed curriculum?')) {
      return;
    }
    
    try {
      addLog(`[SYS_LOG] Purging custom curriculum ID: ${id}`);
      const res = await fetch(`/api/curriculums/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        if (selectedCurriculum?.id === id) {
          setSelectedCurriculum(sampleCurriculums[0]);
          setSelectedLevelIdx(0);
          setSelectedTab('phase1');
        }
        await fetchCustomCurriculums();
        addLog(`[SYS_LOG] Custom curriculum successfully purged from cloud storage.`);
      }
    } catch (err: any) {
      addLog(`[SYS_LOG] Error deleting: ${err.message}`);
    }
  };

  const handleExportMarkdown = () => {
    if (!selectedCurriculum) return;

    let md = `# A2A RECONSTRUCTION: ${selectedCurriculum.chapterTitle}\n\n`;
    md += `## Original Overview Reference\n${selectedCurriculum.originalOverview}\n\n`;
    md += `*Reconstructed via Axiom-to-Application Curriculum Engine*\n\n---\n\n`;

    selectedCurriculum.levels.forEach((level) => {
      md += `## Level ${level.levelNumber}: ${level.levelName}\n\n`;

      if (level.axiomaticBridge) {
        md += `### Axiomatic Bridge (Logical Inevitability)\n`;
        md += `* **Previous Level Conclusion:** ${level.axiomaticBridge.previousLevelConclusion}\n`;
        md += `* **Limitation or Edge Case:** ${level.axiomaticBridge.limitationOrEdgeCase}\n`;
        md += `* **Logical Response:** ${level.axiomaticBridge.logicalInevitabilityOfNewConcept}\n\n`;
      }

      md += `### Phase 1: Atomic Concepts & Socratic Setup\n\n`;
      level.phase1.atomicConcepts.forEach((concept, cIdx) => {
        md += `#### Atomic Concept ${level.levelNumber}.${cIdx + 1}: ${concept.conceptName}\n`;
        md += `* **Socratic Prompt:** ${concept.socraticQuestion}\n`;
        md += `* **Honest Reasoning Journey:**\n`;
        concept.honestReasoning.forEach(step => {
          md += `  - ${step}\n`;
        });
        md += `* **Formal Analytical Definition:**\n  > ${concept.formalDefinition}\n\n`;
        
        if (concept.scaffolding && concept.scaffolding.length > 0) {
          md += `* **Text-Based Visual Scaffolding:**\n\n`;
          concept.scaffolding.forEach(scaff => {
            md += `  ##### ${scaff.title} (${scaff.type})\n`;
            md += `  ${scaff.content}\n\n`;
          });
        }
      });

      md += `### Phase 2: Conceptual Trials (Pure Structural Logic)\n`;
      md += `*Always strictly 10 abstract, context-stripped, rigorous questions requiring previous level concepts simultaneously.*\n\n`;
      level.phase2.problems.forEach(prob => {
        md += `#### Problem ${level.levelNumber}.${prob.id < 10 ? '0' + prob.id : prob.id}\n`;
        md += `* **Mathematical Target:** ${prob.problemText}\n`;
        md += `* **Logical Core System:** ${prob.logicalCore}\n\n`;
        md += `*Answer Workspace [Blank]:*\n_Work:_ \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\n\n`;
      });

      md += `### Phase 3: Deep Real-World Application\n`;
      md += `*Escalating mathematical depth over simpler physical scenarios of length (L - 1) * 5 + 10.*\n\n`;
      level.phase3.problems.forEach(prob => {
        md += `#### Problem ${level.levelNumber}.${prob.id < 10 ? '0' + prob.id : prob.id}\n`;
        md += `* **Physical Scenario:** ${prob.scenario}\n`;
        md += `* **Primary Mathematical Constraints:**\n`;
        prob.constraints.forEach(constrain => {
          md += `  - ${constrain}\n`;
        });
        md += `* **Direct Applied Prompt:** ${prob.problemText}\n\n`;
        md += `*Answer Workspace [Blank]:*\n_Work:_ \\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_\n\n`;
      });

      md += `\n---\n\n`;
    });

    // Create file download in browser
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `A2A_Curriculum_${selectedCurriculum.chapterTitle.replace(/\s+/g, '_')}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addLog('[SYS_LOG] Reconstructed curriculum successfully exported to Markdown file.');
  };

  const handleExportPDF = () => {
    if (!selectedCurriculum) return;
    addLog('[SYS_LOG] Initializing PDF Compilation Engine...');

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (2 * margin);

    let pageNum = 1;
    let y = margin;

    const checkSpace = (neededHeight: number) => {
      if (y + neededHeight > pageHeight - margin) {
        doc.addPage();
        pageNum++;
        y = margin;
        drawPageHeader();
      }
    };

    const drawPageHeader = () => {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(`A2A RECONSTRUCTED WORKBOOK: ${selectedCurriculum.chapterTitle.toUpperCase()}`, margin, margin - 10);
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.2);
      doc.line(margin, margin - 8, pageWidth - margin, margin - 8);
      doc.text(`Page ${pageNum}`, pageWidth - margin, margin - 10, { align: 'right' });
    };

    const writeText = (text: string, options: { 
      fontSize?: number; 
      fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic'; 
      textColor?: [number, number, number];
      spacingAfter?: number;
      fontFamily?: 'Helvetica' | 'Courier' | 'Times';
      isBlockquote?: boolean;
    } = {}) => {
      const {
        fontSize = 10,
        fontStyle = 'normal',
        textColor = [30, 41, 59], // Slate-800
        spacingAfter = 4,
        fontFamily = 'Helvetica',
        isBlockquote = false
      } = options;

      doc.setFont(fontFamily, fontStyle);
      doc.setFontSize(fontSize);
      doc.setTextColor(textColor[0], textColor[1], textColor[2]);

      const wrapWidth = isBlockquote ? (contentWidth - 12) : contentWidth;
      const lines: string[] = doc.splitTextToSize(text, wrapWidth);
      const lineHeight = fontSize * 0.3527 * 1.35; // size converted to mm with leading multiplier

      lines.forEach((line) => {
        checkSpace(lineHeight);
        if (isBlockquote) {
          doc.setFillColor(226, 232, 240); // slate-200 bar
          doc.rect(margin, y - 1, 1.5, lineHeight, 'F');
          doc.text(line, margin + 4, y);
        } else {
          doc.text(line, margin, y);
        }
        y += lineHeight;
      });

      y += spacingAfter;
    };

    const writeWorkspaceLines = (count: number = 3) => {
      checkSpace(4 + count * 6);
      y += 2;
      doc.setDrawColor(203, 213, 225); // slate-300
      doc.setLineWidth(0.15);
      for (let i = 0; i < count; i++) {
        doc.setLineDashPattern([1, 1.5], 0);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
      }
      doc.setLineDashPattern([], 0); // Restore solid line
      y += 2;
    };

    // COVER PAGE
    doc.setFillColor(15, 23, 42); // slate-900 border accent
    doc.rect(margin, margin + 5, contentWidth, 3, 'F');

    y = margin + 20;

    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    const titleLines: string[] = doc.splitTextToSize(selectedCurriculum.chapterTitle, contentWidth);
    titleLines.forEach(line => {
      doc.text(line, margin, y);
      y += 10;
    });

    y += 4;
    writeText('Axiom-to-Application (A2A) Rigorous Learning Layer', { fontSize: 12, fontStyle: 'italic', textColor: [2, 132, 199], spacingAfter: 12 });

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    writeText('ORIGINAL CHAPTER OVERVIEW', { fontSize: 11, fontStyle: 'bold', textColor: [100, 116, 139], spacingAfter: 3 });
    writeText(selectedCurriculum.originalOverview, { fontSize: 9.5, textColor: [71, 85, 105], spacingAfter: 15 });

    writeText('METADATA & SPECIFICATION', { fontSize: 11, fontStyle: 'bold', textColor: [100, 116, 139], spacingAfter: 3 });
    writeText(`• Total Levels Deconstructed: ${selectedCurriculum.levels.length}`, { fontSize: 9.5, textColor: [30, 41, 59] });
    writeText(`• Rigor Bound: Escalating from Junior High foundation to University rigorous analysis`, { fontSize: 9.5, textColor: [30, 41, 59] });
    writeText(`• Medium: Physical Print Student Workbook with custom empty workspaces`, { fontSize: 9.5, textColor: [30, 41, 59] });
    writeText(`• Export Date: ${new Date().toLocaleDateString()}`, { fontSize: 9.5, textColor: [30, 41, 59], spacingAfter: 25 });

    y += 10;
    writeText('INSTRUCTIONS FOR PRINTED COMPLIANCE:', { fontSize: 10, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 3 });
    writeText('1. Carefully review Phase 1 Socratic reasoning chains to establish core mathematical truths.\n2. Work through the 10 context-stripped Conceptual Trials in Phase 2 using your pencil directly in the workspace provided.\n3. Escalate towards the rigorous physical constraint systems in Phase 3.', { fontSize: 9, textColor: [51, 65, 85], spacingAfter: 15 });

    // Main level by level generator
    selectedCurriculum.levels.forEach((level) => {
      doc.addPage();
      pageNum++;
      y = margin;
      drawPageHeader();

      y += 5;
      doc.setFillColor(15, 23, 42); // slate-900 heading banner
      doc.rect(margin, y, contentWidth, 12, 'F');

      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(255, 255, 255);
      doc.text(`LEVEL ${level.levelNumber}: ${level.levelName.toUpperCase()}`, margin + 4, y + 7.5);
      y += 20;

      // Axiomatic Bridge (L2+)
      if (level.levelNumber > 1 && level.axiomaticBridge) {
        checkSpace(45);
        const b = level.axiomaticBridge;

        doc.setFillColor(248, 250, 252); // slate-50
        doc.setDrawColor(226, 232, 240); // slate-200
        doc.setLineWidth(0.3);

        const bridgePayload = `AXIOMATIC BRIDGE OF LOGICAL INEVITABILITY\n\n• Previous Level Conclusion:\n${b.previousLevelConclusion}\n\n• The Boundary Constraint or Edge Case:\n${b.limitationOrEdgeCase}\n\n• Absolute Logical Inevitability:\n${b.logicalInevitabilityOfNewConcept}`;
        const lines: string[] = doc.splitTextToSize(bridgePayload, contentWidth - 10);
        const boxHeight = (lines.length * 4.2) + 10;

        doc.rect(margin, y, contentWidth, boxHeight, 'FD');

        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        
        let boxY = y + 7;
        lines.forEach((line) => {
          if (line.includes('• Previous') || line.includes('• The Boundary') || line.includes('• Absolute Logical') || line.includes('AXIOMATIC BRIDGE')) {
            doc.setFont('Helvetica', 'bold');
            doc.setTextColor(15, 23, 42);
          } else {
            doc.setFont('Helvetica', 'normal');
            doc.setTextColor(71, 85, 105);
          }
          doc.text(line, margin + 5, boxY);
          boxY += 4.2;
        });

        y += boxHeight + 10;
      }

      // Phase 1 Atomic Concepts
      writeText('PHASE 1: ATOMIC CONCEPTS & SOCRATIC EXPLORATION', { fontSize: 11, fontStyle: 'bold', textColor: [2, 132, 199], spacingAfter: 5 });

      level.phase1.atomicConcepts.forEach((concept, cIdx) => {
        checkSpace(20);
        writeText(`Atomic Concept ${level.levelNumber}.${cIdx + 1}: ${concept.conceptName}`, { fontSize: 10, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 1.5 });
        writeText(`Socratic Guide: ${concept.socraticQuestion}`, { fontSize: 9, fontStyle: 'italic', textColor: [3, 105, 161], spacingAfter: 4 });

        writeText('Deductive Reasoning Flow:', { fontSize: 8.5, fontStyle: 'bold', textColor: [100, 116, 139], spacingAfter: 1 });
        concept.honestReasoning.forEach((step) => {
          const isWrongTurn = step.toLowerCase().includes('wrong') || step.toLowerCase().includes('wait,') || step.toLowerCase().includes('collapse');
          const stepOptions = isWrongTurn 
            ? { fontSize: 8.5, fontStyle: 'italic' as const, textColor: [185, 28, 28] as [number, number, number], fontFamily: 'Courier' as const, spacingAfter: 1.5 }
            : { fontSize: 8.5, textColor: [51, 65, 85] as [number, number, number], spacingAfter: 1.5 };
          writeText(`- ${step}`, stepOptions);
        });

        writeText(`FORMAL TRUTH DEFINITION: ${concept.formalDefinition}`, { 
          fontSize: 8.5, 
          fontStyle: 'normal', 
          textColor: [15, 23, 42], 
          fontFamily: 'Courier', 
          isBlockquote: true, 
          spacingAfter: 6 
        });

        if (concept.scaffolding && concept.scaffolding.length > 0) {
          concept.scaffolding.forEach((scaff) => {
            writeText(`${scaff.title.toUpperCase()} (${scaff.type})`, { fontSize: 8.5, fontStyle: 'bold', textColor: [100, 116, 139], spacingAfter: 1.5 });
            writeText(scaff.content, { 
              fontSize: 8, 
              fontStyle: 'normal', 
              textColor: [30, 41, 59], 
              fontFamily: 'Courier', 
              isBlockquote: true, 
              spacingAfter: 6 
            });
          });
        }
        y += 4;
      });

      // Phase 2 Conceptual Trials
      doc.addPage();
      pageNum++;
      y = margin;
      drawPageHeader();

      y += 5;
      writeText('PHASE 2: ABSTRACT CONCEPTUAL TRIALS', { fontSize: 11, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 1.5 });
      writeText('[Note: Zero physical context framing. Pure mathematical system connections. Student must fill solution slots below.]', { fontSize: 8.5, fontStyle: 'italic', textColor: [100, 116, 139], spacingAfter: 6 });

      level.phase2.problems.forEach((prob) => {
        checkSpace(35);
        writeText(`Problem ${level.levelNumber}.${prob.id < 10 ? '0' + prob.id : prob.id}: ${prob.problemText}`, { fontSize: 9.5, fontStyle: 'bold', textColor: [15, 23, 42] });
        writeText(`Logical core constraint: ${prob.logicalCore}`, { fontSize: 8, fontStyle: 'italic', textColor: [100, 116, 139] });
        writeWorkspaceLines(3);
      });

      // Phase 3 Applications
      doc.addPage();
      pageNum++;
      y = margin;
      drawPageHeader();

      y += 5;
      writeText('PHASE 3: DEEP REAL-WORLD SYSTEM APPLICATION', { fontSize: 11, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 1.5 });
      writeText('[Note: Non-specialist setup setups containing massive multi-coordinate constraints requiring deep analytical focus.]', { fontSize: 8.5, fontStyle: 'italic', textColor: [100, 116, 139], spacingAfter: 6 });

      level.phase3.problems.forEach((prob) => {
        checkSpace(40);
        writeText(`Problem ${level.levelNumber}.${prob.id < 10 ? '0' + prob.id : prob.id}`, { fontSize: 9.5, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 1 });
        writeText(`Physical Context: ${prob.scenario}`, { fontSize: 8.5, textColor: [71, 85, 105], spacingAfter: 1 });
        
        prob.constraints.forEach((cons, cIdx) => {
          writeText(`Constraint ${cIdx + 1}: ${cons}`, { fontSize: 8, fontStyle: 'italic', textColor: [100, 116, 139], spacingAfter: 0.5 });
        });
        
        writeText(`Direct applied prompt: ${prob.problemText}`, { fontSize: 9, fontStyle: 'bold', textColor: [15, 23, 42], spacingAfter: 2 });
        writeWorkspaceLines(3);
      });
    });

    const fileTitle = `A2A_Curriculum_${selectedCurriculum.chapterTitle.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileTitle);
    addLog(`[SYS_LOG] Successfully compiled and downloaded physical-workbook standard PDF: ${fileTitle}`);
  };

  const getActiveLevel = (): A2ALevel | undefined => {
    return selectedCurriculum?.levels[selectedLevelIdx];
  };

  const activeLevel = getActiveLevel();

  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* Header Navigation */}
      <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <div className="bg-sky-500 w-8 h-8 flex items-center justify-center font-bold text-slate-900 text-sm tracking-tighter">A2A</div>
          <h1 className="text-sm tracking-[0.2em] font-bold uppercase italic flex items-center gap-2">
            Curriculum Reconstruction Engine 
            <span className="font-normal opacity-50 text-[10px] sm:inline hidden">/</span> 
            <span className="font-mono text-xs text-sky-400 bg-slate-800 px-2 py-0.5 rounded sm:inline hidden">v5.1.0</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-mono uppercase tracking-widest bg-slate-800 px-3 py-1 border border-slate-700 rounded text-sky-200">
            {statusText}
          </div>
          <div className={`w-3 h-3 rounded-full ${reconstructing ? 'bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 bg-slate-100 border-r border-slate-300 flex flex-col shrink-0">
          
          {/* Section: Select Active Curriculum */}
          <div className="p-4 border-b border-slate-300 bg-slate-200/50">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Active Curriculum</h2>
              <button 
                onClick={() => setIsCreating(true)}
                className="text-[10px] font-bold bg-slate-900 text-white px-2 py-1 rounded hover:bg-slate-800 flex items-center gap-1 transition"
                id="btn-reconstruct-new"
              >
                <Upload size={10} /> Reconstruct New
              </button>
            </div>
            
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {/* Preloaded Samples */}
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Standard Library</div>
              {sampleCurriculums.map((sc) => (
                <div 
                  key={sc.id}
                  onClick={() => { setSelectedCurriculum(sc); setSelectedLevelIdx(0); setIsCreating(false); }}
                  className={`group p-2 rounded border cursor-pointer transition text-xs relative ${selectedCurriculum?.id === sc.id && !isCreating ? 'bg-white border-slate-900 font-bold text-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
                >
                  <p className="truncate pr-4">{sc.chapterTitle}</p>
                  <span className="absolute right-2 top-2.5 w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                </div>
              ))}

              {/* Custom Reconstructed List */}
              {customCurriculums.length > 0 && <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-3 mb-1">Custom Layers</div>}
              {customCurriculums.map((cc) => (
                <div 
                  key={cc.id}
                  onClick={() => { setSelectedCurriculum(cc); setSelectedLevelIdx(0); setIsCreating(false); }}
                  className={`group p-2 rounded border cursor-pointer transition text-xs flex items-center justify-between relative ${selectedCurriculum?.id === cc.id && !isCreating ? 'bg-white border-slate-900 font-bold text-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-200'}`}
                >
                  <p className="truncate pr-5">{cc.chapterTitle}</p>
                  <button 
                    onClick={(e) => deleteCurriculum(cc.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-400 hover:text-red-600 transition absolute right-1.5 top-2"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Reconstruction Hierarchy navigation */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-slate-200">
              <h2 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Levels Matrix</h2>
            </div>

            {isCreating || !selectedCurriculum ? (
              <div className="p-6 text-center text-xs text-slate-400 italic">
                Awaiting active document layer. No level hierarchy loaded.
              </div>
            ) : (
              <nav className="flex-1">
                {selectedCurriculum.levels.map((level, idx) => (
                  <div 
                    key={level.levelNumber} 
                    className={`border-b border-slate-200 transition ${selectedLevelIdx === idx ? 'bg-white' : 'bg-slate-50 hover:bg-slate-100'}`}
                  >
                    <div 
                      onClick={() => { setSelectedLevelIdx(idx); }}
                      className="p-3.5 flex justify-between items-center cursor-pointer"
                    >
                      <div className="flex flex-col gap-0.5 max-w-[80%]">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Level {level.levelNumber}</span>
                        <span className="text-xs font-bold text-slate-900 truncate">{level.levelName}</span>
                      </div>
                      <span className="text-[9px] font-mono tracking-tighter bg-slate-900 text-white px-1.5 py-0.5 rounded">
                        {selectedLevelIdx === idx ? 'ACTIVE' : 'SELECT'}
                      </span>
                    </div>

                    {selectedLevelIdx === idx && (
                      <div className="px-6 pb-4 pt-1 space-y-2 border-t border-slate-100 bg-slate-50/50">
                        {level.levelNumber > 1 && (
                          <button 
                            onClick={() => setSelectedTab('bridge')}
                            className={`w-full text-left text-[11px] py-1 px-2 rounded font-mono flex items-center gap-1.5 transition ${selectedTab === 'bridge' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
                          >
                            <BookmarkCheck size={12} /> Axiomatic Bridge
                          </button>
                        )}
                        <button 
                          onClick={() => setSelectedTab('phase1')}
                          className={`w-full text-left text-[11px] py-1 px-2 rounded font-mono flex items-center gap-1.5 transition ${selectedTab === 'phase1' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          <Cpu size={12} /> Phase 1: Atomic Concepts
                        </button>
                        <button 
                          onClick={() => setSelectedTab('phase2')}
                          className={`w-full text-left text-[11px] py-1 px-2 rounded font-mono flex items-center gap-1.5 transition ${selectedTab === 'phase2' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          <Hash size={12} /> Phase 2: Conceptual Trials
                        </button>
                        <button 
                          onClick={() => setSelectedTab('phase3')}
                          className={`w-full text-left text-[11px] py-1 px-2 rounded font-mono flex items-center gap-1.5 transition ${selectedTab === 'phase3' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
                        >
                          <Sparkles size={12} /> Phase 3: Applied Math
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            )}
          </div>

          {/* Section: Live Terminal Log Console */}
          <div className="p-4 bg-slate-900 text-slate-300 font-mono text-[10px] leading-relaxed select-none h-44 border-t border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-1 mb-1.5">
              <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider"><Terminal size={10} /> Live System Log</span>
              <span className="text-[8px] opacity-75">PORT 3000</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
              {engineLogs.map((log, i) => (
                <div key={i} className="whitespace-pre-wrap">{log}</div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Workspace Frame */}
        <main className="flex-1 bg-white flex flex-col overflow-hidden relative">
          
          {/* Sub Header Ribbon with Export & Stats */}
          <div className="h-14 border-b border-slate-200 bg-slate-50 flex items-center justify-between px-6 shrink-0 z-10">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-200/60 px-2.5 py-1 rounded">Workbook Mode</span>
              {selectedCurriculum && (
                <p className="text-xs font-mono text-slate-600 truncate max-w-xs md:max-w-md hidden sm:block">
                  Current: <strong className="text-slate-900">{selectedCurriculum.chapterTitle}</strong>
                </p>
              )}
            </div>

            {selectedCurriculum && !isCreating && (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleExportMarkdown}
                  className="bg-slate-700 text-white hover:bg-slate-600 transition flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                  title="Download raw markdown document"
                >
                  <Download size={12} /> Export Markdown (.md)
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="bg-slate-900 text-white hover:bg-slate-800 transition flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded cursor-pointer"
                  id="btn-export-pdf"
                  title="Download high-fidelity printable workbook PDF"
                >
                  <FileText size={12} /> Export PDF (.pdf)
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col">
            
            {/* 1. BUILD/RECONSTRUCT NEW PANEL */}
            {isCreating ? (
              <div className="max-w-3xl mx-auto w-full space-y-8 bg-white border-2 border-slate-900 shadow-md p-8 rounded-lg my-auto">
                <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-serif italic text-slate-900">Initiate A2A Reconstruction</h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.25em] mt-1">Dismantle Textbooks into Axiomatic Rigor</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (selectedCurriculum) {
                        setIsCreating(false);
                      } else {
                        setSelectedCurriculum(sampleCurriculums[0]);
                        setIsCreating(false);
                      }
                    }} 
                    className="p-1 hover:bg-slate-100 rounded text-slate-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={triggerReconstruction} className="space-y-6">
                  
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Curriculum / Chapter Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Chapter 7: Kinematic Dynamics of Rates" 
                      value={newTitle} 
                      onChange={(e) => setNewTitle(e.target.value)} 
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-300 p-2.5 rounded focus:outline-none focus:border-slate-900"
                      required
                    />
                  </div>

                  {/* Multi-strategy Source input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Strategy A: Paste Text */}
                    <div className="space-y-2 flex flex-col">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Strategy A: Paste Chapter Text</label>
                      <textarea 
                        placeholder="Paste Chapter explanations, formulas, and worked exercises here. A2A will completely strip any messy formatting, verify core axioms, generate socratic proofs, and design abstract structural challenges."
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        className="w-full flex-1 min-h-[160px] text-xs font-mono bg-slate-50 border border-slate-300 p-3 rounded focus:outline-none focus:border-slate-900 leading-relaxed resize-none"
                      />
                    </div>

                    {/* Strategy B: Drag and Drop PDF/Doc */}
                    <div className="space-y-2 flex flex-col">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Strategy B: Upload PDF / Plain Text Document</label>
                      <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex-1 min-h-[160px] border-2 border-dashed rounded flex flex-col items-center justify-center p-6 text-center cursor-pointer transition ${isDragOver ? 'border-sky-500 bg-sky-50/50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100/70'}`}
                        onClick={() => document.getElementById('file-upload-dialog')?.click()}
                      >
                        <input 
                          type="file" 
                          id="file-upload-dialog" 
                          onChange={handleFileChange} 
                          className="hidden" 
                          accept=".pdf,.txt,.md"
                        />
                        <Upload size={32} className={`mb-3 ${newFile ? 'text-green-600 animate-bounce' : 'text-slate-400'}`} />
                        {newFile ? (
                          <div>
                            <p className="text-xs font-bold text-slate-800 font-mono truncate max-w-[200px]">{newFile.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-1">{(newFile.size / 1024).toFixed(1)} KB - Ready</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-xs font-bold text-slate-700">Drag & Drop your chapter PDF/TXT here</p>
                            <p className="text-[10px] text-slate-400 mt-1">or click to browse local files</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Difficulty Setting */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Verification / Difficulty Floor Rigor</label>
                    <select 
                      value={difficultyFloor}
                      onChange={(e) => setDifficultyFloor(e.target.value)}
                      className="w-full text-xs font-mono bg-slate-50 border border-slate-300 p-2.5 rounded focus:outline-none focus:border-slate-900"
                    >
                      <option value="Junior High">Junior High (Accessible conceptual scaffolding, weak math confidence)</option>
                      <option value="High School">High School (Standard vector math, geometric proofs)</option>
                      <option value="University Undergraduate">University (Demanding analytical rigor, abstract manifolds)</option>
                    </select>
                  </div>

                  {reconstructError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="shrink-0 mt-0.5" size={14} />
                      <div>
                        <strong className="font-bold">Reconstruction Error:</strong> {reconstructError}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-6 flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsCreating(false)}
                      className="px-5 py-2 border border-slate-300 text-slate-700 font-mono text-xs font-bold uppercase rounded hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={reconstructing}
                      className="px-6 py-2 bg-slate-900 text-white font-mono text-xs font-bold uppercase rounded hover:bg-slate-800 flex items-center gap-2 disabled:bg-slate-400"
                      id="action-reconstruct"
                    >
                      {reconstructing ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" /> Reconstruction Active...
                        </>
                      ) : (
                        <>
                          <Play size={12} /> Trigger Engine
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            ) : selectedCurriculum && activeLevel ? (
              
              /* 2. LIVE ACTIVE DOCUMENT VIEW */
              <div className="max-w-3xl mx-auto w-full space-y-10">

                {/* Level Title Segment */}
                <div className="border-b-2 border-slate-900 pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sky-600 font-bold bg-slate-100 px-2 py-1 rounded">LEVEL {activeLevel.levelNumber}</span>
                  <h3 className="text-3.5xl font-serif italic font-light text-slate-950 mt-2">{activeLevel.levelName}</h3>
                  <p className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.3em] mt-1.5">
                    A2A-DOC COMPLETED FRAME / ID: {selectedCurriculum.id}-{activeLevel.levelNumber}
                  </p>
                </div>

                {/* TAB SECTION: AXIOMATIC BRIDGE */}
                {selectedTab === 'bridge' && activeLevel.levelNumber > 1 && activeLevel.axiomaticBridge && (
                  <section className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-2 text-slate-450 border-b border-dashed border-slate-200 pb-2">
                      <BookmarkCheck className="text-slate-900" size={18} />
                      <h4 className="text-xs font-mono uppercase tracking-widest font-bold">MANDATORY AXIOMATIC BRIDGE</h4>
                    </div>

                    <div className="bg-slate-50 border-l-4 border-slate-900 p-6 space-y-4 rounded-r-md">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">1. Previous Level Conclusion</span>
                        <p className="text-sm leading-relaxed text-slate-800 mt-1">{activeLevel.axiomaticBridge.previousLevelConclusion}</p>
                      </div>

                      <div className="border-t border-slate-200 pt-4">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">2. The Boundary Constraint or Edge Case</span>
                        <p className="text-sm leading-relaxed text-slate-800 mt-1 font-semibold text-red-800 bg-red-50/50 p-2.5 rounded border border-red-100">
                          {activeLevel.axiomaticBridge.limitationOrEdgeCase}
                        </p>
                      </div>

                      <div className="border-t border-slate-200 pt-4">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">3. Logical Inevitability of New Concept</span>
                        <p className="text-sm leading-relaxed italic text-slate-700 mt-1 bg-sky-50/50 p-2.5 rounded border border-sky-100">
                          {activeLevel.axiomaticBridge.logicalInevitabilityOfNewConcept}
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* TAB SECTION: PHASE 1 (ATOMIC CONCEPTS) */}
                {selectedTab === 'phase1' && (
                  <section className="space-y-8 animate-fade-in">
                    <div className="flex items-center gap-2 text-slate-450 border-b border-dashed border-slate-200 pb-2">
                      <Cpu size={18} className="text-slate-950" />
                      <h4 className="text-xs font-mono uppercase tracking-widest font-bold">PHASE 1: AXIOMATIC SETUP + SOCRATIC EXPLORATION</h4>
                    </div>

                    <div className="space-y-12">
                      {activeLevel.phase1.atomicConcepts.map((concept, cIdx) => (
                        <div key={concept.id} className="space-y-4 border border-slate-200 rounded p-6 shadow-sm hover:shadow-md transition">
                          
                          {/* Concept Header */}
                          <div className="flex items-start gap-2.5 border-b border-slate-100 pb-2.5">
                            <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono text-xs flex items-center justify-center shrink-0">
                              {activeLevel.levelNumber}.{cIdx + 1}
                            </span>
                            <div>
                              <h5 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">{concept.conceptName}</h5>
                              <p className="text-xs text-sky-700 italic font-mono mt-0.5">{concept.socraticQuestion}</p>
                            </div>
                          </div>

                          {/* Honest Reasoning Journey */}
                          <div className="space-y-3 pl-3 border-l-2 border-slate-200">
                            <span className="text-[9px] font-mono text-slate-405 uppercase tracking-wider font-bold">Deductive Socratic Progress</span>
                            <div className="space-y-2.5">
                              {concept.honestReasoning.map((step, sIdx) => {
                                // Highlighting false turns in deduction
                                const isWrongTurn = step.toLowerCase().includes('wrong') || step.toLowerCase().includes('wait,') || step.toLowerCase().includes('collapse');
                                return (
                                  <p key={sIdx} className={`text-xs leading-relaxed ${isWrongTurn ? 'text-red-700 font-mono italic bg-red-50/50 p-1.5 rounded' : 'text-slate-700'}`}>
                                    {step}
                                  </p>
                                );
                              })}
                            </div>
                          </div>

                          {/* Formal Mathematical definition */}
                          <div className="bg-slate-900 text-slate-200 p-4 rounded-md font-mono text-xs space-y-1 my-3">
                            <p className="text-[9px] text-sky-400 uppercase tracking-widest font-bold">FORMAL MATHEMATICAL DEFINITION</p>
                            <p className="leading-relaxed font-light">{concept.formalDefinition}</p>
                          </div>

                          {/* Text-based Scaffolding visualizer */}
                          {concept.scaffolding && concept.scaffolding.length > 0 && (
                            <div className="space-y-3">
                              <span className="text-[9px] font-mono text-slate-405 uppercase tracking-wider font-bold">Text-Based Visual Scaffolding</span>
                              
                              {concept.scaffolding.map((scaff, scIdx) => (
                                <div key={scIdx} className="border border-slate-200 bg-slate-50/50 rounded p-4 font-mono text-xs">
                                  <div className="flex justify-between items-center text-[10px] text-slate-400 capitalize border-b border-slate-200 pb-1.5 mb-2 font-bold">
                                    <span>{scaff.title}</span>
                                    <span className="bg-slate-900 text-white px-1 rounded text-[8px]">{scaff.type.replace('_', ' ')}</span>
                                  </div>

                                  {scaff.type === 'coordinate_table' ? (
                                    <pre className="whitespace-pre-wrap leading-relaxed font-mono text-[11px] bg-white p-2.5 border border-slate-200 overflow-x-auto rounded">
                                      {scaff.content}
                                    </pre>
                                  ) : scaff.type === 'numerical_sequence' ? (
                                    <div className="bg-white p-2.5 border border-slate-200 rounded text-slate-700 leading-relaxed font-mono">
                                      {scaff.content}
                                    </div>
                                  ) : (
                                    <blockquote className="my-1 border-l-4 border-slate-300 pl-3 italic text-slate-600 leading-relaxed text-xs">
                                      {scaff.content}
                                    </blockquote>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* TAB SECTION: PHASE 2 (ABSTRACT CONCEPTUAL TRIALS) */}
                {selectedTab === 'phase2' && (
                  <section className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Hash size={18} className="text-slate-950" />
                        <h4 className="text-xs font-mono uppercase tracking-widest font-bold">PHASE 2: ABSTRACT CONCEPTUAL TRIALS</h4>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-900 text-white px-2 py-0.5 rounded">STRICTLY 10 PROBLEMS</span>
                    </div>

                    <div className="bg-slate-50 p-4 border rounded font-mono text-xs text-slate-600 leading-relaxed space-y-1">
                      <p className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[10px]">Logical Guidelines</p>
                      <p>• Zero physical/real-world context mapping.</p>
                      <p>• Pure structural system relations and coordinate logical spaces.</p>
                      <p>• Demands analytical integration of all levels simultaneously.</p>
                    </div>

                    <div className="space-y-5">
                      {activeLevel.phase2.problems.map((prob) => {
                        const probKey = `${selectedCurriculum.id}-L${activeLevel.levelNumber}-P2-Pr${prob.id}`;
                        const isExpanded = activeProblemId === probKey;
                        const hasAnswer = answers[probKey] && answers[probKey].scratchpad;
                        const evalResult = answers[probKey]?.verificationResult;

                        return (
                          <div key={prob.id} className="border border-slate-200 rounded hover:border-slate-400 transition overflow-hidden">
                            
                            {/* Problem preview row */}
                            <div 
                              onClick={() => setActiveProblemId(isExpanded ? null : probKey)}
                              className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-100/50"
                            >
                              <div className="flex items-center gap-3 max-w-[85%]">
                                <span className="font-mono text-xs bg-slate-900 text-white w-12 text-center py-0.5 rounded font-bold shrink-0">
                                  #{prob.id < 10 ? '0' + prob.id : prob.id}
                                </span>
                                <p className="text-xs font-mono truncate text-slate-800 pr-4 italic">{prob.problemText}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                {evalResult ? (
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${evalResult.isCorrect ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                    {evalResult.isCorrect ? 'Rigorous' : 'Friction'}
                                  </span>
                                ) : hasAnswer ? (
                                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">Drafted</span>
                                ) : null}
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </div>
                            </div>

                            {/* Expanded Socratic interactive console */}
                            {isExpanded && (
                              <div className="p-5 border-t border-slate-200 space-y-4 bg-white">
                                <div className="space-y-1.5">
                                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">Abstract Challenge Statement</span>
                                  <p className="text-xs font-mono font-medium text-slate-900 leading-relaxed bg-slate-50 p-3 rounded border border-slate-200">{prob.problemText}</p>
                                  <p className="text-[9px] font-mono text-sky-700 mt-1">Logical Core Constraint: {prob.logicalCore}</p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-450 uppercase uppercase">
                                    <span>Interactive Deduction scratchpad</span>
                                    <span>BLANK solutions only</span>
                                  </div>
                                  
                                  <textarea 
                                    placeholder="Write your step-by-step mathematical reasoning. Deduce the logic starting from established Phase 1 axioms..."
                                    value={answers[probKey]?.scratchpad || ''}
                                    onChange={(e) => handleScratchpadChange(probKey, e.target.value)}
                                    className="w-full text-xs font-mono bg-slate-900 text-slate-100 p-3.5 rounded focus:outline-none min-h-[100px] leading-relaxed resize-y border border-slate-750 placeholder:text-slate-600 shadow-inner"
                                  />

                                  {evalResult && (
                                    <div className={`p-4 border rounded text-xs leading-relaxed space-y-2 ${evalResult.isCorrect ? 'bg-green-50/70 border-green-300 text-green-800' : 'bg-amber-50/70 border-amber-300 text-amber-800'}`}>
                                      <div className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                                        {evalResult.isCorrect ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                        {evalResult.isCorrect ? 'PROVED WITH SOLEMN RIGOR' : 'CONCEPTUAL INCONSISTENCY IN WORK'}
                                      </div>
                                      <p>{evalResult.feedback}</p>
                                    </div>
                                  )}

                                  <div className="flex justify-end pt-1">
                                    <button 
                                      onClick={() => handleSocraticVerify(activeLevel, 2, prob.id, prob.problemText)}
                                      disabled={verifyingProblemKey === probKey}
                                      className={`px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition disabled:bg-slate-400`}
                                    >
                                      {verifyingProblemKey === probKey ? (
                                        <>
                                          <RefreshCw size={12} className="animate-spin" /> Querying Academy...
                                        </>
                                      ) : (
                                        <>
                                          <Sparkles size={12} /> Submit Socratic Proof
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* TAB SECTION: PHASE 3 (DEEP REAL-WORLD SYSTEM APPLICATION) */}
                {selectedTab === 'phase3' && (
                  <section className="space-y-6 animate-fade-in">
                    <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-slate-950" />
                        <h4 className="text-xs font-mono uppercase tracking-widest font-bold">PHASE 3: DEEP COGNITIVE APPLICATION</h4>
                      </div>
                      <span className="text-[10px] font-mono bg-slate-900 text-white px-2 py-0.5 rounded">
                        {(activeLevel.levelNumber - 1) * 5 + 10} PROBLEMS FOR L{activeLevel.levelNumber}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 border rounded font-mono text-xs text-slate-600 leading-relaxed space-y-1">
                      <p className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[10px]">Applied Constraints</p>
                      <p>• Mathematical depth stems purely from logical multi-coordinate constraints.</p>
                      <p>• Physical premise is simplified and understandable by a non-expert instantly.</p>
                      <p>• Zero heavy background technical domain jargon bottlenecks.</p>
                    </div>

                    <div className="space-y-5">
                      {activeLevel.phase3.problems.map((prob) => {
                        const probKey = `${selectedCurriculum.id}-L${activeLevel.levelNumber}-P3-Pr${prob.id}`;
                        const isExpanded = activeProblemId === probKey;
                        const hasAnswer = answers[probKey] && answers[probKey].scratchpad;
                        const evalResult = answers[probKey]?.verificationResult;

                        return (
                          <div key={prob.id} className="border border-slate-200 rounded hover:border-slate-400 transition overflow-hidden">
                            
                            <div 
                              onClick={() => setActiveProblemId(isExpanded ? null : probKey)}
                              className="p-4 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-100/50"
                            >
                              <div className="flex items-center gap-3 max-w-[85%]">
                                <span className="font-mono text-xs bg-slate-900 text-white w-12 text-center py-0.5 rounded font-bold shrink-0">
                                  #{prob.id < 10 ? '0' + prob.id : prob.id}
                                </span>
                                <p className="text-xs font-sans truncate text-slate-800 pr-4 font-semibold">{prob.scenario}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                {evalResult ? (
                                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${evalResult.isCorrect ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                    {evalResult.isCorrect ? 'Rigorous' : 'Axiom Friction'}
                                  </span>
                                ) : hasAnswer ? (
                                  <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">Formulated</span>
                                ) : null}
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              </div>
                            </div>

                            {isExpanded && (
                              <div className="p-5 border-t border-slate-200 space-y-4 bg-white">
                                
                                <div className="space-y-2 text-xs">
                                  <div className="bg-slate-50 border p-4 rounded-md space-y-3">
                                    <div>
                                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">1. Physical Premises Context</span>
                                      <p className="text-slate-800 leading-relaxed font-sans">{prob.scenario}</p>
                                    </div>

                                    <div>
                                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">2. Rigorous Algebraic Constraints Matrix</span>
                                      <ul className="list-disc pl-4 space-y-1 text-slate-700 font-mono text-[11px] mt-1">
                                        {prob.constraints.map((constraint, conIdx) => (
                                          <li key={conIdx}>{constraint}</li>
                                        ))}
                                      </ul>
                                    </div>

                                    <div className="border-t border-slate-200 pt-3">
                                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-0.5">3. Quantitative Synthesis Query</span>
                                      <p className="text-slate-900 leading-relaxed font-bold font-mono text-xs">{prob.problemText}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-[9.5px] font-mono font-bold text-slate-450 uppercase uppercase">
                                    <span>Interactive Synthesis workspace</span>
                                  </div>
                                  
                                  <textarea 
                                    placeholder="Execute your mathematical transformations. Establish formulas, verify system bounds, and deduce precise calculations step-by-step..."
                                    value={answers[probKey]?.scratchpad || ''}
                                    onChange={(e) => handleScratchpadChange(probKey, e.target.value)}
                                    className="w-full text-xs font-mono bg-slate-900 text-slate-100 p-3.5 rounded focus:outline-none min-h-[100px] leading-relaxed resize-y border border-slate-750 placeholder:text-slate-600 shadow-inner"
                                  />

                                  {evalResult && (
                                    <div className={`p-4 border rounded text-xs leading-relaxed space-y-2 ${evalResult.isCorrect ? 'bg-green-50/70 border-green-300 text-green-800' : 'bg-amber-50/70 border-amber-300 text-amber-800'}`}>
                                      <div className="flex items-center gap-1.5 font-bold uppercase text-[10px]">
                                        {evalResult.isCorrect ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                                        {evalResult.isCorrect ? 'SYNTHESIS VERIFIED SUCCESSFULLY' : 'INCOMPLETE EQUILIBRIUM IN PROOF'}
                                      </div>
                                      <p>{evalResult.feedback}</p>
                                    </div>
                                  )}

                                  <div className="flex justify-end pt-1">
                                    <button 
                                      onClick={() => handleSocraticVerify(activeLevel, 3, prob.id, `${prob.scenario} Constraints: ${prob.constraints.join(', ')} Question: ${prob.problemText}`)}
                                      disabled={verifyingProblemKey === probKey}
                                      className={`px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-[10px] font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition disabled:bg-slate-400`}
                                    >
                                      {verifyingProblemKey === probKey ? (
                                        <>
                                          <RefreshCw size={12} className="animate-spin" /> Evaluating Synthesis...
                                        </>
                                      ) : (
                                        <>
                                          <Sparkles size={12} /> Socratic Synthesis Review
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>

                              </div>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

              </div>
            ) : (
              <div className="text-center p-12 max-w-lg mx-auto my-auto space-y-4">
                <BookOpen size={48} className="mx-auto text-slate-400" />
                <h4 className="text-lg font-serif italic text-slate-900">No Curriculum Document Selected</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Start by uploading a messy textbook chapter PDF or draft text to trigger our Axiom-to-Application parsing engine.
                </p>
                <button 
                  onClick={() => setIsCreating(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider px-5 py-2 rounded shadow-sm"
                >
                  Dismantle a Chapter Now
                </button>
              </div>
            )}

          </div>

          {/* Footer Controls */}
          <footer className="h-20 bg-slate-100 border-t border-slate-300 flex items-center justify-between px-6 shrink-0 shadow-inner z-10">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter font-mono">Deduction Method</span>
                <span className="text-xs font-bold text-slate-900">Axiomatic-Linear v5</span>
              </div>
              <div className="flex flex-col border-l border-slate-300 pl-6">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter font-mono">Current Logic Level</span>
                <span className="text-xs font-bold text-slate-900">{isCreating ? 'ENGINE_FORM_SETUP' : selectedCurriculum ? `L${activeLevel?.levelNumber || 1} COMPASSIONATE` : 'NULL_STATE'}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSelectedCurriculum(sampleCurriculums[0]);
                  setSelectedLevelIdx(0);
                  setSelectedTab('phase1');
                  setIsCreating(false);
                }}
                className="px-4 py-2 border border-slate-400 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-widest rounded hover:bg-slate-200 transition"
              >
                Sync Original Sample
              </button>
            </div>
          </footer>
        </main>

      </div>
    </div>
  );
}
