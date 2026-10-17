import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  Compass,
  ArrowRight,
  TrendingUp,
  Briefcase,
  BookOpen,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';
import type { EvaluationResult, UniversityMajor, DISCCode, HollandCode, DISCGroup, HollandGroup } from '../types/career.ts';
import { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from '../data/careerMatrix.ts';
import { MajorSelector } from './MajorSelector.tsx';
import { formatImageUrl } from '../utils/imageHelper.ts';

// Default fallback images for DISC & Holland groups
const DEFAULT_DISC_IMAGES: Record<DISCCode, string> = {
  D: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  I: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  S: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  C: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
};

const DEFAULT_HOLLAND_IMAGES: Record<HollandCode, string> = {
  R: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  I: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
  A: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
  S: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
  E: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  C: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
};

interface EvaluationSummaryProps {
  evaluation: EvaluationResult;
  currentMajorId: string;
  onSelectRevisedMajor: (major: UniversityMajor) => void;
  onViewRecommendations: () => void;
}

export const EvaluationSummary: React.FC<EvaluationSummaryProps> = ({
  evaluation,
  currentMajorId,
  onSelectRevisedMajor,
  onViewRecommendations
}) => {
  const { analysis, discPercentages, primaryDisc, primaryHolland, hollandScores } = evaluation;

  const [discImageMap, setDiscImageMap] = useState<Record<string, string>>(DEFAULT_DISC_IMAGES);
  const [hollandImageMap, setHollandImageMap] = useState<Record<string, string>>(DEFAULT_HOLLAND_IMAGES);

  useEffect(() => {
    // Fetch live images from DB master
    fetch('/api/master/disc')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = { ...DEFAULT_DISC_IMAGES };
          data.forEach((d: DISCGroup) => {
            if (d.image_url) map[d.code] = d.image_url;
          });
          setDiscImageMap(map);
        }
      })
      .catch(() => {});

    fetch('/api/master/holland')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const map: Record<string, string> = { ...DEFAULT_HOLLAND_IMAGES };
          data.forEach((h: HollandGroup) => {
            if (h.image_url) map[h.code] = h.image_url;
          });
          setHollandImageMap(map);
        }
      })
      .catch(() => {});
  }, []);

  const discKeys: DISCCode[] = ['D', 'I', 'S', 'C'];
  const hollandKeys: HollandCode[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const hollandInfo = HOLLAND_TRAITS_INFO[primaryHolland];
  const primaryDiscImage = discImageMap[primaryDisc] || DEFAULT_DISC_IMAGES[primaryDisc];
  const primaryHollandImage = hollandImageMap[primaryHolland] || DEFAULT_HOLLAND_IMAGES[primaryHolland];

  return (
    <div className="space-y-6">
      {/* Visual Hero Banner: 2 Primary Archetype Cards with Real Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* DISC Dominant Archetype Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-900 min-h-[220px] flex flex-col justify-between p-6">
          <img
            src={formatImageUrl(primaryDiscImage)}
            alt={analysis.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-rose-500/90 backdrop-blur-md text-white font-extrabold text-xs tracking-wider uppercase shadow-xs flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Tính Cách Chủ Đạo DISC
            </span>
            <span
              className="w-10 h-10 rounded-2xl bg-white/95 text-slate-900 font-black text-base flex items-center justify-center shadow-md font-mono"
            >
              {primaryDisc}
            </span>
          </div>

          <div className="relative z-10 text-white space-y-1.5 pt-6">
            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white drop-shadow-xs">
              {analysis.title}
            </h3>
            <p className="text-xs sm:text-sm text-rose-200 font-medium">
              &ldquo;{analysis.tagline}&rdquo;
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">Điểm cốt lõi:</span>
              <span className="line-clamp-1">{DISC_TRAITS_INFO[primaryDisc].characteristics}</span>
            </div>
          </div>
        </div>

        {/* Holland Primary Career Field Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 group bg-slate-900 min-h-[220px] flex flex-col justify-between p-6">
          <img
            src={formatImageUrl(primaryHollandImage)}
            alt={hollandInfo?.fullName || 'Holland'}
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/90 backdrop-blur-md text-white font-extrabold text-xs tracking-wider uppercase shadow-xs flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Sở Thích Nghề Nghiệp Holland
            </span>
            <span className="w-10 h-10 rounded-2xl bg-white/95 text-amber-700 font-black text-base flex items-center justify-center shadow-md font-mono">
              {primaryHolland}
            </span>
          </div>

          <div className="relative z-10 text-white space-y-1.5 pt-6">
            <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white drop-shadow-xs">
              Nhóm {primaryHolland} – {hollandInfo?.name.split('–')[1]?.trim() || hollandInfo?.name}
            </h3>
            <p className="text-xs sm:text-sm text-amber-200 font-medium">
              {hollandInfo?.fullName}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">Xu hướng:</span>
              <span className="line-clamp-1">{hollandInfo?.description}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Assessment Report Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                BẢNG PHÂN TÍCH CHUYÊN SÂU HOLLAND × DISC
              </span>
              <span className="text-xs text-slate-500">
                Thực hiện: {evaluation.testDate}
              </span>
            </div>

            {evaluation.studentName && (
              <span className="text-xs sm:text-sm font-semibold bg-slate-100 px-3.5 py-1 rounded-full text-slate-800 border border-slate-200">
                Học sinh: <strong>{evaluation.studentName}</strong>
              </span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
                  {analysis.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-sky-600 text-white shadow-xs">
                  DISC: {primaryDisc} ({DISC_TRAITS_INFO[primaryDisc].name})
                </span>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200">
                  Holland: {primaryHolland} – {hollandInfo?.name || 'Kỹ thuật'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-sky-800 font-semibold max-w-2xl">
                &ldquo;{analysis.tagline}&rdquo;
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                {analysis.summary}
              </p>
            </div>

            {/* Quick action button to scroll down to recommendations */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={onViewRecommendations}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Xem Gợi Ý Nghề Nghiệp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 DISC Progress Cards with Illustrated Thumbnails */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
              Tỷ Lệ Phân Bổ 4 Nhóm Hành Vi DISC (Kèm Ảnh Minh Họa Trực Quan)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {discKeys.map((key) => {
                const info = DISC_TRAITS_INFO[key];
                const percentage = discPercentages[key] || 0;
                const isDominant = key === primaryDisc;
                const thumb = discImageMap[key] || DEFAULT_DISC_IMAGES[key];

                return (
                  <div
                    key={key}
                    className={`rounded-2xl border overflow-hidden transition-all flex flex-col group ${
                      isDominant
                        ? 'bg-sky-50/40 border-sky-400 ring-2 ring-sky-400/40 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Visual Photo Header */}
                    <div className="h-28 w-full bg-slate-100 relative overflow-hidden">
                      <img
                        src={formatImageUrl(thumb)}
                        alt={info.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg bg-white/95 font-black text-xs shadow-xs" style={{ color: info.color }}>
                        Nhóm {key}
                      </div>
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/60 text-white font-mono font-bold text-xs">
                        {percentage}%
                      </div>
                      <div className="absolute bottom-2 left-2.5 right-2.5 text-white font-bold text-xs truncate">
                        {info.name}
                      </div>
                    </div>

                    <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                      {/* Bar */}
                      <div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: info.color
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {info.characteristics}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6 Holland Traits with Visual Badges & Photos */}
          <div className="mt-7 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-orange-600" />
              Kết Quả 6 Nhóm Sở Thích Nghề Nghiệp RIASEC (Holland)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {hollandKeys.map((key) => {
                const hInfo = HOLLAND_TRAITS_INFO[key];
                const score = hollandScores?.[key] || 0;
                const isDominant = key === primaryHolland;
                const hImg = hollandImageMap[key] || DEFAULT_HOLLAND_IMAGES[key];

                return (
                  <div
                    key={key}
                    className={`rounded-2xl border overflow-hidden text-center transition-all flex flex-col group ${
                      isDominant
                        ? 'bg-orange-50/50 border-orange-400 ring-2 ring-orange-400/40 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="h-20 w-full bg-slate-100 relative overflow-hidden">
                      <img
                        src={formatImageUrl(hImg)}
                        alt={hInfo?.name || key}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-black ${
                        isDominant ? 'bg-orange-600 text-white' : 'bg-white/95 text-slate-800'
                      }`}>
                        {key}
                      </span>
                      <span className="absolute bottom-1.5 right-2 text-white font-mono text-[11px] font-bold">
                        {score}đ
                      </span>
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div className="font-bold text-slate-900 text-xs truncate">
                        {hInfo?.name.split('–')[1]?.trim() || key}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                        {hInfo?.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Trait Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Điểm mạnh cốt lõi */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900">
                Điểm Mạnh Cốt Lõi Trong Môi Trường Kỹ Thuật
              </h4>
            </div>
          </div>

          <ul className="space-y-2">
            {analysis.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lời khuyên phát triển & Môi trường lý tưởng */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900">
                  Môi Trường Làm Việc Phù Hợp & Lời Khuyên
                </h4>
              </div>
            </div>

            <div className="mb-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
              <strong className="text-slate-900">Môi trường lý tưởng:</strong> {analysis.idealWorkEnvironment}
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Khuyến nghị rèn luyện:</span>
              {analysis.growthAdvice.map((adv, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="text-orange-500 font-bold">•</span>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lựa chọn & đối chiếu chuyên ngành đại học sau khi có kết quả đánh giá */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900">
              Lựa Chọn & Đối Chiếu Ngành Học Đại Học Sau Khi Có Kết Quả Test
            </h4>
            <p className="text-[11px] text-slate-500">
              Bạn có thể chọn ngành học đại học bạn đang học hoặc dự kiến đăng ký xét tuyển để đối chiếu mức độ tương thích với kết quả test.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <MajorSelector
            selectedMajorId={currentMajorId}
            onSelectMajor={onSelectRevisedMajor}
            label="Chọn ngành đại học để đối chiếu:"
            isRevisedSelection={true}
          />

          <div className="mt-3 pt-2.5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="font-semibold text-slate-800">Ngành đang đối chiếu:</span>
              <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 font-bold border border-sky-200">
                {evaluation.finalMajorName || evaluation.initialMajorName}
              </span>
            </div>
            <span className="text-sky-700 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              Đã đồng bộ hóa với danh sách nghề nghiệp gợi ý ở Bước 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
