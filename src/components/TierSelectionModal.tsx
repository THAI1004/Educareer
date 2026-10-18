import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Target,
  Clock,
  CheckCircle,
  X,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import type { QuestionTier } from '../types/career.ts';

interface TierSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: QuestionTier;
  onSelectTier: (tier: QuestionTier) => void;
  onStartTest: (tier: QuestionTier) => void;
  userName?: string;
}

export const TierSelectionModal: React.FC<TierSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
  onSelectTier,
  onStartTest,
  userName
}) => {
  const [localTier, setLocalTier] = useState<QuestionTier>(selectedTier);

  // Sync localTier when modal opens or selectedTier changes
  React.useEffect(() => {
    setLocalTier(selectedTier);
  }, [selectedTier, isOpen]);

  if (!isOpen) return null;

  const tiers: {
    tier: QuestionTier;
    label: string;
    badge: string;
    time: string;
    desc: string;
    icon: typeof Zap;
    color: string;
    borderColor: string;
    activeRing: string;
    bgActive: string;
    hollandCount: number;
    discCount: number;
  }[] = [
    {
      tier: 20,
      label: 'Mốc Nhanh (20 câu)',
      badge: 'Khảo sát nhanh',
      time: '~5-7 phút',
      desc: 'Dành cho học sinh muốn nắm bắt sơ lược xu hướng Holland & hành vi DISC',
      icon: Zap,
      color: 'text-amber-600',
      borderColor: 'border-amber-400',
      activeRing: 'ring-2 ring-amber-400 border-amber-500 bg-amber-50/70',
      bgActive: 'bg-amber-500',
      hollandCount: 12,
      discCount: 8
    },
    {
      tier: 50,
      label: 'Mốc Chuẩn (50 câu)',
      badge: 'Khuyên dùng THPT',
      time: '~15 phút',
      desc: 'Cân bằng độ chính xác cao giữa nhóm tính cách và ma trận ngành đại học',
      icon: Target,
      color: 'text-sky-600',
      borderColor: 'border-sky-400',
      activeRing: 'ring-2 ring-sky-400 border-sky-500 bg-sky-50/70',
      bgActive: 'bg-sky-600',
      hollandCount: 30,
      discCount: 20
    },
    {
      tier: 70,
      label: 'Mốc Toàn Diện (70 câu)',
      badge: 'Chuyên sâu nhất',
      time: '~25 phút',
      desc: 'Bản phân tích chuyên sâu chi tiết toàn bộ năng lực và dự đoán nghề nghiệp',
      icon: Award,
      color: 'text-emerald-600',
      borderColor: 'border-emerald-400',
      activeRing: 'ring-2 ring-emerald-400 border-emerald-500 bg-emerald-50/70',
      bgActive: 'bg-emerald-600',
      hollandCount: 42,
      discCount: 28
    }
  ];

  const handleConfirm = () => {
    onSelectTier(localTier);
    onStartTest(localTier);
    onClose();
  };

  const selectedTierInfo = tiers.find((t) => t.tier === localTier) || tiers[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-[32px] w-full max-w-4xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 flex items-start justify-between gap-4 bg-gradient-to-r from-orange-50/60 via-amber-50/40 to-transparent">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-100 text-orange-900 uppercase tracking-wide">
                  Đã Đăng Nhập {userName ? `• ${userName}` : ''}
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Sẵn sàng làm bài
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
                Chọn Mốc Số Lượng Câu Hỏi Trắc Nghiệm THPT
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Bộ câu hỏi chuẩn hóa Holland & DISC với 3 mốc thời lượng linh hoạt phù hợp với bạn
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body: 3 Tier Cards */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((t) => {
              const Icon = t.icon;
              const isSelected = localTier === t.tier;

              return (
                <div
                  key={t.tier}
                  onClick={() => setLocalTier(t.tier)}
                  className={`text-left p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? t.activeRing
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                  }`}
                >
                  <div>
                    {isSelected && (
                      <div className="absolute top-4 right-4 text-orange-600">
                        <CheckCircle className="w-6 h-6 fill-orange-500 text-white" />
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <span className={`p-2 rounded-xl bg-white shadow-2xs ${t.color}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                        {t.badge}
                      </span>
                    </div>

                    <h4 className="font-heading font-black text-slate-900 text-base mb-1">
                      {t.label}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Thời gian: {t.time}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span>Holland: {t.hollandCount} câu</span>
                    <span>•</span>
                    <span>DISC: {t.discCount} câu</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Notice */}
          <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 flex items-center gap-3 text-xs text-amber-900">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="leading-relaxed">
              <strong>Gợi ý:</strong> Bạn có thể bắt đầu với <strong>Mốc Chuẩn (50 câu)</strong> để có độ chính xác cao nhất đối với các nhóm ngành đại học, hoặc chọn <strong>Mốc Nhanh (20 câu)</strong> nếu muốn làm nhanh trong 5 phút.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Đang chọn: <strong className="text-orange-600 font-bold">{selectedTierInfo.label}</strong> (~{selectedTierInfo.time})
          </div>

          <div className="flex items-center gap-2.5 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/70 transition-colors cursor-pointer"
            >
              Để sau
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-[#FF5722] hover:from-orange-600 hover:to-[#F4511E] text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Vào Làm Bài Thi Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
