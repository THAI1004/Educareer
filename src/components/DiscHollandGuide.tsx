import React from 'react';
import { BookOpen } from 'lucide-react';
import { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from '../data/careerMatrix.ts';
import type { DISCCode, HollandCode } from '../types/career.ts';

export const DiscHollandGuide: React.FC = () => {
  const discKeys: DISCCode[] = ['D', 'I', 'S', 'C'];
  const hollandKeys: HollandCode[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
              Cẩm Nang Phương Pháp Luận: DISC & Holland
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cơ sở khoa học giúp định hướng ngành nghề và môi trường làm việc phù hợp
            </p>
          </div>
        </div>

        {/* Section 1: DISC */}
        <div className="my-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-5 bg-sky-600 rounded-full inline-block" />
            <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
              1. Mô Hình 4 Nhóm Tính Cách & Hành Vi DISC
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Mô hình DISC được phát triển bởi tiến sĩ tâm lý học William Moulton Marston (Đại học Harvard).
            Đây là công cụ tiêu chuẩn toàn cầu hỗ trợ nhận diện phong cách làm việc và ứng xử:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {discKeys.map((key) => {
              const info = DISC_TRAITS_INFO[key];
              return (
                <div
                  key={key}
                  className="p-4 rounded-xl border transition-all"
                  style={{
                    backgroundColor: info.bgLight,
                    borderColor: info.borderColor
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-xs font-bold text-white px-2.5 py-0.5 rounded-md shadow-2xs"
                      style={{ backgroundColor: info.color }}
                    >
                      {info.name}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500">
                      {info.fullName}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                    {info.characteristics}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-600">Từ khóa:</span>
                    {info.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-1.5 py-0.2 rounded bg-white text-slate-800 font-medium border border-slate-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Holland */}
        <div className="pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-5 bg-orange-500 rounded-full inline-block" />
            <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900">
              2. Mô Hình Định Hướng Nghề Nghiệp Holland (RIASEC)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Thuyết hướng nghiệp của John Holland chia sở thích và môi trường nghề nghiệp thành 6 nhóm,
            trong đó nhóm <strong>R – Realistic (Kỹ thuật - Thực tế)</strong> là trọng tâm:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hollandKeys.map((key) => {
              const hInfo = HOLLAND_TRAITS_INFO[key];
              const isR = key === 'R';

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-xl border ${
                    isR
                      ? 'bg-orange-50/70 border-orange-200 ring-1 ring-orange-300/60'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-extrabold text-xs sm:text-sm text-slate-900">
                      {hInfo.name}
                    </span>
                    {isR && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-500 text-white uppercase">
                        Trọng tâm
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {hInfo.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
