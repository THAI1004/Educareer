import React from 'react';
import { BookOpen, CheckCircle2, Compass, Sparkles, HelpCircle, Layers, GraduationCap } from 'lucide-react';
import type { HollandCode, DISCCode, CareerMatrixItem } from '../types/career.ts';
import { getGrade10Recommendations } from '../utils/grade10Recommendations.ts';

interface Grade10SubjectCombinationCardProps {
  primaryHolland: HollandCode;
  primaryDisc: DISCCode;
  recommendedCareers: CareerMatrixItem[];
  studentName?: string;
  selectedMajorName?: string;
}

export const Grade10SubjectCombinationCard: React.FC<Grade10SubjectCombinationCardProps> = ({
  primaryHolland,
  primaryDisc,
  recommendedCareers,
  studentName,
  selectedMajorName
}) => {
  const recommendations = getGrade10Recommendations(primaryHolland, primaryDisc, recommendedCareers, selectedMajorName);
  const { primaryPlan, secondaryPlan, alternativePlan, compulsorySubjectsNote, advisoryNote } = recommendations;

  return (
    <>
    </>
  );
};
