import React from 'react';
import { X, Printer, Compass, BookOpen, CheckCircle2 } from 'lucide-react';
import type { EvaluationResult } from '../types/career.ts';
import { DISC_TRAITS_INFO } from '../data/careerMatrix.ts';
import { getGrade10Recommendations } from '../utils/grade10Recommendations.ts';

interface PrintReportModalProps {
  result: EvaluationResult | null;
  onClose: () => void;
  autoPrint?: boolean;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ result, onClose, autoPrint }) => {
  if (!result) return null;

  React.useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => {
        handlePrint();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const handlePrint = () => {
    const reportElem = document.getElementById('printable-career-report');
    if (!reportElem) {
      window.print();
      return;
    }

    // Tạo một iframe ẩn chuyên dụng để in
    let iframe = document.getElementById('print-iframe') as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'print-iframe';
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
          <title>Phiếu Tư Vấn Định Hướng Ngành Nghề & Đại Học</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap" rel="stylesheet">
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            @page {
              size: A4 portrait;
              margin: 6mm 10mm 6mm 10mm;
            }
            html, body {
              font-family: 'Quicksand', system-ui, -apple-system, sans-serif !important;
              color: #0f172a !important;
              background: #ffffff !important;
              margin: 0 !important;
              padding: 0 !important;
              height: 100% !important;
              overflow: hidden !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              box-sizing: border-box !important;
            }
            table, tr, td, th {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          </style>
        </head>
        <body class="p-0">
          ${reportElem.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 400);
  };

  const discKey = (result.primaryDisc || 'D') as keyof typeof DISC_TRAITS_INFO;
  const discInfo = DISC_TRAITS_INFO[discKey] || DISC_TRAITS_INFO['D'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50 duration-200">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
        {/* Controls - Hidden when printing */}
        <div className="no-print p-3 sm:p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-800 text-xs sm:text-sm">
              Phiếu Đánh Giá & Tư Vấn Hướng Nghiệp (Chuẩn 1 trang A4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Phiếu Ngay (1 Trang A4)</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body - Tightened for 1 page A4 */}
        <div id="printable-career-report" className="p-4 sm:p-6 overflow-y-auto bg-white text-slate-900 text-[11px] leading-snug">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-2 mb-2.5">
            <div>
              <div className="flex items-center gap-1.5 text-sky-700 mb-0.5">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Career Compass</span>
              </div>
              <p className="text-[9px] text-slate-500 mb-0.5">Hiểu mình hôm nay – Vững bước ngày mai.</p>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight uppercase leading-tight">
                Phiếu Tư Vấn Định Hướng Ngành Nghề & Đại Học
              </h1>
              <p className="text-[10px] text-slate-500">
                Phân tích hành vi DISC và trắc nghiệm xu hướng nghề nghiệp Holland RIASEC
              </p>
            </div>

            <div className="text-right text-[10px] text-slate-500 font-mono">
              <p>Mã hồ sơ: #{result.id ? result.id.slice(0, 8) : '00000000'}</p>
              <p>Ngày đánh giá: {result.testDate ? new Date(result.testDate).toLocaleDateString('vi-VN') : 'Hôm nay'}</p>
            </div>
          </div>

          {/* Student & Major Information */}
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 mb-2.5 text-[11px]">
            <div>
              <p className="text-slate-500 text-[10px]">Họ tên sinh viên / học sinh:</p>
              <p className="font-bold text-slate-900 text-xs">{result.studentName || 'Học sinh THPT'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Ngành học ban đầu quan tâm:</p>
              <p className="font-bold text-sky-800 text-xs">{result.initialMajorName || 'Chưa chọn'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Chuyên ngành sau đánh giá:</p>
              <p className="font-bold text-emerald-700 text-xs">{result.finalMajorName || result.initialMajorName || 'Phù hợp đa ngành'}</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px]">Nhóm định hướng chính:</p>
              <p className="font-bold text-slate-900 text-xs">
                {result.primaryDisc || 'D'} - {discInfo?.name || 'Quyết đoán'} • Holland: {result.primaryHolland || 'R'}
              </p>
            </div>
          </div>

          {/* DISC Breakdown */}
          <div className="mb-2.5">
            <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
              1. Tỷ Lệ Điểm Số Hành Vi DISC
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {(['D', 'I', 'S', 'C'] as const).map((trait) => {
                const info = DISC_TRAITS_INFO[trait];
                return (
                  <div key={trait} className="py-1 px-2 rounded border border-slate-200 text-center">
                    <span className="text-[10px] font-bold text-slate-700 block">{info.name}</span>
                    <span className="text-base font-black font-mono block" style={{ color: info.color }}>
                      {result.discPercentages?.[trait] ?? 25}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personality Insight & Strengths */}
          <div className="mb-2.5">
            <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
              2. Đánh Giá Phong Cách Làm Việc & Điểm Mạnh
            </h3>
            <div className="p-2 rounded-lg border border-slate-200 text-[10.5px] leading-relaxed space-y-1">
              <p>
                <strong>Nhóm tính cách nổi trội:</strong> {result.analysis?.title || 'Định hướng THPT'} - &ldquo;{result.analysis?.tagline || ''}&rdquo;
              </p>
              <p className="text-slate-700 line-clamp-2">{result.analysis?.summary || ''}</p>
              <div>
                <strong>Điểm mạnh cốt lõi:</strong> {(result.analysis?.strengths || []).slice(0, 3).join(' • ')}
              </div>
            </div>
          </div>

          {/* Suggested Careers Table */}
          <div className="mb-2.5">
            <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider mb-1">
              3. Danh Sách Nghề Nghiệp & Ngành Đào Tạo Đại Học Gợi Ý
            </h3>
            <table className="w-full text-left border-collapse text-[10px]">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <th className="py-1 px-1.5">Vị Trí Nghề Nghiệp</th>
                  <th className="py-1 px-1.5">Ngành Đào Tạo Đại Học</th>
                  <th className="py-1 px-1.5">Mã Ngành</th>
                  <th className="py-1 px-1.5">Tổ Hợp Xét Tuyển</th>
                  <th className="py-1 px-1.5">Thu Nhập Ước Tính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(result.recommendedCareers || []).slice(0, 3).map((c) => (
                  <tr key={c.id}>
                    <td className="py-0.5 px-1.5 font-bold text-slate-900">{c.jobTitle}</td>
                    <td className="py-0.5 px-1.5 text-slate-800">{c.universityMajor}</td>
                    <td className="py-0.5 px-1.5 font-mono">{c.majorCode}</td>
                    <td className="py-0.5 px-1.5 font-mono font-bold text-emerald-700">
                      {c.admissionCombinations ? c.admissionCombinations.join(', ') : 'A00, A01'}
                    </td>
                    <td className="py-0.5 px-1.5">{c.averageSalaryRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 4. Grade 10 Subject Recommendations for High School */}
          {(() => {
            const g10 = getGrade10Recommendations(
              result.primaryHolland || 'R',
              result.primaryDisc || 'D',
              result.recommendedCareers || [],
              result.finalMajorName || result.initialMajorName
            );
            return (
              <div className="mb-2 p-2 rounded-lg border border-emerald-300 bg-emerald-50/50 break-inside-avoid">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[10.5px] font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>4. Gợi Ý Phương Án Tổ Hợp Môn Học Lớp 10 THPT Phù Hợp Nhất</span>
                  </h3>
                  <span className="text-[9px] font-bold text-emerald-800 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                    Định hướng GDPT 2018
                  </span>
                </div>

                <div className="bg-white p-2 rounded border border-emerald-300 flex items-center justify-between text-[10.5px]">
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white block w-fit">
                    {g10.primaryPlan.priorityLabel}
                  </span>
                  <span className="font-black text-emerald-950 font-mono">
                    Tổ hợp xét tuyển ĐH mục tiêu: {g10.primaryPlan.code} ({g10.primaryPlan.name})
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-4 pt-2.5 mt-2 border-t border-slate-300 text-center text-[10px] break-inside-avoid">
            <div>
              <p className="font-bold text-slate-700 mb-6">SINH VIÊN XÁC NHẬN</p>
              <p className="font-semibold text-slate-900">{result.studentName || '(Ký và ghi rõ họ tên)'}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 mb-6">CHUYÊN VIÊN TƯ VẤN HƯỚNG NGHIỆP</p>
              <p className="font-semibold text-slate-900">Ban Tư Vấn Tuyển Sinh & Đào Tạo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
