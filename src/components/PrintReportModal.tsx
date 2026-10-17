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
            table, tr, td, th {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
          </style>
        </head>
        <body class="p-2">
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
        <div className="no-print p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-800 text-xs sm:text-sm">
              Phiếu Đánh Giá & Tư Vấn Hướng Nghiệp
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In Phiếu Ngay (A4)</span>
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

        {/* Printable Document Body */}
        <div id="printable-career-report" className="p-6 sm:p-10 overflow-y-auto bg-white text-slate-900">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5 mb-5">
            <div>
              <div className="flex items-center gap-1.5 text-sky-700 mb-1">
                <Compass className="w-5 h-5" />
                <span className="text-[11px] font-bold tracking-widest uppercase">EduCareer Guidance Platform</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
                Phiếu Tư Vấn Định Hướng Ngành Nghề & Đại Học
              </h1>
              <p className="text-xs text-slate-500">
                Phân tích hành vi DISC và trắc nghiệm xu hướng nghề nghiệp Holland RIASEC
              </p>
            </div>

            <div className="text-right text-xs text-slate-500 font-mono">
              <p>Mã hồ sơ: #{result.id ? result.id.slice(0, 8) : '00000000'}</p>
              <p>Ngày đánh giá: {result.testDate ? new Date(result.testDate).toLocaleDateString('vi-VN') : 'Hôm nay'}</p>
            </div>
          </div>

          {/* Student & Major Information */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 mb-5 text-xs">
            <div>
              <p className="text-slate-500">Họ tên sinh viên / học sinh:</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">{result.studentName || 'Học sinh THPT'}</p>
            </div>
            <div>
              <p className="text-slate-500">Ngành học ban đầu quan tâm:</p>
              <p className="text-xs sm:text-sm font-bold text-sky-800">{result.initialMajorName || 'Chưa chọn'}</p>
            </div>
            <div>
              <p className="text-slate-500">Chuyên ngành sau đánh giá:</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-700">{result.finalMajorName || result.initialMajorName || 'Phù hợp đa ngành'}</p>
            </div>
            <div>
              <p className="text-slate-500">Nhóm định hướng chính:</p>
              <p className="text-xs sm:text-sm font-bold text-slate-900">
                {result.primaryDisc || 'D'} - {discInfo?.name || 'Quyết đoán'} • Holland: {result.primaryHolland || 'R'}
              </p>
            </div>
          </div>

          {/* DISC Breakdown */}
          <div className="mb-5">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2.5">
              1. Tỷ Lệ Điểm Số Hành Vi DISC
            </h3>
            <div className="grid grid-cols-4 gap-2.5">
              {(['D', 'I', 'S', 'C'] as const).map((trait) => {
                const info = DISC_TRAITS_INFO[trait];
                return (
                  <div key={trait} className="p-2.5 rounded-lg border border-slate-200 text-center">
                    <span className="text-xs font-bold text-slate-700 block">{info.name}</span>
                    <span className="text-lg font-black font-mono mt-0.5 block" style={{ color: info.color }}>
                      {result.discPercentages?.[trait] ?? 25}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personality Insight & Strengths */}
          <div className="mb-5 space-y-2.5">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
              2. Đánh Giá Phong Cách Làm Việc & Điểm Mạnh
            </h3>
            <div className="p-3.5 rounded-xl border border-slate-200 text-xs leading-relaxed space-y-1.5">
              <p>
                <strong>Nhóm tính cách nổi trội:</strong> {result.analysis?.title || 'Định hướng THPT'} - &ldquo;{result.analysis?.tagline || ''}&rdquo;
              </p>
              <p className="text-slate-700">{result.analysis?.summary || ''}</p>
              <div>
                <strong>Điểm mạnh cốt lõi:</strong>
                <ul className="list-disc list-inside mt-1 text-slate-700 space-y-0.5">
                  {(result.analysis?.strengths || []).map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Suggested Careers Table */}
          <div className="mb-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">
              3. Danh Sách Nghề Nghiệp & Ngành Đào Tạo Đại Học Gợi Ý
            </h3>
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <th className="py-1 px-2">Vị Trí Nghề Nghiệp</th>
                  <th className="py-1 px-2">Ngành Đào Tạo Đại Học</th>
                  <th className="py-1 px-2">Mã Ngành</th>
                  <th className="py-1 px-2">Tổ Hợp Xét Tuyển</th>
                  <th className="py-1 px-2">Thu Nhập Ước Tính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {(result.recommendedCareers || []).slice(0, 4).map((c) => (
                  <tr key={c.id}>
                    <td className="py-1 px-2 font-bold text-slate-900">{c.jobTitle}</td>
                    <td className="py-1 px-2 text-slate-800">{c.universityMajor}</td>
                    <td className="py-1 px-2 font-mono">{c.majorCode}</td>
                    <td className="py-1 px-2 font-mono font-bold text-emerald-700">
                      {c.admissionCombinations ? c.admissionCombinations.join(', ') : 'A00, A01'}
                    </td>
                    <td className="py-1 px-2">{c.averageSalaryRange}</td>
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
              <div className="mb-4 p-3 rounded-xl border border-emerald-300 bg-emerald-50/50 break-inside-avoid">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>4. Gợi Ý Phương Án Tổ Hợp Môn Học Lớp 10 THPT Phù Hợp Nhất</span>
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                    Định hướng GDPT 2018
                  </span>
                </div>

                <div className="bg-white p-3 rounded-lg border border-emerald-300 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-600 text-white block w-fit">
                    {g10.primaryPlan.priorityLabel}
                  </span>
                  <span className="text-xs font-black text-emerald-950 font-mono">
                    Tổ hợp xét tuyển ĐH mục tiêu: {g10.primaryPlan.code} ({g10.primaryPlan.name})
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4 mt-3 border-t border-slate-300 text-center text-xs break-inside-avoid">
            <div>
              <p className="font-bold text-slate-700 mb-10">SINH VIÊN XÁC NHẬN</p>
              <p className="font-semibold text-slate-900">{result.studentName || '(Ký và ghi rõ họ tên)'}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700 mb-10">CHUYÊN VIÊN TƯ VẤN HƯỚNG NGHIỆP</p>
              <p className="font-semibold text-slate-900">Ban Tư Vấn Tuyển Sinh & Đào Tạo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
