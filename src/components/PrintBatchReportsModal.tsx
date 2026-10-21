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
    const printableArea = document.getElementById('printable-batch-area');
    if (!printableArea) {
      window.print();
      return;
    }

    let iframe = document.getElementById('batch-print-iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'batch-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);
    }

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Phiếu Báo Cáo Định Hướng Ngành Nghề & Đại Học</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 10mm 12mm 10mm 12mm;
            }
            body {
              font-family: 'Quicksand', system-ui, -apple-system, sans-serif !important;
              color: #0f172a !important;
              background: #ffffff !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .page-break {
              page-break-after: always !important;
              break-after: page !important;
            }
            table, tr, td, th {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          </style>
        </head>
        <body class="p-2">
          ${printableArea.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 450);
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
        <div id="printable-batch-area" className="p-4 sm:p-6 overflow-y-auto space-y-6 bg-white print:p-0 print:space-y-0">
          {results.map((res, idx) => (
            <div
              key={res.id || idx}
              className="p-5 border border-slate-200 rounded-2xl bg-white shadow-xs print:border-none print:shadow-none print:p-0 page-break text-[11px] leading-snug"
            >
              {/* Header Certificate Style */}
              <div className="border-b-2 border-orange-500 pb-2 mb-2.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-black text-lg text-slate-900 tracking-tight">
                      Career Compass
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-900">
                      THPT Quốc Gia
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-500 mt-0.5">Hiểu mình hôm nay – Vững bước ngày mai.</p>
                  <h4 className="text-xs font-bold text-slate-700 mt-0.5 uppercase">
                    PHIẾU KẾT QUẢ ĐÁNH GIÁ ĐỊNH HƯỚNG NGHỀ NGHIỆP & CHỌN NGÀNH
                  </h4>
                </div>
                <div className="text-right text-[10px] text-slate-500 font-mono">
                  <p>Mã kết quả: <strong>#{res.id?.slice(0, 8)}</strong></p>
                  <p>Ngày đánh giá: {new Date(res.testDate).toLocaleDateString('vi-VN')}</p>
                </div>
              </div>

              {/* Student Info Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 bg-slate-50 rounded-xl mb-2.5 text-[10.5px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Học sinh:</span>
                  <strong className="text-slate-900 font-bold">{res.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Email tài khoản:</span>
                  <strong className="text-slate-800">{res.userEmail || 'Chưa liên kết'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Trường THPT:</span>
                  <strong className="text-slate-800">{res.school || 'Trường THPT'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Bộ mốc câu hỏi:</span>
                  <strong className="text-orange-600 font-bold">{res.tier || 20} câu</strong>
                </div>
              </div>

              {/* Core Personality & Holland Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-2.5 text-[10.5px]">
                <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/50">
                  <div className="flex items-center gap-1.5 mb-1 font-bold text-amber-900">
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                    <span>XU HƯỚNG HOLLAND: NHÓM {res.primaryHolland}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[10px]">
                    Điểm số nổi trội phản ánh năng lực tự nhiên và động lực gắn bó lâu dài của học sinh.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/50">
                  <div className="flex items-center gap-1.5 mb-1 font-bold text-sky-900">
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                    <span>PHONG CÁCH DISC: {res.primaryDisc} - {res.secondaryDisc}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-[10px] line-clamp-2">
                    {res.analysis?.summary || 'Phong cách hành vi làm việc, ra quyết định và cách tương tác.'}
                  </p>
                </div>
              </div>

              {/* Majors Comparison */}
              <div className="p-2.5 bg-orange-50/70 border border-orange-200 rounded-xl mb-2.5 text-[10.5px]">
                <div className="font-bold text-orange-900 mb-1.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-orange-600" />
                  <span>KẾT QUẢ ĐỐI CHIẾU NGÀNH HỌC ĐẠI HỌC</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 bg-white rounded-lg border border-orange-100">
                    <span className="text-slate-400 block text-[9.5px]">Nguyện vọng ban đầu:</span>
                    <strong className="text-slate-800 font-bold">
                      {res.initialMajorName || 'Chưa chọn'}
                    </strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-300">
                    <span className="text-emerald-600 font-bold block text-[9.5px]">
                      ✓ Ngành tư vấn sau trắc nghiệm:
                    </span>
                    <strong className="text-emerald-900 font-bold">
                      {res.finalMajorName || 'Phù hợp đa ngành'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Recommended Careers */}
              {res.recommendedCareers && res.recommendedCareers.length > 0 && (
                <div className="mb-2">
                  <h5 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Top nghề nghiệp và ngành đào tạo gợi ý:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px]">
                    {res.recommendedCareers.slice(0, 2).map((c, cIdx) => (
                      <div key={cIdx} className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <strong className="text-slate-900 block font-bold">{c.jobTitle}</strong>
                        <span className="text-slate-500 text-[9.5px]">
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
                  <div className="p-2 bg-emerald-50/70 border border-emerald-300 rounded-xl break-inside-avoid flex items-center justify-between text-[10.5px]">
                    <span className="font-black text-emerald-950 flex items-center gap-1.5 uppercase text-[10px]">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                      Tổ hợp xét tuyển ĐH mục tiêu:
                    </span>
                    <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300 font-mono text-[10px]">
                      {g10.primaryPlan.code} ({g10.primaryPlan.name})
                    </span>
                  </div>
                );
              })()}

              {/* Signature Footer */}
              <div className="mt-4 pt-2.5 border-t border-slate-200 flex justify-between text-[10px] text-slate-500 break-inside-avoid">
                <div className="text-center">
                  <p>Học sinh ký tên</p>
                  <p className="mt-5 font-semibold text-slate-700">{res.studentName}</p>
                </div>
                <div className="text-center">
                  <p>Chuyên viên tư vấn / Nhà trường</p>
                  <p className="mt-5 font-semibold text-slate-700">Career Compass</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
