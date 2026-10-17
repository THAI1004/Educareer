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
  const recommendations = getGrade10Recommendations(primaryHolland, primaryDisc, recommendedCareers);
  const { primaryPlan, secondaryPlan, alternativePlan, compulsorySubjectsNote, advisoryNote } = recommendations;

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-md shadow-emerald-500/5 p-6 sm:p-8 space-y-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />

      {/* Header matching user's design */}
      <div className="relative z-10 space-y-3 pb-4 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>TRỌNG TÂM ĐỀ TÀI: LỰA CHỌN TỔ HỢP MÔN HỌC THPT THEO ĐỊNH HƯỚNG TUYỂN SINH 2026+</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30 shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-heading font-black text-slate-900 tracking-tight">
                Gợi Ý Phương Án Tổ Hợp Môn Học Lớp 10 THPT Phù Hợp Nhất
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Căn cứ trên kết quả trắc nghiệm hành vi DISC & xu hướng RIASEC kết hợp ngành học mục tiêu{' '}
                {selectedMajorName && <strong className="text-emerald-700">({selectedMajorName})</strong>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 self-start md:self-center">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Chương trình GDPT 2018</span>
          </div>
        </div>
      </div>

      {/* Target Combination Bar */}
      <div className="bg-emerald-50/70 border-2 border-emerald-500/80 rounded-2xl p-5 sm:p-6 shadow-sm relative flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm sm:text-base text-slate-700 font-bold">
          Tổ hợp xét tuyển ĐH mục tiêu:
        </span>
        <span className="text-base sm:text-lg font-black font-mono text-emerald-800 bg-white px-5 py-2 rounded-2xl border-2 border-emerald-400 shadow-sm">
          {primaryPlan.code} ({primaryPlan.name})
        </span>
      </div>
    </div>
  );
};
