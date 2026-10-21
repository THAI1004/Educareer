import React, { useState, useId } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  GraduationCap,
  Building2,
  DollarSign,
  ChevronRight,
  SlidersHorizontal,
  BookmarkCheck,
  Sparkles
} from 'lucide-react';
import type { CareerMatrixItem, DISCCode, HollandCode } from '../types/career.ts';
import { DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from '../data/careerMatrix.ts';
import { formatImageUrl } from '../utils/imageHelper.ts';

// Job-specific & Major-specific realistic photo mappings so cards do not look identical
const CAREER_IMAGE_BY_JOB: Record<string, string> = {
  'chỉ huy công trường': 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80',
  'kỹ sư vận hành sản xuất': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  'quản lý thi công điện': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
  'điều phối vận tải': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  'kỹ sư robot công nghiệp': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
  'kỹ sư công trình giao thông': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
  'chuyên viên tư vấn thiết bị kỹ thuật': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
  'kỹ sư giải pháp kỹ thuật': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  'giám sát an toàn lao động': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  'kỹ sư bảo trì thiết bị': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
  'chuyên viên qa/qc': 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=600&q=80',
  'kỹ sư thiết kế kết cấu cad/cam': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=600&q=80',
  'kỹ sư phần mềm': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
  'khoa học dữ liệu': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
  'trí tuệ nhân tạo': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
  'bác sĩ': 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
  'dược sĩ': 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80',
  'thiết kế đồ họa': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
  'kiến trúc sư': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
  'chuyên viên marketing': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  'giám đốc kinh doanh': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
  'chuyên viên tài chính': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
  'kế toán viên': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80'
};

const CAREER_IMAGE_BY_MAJOR_KEYWORD: { keyword: string; url: string }[] = [
  { keyword: 'xây dựng', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'cơ khí', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'điện', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'logistics', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'tự động hóa', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'giao thông', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'thông tin', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'máy tính', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'y', url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'dược', url: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'kinh tế', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'quản trị', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'luật', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'sư phạm', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80' },
  { keyword: 'nghệ thuật', url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80' }
];

const getJobCardImage = (jobTitle: string, universityMajor: string, holland: string, customUrl?: string): string => {
  if (customUrl && customUrl.trim() !== '') return customUrl;
  const titleLower = jobTitle.toLowerCase();
  for (const [key, url] of Object.entries(CAREER_IMAGE_BY_JOB)) {
    if (titleLower.includes(key)) return url;
  }
  const majorLower = universityMajor.toLowerCase();
  for (const item of CAREER_IMAGE_BY_MAJOR_KEYWORD) {
    if (majorLower.includes(item.keyword)) return item.url;
  }
  return 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80';
};

interface CareerRecommendationsProps {
  careers: CareerMatrixItem[];
  userPrimaryDisc?: DISCCode;
  userPrimaryHolland?: HollandCode;
  selectedMajorName?: string;
  onSelectCareerDetail: (career: CareerMatrixItem) => void;
}

export const CareerRecommendations: React.FC<CareerRecommendationsProps> = ({
  careers,
  userPrimaryDisc,
  userPrimaryHolland,
  selectedMajorName,
  onSelectCareerDetail
}) => {
  const [selectedDiscFilter, setSelectedDiscFilter] = useState<string>(userPrimaryDisc || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHollandFilter, setSelectedHollandFilter] = useState<string>(userPrimaryHolland || 'all');
  const searchInputId = useId();
  const discSelectId = useId();
  const hollandSelectId = useId();

  // Filter career matrix items
  const filteredCareers = careers.filter(item => {
    // DISC filter
    if (selectedDiscFilter !== 'all' && item.disc !== selectedDiscFilter) {
      return false;
    }
    // Holland filter
    if (selectedHollandFilter !== 'all' && item.holland !== selectedHollandFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchJob = item.jobTitle.toLowerCase().includes(q);
      const matchMajor = item.universityMajor.toLowerCase().includes(q);
      const matchCode = item.majorCode.toLowerCase().includes(q);
      const matchCombo = item.admissionCombinations.some(c => c.toLowerCase().includes(q));
      const matchSkill = item.keySkills.some(s => s.toLowerCase().includes(q));
      if (!matchJob && !matchMajor && !matchCode && !matchCombo && !matchSkill) {
        return false;
      }
    }
    return true;
  });

  return (
    <div id="career-recommendations-section" className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-heading font-extrabold text-slate-900">
            Gợi Ý Nghề Nghiệp Dựa Vào Tính Cách & Ngành Đào Tạo
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Đối chiếu nhóm Holland và tính cách DISC để hiển thị nghề nghiệp, ngành đào tạo đại học và tổ hợp xét tuyển
          </p>
        </div>

        {/* Selected Major Badge Indicator */}
        {/* {selectedMajorName && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-orange-50 border border-orange-200 text-xs">
            <span className="text-slate-500">Chuyên ngành ưu tiên:</span>
            <strong className="text-orange-900">{selectedMajorName}</strong>
          </div>
        )} */}
      </div>

      {/* Filter Toolbar: Dropdown tính cách, Tìm kiếm, Nhóm Holland */}
      <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Lọc theo tính cách DISC */}
          <div>
            <label htmlFor={discSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-sky-600" />
              Lọc theo tính cách:
            </label>
            <select
              id={discSelectId}
              value={selectedDiscFilter}
              onChange={(e) => setSelectedDiscFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Tất cả các nhóm (D, I, S, C)</option>
              <option value="D">D – Quyết đoán (Dominance)</option>
              <option value="I">I – Ảnh hưởng (Influence)</option>
              <option value="S">S – Ổn định (Steadiness)</option>
              <option value="C">C – Tuân thủ (Conscientiousness)</option>
            </select>
          </div>

          {/* Tìm kiếm */}
          <div>
            <label htmlFor={searchInputId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Tìm kiếm nghề / ngành:
            </label>
            <div className="relative">
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập tên nghề, ngành, tổ hợp (A00, D07...)"
                className="w-full pl-3 pr-8 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Lọc theo Nhóm Holland */}
          <div>
            <label htmlFor={hollandSelectId} className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-orange-600" />
              Nhóm Holland:
            </label>
            <select
              id={hollandSelectId}
              value={selectedHollandFilter}
              onChange={(e) => setSelectedHollandFilter(e.target.value)}
              className="w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg font-medium text-slate-800 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 cursor-pointer"
            >
              <option value="all">Tất cả nhóm Holland</option>
              <option value="R">R – KỸ THUẬT (Realistic)</option>
              <option value="I">I – NGHIÊN CỨU (Investigative)</option>
              <option value="E">E – QUẢN LÝ (Enterprising)</option>
              <option value="S">S – XÃ HỘI (Social)</option>
              <option value="C">C – NGHIỆP VỤ (Conventional)</option>
            </select>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-200">
          <span className="text-[11px] text-slate-500 font-semibold">Chọn nhanh:</span>
          {(['all', 'D', 'I', 'S', 'C'] as const).map((trait) => {
            const isSelected = selectedDiscFilter === trait;
            if (trait === 'all') {
              return (
                <button
                  key="all"
                  type="button"
                  onClick={() => setSelectedDiscFilter('all')}
                  className={`text-xs px-2.5 py-0.5 rounded-lg border font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Tất cả ({careers.length})
                </button>
              );
            }

            const info = DISC_TRAITS_INFO[trait];
            return (
              <button
                key={trait}
                type="button"
                onClick={() => setSelectedDiscFilter(trait)}
                className={`text-xs px-2.5 py-0.5 rounded-lg border font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'text-white shadow-2xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
                style={{
                  backgroundColor: isSelected ? info.color : undefined,
                  borderColor: isSelected ? info.color : undefined
                }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: isSelected ? 'white' : info.color }}
                />
                <span>{info.name}</span>
                {userPrimaryDisc === trait && (
                  <span className="text-[10px] px-1 py-0.1 rounded bg-white/30 text-white font-extrabold uppercase">
                    Bạn
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Match counter */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
        <span>
          Tìm thấy <strong className="text-slate-900 font-bold">{filteredCareers.length}</strong> nghề nghiệp & ngành đào tạo phù hợp
        </span>
        {userPrimaryDisc &&
          userPrimaryHolland &&
          selectedDiscFilter === userPrimaryDisc &&
          selectedHollandFilter === userPrimaryHolland && (
          <span className="text-sky-700 font-semibold flex items-center gap-1">
            <BookmarkCheck className="w-3.5 h-3.5 text-sky-600" />
            Nhóm phù hợp với kết quả trắc nghiệm của bạn
          </span>
        )}
      </div>

      {/* Grid of Career Cards */}
      {filteredCareers.length === 0 ? (
        <div className="p-10 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Không tìm thấy kết quả nào phù hợp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedDiscFilter('all');
              setSelectedHollandFilter('all');
              setSearchQuery('');
            }}
            className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition-colors cursor-pointer"
          >
            Xóa bộ lọc & Xem tất cả
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCareers.map((item) => {
            const discInfo = DISC_TRAITS_INFO[item.disc];
            const isUserTraitMatch = userPrimaryDisc === item.disc && userPrimaryHolland === item.holland;
            const cardImg = getJobCardImage(item.jobTitle, item.universityMajor, item.holland, item.image_url);

            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group relative ${
                  isUserTraitMatch
                    ? 'border-sky-400 ring-2 ring-sky-400/40 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Visual Image Header Banner */}
                <div className="h-40 w-full bg-slate-100 relative overflow-hidden">
                  <img
                    src={formatImageUrl(cardImg)}
                    alt={item.jobTitle}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 z-10">
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs">
                      {item.hollandLabel}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-black text-white shadow-xs"
                      style={{ backgroundColor: discInfo.color }}
                    >
                      {item.discLabel}
                    </span>
                  </div>

                  {/* University Major Overlay Tag */}
                  <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between">
                    <span className="text-white font-bold text-xs truncate drop-shadow-xs flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                      {item.universityMajor}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-white font-mono font-bold shrink-0">
                      {item.majorCode}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* ĐẦU RA 1: NGHỀ NGHIỆP GỢI Ý */}
                    <h4 className="text-base font-heading font-extrabold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {item.jobTitle}
                    </h4>

                  {/* ĐẦU RA 2: NGÀNH ĐÀO TẠO ĐẠI HỌC + MÃ NGÀNH */}
                  <div className="mt-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                      Ngành Đào Tạo Đại Học
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-between gap-1">
                      <span>{item.universityMajor}</span>
                      <span className="text-[11px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-mono font-semibold shrink-0">
                        {item.majorCode}
                      </span>
                    </div>
                  </div>

                  {/* ĐẦU RA 3: TỔ HỢP XÉT TUYỂN THAM KHẢO */}
                  <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-semibold text-slate-500">Tổ hợp xét tuyển:</span>
                    {item.admissionCombinations.map((combo) => (
                      <span
                        key={combo}
                        className="text-[11px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-800 font-bold border border-orange-200 font-mono"
                      >
                        {combo}
                      </span>
                    ))}
                  </div>

                  {/* Mô tả công việc ngắn */}
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Meta & Action Button */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      Thu nhập:
                    </span>
                    <span className="font-bold text-slate-800">{item.averageSalaryRange}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      Trường tiêu biểu:
                    </span>
                    <span className="text-slate-700 font-medium truncate max-w-[170px]" title={item.topUniversities.join(', ')}>
                      {item.topUniversities[0]}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCareerDetail(item)}
                    className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-bold transition-all cursor-pointer group-hover:bg-sky-600 group-hover:text-white"
                  >
                    <span>Xem Chi Tiết Ngành</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
