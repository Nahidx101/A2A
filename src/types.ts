/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Scaffolding {
  type: "coordinate_table" | "numerical_sequence" | "verbal_description";
  title: string;
  content: string; // e.g. markdown table, steps, or description
}

export interface AtomicConcept {
  id: string;
  conceptName: string;
  socraticQuestion: string;
  honestReasoning: string[]; // steps of deduction, including false leads & corrections
  formalDefinition: string;
  scaffolding: Scaffolding[];
}

export interface AxiomaticBridge {
  previousLevelConclusion: string;
  limitationOrEdgeCase: string;
  logicalInevitabilityOfNewConcept: string;
}

export interface Phase1Data {
  atomicConcepts: AtomicConcept[];
}

export interface Phase2Problem {
  id: number;
  problemText: string;
  logicalCore: string; // What abstract math system or structure it represents
}

export interface Phase3Problem {
  id: number;
  scenario: string; // 1-sentence physical premise for non-experts
  constraints: string[]; // deep constraints / dependencies
  problemText: string; // specific math question / scenario inquiry
}

export interface A2ALevel {
  levelNumber: number;
  levelName: string;
  axiomaticBridge?: AxiomaticBridge;
  phase1: Phase1Data;
  phase2: {
    problems: Phase2Problem[];
  };
  phase3: {
    problems: Phase3Problem[];
  };
}

export interface A2ACurriculum {
  id: string;
  chapterTitle: string;
  originalOverview: string;
  levels: A2ALevel[];
  isCustom?: boolean;
}

export interface UserAnswerStore {
  [problemKey: string]: {
    scratchpad: string;
    isSubmitted?: boolean;
    verificationResult?: {
      isCorrect: boolean;
      feedback: string;
    };
  };
}
