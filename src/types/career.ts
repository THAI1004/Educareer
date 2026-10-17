export type HollandCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
export type DISCCode = 'D' | 'I' | 'S' | 'C';
export type QuestionTier = 20 | 50 | 70;

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  school?: string;
  grade?: string;
  status?: string;
  created_at?: string;
  last_active?: string;
}

export interface CareerMatrixItem {
  id: string;
  holland: HollandCode;
  hollandLabel: string;
  disc: DISCCode;
  discLabel: string;
  jobTitle: string;
  universityMajor: string;
  majorCode: string;
  admissionCombinations: string[];
  description: string;
  keySkills: string[];
  suitableRoles: string[];
  topUniversities: string[];
  averageSalaryRange: string;
  growthPotential: 'Rất cao' | 'Cao' | 'Ổn định';
  image_url?: string;
  imageUrl?: string;
  status?: 'active' | 'inactive';
}

export interface HollandGroup {
  code: HollandCode;
  name: string;
  full_name: string;
  description: string;
  image_url?: string;
  status?: 'active' | 'inactive';
}

export interface DISCGroup {
  code: DISCCode;
  name: string;
  color: string;
  characteristics: string;
  image_url?: string;
  status?: 'active' | 'inactive';
}

export interface UniversityMajor {
  id: string;
  name: string;
  code: string;
  category: string;
  typicalHolland: HollandCode;
  description: string;
  careerOutcomes: string[];
  image_url?: string;
  imageUrl?: string;
  status?: 'active' | 'inactive';
}

export interface QuestionOption {
  id: string;
  label?: string;
  text: string;
  discTrait?: DISCCode;
  hollandTrait?: HollandCode;
  weight: number;
}

export interface AssessmentQuestion {
  id: string | number;
  type: 'DISC' | 'HOLLAND';
  tier?: QuestionTier;
  question_order?: number;
  title: string;
  scenario: string;
  options: QuestionOption[];
  status?: 'active' | 'inactive';
}

export interface TestAnswers {
  [questionId: string]: string; // question id -> option id
}

export interface EvaluationAnalysis {
  title: string;
  codeName: string;
  tagline: string;
  summary: string;
  coreBehavior: string;
  strengths: string[];
  idealWorkEnvironment: string;
  growthAdvice: string[];
  studyTips: string[];
}

export interface EvaluationResult {
  id: string;
  testDate: string;
  studentName: string;
  userEmail?: string;
  school?: string;
  tier?: QuestionTier;
  initialMajorId: string;
  initialMajorName: string;
  finalMajorId: string;
  finalMajorName: string;
  primaryDisc: DISCCode;
  secondaryDisc: DISCCode;
  primaryHolland: HollandCode;
  discScores: Record<DISCCode, number>;
  discPercentages: Record<DISCCode, number>;
  hollandScores: Record<HollandCode, number>;
  analysis: EvaluationAnalysis;
  recommendedCareers: CareerMatrixItem[];
  answers?: TestAnswers;
  notes?: string;
}

export interface TestSessionLive {
  session_id: string;
  user_email: string;
  student_name: string;
  tier: number;
  current_test: string;
  answered_holland: number;
  total_holland: number;
  answered_disc: number;
  total_disc: number;
  status: string;
  started_at: string;
  updated_at: string;
}

export type AssessmentStatus = 'not_started' | 'in_progress' | 'completed';
