import React, { useState } from 'react';
import {
  History,
  Calendar,
  User,
  Trash2,
  Eye,
  FileText,
  Sparkles,
  ArrowRight,
  PlusCircle,
  GraduationCap
} from 'lucide-react';
import type { EvaluationResult } from '../types/career.ts';
import { DISC_TRAITS_INFO } from '../data/careerMatrix.ts';

interface HistoryViewProps {
  history: EvaluationResult[];
  onSelectResult: (result: EvaluationResult) => void;
  onDeleteResult: (id: string) => void;
  onClearAllHistory: () => void;
  onStartNewTest: () => void;
  onLoadSampleHistory: () => void;
  onPrintResult: (result: EvaluationResult) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectResult,
  onDeleteResult,
  onClearAllHistory,
  onStartNewTest,
  onLoadSampleHistory,
  onPrintResult
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter((item) => {
    if (!item) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (item.studentName && item.studentName.toLowerCase().includes(q)) ||
      (item.initialMajorName && item.initialMajorName.toLowerCase().includes(q)) ||
      (item.finalMajorName && item.finalMajorName.toLowerCase().includes(q)) ||
      (item.primaryDisc && item.primaryDisc.toLowerCase().includes(q)) ||
      (item.analysis?.title && item.analysis.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900">
                Lịch Sử Các Lần Kiểm Tra
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Theo dõi kết quả đánh giá hành vi và các chuyên ngành đã lựa chọn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onStartNewTest}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Làm Bài Test Mới</span>
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearAllHistory}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors cursor-pointer"
                title="Xóa toàn bộ lịch sử lưu trữ"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Xóa tất cả</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar & Sample Data Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-4">
          <div className="w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên sinh viên, ngành học, nhóm..."
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            />
          </div>

          {history.length === 0 && (
            <button
              type="button"
              onClick={onLoadSampleHistory}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Nạp 3 Kết Quả Mẫu Thử Nghiệm</span>
            </button>
          )}
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <History className="w-10 h-10 text-slate-300 mx-auto mb-2.5" />
            <h4 className="text-sm font-bold text-slate-700">Chưa có bản ghi lịch sử kiểm tra</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
              Sinh viên hoàn thành bài trắc nghiệm hành vi để tự động lưu kết quả phân tích tại đây.
            </p>
            <div className="flex items-center justify-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={onStartNewTest}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-xs hover:bg-sky-700 transition-colors shadow-xs"
              >
                Bắt đầu làm bài test
              </button>
              <button
                type="button"
                onClick={onLoadSampleHistory}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Tải dữ liệu mẫu
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item, index) => {
              const discKey = (item.primaryDisc || 'D') as keyof typeof DISC_TRAITS_INFO;
              const discInfo = DISC_TRAITS_INFO[discKey] || DISC_TRAITS_INFO['D'];

              return (
                <div
                  key={item.id || index}
                  className="bg-white rounded-xl border border-slate-200 hover:border-sky-300 p-4 shadow-2xs hover:shadow-xs transition-all duration-150 flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
                >
                  {/* Left: Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                        #{index + 1}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.testDate ? new Date(item.testDate).toLocaleDateString('vi-VN') : 'Gần đây'}
                      </span>
                      {item.studentName && (
                        <span className="text-xs font-bold text-slate-800 flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                          <User className="w-3.5 h-3.5 text-sky-600" />
                          {item.studentName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-heading font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {item.analysis?.title || 'Báo Cáo Đánh Giá'}
                      </h4>
                      <span
                        className="px-2 py-0.2 rounded text-xs font-bold text-white shadow-2xs"
                        style={{ backgroundColor: discInfo?.color || '#ef4444' }}
                      >
                        Nhóm {item.primaryDisc || 'D'}
                      </span>
                      <span className="px-2 py-0.2 rounded text-xs font-semibold bg-orange-50 text-orange-800 border border-orange-200">
                        Holland {item.primaryHolland || 'R'}
                      </span>
                    </div>

                    {/* Majors: Initial vs Revised */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 flex-wrap">
                      <span className="flex items-center gap-1 font-medium">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        Ngành ban đầu: <strong>{item.initialMajorName}</strong>
                      </span>
                      {item.finalMajorName && item.finalMajorName !== item.initialMajorName && (
                        <>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                            Chuyên ngành sau đánh giá: {item.finalMajorName}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Mini DISC Percentages bar */}
                    <div className="flex items-center gap-3 pt-0.5">
                      {(['D', 'I', 'S', 'C'] as const).map((trait) => (
                        <div key={trait} className="flex items-center gap-1 text-[11px] font-mono">
                          <span className="font-bold text-slate-500">{trait}:</span>
                          <span className="font-extrabold text-slate-800">
                            {item.discPercentages?.[trait] ?? (trait === 'D' ? 25 : trait === 'I' ? 25 : trait === 'S' ? 25 : 25)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <button
                      type="button"
                      onClick={() => onSelectResult(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-600 hover:text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem lại</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPrintResult(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                      title="In phiếu kết quả hướng nghiệp"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-500" />
                      <span>In phiếu</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteResult(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Xóa kết quả này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
