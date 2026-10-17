import React, { useState, useId } from 'react';
import { Search, ChevronDown, Check, BookOpen } from 'lucide-react';
import { UNIVERSITY_MAJORS_LIST } from '../data/careerMatrix.ts';
import type { UniversityMajor } from '../types/career.ts';

interface MajorSelectorProps {
  selectedMajorId: string;
  onSelectMajor: (major: UniversityMajor) => void;
  label?: string;
  isRevisedSelection?: boolean;
}

export const MajorSelector: React.FC<MajorSelectorProps> = ({
  selectedMajorId,
  onSelectMajor,
  label = 'Ngành lựa chọn:',
  isRevisedSelection = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const searchInputId = useId();

  const currentMajor = UNIVERSITY_MAJORS_LIST.find(m => m.id === selectedMajorId) || UNIVERSITY_MAJORS_LIST[0];

  const categories = ['all', ...Array.from(new Set(UNIVERSITY_MAJORS_LIST.map(m => m.category)))];

  const filteredMajors = UNIVERSITY_MAJORS_LIST.filter(major => {
    const matchesSearch =
      major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.careerOutcomes.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || major.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-1 mb-2">
        <label className="text-xs sm:text-sm font-bold text-slate-800">
          {label}
        </label>
        {isRevisedSelection && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
            Cho phép chọn lại chuyên ngành
          </span>
        )}
      </div>

      {/* Dropdown Trigger Box */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-left shadow-2xs transition-all cursor-pointer ${
            isOpen
              ? 'border-sky-500 ring-2 ring-sky-500/20'
              : 'border-slate-300 hover:border-slate-400'
          } ${isRevisedSelection ? 'ring-1 ring-orange-300/60 bg-orange-50/20' : ''}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {currentMajor.name}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[11px] font-mono">
                  Mã: {currentMajor.code}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {currentMajor.category} • {currentMajor.description}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
              isOpen ? 'rotate-180 text-sky-600' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu Overlay */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl z-40 overflow-hidden">
              {/* Search Bar inside Dropdown */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/80">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <label htmlFor={searchInputId} className="sr-only">Tìm kiếm ngành học hoặc mã ngành</label>
                  <input
                    id={searchInputId}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên ngành hoặc mã ngành..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    autoFocus
                  />
                </div>

                {/* Categories filter */}
                <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-none text-xs">
                  <span className="text-slate-400 text-[11px] shrink-0 font-medium">Lọc:</span>
                  {categories.slice(0, 5).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2 py-0.5 rounded-md text-[11px] whitespace-nowrap transition-colors cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-sky-600 text-white font-semibold'
                          : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'all' ? 'Tất cả' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Major Items List */}
              <div className="max-h-72 overflow-y-auto p-2 divide-y divide-slate-100">
                {filteredMajors.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-xs">
                    Không tìm thấy ngành học phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  filteredMajors.map((major) => {
                    const isSelected = major.id === selectedMajorId;
                    return (
                      <button
                        key={major.id}
                        type="button"
                        onClick={() => {
                          onSelectMajor(major);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 text-sky-900 border border-sky-200'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-sky-800' : 'text-slate-800'}`}>
                              {major.name}
                            </span>
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                              {major.code}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {major.category} • {major.description}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Select Buttons */}
      <div className="mt-2 flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-slate-500 font-medium">Chọn nhanh:</span>
        {UNIVERSITY_MAJORS_LIST.slice(0, 4).map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelectMajor(m)}
            className={`text-xs px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
              m.id === selectedMajorId
                ? 'bg-sky-600 text-white border-sky-600 font-semibold'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>
    </div>
  );
};
