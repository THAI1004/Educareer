import React from 'react';
import {
  X,
  GraduationCap,
  Building2,
  CheckCircle2,
  TrendingUp,
  FileBadge
} from 'lucide-react';
import type { CareerMatrixItem } from '../types/career.ts';
import { DISC_TRAITS_INFO } from '../data/careerMatrix.ts';

interface CareerDetailModalProps {
  career: CareerMatrixItem | null;
  onClose: () => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose
}) => {
  if (!career) return null;

  const discInfo = DISC_TRAITS_INFO[career.disc];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
                {career.hollandLabel}
              </span>
              <span
                className="px-2 py-0.5 rounded text-xs font-bold text-white shadow-2xs"
                style={{ backgroundColor: discInfo.color }}
              >
                {career.discLabel}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
              {career.jobTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Vị trí việc làm định hướng kỹ thuật theo hành vi
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Major & Admission Combo Box */}
          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800 uppercase tracking-wider mb-1.5">
              <GraduationCap className="w-4 h-4 text-sky-600" />
              <span>Ngành Đào Tạo Đại Học Tương Ứng</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-sm sm:text-base font-extrabold text-slate-900">
                  {career.universityMajor}
                </span>
                <span className="ml-2 text-xs font-mono font-bold px-2 py-0.5 rounded bg-white text-sky-800 border border-sky-200">
                  Mã ngành: {career.majorCode}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-xs text-slate-500">Tổ hợp:</span>
                {career.admissionCombinations.map((combo) => (
                  <span
                    key={combo}
                    className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-800 font-mono font-bold border border-orange-200"
                  >
                    {combo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Mô Tả Vai Trò & Nhiệm Vụ
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {career.description}
            </p>
          </div>

          {/* Key Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileBadge className="w-4 h-4 text-sky-600" />
              Kỹ Năng & Năng Lực Cần Tích Lũy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {career.keySkills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta: Salary & Growth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block mb-0.5">Mức thu nhập ước tính:</span>
              <span className="text-xs sm:text-sm font-bold text-emerald-600">
                {career.averageSalaryRange}
              </span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 bg-white">
              <span className="text-xs text-slate-500 block mb-0.5">Tiềm năng tăng trưởng:</span>
              <span className="text-xs sm:text-sm font-bold text-sky-700 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                {career.growthPotential}
              </span>
            </div>
          </div>

          {/* Top Universities in Vietnam */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-500" />
              Các Trường Đại Học Đào Tạo Tiêu Biểu Tại Việt Nam
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {career.topUniversities.map((uni, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium"
                >
                  {uni}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng cửa sổ
          </button>
        </div>
      </div>
    </div>
  );
};
