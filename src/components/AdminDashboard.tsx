import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  Layers,
  GraduationCap,
  Briefcase,
  HelpCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  CheckCircle,
  XCircle,
  RefreshCw,
  Sparkles,
  School,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';
import type {
  UserProfile,
  EvaluationResult,
  CareerMatrixItem,
  UniversityMajor,
  HollandGroup,
  DISCGroup,
  AssessmentQuestion,
  QuestionTier
} from '../types/career.ts';
import { PrintBatchReportsModal } from './PrintBatchReportsModal.tsx';
import { PrintReportModal } from './PrintReportModal.tsx';
import { formatImageUrl } from '../utils/imageHelper.ts';

interface AdminDashboardProps {
  currentUser: UserProfile;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  // Navigation subtabs (Đã bỏ theo dõi trực tiếp)
  const [activeTab, setActiveTab] = useState<
    'users' | 'history' | 'questions' | 'holland' | 'disc' | 'majors' | 'careers'
  >('users');

  // Print & View details modals
  const [printResults, setPrintResults] = useState<EvaluationResult[]>([]);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [viewingDetailReport, setViewingDetailReport] = useState<EvaluationResult | null>(null);
  const [isAutoPrintSingle, setIsAutoPrintSingle] = useState(false);

  // Common Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // --------------------------------------------------------------------------
  // TAB 1: USERS STATE
  // --------------------------------------------------------------------------
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [userStatusFilter, setUserStatusFilter] = useState('all');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // --------------------------------------------------------------------------
  // TAB 2: TEST HISTORY STATE (Lịch Sử Thi Holland & DISC)
  // --------------------------------------------------------------------------
  const [historyList, setHistoryList] = useState<EvaluationResult[]>([]);
  const [historyTotal, setHistoryTotal] = useState(0);
  const [historyPage, setHistoryPage] = useState(1);
  const [historySearch, setHistorySearch] = useState('');
  const [historyTierFilter, setHistoryTierFilter] = useState('all');
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<string[]>([]);

  // --------------------------------------------------------------------------
  // TAB 4: QUESTIONS BANK
  // --------------------------------------------------------------------------
  const [questionsList, setQuestionsList] = useState<AssessmentQuestion[]>([]);
  const [questionTotal, setQuestionTotal] = useState(0);
  const [questionPage, setQuestionPage] = useState(1);
  const [questionTypeFilter, setQuestionTypeFilter] = useState('all');
  const [questionTierFilter, setQuestionTierFilter] = useState('all');
  const [questionSearch, setQuestionSearch] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // TAB 5 & 6: HOLLAND & DISC GROUPS
  // --------------------------------------------------------------------------
  const [hollandGroups, setHollandGroups] = useState<HollandGroup[]>([]);
  const [editingHolland, setEditingHolland] = useState<HollandGroup | null>(null);
  const [isAddingHolland, setIsAddingHolland] = useState(false);
  const [isHollandModalOpen, setIsHollandModalOpen] = useState(false);

  const [discGroups, setDiscGroups] = useState<DISCGroup[]>([]);
  const [editingDisc, setEditingDisc] = useState<DISCGroup | null>(null);
  const [isAddingDisc, setIsAddingDisc] = useState(false);
  const [isDiscModalOpen, setIsDiscModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // TAB 7: MAJORS (Ngành đào tạo & Đầu ra)
  // --------------------------------------------------------------------------
  const [majorsList, setMajorsList] = useState<UniversityMajor[]>([]);
  const [majorsTotal, setMajorsTotal] = useState(0);
  const [majorsPage, setMajorsPage] = useState(1);
  const [majorsSearch, setMajorsSearch] = useState('');
  const [editingMajor, setEditingMajor] = useState<UniversityMajor | null>(null);
  const [isAddingMajor, setIsAddingMajor] = useState(false);
  const [isMajorModalOpen, setIsMajorModalOpen] = useState(false);

  // --------------------------------------------------------------------------
  // TAB 8: CAREER MATRIX
  // --------------------------------------------------------------------------
  const [careersList, setCareersList] = useState<CareerMatrixItem[]>([]);
  const [careersTotal, setCareersTotal] = useState(0);
  const [careersPage, setCareersPage] = useState(1);
  const [careersSearch, setCareersSearch] = useState('');
  const [careersHollandFilter, setCareersHollandFilter] = useState('all');
  const [careersDiscFilter, setCareersDiscFilter] = useState('all');
  const [editingCareer, setEditingCareer] = useState<CareerMatrixItem | null>(null);
  const [isAddingCareer, setIsAddingCareer] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);

  // Fetch Users
  useEffect(() => {
    if (activeTab === 'users') {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(userPage),
        limit: '10',
        search: userSearch,
        role: userRoleFilter,
        status: userStatusFilter
      });
      fetch(`/api/users?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.items || []);
          setUserTotal(data.total || 0);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, userPage, userSearch, userRoleFilter, userStatusFilter, refreshTrigger]);

  // Fetch History
  useEffect(() => {
    if (activeTab === 'history') {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(historyPage),
        limit: '10',
        search: historySearch,
        tier: historyTierFilter,
        isAdmin: currentUser?.role === 'admin' ? 'true' : 'false'
      });
      fetch(`/api/history?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setHistoryList(data.items || []);
          setHistoryTotal(data.total || 0);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, historyPage, historySearch, historyTierFilter, refreshTrigger]);

  // Fetch Questions
  useEffect(() => {
    if (activeTab === 'questions') {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(questionPage),
        limit: '10',
        type: questionTypeFilter,
        tier: questionTierFilter,
        search: questionSearch
      });
      fetch(`/api/questions?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setQuestionsList(data.items || []);
          setQuestionTotal(data.total || 0);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, questionPage, questionTypeFilter, questionTierFilter, questionSearch, refreshTrigger]);

  // Fetch Holland & DISC
  useEffect(() => {
    if (activeTab === 'holland') {
      fetch('/api/master/holland')
        .then((res) => res.json())
        .then(setHollandGroups)
        .catch(console.error);
    } else if (activeTab === 'disc') {
      fetch('/api/master/disc')
        .then((res) => res.json())
        .then(setDiscGroups)
        .catch(console.error);
    }
  }, [activeTab, refreshTrigger]);

  // Fetch Majors
  useEffect(() => {
    if (activeTab === 'majors') {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(majorsPage),
        limit: '10',
        search: majorsSearch
      });
      fetch(`/api/master/majors?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setMajorsList(data.items || []);
          setMajorsTotal(data.total || 0);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, majorsPage, majorsSearch, refreshTrigger]);

  // Fetch Careers
  useEffect(() => {
    if (activeTab === 'careers') {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: String(careersPage),
        limit: '10',
        search: careersSearch,
        holland: careersHollandFilter,
        disc: careersDiscFilter
      });
      fetch(`/api/master/careers?${params}`)
        .then((res) => res.json())
        .then((data) => {
          setCareersList(data.items || []);
          setCareersTotal(data.total || 0);
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [activeTab, careersPage, careersSearch, careersHollandFilter, careersDiscFilter, refreshTrigger]);

  // User Actions
  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const isEdit = users.some((u) => u.id === editingUser.id);
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/users/${editingUser.id}` : '/api/users';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser)
      });
      setIsUserModalOpen(false);
      setEditingUser(null);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Không thể lưu thông tin người dùng');
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    try {
      await fetch(`/api/users/${id}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa người dùng');
    }
  };

  const handleToggleUserStatus = async (user: UserProfile) => {
    const nextStatus = user.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi thay đổi trạng thái');
    }
  };

  // History Single / Batch Printing
  const handlePrintSingleHistory = (result: EvaluationResult) => {
    setIsAutoPrintSingle(true);
    setViewingDetailReport(result);
  };

  const handlePrintBatchHistory = () => {
    const selected = historyList.filter((h) => selectedHistoryIds.includes(h.id));
    if (selected.length === 0) {
      alert('Vui lòng chọn ít nhất 1 bài thi để in');
      return;
    }
    setPrintResults(selected);
    setIsPrintModalOpen(true);
  };

  // Toggle selection
  const handleToggleSelectHistory = (id: string) => {
    setSelectedHistoryIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAllHistory = () => {
    if (selectedHistoryIds.length === historyList.length) {
      setSelectedHistoryIds([]);
    } else {
      setSelectedHistoryIds(historyList.map((h) => h.id));
    }
  };

  // Holland Group Actions
  const handleSaveHolland = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHolland) return;
    const isEdit = !isAddingHolland;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/master/holland/${editingHolland.code}` : '/api/master/holland';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingHolland)
      });
      setIsHollandModalOpen(false);
      setEditingHolland(null);
      setIsAddingHolland(false);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Không thể lưu nhóm Holland');
    }
  };

  const handleDeleteHolland = async (code: string) => {
    if (!confirm(`Bạn có chắc muốn xóa nhóm Holland ${code}?`)) return;
    try {
      await fetch(`/api/master/holland/${code}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa nhóm Holland');
    }
  };

  const handleToggleHollandStatus = async (item: HollandGroup) => {
    const nextStatus = item.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/master/holland/${item.code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi đổi trạng thái nhóm Holland');
    }
  };

  // DISC Group Actions
  const handleSaveDisc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDisc) return;
    const isEdit = !isAddingDisc;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/master/disc/${editingDisc.code}` : '/api/master/disc';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDisc)
      });
      setIsDiscModalOpen(false);
      setEditingDisc(null);
      setIsAddingDisc(false);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Không thể lưu nhóm DISC');
    }
  };

  const handleDeleteDisc = async (code: string) => {
    if (!confirm(`Bạn có chắc muốn xóa nhóm DISC ${code}?`)) return;
    try {
      await fetch(`/api/master/disc/${code}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa nhóm DISC');
    }
  };

  const handleToggleDiscStatus = async (item: DISCGroup) => {
    const nextStatus = item.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/master/disc/${item.code}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi đổi trạng thái nhóm DISC');
    }
  };

  // Major Action
  const handleSaveMajor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMajor) return;
    const isEdit = !isAddingMajor;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/master/majors/${editingMajor.id}` : '/api/master/majors';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingMajor)
      });
      setIsMajorModalOpen(false);
      setEditingMajor(null);
      setIsAddingMajor(false);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Không thể lưu ngành đào tạo');
    }
  };

  const handleDeleteMajor = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa ngành học này?')) return;
    try {
      await fetch(`/api/master/majors/${id}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa ngành học');
    }
  };

  const handleToggleMajorStatus = async (major: UniversityMajor) => {
    const nextStatus = major.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/master/majors/${major.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi đổi trạng thái');
    }
  };

  // Career Matrix Action
  const handleSaveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer) return;
    const isEdit = !isAddingCareer;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `/api/master/careers/${editingCareer.id}` : '/api/master/careers';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCareer)
      });
      setIsCareerModalOpen(false);
      setEditingCareer(null);
      setIsAddingCareer(false);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Không thể lưu nghề nghiệp');
    }
  };

  const handleDeleteCareer = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa nghề nghiệp này?')) return;
    try {
      await fetch(`/api/master/careers/${id}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa nghề nghiệp');
    }
  };

  const handleToggleCareerStatus = async (career: CareerMatrixItem) => {
    const nextStatus = career.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/master/careers/${career.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi đổi trạng thái nghề');
    }
  };

  // Question Action
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;
    try {
      await fetch(`/api/questions/${editingQuestion.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingQuestion)
      });
      setIsQuestionModalOpen(false);
      setEditingQuestion(null);
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi cập nhật câu hỏi');
    }
  };

  const handleDeleteQuestion = async (id: string | number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) return;
    try {
      await fetch(`/api/questions/${id}`, { method: 'DELETE' });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi xóa câu hỏi');
    }
  };

  const handleToggleQuestionStatus = async (q: AssessmentQuestion) => {
    const nextStatus = q.status === 'active' ? 'inactive' : 'active';
    try {
      await fetch(`/api/questions/${q.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      setRefreshTrigger((v) => v + 1);
    } catch (err) {
      alert('Lỗi cập nhật câu hỏi');
    }
  };

  // Tải file Excel mẫu câu hỏi
  const handleDownloadExcelTemplate = () => {
    const templateData = [
      {
        'Loại Bài Test (HOLLAND hoặc DISC)': 'DISC',
        'Mốc Câu (20, 50 hoặc 70)': 20,
        'Thứ Tự Câu': 1,
        'Tiêu Đề / Tình Huống': 'Nếu phải nói trước 200 người, bạn cảm thấy thế nào?',
        'Đáp Án A': 'Tự tin, hào hứng làm chủ sân khấu',
        'Thuộc Tính A': 'D',
        'Đáp Án B': 'Thích thú kết nối, pha trò tạo không khí',
        'Thuộc Tính B': 'I',
        'Đáp Án C': 'Bình tĩnh chuẩn bị chu đáo để trình bày rõ ràng',
        'Thuộc Tính C': 'S',
        'Đáp Án D': 'Chuẩn bị dữ liệu cẩn thận, hơi lo lắng về độ chính xác',
        'Thuộc Tính D': 'C'
      },
      {
        'Loại Bài Test (HOLLAND hoặc DISC)': 'HOLLAND',
        'Mốc Câu (20, 50 hoặc 70)': 20,
        'Thứ Tự Câu': 1,
        'Tiêu Đề / Tình Huống': 'Bạn thích tham gia hoạt động nào nhất trong ngày hội khoa học?',
        'Đáp Án A': 'Lắp ráp mô hình cơ khí, chế tạo mạch điện',
        'Thuộc Tính A': 'R',
        'Đáp Án B': 'Quan sát thí nghiệm sinh học, phân tích mẫu vật',
        'Thuộc Tính B': 'I',
        'Đáp Án C': 'Thiết kế áp phích, vẽ tranh cổ động sáng tạo',
        'Thuộc Tính C': 'A',
        'Đáp Án D': 'Hướng dẫn, giải thích cho các bạn học sinh khác',
        'Thuộc Tính D': 'S'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'MauCauHoi');
    XLSX.writeFile(workbook, 'Mau_Import_Ngan_Hang_Cau_Hoi_EduCareer.xlsx');
  };

  // Import file Excel câu hỏi
  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

        if (!rawData || rawData.length === 0) {
          alert('File Excel không có dữ liệu!');
          return;
        }

        const parsedQuestions = rawData.map((row, idx) => {
          const type = (
            row['Loại Bài Test (HOLLAND hoặc DISC)'] ||
            row['Loại Bài Test'] ||
            row['Loại'] ||
            row['Type'] ||
            'HOLLAND'
          ).toString().trim().toUpperCase();

          const tier = parseInt(
            row['Mốc Câu (20, 50 hoặc 70)'] || row['Mốc Câu'] || row['Tier'] || 20,
            10
          );
          const order = parseInt(row['Thứ Tự Câu'] || row['STT'] || idx + 1, 10);
          const questionText = (
            row['Tiêu Đề / Tình Huống'] ||
            row['Nội Dung Câu Hỏi'] ||
            row['Câu Hỏi'] ||
            row['Question'] ||
            ''
          ).toString().trim();

          const optA = (row['Đáp Án A'] || row['Phương Án A'] || row['A'] || '').toString().trim();
          const traitA = (row['Thuộc Tính A'] || (type === 'DISC' ? 'D' : 'R')).toString().trim().toUpperCase();

          const optB = (row['Đáp Án B'] || row['Phương Án B'] || row['B'] || '').toString().trim();
          const traitB = (row['Thuộc Tính B'] || (type === 'DISC' ? 'I' : 'I')).toString().trim().toUpperCase();

          const optC = (row['Đáp Án C'] || row['Phương Án C'] || row['C'] || '').toString().trim();
          const traitC = (row['Thuộc Tính C'] || (type === 'DISC' ? 'S' : 'A')).toString().trim().toUpperCase();

          const optD = (row['Đáp Án D'] || row['Phương Án D'] || row['D'] || '').toString().trim();
          const traitD = (row['Thuộc Tính D'] || (type === 'DISC' ? 'C' : 'S')).toString().trim().toUpperCase();

          const options: any[] = [];
          if (optA) options.push({ id: `opt_${Date.now()}_a_${idx}`, label: 'A', text: optA, [type === 'DISC' ? 'discTrait' : 'hollandTrait']: traitA, weight: 1 });
          if (optB) options.push({ id: `opt_${Date.now()}_b_${idx}`, label: 'B', text: optB, [type === 'DISC' ? 'discTrait' : 'hollandTrait']: traitB, weight: 1 });
          if (optC) options.push({ id: `opt_${Date.now()}_c_${idx}`, label: 'C', text: optC, [type === 'DISC' ? 'discTrait' : 'hollandTrait']: traitC, weight: 1 });
          if (optD) options.push({ id: `opt_${Date.now()}_d_${idx}`, label: 'D', text: optD, [type === 'DISC' ? 'discTrait' : 'hollandTrait']: traitD, weight: 1 });

          return {
            type,
            tier,
            question_order: order,
            title: `Câu hỏi ${order}`,
            scenario: questionText,
            options,
            status: 'active'
          };
        }).filter(q => q.scenario && q.options.length >= 2);

        if (parsedQuestions.length === 0) {
          alert('Không tìm thấy câu hỏi hợp lệ trong file Excel. Vui lòng kiểm tra lại cấu trúc cột theo file mẫu!');
          return;
        }

        if (!confirm(`Hệ thống đã nhận diện được ${parsedQuestions.length} câu hỏi từ file Excel. Bạn có muốn nạp vào ngân hàng câu hỏi ngay bây giờ?`)) {
          return;
        }

        setIsLoading(true);
        const res = await fetch('/api/questions/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ questions: parsedQuestions })
        });
        const result = await res.json();

        if (res.ok) {
          alert(`✅ Import thành công ${result.count || parsedQuestions.length} câu hỏi vào ngân hàng!`);
          setRefreshTrigger((v) => v + 1);
        } else {
          alert(`❌ Lỗi: ${result.error || 'Không thể lưu câu hỏi'}`);
        }
      } catch (err) {
        console.error('Lỗi đọc file Excel:', err);
        alert('Lỗi xử lý file Excel. Vui lòng kiểm tra định dạng file .xlsx hoặc .xls!');
      } finally {
        setIsLoading(false);
        e.target.value = ''; // Reset input
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="space-y-6">
      {/* Main Layout: Vertical Sidebar + Content Area */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Vertical Sidebar Navigation (Menu Dọc) */}
        <aside className="w-full lg:w-80 bg-white rounded-3xl p-3 border border-slate-200 shadow-sm shrink-0 space-y-1">
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Quản Trị
            </span>
            <button
              onClick={() => setRefreshTrigger((v) => v + 1)}
              title="Làm mới dữ liệu"
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-[#FF5722] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Làm mới</span>
            </button>
          </div>
          {[
            { id: 'users', label: 'Quản Lý User', icon: Users, count: userTotal },
            { id: 'history', label: 'Lịch Sử Thi Holland & DISC', icon: GraduationCap, count: historyTotal },
            { id: 'questions', label: 'Ngân Hàng Câu Hỏi', icon: HelpCircle, count: questionTotal },
            { id: 'holland', label: 'Nhóm Holland', icon: BookOpen },
            { id: 'disc', label: 'Nhóm DISC', icon: Layers },
            { id: 'majors', label: 'Ngành Đào Tạo & Đầu Ra', icon: School, count: majorsTotal },
            { id: 'careers', label: 'Nghề Nghiệp & Ma Trận', icon: Briefcase, count: careersTotal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#FF5722] text-white shadow-md shadow-[#FF5722]/30'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-[#FF5722]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ml-2 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">

      {/* ========================================================================= */}
      {/* 1. USERS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-rose-600" />
                <span>Danh Sách Người Dùng & Học Sinh THPT</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thêm, sửa, xóa, khóa/hủy hoạt động tài khoản và xem lịch sử thi cá nhân
              </p>
            </div>

            <button
              onClick={() => {
                setEditingUser({
                  id: 'usr_' + Date.now(),
                  email: '',
                  name: '',
                  role: 'student',
                  school: 'THPT ',
                  grade: 'Lớp 12',
                  status: 'active'
                });
                setIsUserModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Người Dùng</span>
            </button>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm họ tên, email, trường THPT..."
                value={userSearch}
                onChange={(e) => {
                  setUserSearch(e.target.value);
                  setUserPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <select
                value={userRoleFilter}
                onChange={(e) => {
                  setUserRoleFilter(e.target.value);
                  setUserPage(1);
                }}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="student">Học sinh THPT</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>

            <div>
              <select
                value={userStatusFilter}
                onChange={(e) => {
                  setUserStatusFilter(e.target.value);
                  setUserPage(1);
                }}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="inactive">Đã hủy hoạt động</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] whitespace-nowrap">
                <tr>
                  <th className="p-3 whitespace-nowrap">Họ Tên & Email</th>
                  <th className="p-3 whitespace-nowrap text-center">Vai Trò</th>
                  <th className="p-3 whitespace-nowrap">Trường THPT</th>
                  <th className="p-3 whitespace-nowrap text-center">Trạng Thái</th>
                  <th className="p-3 whitespace-nowrap">Lần Hoạt Động Cuối</th>
                  <th className="p-3 text-right whitespace-nowrap">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-xs text-slate-500">{u.email}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          u.role === 'admin'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}
                      >
                        {u.role === 'admin' ? 'Admin' : 'Học sinh'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700 whitespace-nowrap">
                      <div>{u.school || 'THPT'}</div>
                      <div className="text-[11px] text-slate-400">{u.grade || 'Lớp 12'}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          u.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {u.status === 'active' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-slate-400" />
                        )}
                        <span>{u.status === 'active' ? 'Hoạt động' : 'Hủy hoạt động'}</span>
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-500 whitespace-nowrap">
                      {u.last_active
                        ? new Date(u.last_active).toLocaleString('vi-VN')
                        : 'Mới tạo'}
                    </td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleUserStatus(u)}
                        title={u.status === 'active' ? 'Hủy hoạt động' : 'Kích hoạt lại'}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingUser(u);
                          setIsUserModalOpen(true);
                        }}
                        title="Chỉnh sửa thông tin"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        title="Xóa người dùng"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Tổng số: <strong className="text-slate-800">{userTotal}</strong> người dùng • Trang <strong className="text-slate-800">{userPage}</strong>/
              {Math.ceil(userTotal / 10) || 1}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button
                disabled={userPage <= 1}
                onClick={() => setUserPage((p) => p - 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(Math.ceil(userTotal / 10) || 1, 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserPage(idx + 1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    userPage === idx + 1
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {Math.ceil(userTotal / 10) > 5 && (
                <span className="px-1 text-slate-400 text-xs">...</span>
              )}
              <button
                disabled={userPage >= Math.ceil(userTotal / 10)}
                onClick={() => setUserPage((p) => p + 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TEST HISTORY TAB & CERTIFICATE PRINTING (Lịch Sử Thi Holland & DISC) */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-orange-600" />
                <span>Lịch Sử Thi Holland & DISC & Báo Cáo Định Hướng Học Sinh</span>
              </h3>
              <p className="text-xs text-slate-500">
                Xem chi tiết kết quả bài thi Holland & DISC, in phiếu đánh giá riêng lẻ hoặc chọn in hàng loạt cho cả lớp
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintBatchHistory}
                disabled={selectedHistoryIds.length === 0}
                className="px-4 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>In Hàng Loạt ({selectedHistoryIds.length})</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm tên học sinh, email, ngành..."
                value={historySearch}
                onChange={(e) => {
                  setHistorySearch(e.target.value);
                  setHistoryPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <select
                value={historyTierFilter}
                onChange={(e) => {
                  setHistoryTierFilter(e.target.value);
                  setHistoryPage(1);
                }}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="all">Tất cả mốc câu hỏi</option>
                <option value="20">Mốc 20 câu</option>
                <option value="50">Mốc 50 câu</option>
                <option value="70">Mốc 70 câu</option>
              </select>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={handleSelectAllHistory}
                className="text-xs text-orange-600 hover:underline font-bold"
              >
                {selectedHistoryIds.length === historyList.length
                  ? 'Bỏ chọn tất cả'
                  : 'Chọn tất cả trang này'}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] whitespace-nowrap">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={
                        historyList.length > 0 &&
                        selectedHistoryIds.length === historyList.length
                      }
                      onChange={handleSelectAllHistory}
                      className="rounded text-orange-600"
                    />
                  </th>
                  <th className="p-3 whitespace-nowrap">Học Sinh THPT</th>
                  <th className="p-3 whitespace-nowrap text-center">Mốc Câu</th>
                  <th className="p-3 whitespace-nowrap">Holland & DISC</th>
                  <th className="p-3 whitespace-nowrap">Ngành Tư Vấn</th>
                  <th className="p-3 whitespace-nowrap">Thời Gian Thi</th>
                  <th className="p-3 text-right whitespace-nowrap">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historyList.map((h) => {
                  const isChecked = selectedHistoryIds.includes(h.id);
                  return (
                    <tr
                      key={h.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isChecked ? 'bg-orange-50/40' : ''
                      }`}
                    >
                      <td className="p-3 text-center whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectHistory(h.id)}
                          className="rounded text-orange-600"
                        />
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{h.studentName}</div>
                        <div className="text-xs text-slate-500">{h.userEmail}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          {h.tier || 20} câu
                        </span>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="font-bold text-slate-800">
                          Nhóm {h.primaryHolland} • {h.primaryDisc}
                        </div>
                      </td>
                      <td className="p-3 text-xs font-semibold text-emerald-800 whitespace-nowrap">
                        {h.finalMajorName || 'Đa ngành'}
                      </td>
                      <td className="p-3 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(h.testDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => {
                            setIsAutoPrintSingle(false);
                            setViewingDetailReport(h);
                          }}
                          title="Xem chi tiết báo cáo và định hướng học sinh"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-600" />
                          <span>Chi Tiết</span>
                        </button>
                        <button
                          onClick={() => handlePrintSingleHistory(h)}
                          title="In chi tiết phiếu kết quả học sinh này"
                          className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5 text-orange-600" />
                          <span>In Phiếu</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Tổng số: <strong className="text-slate-800">{historyTotal}</strong> kết quả thi • Trang <strong className="text-slate-800">{historyPage}</strong>/
              {Math.ceil(historyTotal / 10) || 1}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button
                disabled={historyPage <= 1}
                onClick={() => setHistoryPage((p) => p - 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(Math.ceil(historyTotal / 10) || 1, 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHistoryPage(idx + 1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    historyPage === idx + 1
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {Math.ceil(historyTotal / 10) > 5 && (
                <span className="px-1 text-slate-400 text-xs">...</span>
              )}
              <button
                disabled={historyPage >= Math.ceil(historyTotal / 10)}
                onClick={() => setHistoryPage((p) => p + 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. QUESTION BANK TAB */}
      {/* ========================================================================= */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Ngân Hàng Câu Hỏi Holland & DISC </span>
              </h3>
      
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleDownloadExcelTemplate}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Tải file Excel mẫu để nhập liệu câu hỏi"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>Tải File Mẫu Excel</span>
              </button>

              <label className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all cursor-pointer">
                <FileSpreadsheet className="w-4 h-4" />
                <span>Import Excel Câu Hỏi</span>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleImportExcel}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setEditingQuestion({
                    id: 'q_' + Date.now(),
                    type: 'HOLLAND',
                    tier: 20,
                    question_order: questionTotal + 1,
                    title: `Câu hỏi ${questionTotal + 1}`,
                    scenario: '',
                    options: [
                      { id: `opt_${Date.now()}_a`, label: 'A', text: '', hollandTrait: 'R', weight: 1 },
                      { id: `opt_${Date.now()}_b`, label: 'B', text: '', hollandTrait: 'I', weight: 1 },
                      { id: `opt_${Date.now()}_c`, label: 'C', text: '', hollandTrait: 'A', weight: 1 },
                      { id: `opt_${Date.now()}_d`, label: 'D', text: '', hollandTrait: 'S', weight: 1 }
                    ],
                    status: 'active'
                  });
                  setIsQuestionModalOpen(true);
                }}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm Câu Hỏi</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm nội dung câu hỏi..."
                value={questionSearch}
                onChange={(e) => {
                  setQuestionSearch(e.target.value);
                  setQuestionPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              />
            </div>

            <div>
              <select
                value={questionTypeFilter}
                onChange={(e) => {
                  setQuestionTypeFilter(e.target.value);
                  setQuestionPage(1);
                }}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="all">Tất cả loại bài test (Holland & DISC)</option>
                <option value="HOLLAND">Bài Test 1: Holland RIASEC</option>
                <option value="DISC">Bài Test 2: DISC</option>
              </select>
            </div>

            <div>
              <select
                value={questionTierFilter}
                onChange={(e) => {
                  setQuestionTierFilter(e.target.value);
                  setQuestionPage(1);
                }}
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              >
                <option value="all">Tất cả mốc câu hỏi</option>
                <option value="20">Mốc 20 câu</option>
                <option value="50">Mốc 50 câu</option>
                <option value="70">Mốc 70 câu</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] whitespace-nowrap">
                <tr>
                  <th className="p-3 w-16 text-center">Thứ Tự</th>
                  <th className="p-3 whitespace-nowrap">Loại / Mốc</th>
                  <th className="p-3 min-w-[360px]">Nội Dung Câu Hỏi</th>
                  <th className="p-3 whitespace-nowrap text-center">Số Đáp Án</th>
                  <th className="p-3 whitespace-nowrap text-center">Trạng Thái</th>
                  <th className="p-3 text-right whitespace-nowrap">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {questionsList.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-bold text-slate-800 text-center whitespace-nowrap">
                      #{q.question_order || q.id}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                            q.type === 'HOLLAND'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-sky-100 text-sky-900'
                          }`}
                        >
                          {q.type}
                        </span>
                        <span className="text-[11px] text-slate-500 shrink-0 font-medium">Mốc {q.tier} câu</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium text-slate-800 leading-relaxed">
                      {q.scenario}
                    </td>
                    <td className="p-3 text-xs text-slate-600 whitespace-nowrap text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 font-medium">
                        {q.options?.length || 4} phương án
                      </span>
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                          q.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {q.status === 'active' ? 'Hoạt động' : 'Hủy hoạt động'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleQuestionStatus(q)}
                        title="Đổi trạng thái"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingQuestion(q);
                          setIsQuestionModalOpen(true);
                        }}
                        title="Chỉnh sửa câu hỏi"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        title="Xóa câu hỏi"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Tổng số: <strong className="text-slate-800">{questionTotal}</strong> câu hỏi • Trang <strong className="text-slate-800">{questionPage}</strong>/
              {Math.ceil(questionTotal / 10) || 1}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button
                disabled={questionPage <= 1}
                onClick={() => setQuestionPage((p) => p - 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(Math.ceil(questionTotal / 10) || 1, 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuestionPage(idx + 1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    questionPage === idx + 1
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {Math.ceil(questionTotal / 10) > 5 && (
                <span className="px-1 text-slate-400 text-xs">...</span>
              )}
              <button
                disabled={questionPage >= Math.ceil(questionTotal / 10)}
                onClick={() => setQuestionPage((p) => p + 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5 & 6. MASTER DATA: HOLLAND & DISC */}
      {/* ========================================================================= */}
      {activeTab === 'holland' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>Quản Lý Danh Mục Nhóm Holland (RIASEC)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thêm, sửa, xóa nhóm tính cách nghề nghiệp và cập nhật ảnh minh họa trực quan
              </p>
            </div>

            <button
              onClick={() => {
                setEditingHolland({
                  code: '',
                  name: '',
                  full_name: '',
                  description: '',
                  image_url: '',
                  status: 'active'
                });
                setIsAddingHolland(true);
                setIsHollandModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Nhóm Holland</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {hollandGroups.map((h) => (
              <div
                key={h.code}
                className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                {/* Image Banner */}
                <div className="h-36 w-full bg-slate-100 relative overflow-hidden">
                  {h.image_url ? (
                    <img
                      src={formatImageUrl(h.image_url)}
                      alt={h.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/90 backdrop-blur-xs font-black text-amber-600 shadow-xs text-sm">
                    Nhóm {h.code}
                  </div>
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                      h.status === 'active'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-500 text-white'
                    }`}
                  >
                    {h.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{h.name}</h4>
                    <p className="text-xs text-amber-700 font-medium">{h.full_name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 pt-1">
                      {h.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleHollandStatus(h)}
                      title="Đổi trạng thái"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingHolland(h);
                        setIsAddingHolland(false);
                        setIsHollandModalOpen(true);
                      }}
                      title="Sửa thông tin"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteHolland(h.code)}
                      title="Xóa nhóm"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'disc' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                <span>Quản Lý Danh Mục Nhóm DISC (D - I - S - C)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thêm, sửa, xóa nhóm hành vi DISC và cập nhật ảnh đại diện minh họa trực quan
              </p>
            </div>

            <button
              onClick={() => {
                setEditingDisc({
                  code: '',
                  name: '',
                  color: '#3B82F6',
                  characteristics: '',
                  image_url: '',
                  status: 'active'
                });
                setIsAddingDisc(true);
                setIsDiscModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Nhóm DISC</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {discGroups.map((d) => (
              <div
                key={d.code}
                className="rounded-3xl border border-slate-200 bg-white shadow-2xs overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
              >
                {/* Image Banner */}
                <div className="h-40 w-full bg-slate-100 relative overflow-hidden">
                  {d.image_url ? (
                    <img
                      src={formatImageUrl(d.image_url)}
                      alt={d.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                      <ImageIcon className="w-8 h-8 opacity-40" />
                    </div>
                  )}
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-xs font-black shadow-xs text-sm"
                    style={{ color: d.color }}
                  >
                    Nhóm {d.code}
                  </div>
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs ${
                      d.status === 'active'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-500 text-white'
                    }`}
                  >
                    {d.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">{d.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {d.characteristics}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleToggleDiscStatus(d)}
                      title="Đổi trạng thái"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingDisc(d);
                        setIsAddingDisc(false);
                        setIsDiscModalOpen(true);
                      }}
                      title="Sửa thông tin"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDisc(d.code)}
                      title="Xóa nhóm"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MAJORS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'majors' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <School className="w-5 h-5 text-emerald-600" />
                <span>Quản Lý Ngành Đào Tạo Đại Học & Vị Trí Đầu Ra</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thêm, sửa, xóa, khóa/hủy hoạt động ngành và cập nhật đầu ra tuyển dụng
              </p>
            </div>

            <button
              onClick={() => {
                setEditingMajor({
                  id: 'maj_' + Date.now(),
                  name: '',
                  code: '',
                  category: 'Công nghệ & Kỹ thuật',
                  typicalHolland: 'I',
                  description: '',
                  image_url: '',
                  careerOutcomes: []
                });
                setIsAddingMajor(true);
                setIsMajorModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Ngành Đào Tạo</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] whitespace-nowrap">
                <tr>
                  <th className="p-3 w-16 text-center">Hình Ảnh</th>
                  <th className="p-3 whitespace-nowrap">Mã Ngành & Tên</th>
                  <th className="p-3 whitespace-nowrap">Khối Ngành</th>
                  <th className="p-3 whitespace-nowrap text-center">Holland Chuẩn</th>
                  <th className="p-3 min-w-[260px]">Vị Trí Đầu Ra Tuyển Dụng</th>
                  <th className="p-3 whitespace-nowrap text-center">Trạng Thái</th>
                  <th className="p-3 text-right whitespace-nowrap">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {majorsList.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 text-center whitespace-nowrap">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center mx-auto">
                        {m.image_url ? (
                          <img
                            src={formatImageUrl(m.image_url)}
                            alt={m.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <School className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-xs text-slate-500">Mã: {m.code}</div>
                    </td>
                    <td className="p-3 text-slate-700 whitespace-nowrap">{m.category}</td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                        Nhóm {m.typicalHolland}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-slate-600 leading-relaxed">
                      {m.careerOutcomes?.slice(0, 3).join(', ')}...
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                          m.status !== 'inactive'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {m.status !== 'inactive' ? 'Hoạt động' : 'Hủy hoạt động'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleMajorStatus(m)}
                        title="Đổi trạng thái"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingMajor(m);
                          setIsAddingMajor(false);
                          setIsMajorModalOpen(true);
                        }}
                        title="Sửa ngành"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMajor(m.id)}
                        title="Xóa ngành"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Majors */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Tổng số: <strong className="text-slate-800">{majorsTotal}</strong> ngành học • Trang <strong className="text-slate-800">{majorsPage}</strong>/
              {Math.ceil(majorsTotal / 10) || 1}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button
                disabled={majorsPage <= 1}
                onClick={() => setMajorsPage((p) => p - 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(Math.ceil(majorsTotal / 10) || 1, 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setMajorsPage(idx + 1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    majorsPage === idx + 1
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {Math.ceil(majorsTotal / 10) > 5 && (
                <span className="px-1 text-slate-400 text-xs">...</span>
              )}
              <button
                disabled={majorsPage >= Math.ceil(majorsTotal / 10)}
                onClick={() => setMajorsPage((p) => p + 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. CAREERS & MATRIX TAB */}
      {/* ========================================================================= */}
      {activeTab === 'careers' && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky-600" />
                <span>Quản Lý Nghề Nghiệp & Ma Trận Chéo (Holland × DISC)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Thêm, sửa, xóa, khóa/hủy hoạt động nghề và cập nhật mức thu nhập, tổ hợp xét tuyển
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCareer({
                  id: 'car_' + Date.now(),
                  holland: 'I',
                  hollandLabel: 'I – NGHIÊN CỨU',
                  disc: 'D',
                  discLabel: 'D – Quyết đoán',
                  jobTitle: '',
                  universityMajor: '',
                  majorCode: '',
                  admissionCombinations: ['A00', 'A01'],
                  description: '',
                  keySkills: [],
                  suitableRoles: [],
                  topUniversities: [],
                  averageSalaryRange: '15 - 30 triệu VNĐ/tháng',
                  growthPotential: 'Rất cao',
                  image_url: ''
                });
                setIsAddingCareer(true);
                setIsCareerModalOpen(true);
              }}
              className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Nghề Nghiệp</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[11px] whitespace-nowrap">
                <tr>
                  <th className="p-3 whitespace-nowrap">Tên Nghề & Chức Danh</th>
                  <th className="p-3 whitespace-nowrap text-center">Giao Điểm Holland × DISC</th>
                  <th className="p-3 whitespace-nowrap">Ngành Học Phù Hợp</th>
                  <th className="p-3 whitespace-nowrap">Thu Nhập Bình Quân</th>
                  <th className="p-3 whitespace-nowrap text-center">Trạng Thái</th>
                  <th className="p-3 text-right whitespace-nowrap">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {careersList.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{c.jobTitle}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">
                        {c.description}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                          {c.holland}
                        </span>
                        <span className="text-slate-400">×</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
                          {c.disc}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-800 font-medium whitespace-nowrap">
                      <div>{c.universityMajor}</div>
                      <div className="text-[11px] text-slate-500">Mã: {c.majorCode}</div>
                    </td>
                    <td className="p-3 text-xs font-semibold text-emerald-800 whitespace-nowrap">
                      {c.averageSalaryRange}
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold whitespace-nowrap ${
                          c.status !== 'inactive'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status !== 'inactive' ? 'Hoạt động' : 'Hủy hoạt động'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => handleToggleCareerStatus(c)}
                        title="Đổi trạng thái"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 cursor-pointer"
                      >
                        <ShieldAlert className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingCareer(c);
                          setIsAddingCareer(false);
                          setIsCareerModalOpen(true);
                        }}
                        title="Sửa nghề"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 cursor-pointer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCareer(c.id)}
                        title="Xóa nghề"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Careers */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 text-center sm:text-left">
              Tổng số: <strong className="text-slate-800">{careersTotal}</strong> nghề nghiệp • Trang <strong className="text-slate-800">{careersPage}</strong>/
              {Math.ceil(careersTotal / 10) || 1}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button
                disabled={careersPage <= 1}
                onClick={() => setCareersPage((p) => p - 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(Math.ceil(careersTotal / 10) || 1, 5) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCareersPage(idx + 1)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                    careersPage === idx + 1
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              {Math.ceil(careersTotal / 10) > 5 && (
                <span className="px-1 text-slate-400 text-xs">...</span>
              )}
              <button
                disabled={careersPage >= Math.ceil(careersTotal / 10)}
                onClick={() => setCareersPage((p) => p + 1)}
                className="p-1.5 rounded-xl border border-slate-200 disabled:opacity-30 cursor-pointer hover:bg-slate-50 transition-colors"
                title="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

        </div> {/* Close Content Area */}
      </div> {/* Close Main Layout flex */}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}
      {/* User Edit Modal */}
      {isUserModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveUser}
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
          >
            <h4 className="font-heading font-bold text-slate-900 text-base">
              Thông Tin Người Dùng / Học Sinh
            </h4>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Email</label>
              <input
                type="email"
                required
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Họ và tên</label>
              <input
                type="text"
                required
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Trường THPT</label>
              <input
                type="text"
                value={editingUser.school || ''}
                onChange={(e) => setEditingUser({ ...editingUser, school: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Vai trò</label>
              <select
                value={editingUser.role}
                onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              >
                <option value="student">Học sinh THPT</option>
                <option value="admin">Quản trị viên (Admin)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Lưu Người Dùng
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Holland Group Modal */}
      {isHollandModalOpen && editingHolland && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveHolland}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>{isAddingHolland ? 'Thêm Nhóm Holland Mới' : 'Sửa Nhóm Holland'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsHollandModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Mã Nhóm (R, I, A, S, E, C)</label>
                <input
                  type="text"
                  required
                  maxLength={2}
                  disabled={!isAddingHolland}
                  placeholder="VD: R"
                  value={editingHolland.code}
                  onChange={(e) => setEditingHolland({ ...editingHolland, code: e.target.value.toUpperCase() as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Trạng Thái</label>
                <select
                  value={editingHolland.status || 'active'}
                  onChange={(e) => setEditingHolland({ ...editingHolland, status: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Tên Tiếng Việt Ngắn</label>
                <input
                  type="text"
                  required
                  placeholder="VD: R - Kỹ thuật"
                  value={editingHolland.name}
                  onChange={(e) => setEditingHolland({ ...editingHolland, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Tên Đầy Đủ & Ý Nghĩa</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Realistic - Nhóm Kỹ thuật..."
                  value={editingHolland.full_name}
                  onChange={(e) => setEditingHolland({ ...editingHolland, full_name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Đường Dẫn Ảnh Minh Họa (Hỗ trợ URL trực tiếp, Google Drive...)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/... hoặc link ảnh trực tiếp"
                value={editingHolland.image_url || ''}
                onChange={(e) => setEditingHolland({ ...editingHolland, image_url: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
              {editingHolland.image_url && (
                <div className="mt-2 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img
                    src={formatImageUrl(editingHolland.image_url)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Mô Tả Chi Tiết Hành Vi & Sở Thích</label>
              <textarea
                rows={2}
                required
                placeholder="Mô tả tóm tắt tính cách, đặc điểm sở thích công việc..."
                value={editingHolland.description}
                onChange={(e) => setEditingHolland({ ...editingHolland, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsHollandModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {isAddingHolland ? 'Thêm Nhóm Holland' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DISC Group Modal */}
      {isDiscModalOpen && editingDisc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveDisc}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <Layers className="w-5 h-5 text-sky-600" />
                <span>{isAddingDisc ? 'Thêm Nhóm DISC Mới' : 'Sửa Nhóm DISC'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsDiscModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Mã (D, I, S, C)</label>
                <input
                  type="text"
                  required
                  maxLength={1}
                  disabled={!isAddingDisc}
                  placeholder="VD: D"
                  value={editingDisc.code}
                  onChange={(e) => setEditingDisc({ ...editingDisc, code: e.target.value.toUpperCase() as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Màu Chủ Đạo</label>
                <input
                  type="text"
                  placeholder="#3B82F6"
                  value={editingDisc.color}
                  onChange={(e) => setEditingDisc({ ...editingDisc, color: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Trạng Thái</label>
                <select
                  value={editingDisc.status || 'active'}
                  onChange={(e) => setEditingDisc({ ...editingDisc, status: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tên Nhóm (VD: D - Quyết đoán (Dominance))</label>
              <input
                type="text"
                required
                placeholder="VD: D – Thống trị (Quyết đoán)"
                value={editingDisc.name}
                onChange={(e) => setEditingDisc({ ...editingDisc, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Đường Dẫn Ảnh Minh Họa (Hỗ trợ URL trực tiếp, Google Drive...)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/... hoặc link ảnh trực tiếp"
                value={editingDisc.image_url || ''}
                onChange={(e) => setEditingDisc({ ...editingDisc, image_url: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
              {editingDisc.image_url && (
                <div className="mt-2 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img
                    src={formatImageUrl(editingDisc.image_url)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Đặc Điểm Tính Cách & Phong Cách Làm Việc</label>
              <textarea
                rows={2}
                required
                placeholder="Mô tả tóm tắt phong cách làm việc, hành vi nổi trội..."
                value={editingDisc.characteristics}
                onChange={(e) => setEditingDisc({ ...editingDisc, characteristics: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsDiscModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {isAddingDisc ? 'Thêm Nhóm DISC' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Major Edit Modal */}
      {isMajorModalOpen && editingMajor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveMajor}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <School className="w-5 h-5 text-emerald-600" />
                <span>{isAddingMajor ? 'Thêm Ngành Đào Tạo Mới' : 'Sửa Ngành Đào Tạo'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsMajorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Mã Ngành (Bộ GD&ĐT)</label>
                <input
                  type="text"
                  required
                  placeholder="VD: 7480201"
                  value={editingMajor.code}
                  onChange={(e) => setEditingMajor({ ...editingMajor, code: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nhóm Holland Chuẩn</label>
                <select
                  value={editingMajor.typicalHolland}
                  onChange={(e) => setEditingMajor({ ...editingMajor, typicalHolland: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold text-amber-700"
                >
                  <option value="R">R - Kỹ thuật</option>
                  <option value="I">I - Nghiên cứu</option>
                  <option value="A">A - Nghệ thuật</option>
                  <option value="S">S - Xã hội</option>
                  <option value="E">E - Quản lý</option>
                  <option value="C">C - Nghiệp vụ</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Tên Ngành Đào Tạo</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Công nghệ Thông tin"
                  value={editingMajor.name}
                  onChange={(e) => setEditingMajor({ ...editingMajor, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Khối Ngành / Lĩnh Vực</label>
                <input
                  type="text"
                  required
                  placeholder="VD: CNTT & Kỹ thuật"
                  value={editingMajor.category}
                  onChange={(e) => setEditingMajor({ ...editingMajor, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Đường Dẫn Ảnh Minh Họa (Hỗ trợ URL trực tiếp, Google Drive...)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/... hoặc link ảnh trực tiếp"
                value={editingMajor.image_url || ''}
                onChange={(e) => setEditingMajor({ ...editingMajor, image_url: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
              {editingMajor.image_url && (
                <div className="mt-2 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                  <img
                    src={formatImageUrl(editingMajor.image_url)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Mô Tả Mục Tiêu Ngành</label>
              <textarea
                rows={2}
                placeholder="Mô tả tóm tắt chương trình và kỹ năng trang bị..."
                value={editingMajor.description}
                onChange={(e) => setEditingMajor({ ...editingMajor, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Vị Trí Việc Làm Đầu Ra Tuyển Dụng (Phân cách bằng dấu phẩy)
              </label>
              <input
                type="text"
                placeholder="Lập trình viên, Kỹ sư dữ liệu, Chuyên viên phân tích..."
                value={editingMajor.careerOutcomes?.join(', ') || ''}
                onChange={(e) =>
                  setEditingMajor({
                    ...editingMajor,
                    careerOutcomes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })
                }
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsMajorModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {isAddingMajor ? 'Thêm Ngành Học' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Career Matrix Modal */}
      {isCareerModalOpen && editingCareer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveCareer}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-sky-600" />
                <span>{isAddingCareer ? 'Thêm Nghề Nghiệp Mới' : 'Sửa Nghề Nghiệp'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsCareerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Giao Holland</label>
                <select
                  value={editingCareer.holland}
                  onChange={(e) => setEditingCareer({ ...editingCareer, holland: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold text-amber-700"
                >
                  <option value="R">R - Kỹ thuật</option>
                  <option value="I">I - Nghiên cứu</option>
                  <option value="A">A - Nghệ thuật</option>
                  <option value="S">S - Xã hội</option>
                  <option value="E">E - Quản trị</option>
                  <option value="C">C - Nghiệp vụ</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Giao DISC</label>
                <select
                  value={editingCareer.disc}
                  onChange={(e) => setEditingCareer({ ...editingCareer, disc: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold text-sky-700"
                >
                  <option value="D">D - Quyết đoán</option>
                  <option value="I">I - Khích lệ</option>
                  <option value="S">S - Tận tâm</option>
                  <option value="C">C - Chuẩn mực</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tên Chức Danh / Vị Trí Nghề Nghiệp</label>
              <input
                type="text"
                required
                placeholder="VD: Kỹ sư Phần mềm (Software Engineer)"
                value={editingCareer.jobTitle}
                onChange={(e) => setEditingCareer({ ...editingCareer, jobTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Ngành Đại Học</label>
                <input
                  type="text"
                  required
                  placeholder="Công nghệ Thông tin"
                  value={editingCareer.universityMajor}
                  onChange={(e) => setEditingCareer({ ...editingCareer, universityMajor: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Mã Ngành</label>
                <input
                  type="text"
                  required
                  placeholder="7480201"
                  value={editingCareer.majorCode}
                  onChange={(e) => setEditingCareer({ ...editingCareer, majorCode: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Đường Dẫn Ảnh Minh Họa (Hỗ trợ URL trực tiếp, Google Drive...)
              </label>
              <input
                type="url"
                placeholder="https://drive.google.com/file/d/... hoặc link ảnh trực tiếp"
                value={editingCareer.image_url || ''}
                onChange={(e) => setEditingCareer({ ...editingCareer, image_url: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
              {editingCareer.image_url && (
                <div className="mt-2 h-20 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                  <img
                    src={formatImageUrl(editingCareer.image_url)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Thu Nhập Bình Quân</label>
                <input
                  type="text"
                  placeholder="18 - 35 triệu VNĐ/tháng"
                  value={editingCareer.averageSalaryRange}
                  onChange={(e) => setEditingCareer({ ...editingCareer, averageSalaryRange: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Triển Vọng Phát Triển</label>
                <select
                  value={editingCareer.growthPotential}
                  onChange={(e) => setEditingCareer({ ...editingCareer, growthPotential: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="Rất cao">Rất cao</option>
                  <option value="Cao">Cao</option>
                  <option value="Ổn định">Ổn định</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Trường Đại Học Đào Tạo Tiêu Biểu (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="ĐH Bách Khoa Hà Nội, ĐH Xây dựng..."
                  value={editingCareer.topUniversities?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingCareer({
                      ...editingCareer,
                      topUniversities: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  Tổ Hợp Xét Tuyển (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  placeholder="A00, A01, D07..."
                  value={editingCareer.admissionCombinations?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingCareer({
                      ...editingCareer,
                      admissionCombinations: e.target.value.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean)
                    })
                  }
                  className="w-full px-3 py-2 border rounded-xl text-sm font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Mô Tả Chi Tiết Nghề Nghiệp</label>
              <textarea
                rows={2}
                placeholder="Mô tả tóm tắt cơ hội nghề nghiệp và tính chất công việc..."
                value={editingCareer.description}
                onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setIsCareerModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                {isAddingCareer ? 'Thêm Nghề Nghiệp' : 'Lưu Thay Đổi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Question Modal */}
      {isQuestionModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveQuestion}
            className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-3.5 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h4 className="font-heading font-bold text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <span>Chỉnh Sửa / Thêm Câu Hỏi</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Loại Test</label>
                <select
                  value={editingQuestion.type}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, type: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm font-bold"
                >
                  <option value="HOLLAND">HOLLAND</option>
                  <option value="DISC">DISC</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Mốc Câu</label>
                <select
                  value={editingQuestion.tier || 20}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, tier: parseInt(e.target.value, 10) as any })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                >
                  <option value="20">20 câu</option>
                  <option value="50">50 câu</option>
                  <option value="70">70 câu</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Thứ Tự Câu</label>
                <input
                  type="number"
                  value={editingQuestion.question_order || 1}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question_order: parseInt(e.target.value, 10) })}
                  className="w-full px-3 py-2 border rounded-xl text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Nội Dung / Tình Huống Câu Hỏi</label>
              <textarea
                rows={3}
                required
                value={editingQuestion.scenario}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, scenario: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-sm"
                placeholder="Nhập nội dung câu hỏi trắc nghiệm..."
              />
            </div>

            {/* Options list */}
            <div className="space-y-2 pt-2 border-t">
              <label className="text-xs font-bold text-slate-700 block">Danh Sách Phương Án Trả Lời:</label>
              {editingQuestion.options?.map((opt, idx) => (
                <div key={opt.id || idx} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700 font-mono">
                      Đáp Án {opt.label || String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 font-semibold">Thuộc tính:</span>
                      <input
                        type="text"
                        maxLength={2}
                        value={opt.discTrait || opt.hollandTrait || ''}
                        onChange={(e) => {
                          const val = e.target.value.toUpperCase();
                          const updated = [...editingQuestion.options];
                          if (editingQuestion.type === 'DISC') {
                            updated[idx] = { ...updated[idx], discTrait: val as any };
                          } else {
                            updated[idx] = { ...updated[idx], hollandTrait: val as any };
                          }
                          setEditingQuestion({ ...editingQuestion, options: updated });
                        }}
                        className="w-12 px-2 py-0.5 border rounded-lg text-xs font-mono font-bold text-center bg-white"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    required
                    value={opt.text}
                    onChange={(e) => {
                      const updated = [...editingQuestion.options];
                      updated[idx] = { ...updated[idx], text: e.target.value };
                      setEditingQuestion({ ...editingQuestion, options: updated });
                    }}
                    placeholder={`Nội dung đáp án ${String.fromCharCode(65 + idx)}...`}
                    className="w-full px-2.5 py-1.5 border rounded-lg text-xs bg-white"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                type="button"
                onClick={() => setIsQuestionModalOpen(false)}
                className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Lưu Câu Hỏi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Print Batch Reports Modal */}
      {isPrintModalOpen && printResults.length > 0 && (
        <PrintBatchReportsModal
          isOpen={isPrintModalOpen}
          results={printResults}
          onClose={() => {
            setIsPrintModalOpen(false);
            setPrintResults([]);
          }}
        />
      )}

      {/* Print / View Single Report Detail Modal */}
      {viewingDetailReport && (
        <PrintReportModal
          result={viewingDetailReport}
          autoPrint={isAutoPrintSingle}
          onClose={() => {
            setViewingDetailReport(null);
            setIsAutoPrintSingle(false);
          }}
        />
      )}
    </div>
  );
};
