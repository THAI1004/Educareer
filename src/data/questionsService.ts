import rawQuestions from './extractedQuestions.json';
import type { AssessmentQuestion, QuestionTier } from '../types/career.ts';

export const QUESTIONS_BY_TIER: Record<QuestionTier, {
  holland: AssessmentQuestion[];
  disc: AssessmentQuestion[];
  all: AssessmentQuestion[];
}> = {
  20: {
    holland: rawQuestions['20'].holland as AssessmentQuestion[],
    disc: rawQuestions['20'].disc as AssessmentQuestion[],
    all: [...rawQuestions['20'].holland, ...rawQuestions['20'].disc] as AssessmentQuestion[]
  },
  50: {
    holland: rawQuestions['50'].holland as AssessmentQuestion[],
    disc: rawQuestions['50'].disc as AssessmentQuestion[],
    all: [...rawQuestions['50'].holland, ...rawQuestions['50'].disc] as AssessmentQuestion[]
  },
  70: {
    holland: rawQuestions['70'].holland as AssessmentQuestion[],
    disc: rawQuestions['70'].disc as AssessmentQuestion[],
    all: [...rawQuestions['70'].holland, ...rawQuestions['70'].disc] as AssessmentQuestion[]
  }
};

// Default fallback to 20-tier questions
export const ASSESSMENT_QUESTIONS = QUESTIONS_BY_TIER[20].all;
export const HOLLAND_QUESTIONS = QUESTIONS_BY_TIER[20].holland;
export const DISC_QUESTIONS = QUESTIONS_BY_TIER[20].disc;
