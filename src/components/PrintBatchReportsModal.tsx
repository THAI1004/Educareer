import React, { useState } from 'react';
import {
  FileText,
  Printer,
  X,
  Award,
  Compass,
  Layers,
  School,
  Sparkles,
  Calendar,
  CheckCircle2,
  Mail,
  User,
  GraduationCap,
  BookOpen
} from 'lucide-react';
import type { EvaluationResult } from '../types/career.ts';
import { getGrade10Recommendations } from '../utils/grade10Recommendations.ts';

interface PrintBatchReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: EvaluationResult[];
}

export const PrintBatchReportsModal: React.FC<PrintBatchReportsModalProps> = ({
  isOpen,
  onClose,
  results
}) => {
  if (!isOpen || results.length === 0) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Control bar */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-slate-900 text-base sm:text-lg">
                In Báo Cáo / Phiếu Kết Quả ({results.length} Học Sinh)
              </h3>
              <p className="text-xs text-slate-500">
                Định dạng chuẩn trang A4 in hàng loạt hoặc từng học sinh
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Ngay (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-12 bg-white print:p-0 print:space-y-8">
          {results.map((res, idx) => (
            <div
              key={res.id || idx}
              className="p-6 border border-slate-200 rounded-3xl bg-white shadow-xs print:border-none print:shadow-none print:p-4 print:break-after-page"
            >
              {/* Header Certificate Style */}
              <div className="border-b-2 border-orange-500 pb-4 mb-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xl text-slate-900 tracking-tight">
                      EduCareer<span className="text-orange-500">.</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-900">
                      THPT Quốc Gia
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 mt-1">
                    PHIẾU KẾT QUẢ ĐÁNH GIÁ ĐỊNH HƯỚNG NGHỀ NGHIỆP & CHỌN NGÀNH
                  </h4>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p>Mã kết quả: <strong>#{res.id?.slice(0, 10)}</strong></p>
                  <p>Ngày đánh giá: {new Date(res.testDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              {/* Student Info Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl mb-5 text-xs">
                <div>
                  <span className="text-slate-400 block">Học sinh:</span>
                  <strong className="text-slate-900 text-sm font-bold">{res.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Email tài khoản:</span>
                  <strong className="text-slate-800">{res.userEmail || 'Chưa liên kết'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Trường THPT:</span>
                  <strong className="text-slate-800">{res.school || 'Trường THPT'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Bộ mốc câu hỏi:</span>
                  <strong className="text-orange-600 font-bold">{res.tier || 20} câu</strong>
                </div>
              </div>

              {/* Core Personality & Holland Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-amber-900">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>XU HƯỚNG HOLLAND: NHÓM {res.primaryHolland}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Điểm số nổi trội phản ánh năng lực tự nhiên và động lực gắn bó lâu dài của học sinh trong các ngành nghề tương ứng.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50">
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-sky-900">
                    <Layers className="w-4 h-4 text-sky-600" />
                    <span>PHONG CÁCH DISC: {res.primaryDisc} - {res.secondaryDisc}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {res.analysis?.summary || 'Phong cách hành vi làm việc, ra quyết định và cách tương tác trong môi trường đại học.'}
                  </p>
                </div>
              </div>

              {/* Majors Comparison */}
              <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-2xl mb-5">
                <div className="text-xs font-bold text-orange-900 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                  <span>KẾT QUẢ ĐỐI CHIẾU NGÀNH HỌC ĐẠI HỌC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-orange-100">
                    <span className="text-slate-400 block mb-0.5">Nguyện vọng ban đầu:</span>
                    <strong className="text-slate-800 text-sm font-bold">
                      {res.initialMajorName || 'Chưa chọn'}
                    </strong>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-emerald-300">
                    <span className="text-emerald-600 font-bold block mb-0.5">
                      ✓ Ngành tư vấn sau trắc nghiệm:
                    </span>
                    <strong className="text-emerald-900 text-sm font-bold">
                      {res.finalMajorName || 'Phù hợp đa ngành'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recommended Careers */}
              {res.recommendedCareers && res.recommendedCareers.length > 0 && (
                <div>
                  <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Top nghề nghiệp và ngành đào tạo gợi ý:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {res.recommendedCareers.slice(0, 4).map((c, cIdx) => (
                      <div key={cIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                        <strong className="text-slate-900 block font-bold">{c.jobTitle}</strong>
                        <span className="text-slate-500 text-[11px]">
                          Ngành: {c.universityMajor} ({c.majorCode})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gợi ý tổ hợp môn lớp 10 THPT */}
              {(() => {
                const g10 = getGrade10Recommendations(
                  res.primaryHolland || 'R',
                  res.primaryDisc || 'D',
                  res.recommendedCareers || []
                );
                return (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-300 rounded-xl break-inside-avoid">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5 uppercase">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                        Gợi ý tổ hợp môn học Lớp 10 THPT:
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {g10.primaryPlan.code} ({g10.primaryPlan.name})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-700 font-medium">
                      <strong>4 Môn lựa chọn gợi ý:</strong> {g10.primaryPlan.fourSelectiveSubjects.join(', ')}
                    </p>
                  </div>
                );
              })()}

              {/* Signature Footer */}
              <div className="mt-8 pt-4 border-t border-slate-200 flex justify-between text-xs text-slate-500">
                <div className="text-center">
                  <p>Học sinh ký tên</p>
                  <p className="mt-8 font-semibold text-slate-700">{res.studentName}</p>
                </div>
                <div className="text-center">
                  <p>Chuyên viên tư vấn / Nhà trường</p>
                  <p className="mt-8 font-semibold text-slate-700">EduCareer Certified</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
