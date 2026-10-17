import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Target,
  Clock,
  CheckCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import type { QuestionTier } from '../types/career.ts';

interface TierSelectorProps {
  selectedTier: QuestionTier;
  onSelectTier: (tier: QuestionTier) => void;
  disabled?: boolean;
}

export const TierSelector: React.FC<TierSelectorProps> = ({
  selectedTier,
  onSelectTier,
  disabled = false
}) => {
  const tiers: {
    tier: QuestionTier;
    label: string;
    badge: string;
    time: string;
    desc: string;
    icon: typeof Zap;
    color: string;
    bgHover: string;
    borderActive: string;
  }[] = [
    {
      tier: 20,
      label: 'Mốc Nhanh (20 câu)',
      badge: 'Khảo sát nhanh',
      time: '~5-7 phút',
      desc: 'Dành cho học sinh muốn nắm bắt sơ lược xu hướng Holland & hành vi DISC',
      icon: Zap,
      color: 'text-amber-600',
      bgHover: 'hover:border-amber-400 hover:bg-amber-50/50',
      borderActive: 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-300'
    },
    {
      tier: 50,
      label: 'Mốc Chuẩn (50 câu)',
      badge: 'Khuyên dùng THPT',
      time: '~15 phút',
      desc: 'Cân bằng độ chính xác cao giữa nhóm tính cách và ma trận ngành đại học',
      icon: Target,
      color: 'text-sky-600',
      bgHover: 'hover:border-sky-400 hover:bg-sky-50/50',
      borderActive: 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-300'
    },
    {
      tier: 70,
      label: 'Mốc Toàn Diện (70 câu)',
      badge: 'Chuyên sâu nhất',
      time: '~25 phút',
      desc: 'Bản phân tích chuyên sâu chi tiết toàn bộ năng lực và dự đoán nghề nghiệp',
      icon: Award,
      color: 'text-emerald-600',
      bgHover: 'hover:border-emerald-400 hover:bg-emerald-50/50',
      borderActive: 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-300'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 font-heading">
              Chọn Mốc Số Lượng Câu Hỏi Trắc Nghiệm THPT
            </h4>
            <p className="text-xs text-slate-500">
              Bộ câu hỏi chuẩn hóa Holland & DISC với 3 mốc thời lượng linh hoạt
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 self-start sm:self-auto">
          Đang chọn: <strong className="text-orange-600">{selectedTier} câu</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {tiers.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedTier === t.tier;

          return (
            <button
              key={t.tier}
              type="button"
              disabled={disabled}
              onClick={() => onSelectTier(t.tier)}
              className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                isSelected ? t.borderActive : `border-slate-200 ${t.bgHover}`
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-orange-600">
                  <CheckCircle className="w-5 h-5 fill-orange-500 text-white" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`p-1.5 rounded-lg bg-white shadow-2xs ${t.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  {t.badge}
                </span>
              </div>
              <h5 className="font-bold text-slate-900 text-sm mb-1">{t.label}</h5>
              <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Thời gian: {t.time}</span>
              </div>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {t.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
