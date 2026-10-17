import React, { useState, useEffect } from 'react';
import {
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  School,
  BookOpen,
  Layers
} from 'lucide-react';
import type { HollandGroup, DISCGroup, UniversityMajor } from '../types/career.ts';
import { formatImageUrl } from '../utils/imageHelper.ts';

interface VisualCareerShowcaseProps {
  onStartTest: () => void;
  onExploreMajor?: (majorName: string) => void;
}

export const VisualCareerShowcase: React.FC<VisualCareerShowcaseProps> = ({
  onStartTest,
  onExploreMajor
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'holland' | 'majors' | 'disc'>('holland');
  const [hollandList, setHollandList] = useState<HollandGroup[]>([]);
  const [discList, setDiscList] = useState<DISCGroup[]>([]);
  const [majorsList, setMajorsList] = useState<UniversityMajor[]>([]);
  const [selectedHolland, setSelectedHolland] = useState<HollandGroup | null>(null);

  useEffect(() => {
    // Load Holland groups
    fetch('/api/master/holland')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setHollandList(data.filter((h) => h.status !== 'inactive'));
      })
      .catch(console.error);

    // Load DISC groups
    fetch('/api/master/disc')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDiscList(data.filter((d) => d.status !== 'inactive'));
      })
      .catch(console.error);

    // Load Popular Majors
    fetch('/api/master/majors?limit=8')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) setMajorsList(data.items.filter((m: UniversityMajor) => m.status !== 'inactive'));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-[32px] border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header and Toggle Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Hình Ảnh Trực Quan Hóa Hướng Nghiệp</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 tracking-tight">
            Khám Phá Các Nhóm Tính Cách & Ngành Đại Học
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Xem nhanh hình ảnh minh họa thực tế, môi trường làm việc và đầu ra tuyển dụng
          </p>
        </div>

        {/* Sub-Tabs Pills */}
        <div className="flex items-center p-1.5 bg-slate-100 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('holland')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'holland'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>6 Nhóm Holland</span>
          </button>
          <button
            onClick={() => setActiveSubTab('majors')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'majors'
                ? 'bg-white text-emerald-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <School className="w-4 h-4" />
            <span>Ngành Tiêu Biểu</span>
          </button>
          <button
            onClick={() => setActiveSubTab('disc')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'disc'
                ? 'bg-white text-sky-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Hành Vi DISC</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HOLLAND VISUAL CARDS (RIASEC) */}
      {/* ========================================================================= */}
      {activeSubTab === 'holland' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hollandList.map((h) => {
              const bgGradient =
                h.code === 'R'
                  ? 'from-amber-500/80 to-amber-900/80'
                  : h.code === 'I'
                  ? 'from-blue-600/80 to-indigo-950/80'
                  : h.code === 'A'
                  ? 'from-purple-600/80 to-pink-950/80'
                  : h.code === 'S'
                  ? 'from-emerald-600/80 to-teal-950/80'
                  : h.code === 'E'
                  ? 'from-rose-600/80 to-red-950/80'
                  : 'from-slate-700/80 to-slate-950/80';

              return (
                <div
                  key={h.code}
                  onClick={() => setSelectedHolland(h)}
                  className="group relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-900 h-64 sm:h-72 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-end p-5"
                >
                  {/* Background Image */}
                  <img
                    src={formatImageUrl(h.image_url)}
                    alt={h.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${bgGradient} opacity-75 group-hover:opacity-85 transition-opacity`}
                  />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="w-9 h-9 rounded-2xl bg-white/95 backdrop-blur-md text-slate-900 font-black text-sm flex items-center justify-center shadow-md">
                      {h.code}
                    </span>
                    <span className="px-3 py-1 rounded-xl bg-black/40 backdrop-blur-md text-white text-[11px] font-bold">
                      RIASEC
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-white space-y-1">
                    <h4 className="text-lg font-heading font-black tracking-tight group-hover:text-amber-300 transition-colors">
                      {h.name}
                    </h4>
                    <p className="text-xs text-white/90 line-clamp-2 leading-relaxed font-normal">
                      {h.description}
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                      <span>Xem chi tiết nhóm</span>
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-orange-50/70 border border-orange-200/60 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                Bạn chưa biết mình thuộc nhóm <strong>Holland RIASEC</strong> nào? Hãy làm bài trắc nghiệm nhanh 20 câu để hệ thống phân tích.
              </p>
            </div>
            <button
              onClick={onStartTest}
              className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <span>Làm Bài Test Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. POPULAR MAJORS CARDS */}
      {/* ========================================================================= */}
      {activeSubTab === 'majors' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {majorsList.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  if (onExploreMajor) onExploreMajor(m.name);
                }}
                className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Image */}
                <div className="h-36 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={formatImageUrl(m.image_url)}
                    alt={m.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-xs font-bold text-amber-800 text-[11px] shadow-2xs">
                    Nhóm {m.typicalHolland}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
                    Mã: {m.code}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 block uppercase tracking-wider">
                      {m.category}
                    </span>
                    <h4 className="font-heading font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {m.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {m.description || 'Đào tạo nguồn nhân lực chất lượng cao theo nhu cầu doanh nghiệp.'}
                    </p>
                  </div>

                  {m.careerOutcomes && m.careerOutcomes.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">
                        Vị trí đầu ra:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {m.careerOutcomes.slice(0, 2).map((role, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium truncate max-w-full"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DISC BEHAVIORS CARDS */}
      {/* ========================================================================= */}
      {activeSubTab === 'disc' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {discList.map((d) => (
              <div
                key={d.code}
                className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-36 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={formatImageUrl(d.image_url)}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs font-black text-sm shadow-xs"
                    style={{ color: d.color }}
                  >
                    Nhóm {d.code}
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <h4 className="font-heading font-bold text-slate-900 text-sm">
                    {d.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {d.characteristics}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Holland Quick Preview Modal */}
      {selectedHolland && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl space-y-0">
            <div className="h-48 relative">
              <img
                src={formatImageUrl(selectedHolland.image_url)}
                alt={selectedHolland.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedHolland(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold text-sm hover:bg-black/80 cursor-pointer"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-white/95 font-black text-amber-600 text-sm shadow-xs">
                Nhóm {selectedHolland.code} • RIASEC
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <h4 className="font-heading font-black text-slate-900 text-lg">
                  {selectedHolland.name}
                </h4>
                <p className="text-xs font-bold text-amber-700">{selectedHolland.full_name}</p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedHolland.description}
              </p>

              <div className="pt-3 border-t flex justify-end">
                <button
                  onClick={() => setSelectedHolland(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
