import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  User,
  Compass,
  Sparkles,
  Lock,
  Unlock,
  GraduationCap,
  Layers,
  School
} from 'lucide-react';
import type { AssessmentStatus, EvaluationResult, QuestionTier } from '../types/career.ts';

interface TestStatusCardProps {
  status: AssessmentStatus;
  answeredCount: number;
  totalQuestions: number;
  hollandAnsweredCount: number;
  hollandTotal: number;
  discAnsweredCount: number;
  discTotal: number;
  studentName: string;
  setStudentName: (name: string) => void;
  school?: string;
  setSchool?: (school: string) => void;
  tier: QuestionTier;
  onOpenHollandTest: () => void;
  onOpenDiscTest: () => void;
  onOpenAllTests: () => void;
  onCheckStatus: () => void;
  onResetTest: () => void;
  onQuickFillDemo: () => void;
  evaluationResult: EvaluationResult | null;
  statusCheckFeedback: string | null;
  isLoggedIn: boolean;
  userEmail?: string;
  onRequireLogin: () => void;
  onOpenTierSelection?: () => void;
}

export const TestStatusCard: React.FC<TestStatusCardProps> = ({
  status,
  answeredCount,
  totalQuestions,
  hollandAnsweredCount,
  hollandTotal,
  discAnsweredCount,
  discTotal,
  studentName,
  setStudentName,
  school,
  setSchool,
  tier,
  onOpenHollandTest,
  onOpenDiscTest,
  onOpenAllTests,
  onCheckStatus,
  onResetTest,
  onQuickFillDemo,
  evaluationResult,
  statusCheckFeedback,
  isLoggedIn,
  userEmail,
  onRequireLogin,
  onOpenTierSelection
}) => {
  const isCompleted = status === 'completed';
  const isHollandDone = hollandAnsweredCount >= hollandTotal;
  const isDiscDone = discAnsweredCount >= discTotal;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleStartHolland = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    if (answeredCount === 0 && onOpenTierSelection) {
      onOpenTierSelection();
      return;
    }
    onOpenHollandTest();
  };

  const handleStartDisc = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    onOpenDiscTest();
  };

  const handleStartAll = () => {
    if (!isLoggedIn) {
      onRequireLogin();
      return;
    }
    if (answeredCount === 0 && onOpenTierSelection) {
      onOpenTierSelection();
      return;
    }
    onOpenAllTests();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar: Student Name, THPT Badge & General Progress */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-500">Trạng thái:</span>
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : answeredCount > 0
                ? 'bg-orange-50 text-orange-800 border border-orange-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>ĐÃ HOÀN THÀNH BÀI TEST </span>
              </>
            ) : isHollandDone ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                <span>XONG BÀI 1 • ĐANG LÀM BÀI 2 </span>
              </>
            ) : hollandAnsweredCount > 0 ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-orange-600" />
                <span>ĐANG LÀM BÀI 1 </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>CHƯA LÀM BÀI</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (!isLoggedIn) {
                onRequireLogin();
                return;
              }
              onOpenTierSelection?.();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-all cursor-pointer shadow-2xs"
            title="Bấm để chọn lại mốc số lượng câu hỏi (20 / 50 / 70 câu)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Mốc: {tier} câu</span>
            <span className="text-[10px] text-amber-700 underline font-normal ml-0.5">(Đổi mốc)</span>
          </button>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FF5722] text-white shadow-2xs flex items-center gap-1.5 shrink-0">
            <School className="w-3.5 h-3.5 text-white" />
            <span>{school || 'Học Sinh THPT'}</span>
          </span>
        </div>

        {/* Student Name Input & Login Status Indicator */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* {!isLoggedIn && (
            <button
              onClick={onRequireLogin}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors cursor-pointer"
            >
              🔒 Cần đăng nhập để làm bài
            </button>
          )} */}

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="student-name-input" className="text-xs font-semibold text-slate-600 shrink-0 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Họ tên:
            </label>
            <input
              id="student-name-input"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Nhập họ tên học sinh..."
              className="w-full sm:w-44 px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722] font-medium"
            />
          </div>
        </div>
      </div>

      {/* Sequential rule banner (Commented out to reduce wordiness) */}
      {/*
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 flex items-center gap-3 text-xs text-amber-900">
        <div className="w-6 h-6 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-2xs">
          1→2
        </div>
        <p className="leading-relaxed">
          <strong>Quy tắc tuần tự THPT:</strong> Học sinh cần hoàn thành đủ <strong>Bài Test 1 (Holland {hollandTotal} câu)</strong> trước, sau đó hệ thống sẽ tự động mở khóa <strong>Bài Test 2 (DISC {discTotal} câu)</strong>. Hoàn thành đầy đủ cả 2 bài để mở khóa ma trận ngành đại học và chứng nhận kết quả.
        </p>
      </div>
      */}

      {/* 2 Distinct Test Cards: Holland & DISC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CARD 1: TEST HOLLAND */}
        <div className={`rounded-3xl p-5 flex flex-col justify-between transition-all border-2 ${
          isHollandDone
            ? 'bg-amber-50/40 border-amber-200'
            : 'bg-white border-orange-300 shadow-sm ring-2 ring-orange-100'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-900 border border-orange-200 uppercase tracking-wide">
                BÀI TEST 1 • LÀM TRƯỚC TIÊN
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <span className={isHollandDone ? 'text-emerald-600' : 'text-orange-600'}>
                  {hollandAnsweredCount}
                </span>
                <span className="text-slate-400">/</span>
                <span>{hollandTotal} câu</span>
              </div>
            </div>

            <h4 className="text-base font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              <span>Trắc Nghiệm Sở Thích Holland (RIASEC)</span>
            </h4>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((hollandAnsweredCount / hollandTotal) * 100)}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartHolland}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isHollandDone
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isHollandDone ? 'Làm lại Bài 1 (Holland)' : 'Bắt đầu làm Bài 1 (Holland)'}</span>
          </button>
        </div>

        {/* CARD 2: TEST DISC */}
        <div className={`rounded-3xl p-5 flex flex-col justify-between transition-all border-2 ${
          !isHollandDone
            ? 'bg-slate-50/70 border-slate-200 opacity-80'
            : isDiscDone
            ? 'bg-sky-50/40 border-sky-200'
            : 'bg-white border-sky-300 shadow-sm ring-2 ring-sky-100'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                isHollandDone
                  ? 'bg-sky-100 text-sky-900 border border-sky-200'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                BÀI TEST 2 • MỞ SAU KHI XONG BÀI 1
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <span className={isDiscDone ? 'text-emerald-600' : 'text-sky-600'}>
                  {discAnsweredCount}
                </span>
                <span className="text-slate-400">/</span>
                <span>{discTotal} câu</span>
              </div>
            </div>

            <h4 className="text-base font-bold text-slate-900 font-heading mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              <span>Trắc Nghiệm Hành Vi & Tính Cách DISC</span>
              {!isHollandDone && <Lock className="w-4 h-4 text-slate-400 ml-auto" />}
            </h4>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-sky-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.round((discAnsweredCount / discTotal) * 100)}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleStartDisc}
            disabled={!isHollandDone}
            className={`w-full py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              !isHollandDone
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : isDiscDone
                ? 'bg-sky-100 text-sky-900 hover:bg-sky-200 cursor-pointer'
                : 'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-600/20 cursor-pointer'
            }`}
          >
            {isHollandDone ? (
              <>
                <Unlock className="w-4 h-4" />
                <span>{isDiscDone ? 'Làm lại Bài 2 (DISC)' : 'Bắt đầu làm Bài 2 (DISC)'}</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Đang khóa (Hoàn thành bài 1 trước)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Buttons: Làm tất cả, Điền mẫu, Kiểm tra trạng thái, Reset */}
      <div className="p-4 rounded-3xl bg-slate-50/80 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleStartAll}
            className="px-4 py-2 rounded-2xl bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Mở Bảng Câu Hỏi ({totalQuestions} Câu)</span>
          </button>

          <button
            type="button"
            onClick={onQuickFillDemo}
            className="px-3.5 py-2 rounded-2xl bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border border-slate-200 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>Điền Mẫu Nhanh</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={onResetTest}
              className="px-3 py-2 rounded-2xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm lại từ đầu</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCheckStatus}
            className="px-3.5 py-2 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Kiểm tra trạng thái
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {statusCheckFeedback && (
        <div className="p-3.5 bg-orange-50 border border-orange-200 text-orange-900 rounded-2xl text-xs sm:text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-1">
          <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
          <span>{statusCheckFeedback}</span>
        </div>
      )}
    </div>
  );
};
