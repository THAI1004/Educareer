import React, { useState, useId } from 'react';
import {
  Table,
  Search,
  Filter,
  Download,
  ExternalLink,
  Printer,
  Lock,
  Compass,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { CAREER_MATRIX_DATA, DISC_TRAITS_INFO, HOLLAND_TRAITS_INFO } from '../data/careerMatrix.ts';
import type { CareerMatrixItem } from '../types/career.ts';

interface CareerMatrixTableViewProps {
  onSelectCareerDetail: (item: CareerMatrixItem) => void;
  isUnlocked?: boolean;
  onGoToTest?: () => void;
}

export const CareerMatrixTableView: React.FC<CareerMatrixTableViewProps> = ({
  onSelectCareerDetail,
  isUnlocked = false,
  onGoToTest
}) => {
  const [selectedDisc, setSelectedDisc] = useState<string>('all');
  const [selectedHolland, setSelectedHolland] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const searchTableInputId = useId();
  const discTableSelectId = useId();
  const hollandTableSelectId = useId();

  // If locked, render the locked notice
  if (!isUnlocked) {
    return (
      <div className="space-y-6 animate-in fade-in-50 duration-200">
        {/* Header summary */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-orange-600" />
              MA TRẬN HƯỚNG NGHIỆP & TUYỂN SINH ĐẠI HỌC
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
            Bảng Ma Trận Đối Chiếu Ngành Học & Nghề Nghiệp
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
            Dữ liệu đối chiếu chuẩn theo 6 nhóm Holland (RIASEC), 4 phong cách làm việc DISC và danh mục mã ngành đại học của Bộ GD&ĐT.
          </p>
        </div>

        {/* Locked Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-xs text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mb-2">
            Bảng Ma Trận Hướng Nghiệp Bị Khóa
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Bảng ma trận đối chiếu chuyên sâu (bao gồm vị trí nghề nghiệp, ngành đào tạo đại học, mã ngành chính quy Bộ GD&ĐT, tổ hợp môn xét tuyển, mức lương và trường đại học tiêu biểu) <strong>chỉ được hiển thị sau khi bạn đã làm bài test định hướng từ 1 lần trở lên</strong>.
          </p>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-left mb-6 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-sky-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Quy trình mở khóa ma trận hướng nghiệp:</span>
            </div>
            <div className="flex items-start gap-2 text-slate-600 pl-6">
              <span className="font-bold text-sky-600">1.</span>
              <span>Hoàn thành bắt buộc cả 2 bài test theo tuần tự: <strong>Bài Test 1 (Holland RIASEC - 6 câu)</strong> xong thì đến <strong>Bài Test 2 (DISC - 6 câu)</strong>.</span>
            </div>
            <div className="flex items-start gap-2 text-slate-600 pl-6">
              <span className="font-bold text-sky-600">2.</span>
              <span>Hệ thống tự động xác định nhóm tính cách và sở thích để mở khóa toàn bộ ma trận nghề nghiệp kèm bộ lọc đối chiếu cá nhân hóa.</span>
            </div>
          </div>

          {onGoToTest && (
            <button
              type="button"
              onClick={onGoToTest}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Làm Bài Test Định Hướng Ngay Để Mở Khóa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // When unlocked:
  const filteredData = CAREER_MATRIX_DATA.filter((item) => {
    if (selectedDisc !== 'all' && item.disc !== selectedDisc) return false;
    if (selectedHolland !== 'all' && item.holland !== selectedHolland) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const match =
        item.jobTitle.toLowerCase().includes(q) ||
        item.universityMajor.toLowerCase().includes(q) ||
        item.majorCode.toLowerCase().includes(q) ||
        item.admissionCombinations.some((c) => c.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const exportCSV = () => {
    const headers = [
      'STT',
      'ĐẦU VÀO 1 (NHÓM HOLLAND)',
      'ĐẦU VÀO 2 (NHÓM DISC)',
      'ĐẦU RA 1 (NGHỀ NGHIỆP GỢI Ý)',
      'ĐẦU RA 2 (NGÀNH ĐÀO TẠO ĐẠI HỌC)',
      'MÃ NGÀNH',
      'ĐẦU RA 3 (TỔ HỢP XÉT TUYỂN THAM KHẢO)',
      'MỨC LƯƠNG TRUNG BÌNH'
    ];

    const rows = filteredData.map((item, idx) => [
      idx + 1,
      `"${item.hollandLabel}"`,
      `"${item.discLabel}"`,
      `"${item.jobTitle}"`,
      `"${item.universityMajor}"`,
      `"${item.majorCode}"`,
      `"${item.admissionCombinations.join(', ')}"`,
      `"${item.averageSalaryRange}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'ma_tran_nghe_nghiep_holland_disc.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-orange-600" />
              MA TRẬN HƯỚNG NGHIỆP ĐÃ MỞ KHÓA
            </span>
            <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-sky-600" />
              Đã xác thực bài test
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900 tracking-tight">
            Bảng Ma Trận Đối Chiếu Ngành Học & Nghề Nghiệp
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tra cứu chuẩn xác tổ hợp xét tuyển, mã ngành Bộ GD&ĐT, các trường đại học đào tạo và mức lương trung bình.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-2xs shrink-0"
        >
          <Download className="w-4 h-4 text-sky-600" />
          <span>Xuất File CSV / Excel</span>
        </button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <label htmlFor={searchTableInputId} className="sr-only">
            Tìm kiếm ngành hoặc việc làm
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id={searchTableInputId}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên nghề, tên ngành học, mã ngành (VD: 7580201), tổ hợp môn (A00)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Holland */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor={hollandTableSelectId} className="text-xs font-semibold text-slate-500 shrink-0">
            Holland:
          </label>
          <select
            id={hollandTableSelectId}
            value={selectedHolland}
            onChange={(e) => setSelectedHolland(e.target.value)}
            aria-label="Lọc theo nhóm Holland"
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white text-slate-700 font-medium cursor-pointer w-full md:w-auto"
          >
            <option value="all">Tất cả nhóm Holland</option>
            <option value="R">R – Kỹ thuật (Realistic)</option>
            <option value="I">I – Nghiên cứu (Investigative)</option>
            <option value="A">A – Nghệ thuật (Artistic)</option>
            <option value="S">S – Xã hội (Social)</option>
            <option value="E">E – Quản lý (Enterprising)</option>
            <option value="C">C – Nghiệp vụ (Conventional)</option>
          </select>
        </div>

        {/* Filter DISC */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label htmlFor={discTableSelectId} className="text-xs font-semibold text-slate-500 shrink-0">
            DISC:
          </label>
          <select
            id={discTableSelectId}
            value={selectedDisc}
            onChange={(e) => setSelectedDisc(e.target.value)}
            aria-label="Lọc theo nhóm tính cách DISC"
            className="px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white text-slate-700 font-medium cursor-pointer w-full md:w-auto"
          >
            <option value="all">Tất cả nhóm DISC</option>
            <option value="D">D – Quyết đoán (Dominance)</option>
            <option value="I">I – Ảnh hưởng (Influence)</option>
            <option value="S">S – Ổn định (Steadiness)</option>
            <option value="C">C – Tuân thủ (Conscientiousness)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-3 sm:px-4">STT</th>
                <th className="py-3 px-3 sm:px-4">Nhóm Holland</th>
                <th className="py-3 px-3 sm:px-4">Nhóm DISC</th>
                <th className="py-3 px-3 sm:px-4">Nghề Nghiệp Gợi Ý</th>
                <th className="py-3 px-3 sm:px-4">Ngành Đào Tạo Đại Học</th>
                <th className="py-3 px-3 sm:px-4">Mã Ngành</th>
                <th className="py-3 px-3 sm:px-4">Tổ Hợp Xét Tuyển</th>
                <th className="py-3 px-3 sm:px-4">Mức Lương TB</th>
                <th className="py-3 px-3 sm:px-4 text-center">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Không tìm thấy nghề nghiệp phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  const discInfo = DISC_TRAITS_INFO[item.disc];
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-sky-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 sm:px-4 font-semibold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4">
                        <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold bg-orange-50 text-orange-800 border border-orange-200">
                          {item.hollandLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4">
                        <span
                          className="inline-flex px-2 py-0.5 rounded text-[11px] font-bold"
                          style={{
                            backgroundColor: discInfo.bgLight,
                            color: discInfo.color
                          }}
                        >
                          {item.discLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900">
                        {item.jobTitle}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-700">
                        {item.universityMajor}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono font-semibold text-slate-500 text-xs">
                        {item.majorCode}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.admissionCombinations.map((c) => (
                            <span
                              key={c}
                              className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-semibold text-sky-800 text-xs">
                        {item.averageSalaryRange}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-center">
                        <button
                          type="button"
                          onClick={() => onSelectCareerDetail(item)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer inline-flex items-center"
                          title="Xem chi tiết nghề nghiệp"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Hiển thị <strong>{filteredData.length}</strong> / {CAREER_MATRIX_DATA.length} vị trí nghề nghiệp
          </span>
          <span className="text-[11px] text-slate-400">
            Dữ liệu tuyển sinh cập nhật theo Quy chế tuyển sinh đại học chính quy của Bộ GD&ĐT
          </span>
        </div>
      </div>
    </div>
  );
};
