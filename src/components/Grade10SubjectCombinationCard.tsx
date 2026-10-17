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

      {/* Primary Plan - Highlighted (Phương án 1 - Ưu tiên số 1) */}
      <div className="bg-emerald-50/70 border-2 border-emerald-500/80 rounded-2xl p-5 sm:p-6 shadow-sm relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs tracking-wider uppercase shadow-xs">
            <CheckCircle2 className="w-4 h-4" />
            {primaryPlan.priorityLabel}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Tổ hợp xét tuyển ĐH mục tiêu:</span>
            <span className="text-base sm:text-lg font-black font-mono text-emerald-800 bg-white px-3 py-1 rounded-xl border border-emerald-300 shadow-2xs">
              {primaryPlan.code} ({primaryPlan.name})
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium mb-4 leading-relaxed">
          {primaryPlan.description}. Khuyên dùng cho học sinh có thế mạnh tư duy logic kỹ thuật và mong muốn xét tuyển vào các trường đại học nhóm ngành kỹ thuật hàng đầu.
        </p>

        {/* 4 môn học lựa chọn lớp 10 */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wide">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>4 Môn Lựa Chọn Đăng Ký Vào Lớp 10 Khuyên Dùng:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {primaryPlan.fourSelectiveSubjects.map((subject, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs font-bold text-emerald-900"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shrink-0">
                  {idx + 1}
                </div>
                <span>{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Advisory Footer Note */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 space-y-1">
        <p className="font-semibold flex items-center gap-1.5 text-amber-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Ghi chú cho học sinh lớp 9 lên lớp 10:</span>
        </p>
        <p className="text-slate-600 leading-relaxed pl-5">
          {compulsorySubjectsNote} {advisoryNote}
        </p>
      </div>
    </div>
  );
};
