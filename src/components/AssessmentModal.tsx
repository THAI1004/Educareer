import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Save,
  Check,
  Compass,
  Layers,
  Lock,
  ArrowRight,
  AlertTriangle
} from 'lucide-react';
import type { AssessmentQuestion, TestAnswers, QuestionTier } from '../types/career.ts';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: AssessmentQuestion[];
  answers: TestAnswers;
  onSelectAnswer: (questionId: string | number, optionId: string) => void;
  onSubmitTest: () => void;
  onQuickFillDemo?: () => void;
  initialQuestionIndex?: number;
  tier: QuestionTier;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  questions,
  answers,
  onSelectAnswer,
  onSubmitTest,
  onQuickFillDemo,
  initialQuestionIndex = 0,
  tier
}) => {
  const [currentStep, setCurrentStep] = useState(initialQuestionIndex);
  const [filterType, setFilterType] = useState<'ALL' | 'HOLLAND' | 'DISC'>('ALL');
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  // Subtest separation
  const hollandQuestions = questions.filter((q) => q.type === 'HOLLAND');
  const discQuestions = questions.filter((q) => q.type === 'DISC');
  const hollandCount = hollandQuestions.length;
  const discCount = discQuestions.length;

  const hollandAnswered = hollandQuestions.filter((q) => !!answers[String(q.id)]).length;
  const discAnswered = discQuestions.filter((q) => !!answers[String(q.id)]).length;
  const isHollandDone = hollandAnswered >= hollandCount;

  useEffect(() => {
    if (isOpen) {
      if (!isHollandDone && initialQuestionIndex >= hollandCount) {
        const firstUnanswered = hollandQuestions.findIndex((q) => !answers[String(q.id)]);
        setCurrentStep(firstUnanswered >= 0 ? firstUnanswered : 0);
      } else {
        setCurrentStep(initialQuestionIndex);
      }
      setLockedNotice(null);
    }
  }, [isOpen, initialQuestionIndex, isHollandDone, hollandCount]);

  if (!isOpen || questions.length === 0) return null;

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentStep] || questions[0];
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = isHollandDone && discAnswered >= discCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleNext = () => {
    if (currentStep < hollandCount - 1) {
      setCurrentStep(currentStep + 1);
      setLockedNotice(null);
    } else if (currentStep === hollandCount - 1) {
      if (!isHollandDone) {
        setLockedNotice(
          `Bạn cần trả lời đủ tất cả ${hollandCount} câu của Bài 1 (Holland) trước khi mở khóa Bài 2 (DISC).`
        );
      } else {
        setCurrentStep(hollandCount);
        setLockedNotice(null);
      }
    } else if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
      setLockedNotice(null);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setLockedNotice(null);
    }
  };

  const handleSelectQuestion = (globalIndex: number) => {
    if (globalIndex >= hollandCount && !isHollandDone) {
      const remainingHolland = hollandCount - hollandAnswered;
      setLockedNotice(
        `Bài Test 2 (DISC) đang khóa! Bạn bắt buộc phải hoàn thành nốt ${remainingHolland} câu của Bài Test 1 (Holland) trước khi làm Bài Test 2.`
      );
      return;
    }
    setCurrentStep(globalIndex);
    setLockedNotice(null);
  };

  const handleSwitchTab = (tab: 'ALL' | 'HOLLAND' | 'DISC') => {
    if (tab === 'DISC' && !isHollandDone) {
      setLockedNotice(
        `Bài Test 2 (DISC) chỉ được mở khóa sau khi bạn hoàn thành toàn bộ ${hollandCount} câu của Bài Test 1 (Holland).`
      );
      return;
    }
    setFilterType(tab);
    setLockedNotice(null);
    if (tab === 'HOLLAND' && currentStep >= hollandCount) {
      setCurrentStep(0);
    } else if (tab === 'DISC' && currentStep < hollandCount) {
      setCurrentStep(hollandCount);
    }
  };

  const displayedQuestions =
    filterType === 'ALL'
      ? questions
      : questions.filter((q) => q.type === filterType);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in-50 duration-200 notranslate" translate="no">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 border-b border-amber-100 flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-heading font-black text-slate-900">
                  Bài Test Hướng Nghiệp THPT ({tier} Câu)
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                  Mốc {tier} câu
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Holland ({hollandCount} câu) → DISC ({discCount} câu) • Tự động đồng bộ thời gian thực
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onQuickFillDemo && (
              <button
                type="button"
                onClick={onQuickFillDemo}
                title="Điền nhanh toàn bộ bài test để kiểm tra kết quả"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Điền Mẫu Nhanh</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar & Subtest Tabs */}
        <div className="bg-slate-50/70 border-b border-slate-200/80 px-5 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => handleSwitchTab('ALL')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'ALL'
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tất cả ({totalQuestions})
              </button>
              <button
                type="button"
                onClick={() => handleSwitchTab('HOLLAND')}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'HOLLAND'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>1. Holland</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isHollandDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {hollandAnswered}/{hollandCount}
                </span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchTab('DISC')}
                className={`flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'DISC'
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                } ${!isHollandDone ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                {!isHollandDone && <Lock className="w-3 h-3 text-slate-400" />}
                <span>2. DISC</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  discAnswered >= discCount ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  {discAnswered}/{discCount}
                </span>
              </button>
            </div>

            {/* Overall Progress */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-600">
                Đã hoàn thành <strong className="text-orange-600 font-bold">{answeredCount}</strong>/{totalQuestions} câu
              </span>
              <div className="w-24 sm:w-32 bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#FF5722] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Locked Notice Alert */}
          {lockedNotice && (
            <div className="mt-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-900 animate-in slide-in-from-top-1 duration-200">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{lockedNotice}</div>
            </div>
          )}
        </div>

        {/* Question Selector Dots / Numbers Grid */}
        <div className="px-5 py-2.5 border-b border-slate-100 bg-white overflow-x-auto scrollbar-thin">
          <div className="flex items-center gap-1.5 min-w-max">
            {displayedQuestions.map((q, idx) => {
              const globalIndex = questions.findIndex((item) => item.id === q.id);
              const isAnswered = !!answers[String(q.id)];
              const isCurrent = globalIndex === currentStep;
              const isLocked = globalIndex >= hollandCount && !isHollandDone;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => handleSelectQuestion(globalIndex)}
                  title={
                    isLocked
                      ? `Câu ${globalIndex + 1} (Khóa - Hãy làm xong Holland)`
                      : `Câu ${globalIndex + 1}: ${q.title}`
                  }
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer shrink-0 relative ${
                    isCurrent
                      ? 'bg-orange-500 text-white ring-2 ring-orange-300 shadow-xs'
                      : isLocked
                      ? 'bg-slate-100 text-slate-300 border border-slate-200 cursor-not-allowed'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-50 text-slate-600 hover:bg-orange-50 border border-slate-200'
                  }`}
                >
                  {isLocked ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : (
                    <span>{globalIndex + 1}</span>
                  )}
                  {isAnswered && !isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {/* Question Banner */}
          <div className="flex items-center justify-between gap-3">
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                currentQuestion.type === 'HOLLAND'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : 'bg-sky-100 text-sky-900 border border-sky-200'
              }`}
            >
              {currentQuestion.type === 'HOLLAND'
                ? `Bài 1: Holland RIASEC (Câu ${currentStep + 1}/${hollandCount})`
                : `Bài 2: Phong Cách DISC (Câu ${currentStep - hollandCount + 1}/${discCount})`}
            </span>
            <span className="text-xs text-slate-400">
              Mã ID: {currentQuestion.id}
            </span>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQuestion.scenario}
            </h4>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[String(currentQuestion.id)] === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => onSelectAnswer(currentQuestion.id, option.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/70 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-orange-200 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 notranslate" translate="no">
                        {option.label || '•'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`text-sm leading-relaxed ${
                        isSelected ? 'font-bold text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      {option.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 sm:px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                : 'bg-white text-slate-700 hover:bg-slate-100 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Câu Trước</span>
          </button>

          <div className="flex items-center gap-2">
            {currentStep < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onSubmitTest}
                disabled={!isAllAnswered}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md ${
                  isAllAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30 hover:shadow-lg cursor-pointer'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Nộp Bài & Xem Kết Quả</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
