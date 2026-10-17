/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Compass,
  ClipboardList,
  Briefcase,
  Info,
  Lock,
  ArrowRight,
  School,
  Award,
  Zap,
  CheckCircle,
  Users,
  Target
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { TestStatusCard } from './components/TestStatusCard.tsx';
import { AssessmentModal } from './components/AssessmentModal.tsx';
import { EvaluationSummary } from './components/EvaluationSummary.tsx';
import { CareerRecommendations } from './components/CareerRecommendations.tsx';
import { CareerMatrixTableView } from './components/CareerMatrixTableView.tsx';
import { HistoryView } from './components/HistoryView.tsx';
import { CareerDetailModal } from './components/CareerDetailModal.tsx';
import { PrintReportModal } from './components/PrintReportModal.tsx';
import { DiscHollandGuide } from './components/DiscHollandGuide.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { TierSelector } from './components/TierSelector.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { VisualCareerShowcase } from './components/VisualCareerShowcase.tsx';
import { Grade10SubjectCombinationCard } from './components/Grade10SubjectCombinationCard.tsx';

import { UNIVERSITY_MAJORS_LIST, CAREER_MATRIX_DATA } from './data/careerMatrix.ts';
import { QUESTIONS_BY_TIER } from './data/questionsService.ts';
import { calculateAssessmentScores, generateEvaluationAnalysis, filterCareers } from './utils/scoring.ts';
import type {
  AssessmentStatus,
  EvaluationResult,
  TestAnswers,
  UniversityMajor,
  CareerMatrixItem,
  UserProfile,
  QuestionTier
} from './types/career.ts';

const USER_SESSION_KEY = 'educareer_user_session';
const SESSION_ID = 'sess_' + Math.random().toString(36).substring(2, 9);

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'counseling' | 'matrix' | 'history' | 'guide' | 'admin'>('counseling');

  // User Authentication
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authRequiredForTest, setAuthRequiredForTest] = useState(false);

  // Question Tier: 20, 50, or 70
  const [selectedTier, setSelectedTier] = useState<QuestionTier>(20);

  // Chức năng 1 State: Tests & Evaluation
  const [selectedInitialMajor, setSelectedInitialMajor] = useState<UniversityMajor>(UNIVERSITY_MAJORS_LIST[0]);
  const [selectedRevisedMajor, setSelectedRevisedMajor] = useState<UniversityMajor>(UNIVERSITY_MAJORS_LIST[0]);
  const [studentName, setStudentName] = useState<string>('Nguyễn Minh Anh');
  const [studentSchool, setStudentSchool] = useState<string>('Trường THPT');
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [assessmentStatus, setAssessmentStatus] = useState<AssessmentStatus>('not_started');
  const [statusCheckFeedback, setStatusCheckFeedback] = useState<string | null>(null);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  // Modals
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testModalInitialIndex, setTestModalInitialIndex] = useState(0);
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<CareerMatrixItem | null>(null);
  const [printReportResult, setPrintReportResult] = useState<EvaluationResult | null>(null);

  // Chức năng 2 State: History from PostgreSQL
  const [history, setHistory] = useState<EvaluationResult[]>([]);

  // Condition: Bảng ma trận chỉ hiển thị sau nếu người đó đã làm bài test 1 lần trở lên
  const hasCompletedTestAtLeastOnce = evaluationResult !== null || history.length > 0;

  // Current questions according to selected tier (20, 50, 70)
  const activeQuestions = QUESTIONS_BY_TIER[selectedTier]?.all || QUESTIONS_BY_TIER[20].all;
  const activeHollandQuestions = QUESTIONS_BY_TIER[selectedTier]?.holland || QUESTIONS_BY_TIER[20].holland;
  const activeDiscQuestions = QUESTIONS_BY_TIER[selectedTier]?.disc || QUESTIONS_BY_TIER[20].disc;

  const hollandTotal = activeHollandQuestions.length;
  const discTotal = activeDiscQuestions.length;
  const totalQuestions = activeQuestions.length;

  const hollandAnsweredCount = activeHollandQuestions.filter((q) => !!answers[String(q.id)]).length;
  const discAnsweredCount = activeDiscQuestions.filter((q) => !!answers[String(q.id)]).length;
  const answeredCount = Object.keys(answers).length;

  // Restore User Session
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setCurrentUser(parsed);
          setStudentName(parsed.name || 'Học sinh THPT');
          if (parsed.school) {
            setStudentSchool(parsed.school);
          }

          // Fetch latest role and details from server
          fetch(`/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: parsed.email })
          })
            .then((r) => r.json())
            .then((data) => {
              if (data.user) {
                setCurrentUser(data.user);
                localStorage.setItem(USER_SESSION_KEY, JSON.stringify(data.user));
              }
            })
            .catch(() => {});
        }
      }
    } catch {
      console.warn('Cannot parse stored user session');
    }
  }, []);

  // Fetch History from PostgreSQL (chỉ tải lịch sử của chính user đang đăng nhập)
  const loadHistoryFromDB = () => {
    if (!currentUser?.email) {
      setHistory([]);
      return;
    }
    const params = new URLSearchParams();
    params.append('userEmail', currentUser.email);

    fetch(`/api/history?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setHistory(data.items);
        } else {
          setHistory([]);
        }
      })
      .catch((err) => console.warn('Could not fetch PostgreSQL history', err));
  };

  useEffect(() => {
    loadHistoryFromDB();
  }, [currentUser?.email]);

  // Synchronize Real-time Session with Backend
  useEffect(() => {
    if (currentUser && answeredCount > 0) {
      fetch('/api/sessions/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: SESSION_ID,
          userEmail: currentUser.email,
          studentName: studentName || currentUser.name,
          tier: selectedTier,
          currentTest: hollandAnsweredCount < hollandTotal ? 'HOLLAND' : 'DISC',
          answeredHolland: hollandAnsweredCount,
          totalHolland: hollandTotal,
          answeredDisc: discAnsweredCount,
          totalDisc: discTotal,
          status: assessmentStatus
        })
      }).catch(console.error);
    }
  }, [answers, assessmentStatus, selectedTier, currentUser, studentName]);

  // Answer handler
  const handleSelectAnswer = (questionId: string | number, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [String(questionId)]: optionId
    }));
    if (assessmentStatus === 'not_started') {
      setAssessmentStatus('in_progress');
    }
  };

  // Switch Tier
  const handleSelectTier = (tier: QuestionTier) => {
    if (answeredCount > 0 && !confirm('Đổi mốc câu hỏi sẽ làm mới các câu trả lời hiện tại. Bạn có chắc muốn chuyển mốc?')) {
      return;
    }
    setSelectedTier(tier);
    setAnswers({});
    setAssessmentStatus('not_started');
    setStatusCheckFeedback(null);
  };

  // Quick fill sample answers for rapid testing / demo
  const handleQuickFillDemo = () => {
    if (!currentUser) {
      setAuthRequiredForTest(true);
      setIsAuthModalOpen(true);
      return;
    }

    const demoAnswers: TestAnswers = {};
    activeHollandQuestions.forEach((q) => {
      if (q.options[0]) demoAnswers[String(q.id)] = q.options[0].id;
    });
    activeDiscQuestions.forEach((q) => {
      if (q.options[0]) demoAnswers[String(q.id)] = q.options[0].id;
    });

    setAnswers(demoAnswers);
    completeEvaluation(
      demoAnswers,
      selectedInitialMajor,
      selectedRevisedMajor,
      studentName || currentUser.name || 'Nguyễn Minh Anh'
    );
  };

  // Core Evaluation Generator & DB Sync
  const completeEvaluation = async (
    currentAnswers: TestAnswers,
    initMajor: UniversityMajor,
    revisedMajor: UniversityMajor,
    name: string
  ) => {
    const scores = calculateAssessmentScores(currentAnswers, activeQuestions);
    const analysis = generateEvaluationAnalysis(scores.primaryDisc, scores.secondaryDisc, scores.primaryHolland);

    const recommended = filterCareers(CAREER_MATRIX_DATA, {
      disc: scores.primaryDisc,
      holland: scores.primaryHolland
    });

    const result: EvaluationResult = {
      id: 'eval-' + Date.now(),
      testDate: new Date().toISOString(),
      studentName: name,
      userEmail: currentUser?.email || 'guest@thpt.edu.vn',
      school: currentUser?.school || 'THPT Chuyên',
      tier: selectedTier,
      initialMajorId: initMajor.id,
      initialMajorName: initMajor.name,
      finalMajorId: revisedMajor.id,
      finalMajorName: revisedMajor.name,
      primaryDisc: scores.primaryDisc,
      secondaryDisc: scores.secondaryDisc,
      primaryHolland: scores.primaryHolland,
      discScores: scores.discScores,
      discPercentages: scores.discPercentages,
      hollandScores: scores.hollandScores,
      analysis,
      recommendedCareers: recommended,
      answers: currentAnswers
    };

    setEvaluationResult(result);
    setAssessmentStatus('completed');
    setStatusCheckFeedback(
      `ĐÃ HOÀN THÀNH TOÀN BỘ 2 BÀI TEST THPT (${selectedTier} CÂU)! Nhóm tính cách chủ đạo: ${scores.primaryDisc} (${analysis.title}), Holland: ${scores.primaryHolland}. Bảng ma trận hướng nghiệp đã mở khóa!`
    );

    // Save directly to PostgreSQL Database
    try {
      await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      });
      loadHistoryFromDB();
    } catch (err) {
      console.warn('Could not post evaluation to PostgreSQL', err);
    }
  };

  // Handle Submit Test from Modal
  const handleSubmitTest = () => {
    completeEvaluation(answers, selectedInitialMajor, selectedRevisedMajor, studentName);
    setIsTestModalOpen(false);
  };

  // Check Status button
  const handleCheckStatus = () => {
    if (assessmentStatus === 'completed' && evaluationResult) {
      setStatusCheckFeedback(
        `BẠN ĐÃ HOÀN THÀNH CẢ 2 BÀI TEST BẮT BUỘC (${totalQuestions}/${totalQuestions} câu)! Bạn thuộc nhóm DISC: ${evaluationResult.primaryDisc} - Nhóm Holland: ${evaluationResult.primaryHolland}. Báo cáo đánh giá và bảng ma trận nghề nghiệp đã được mở khóa đầy đủ.`
      );
      const el = document.getElementById('evaluation-results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (hollandAnsweredCount < hollandTotal) {
      setStatusCheckFeedback(
        `BẮT BUỘC HOÀN THÀNH CẢ 2 BÀI: Bạn đang ở Bài Test 1 (Holland: ${hollandAnsweredCount}/${hollandTotal} câu). Hãy hoàn thành xong Bài 1 để hệ thống mở tiếp Bài 2 (DISC).`
      );
    } else if (discAnsweredCount < discTotal) {
      setStatusCheckFeedback(
        `BẠN ĐÃ XONG BÀI TEST 1! Bài Test 2 (DISC: ${discAnsweredCount}/${discTotal} câu) đã mở khóa. Hãy hoàn thành nốt Bài 2 để nhận báo cáo đánh giá.`
      );
    } else {
      setStatusCheckFeedback(
        `Chưa làm bài test nào (0/${totalQuestions} câu). Quy định bắt buộc: Hoàn thành Bài Test 1 (Holland), sau đó làm Bài Test 2 (DISC). Vui lòng đăng nhập và bắt đầu bài làm.`
      );
    }
  };

  // Open modal for Holland test
  const handleOpenHollandTest = () => {
    if (!currentUser) {
      setAuthRequiredForTest(true);
      setIsAuthModalOpen(true);
      return;
    }
    const firstUnanswered = activeHollandQuestions.findIndex((q) => !answers[String(q.id)]);
    setTestModalInitialIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
    setIsTestModalOpen(true);
  };

  // Open modal for DISC test
  const handleOpenDiscTest = () => {
    if (!currentUser) {
      setAuthRequiredForTest(true);
      setIsAuthModalOpen(true);
      return;
    }
    if (hollandAnsweredCount < hollandTotal) {
      setStatusCheckFeedback(
        `Quy tắc bắt buộc: Bạn phải làm xong Bài Test 1 (Holland: ${hollandAnsweredCount}/${hollandTotal} câu) trước khi làm Bài Test 2. Đang chuyển bạn đến Bài Test 1...`
      );
      handleOpenHollandTest();
      return;
    }
    const firstUnansweredDisc = activeDiscQuestions.findIndex((q) => !answers[String(q.id)]);
    setTestModalInitialIndex(firstUnansweredDisc >= 0 ? hollandTotal + firstUnansweredDisc : hollandTotal);
    setIsTestModalOpen(true);
  };

  // Open modal for all tests
  const handleOpenAllTests = () => {
    if (!currentUser) {
      setAuthRequiredForTest(true);
      setIsAuthModalOpen(true);
      return;
    }
    if (hollandAnsweredCount < hollandTotal) {
      handleOpenHollandTest();
    } else if (discAnsweredCount < discTotal) {
      handleOpenDiscTest();
    } else {
      setTestModalInitialIndex(0);
      setIsTestModalOpen(true);
    }
  };

  // Reset test
  const handleResetTest = () => {
    if (confirm('Bạn có chắc chắn muốn làm lại từ đầu không? Toàn bộ câu trả lời hiện tại sẽ bị xóa.')) {
      setAnswers({});
      setAssessmentStatus('not_started');
      setEvaluationResult(null);
      setStatusCheckFeedback('Đã làm mới bài test. Hãy bắt đầu lại từ Bài Test 1 (Holland).');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem(USER_SESSION_KEY);
    setCurrentUser(null);
    setHistory([]);
    setEvaluationResult(null);
    if (activeTab === 'admin') setActiveTab('counseling');
  };

  // Handle Login Success
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setStudentName(user.name);
    if (user.school) {
      setStudentSchool(user.school);
    }
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col text-slate-800 font-sans notranslate" translate="no">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        currentUser={currentUser}
        onOpenLogin={() => {
          setAuthRequiredForTest(false);
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-20 md:pb-8 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: COUNSELING & TESTS */}
        {/* ========================================================================= */}
        {activeTab === 'counseling' && (
          <div className="space-y-8">
            {/* Playful & Warm Edukids Hero Section */}
            <div className="bg-gradient-to-br from-[#FFF8EE] via-[#FFF3E3] to-[#FFEFE6] rounded-[36px] p-6 sm:p-10 border border-amber-200/60 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-orange-800 border border-orange-200 shadow-2xs">
                  <School className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Định Hướng Ngành Học & Hướng Nghiệp THPT
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
                  Khám Phá Bản Thân, <br className="hidden sm:inline" />
                  Chắp Cánh <span className="text-orange-500">Tương Lai</span> Đại Học
                </h1>

                {/* 3 Stat Badges matching Edukids Style */}
                <div className="grid grid-cols-3 gap-3 pt-3 max-w-lg">
                  <div className="p-3.5 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center">
                    <span className="block text-xl sm:text-2xl font-black text-orange-500">20/50/70</span>
                    <span className="text-[11px] font-bold text-slate-500">Mốc Câu Hỏi</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center">
                    <span className="block text-xl sm:text-2xl font-black text-sky-600">100%</span>
                    <span className="text-[11px] font-bold text-slate-500">Mã Ngành Đại Học</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white border border-amber-100 shadow-2xs text-center">
                    <span className="block text-xl sm:text-2xl font-black text-emerald-600">A4 PDF</span>
                    <span className="text-[11px] font-bold text-slate-500">In Phiếu Đánh Giá</span>
                  </div>
                </div>
              </div>

              {/* Right Side: 2 Students Image with transparent background */}
              <div className="relative z-10 flex justify-center md:justify-end shrink-0 md:w-80 lg:w-[350px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/25 to-orange-400/35 rounded-full blur-2xl transform scale-100 pointer-events-none" />
                  <img
                    src="/students-transparent.png"
                    alt="Học sinh THPT EduCareer"
                    className="relative z-10 max-h-72 sm:max-h-80 md:max-h-[380px] lg:max-h-[410px] object-contain drop-shadow-xl transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>

              {/* Decorative Background Elements */}
              <div className="absolute top-6 right-8 w-44 h-44 rounded-full bg-amber-200/30 blur-2xl pointer-events-none" />
              <div className="absolute bottom-4 right-20 w-56 h-56 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
            </div>

            {/* VISUAL CAREER SHOWCASE: HOLLAND & DISC & MAJORS WITH PHOTOS */}
            <VisualCareerShowcase
              onStartTest={() => {
                const el = document.getElementById('step-1-test-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* TIER SELECTOR: 20, 50, 70 CÂU */}
            <TierSelector
              selectedTier={selectedTier}
              onSelectTier={handleSelectTier}
            />

            {/* BƯỚC 1: Thực hiện 2 bài test định hướng */}
            <div id="step-1-test-section" className="bg-white rounded-[32px] border border-slate-200/90 shadow-xs p-6 sm:p-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-2xs">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                    Bước 1: Thực Hiện 2 Bài Test Định Hướng THPT (Mốc {selectedTier} Câu)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Bắt buộc đăng nhập tài khoản email để lưu kết quả và tải phiếu chứng nhận
                  </p>
                </div>
              </div>

              <TestStatusCard
                status={assessmentStatus}
                answeredCount={answeredCount}
                totalQuestions={totalQuestions}
                hollandAnsweredCount={hollandAnsweredCount}
                hollandTotal={hollandTotal}
                discAnsweredCount={discAnsweredCount}
                discTotal={discTotal}
                studentName={studentName}
                setStudentName={setStudentName}
                school={studentSchool}
                setSchool={setStudentSchool}
                tier={selectedTier}
                onOpenHollandTest={handleOpenHollandTest}
                onOpenDiscTest={handleOpenDiscTest}
                onOpenAllTests={handleOpenAllTests}
                onCheckStatus={handleCheckStatus}
                onResetTest={handleResetTest}
                onQuickFillDemo={handleQuickFillDemo}
                evaluationResult={evaluationResult}
                statusCheckFeedback={statusCheckFeedback}
                isLoggedIn={!!currentUser}
                userEmail={currentUser?.email}
                onRequireLogin={() => {
                  setAuthRequiredForTest(true);
                  setIsAuthModalOpen(true);
                }}
              />
            </div>

            {/* BƯỚC 2 & 3: Hiển thị sau khi hoàn thành bài test */}
            {assessmentStatus === 'completed' && evaluationResult && (
              <div id="evaluation-results-section" className="space-y-8 scroll-mt-24">
                <div className="bg-white rounded-[32px] border border-slate-200/90 shadow-xs p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                          Bước 2: Báo Cáo Đánh Giá Toàn Diện (Holland & DISC)
                        </h3>
                        <p className="text-xs text-slate-500">
                          Kết quả đối chiếu dựa trên bộ câu hỏi mốc {selectedTier} câu
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setPrintReportResult(evaluationResult)}
                      className="px-4 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>In Phiếu Kết Quả Học Sinh</span>
                    </button>
                  </div>

                  <EvaluationSummary
                    evaluation={evaluationResult}
                    currentMajorId={selectedRevisedMajor.id}
                    onSelectRevisedMajor={(m) => setSelectedRevisedMajor(m)}
                    onViewRecommendations={() => {
                      const el = document.getElementById('career-recommendations-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* Gợi Ý Phương Án Tổ Hợp Môn Học Lớp 10 THPT Phù Hợp Nhất */}
                  <Grade10SubjectCombinationCard
                    primaryHolland={evaluationResult.primaryHolland}
                    primaryDisc={evaluationResult.primaryDisc}
                    recommendedCareers={evaluationResult.recommendedCareers || []}
                    studentName={evaluationResult.studentName}
                    selectedMajorName={selectedRevisedMajor.name}
                  />
                </div>

                <div id="career-recommendations-section" className="scroll-mt-24">
                  <CareerRecommendations
                    careers={evaluationResult.recommendedCareers || []}
                    userPrimaryDisc={evaluationResult.primaryDisc}
                    selectedMajorName={selectedRevisedMajor.name}
                    onSelectCareerDetail={(c) => setSelectedCareerDetail(c)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CAREER MATRIX TABLE */}
        {/* ========================================================================= */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            {!hasCompletedTestAtLeastOnce ? (
              <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-200 text-center max-w-2xl mx-auto shadow-xs space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 text-orange-600 flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-900">
                  Ma Trận Nghề Nghiệp Đang Bị Khóa
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Để đảm bảo tính khoa học và định hướng chính xác, bảng ma trận chi tiết chỉ mở khóa sau khi học sinh đã làm trắc nghiệm hướng nghiệp ít nhất 1 lần.
                </p>
                <button
                  onClick={() => setActiveTab('counseling')}
                  className="px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Làm Bài Test Để Mở Khóa Ngay</span>
                </button>
              </div>
            ) : (
              <CareerMatrixTableView
                onSelectCareerDetail={(c) => setSelectedCareerDetail(c)}
                isUnlocked={hasCompletedTestAtLeastOnce}
                onGoToTest={() => setActiveTab('counseling')}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: HISTORY */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <HistoryView
            history={history}
            currentUser={currentUser}
            onOpenLogin={() => setIsAuthModalOpen(true)}
            onSelectResult={(item: EvaluationResult) => {
              setEvaluationResult(item);
              setActiveTab('counseling');
            }}
            onDeleteResult={(id: string) => {
              setHistory((prev) => prev.filter((h) => h.id !== id));
            }}
            onClearAllHistory={() => setHistory([])}
            onPrintResult={(item: EvaluationResult) => setPrintReportResult(item)}
            onStartNewTest={() => {
              handleResetTest();
              setActiveTab('counseling');
            }}
            onLoadSampleHistory={() => {}}
          />
        )}

        {/* ========================================================================= */}
        {/* TAB 4: GUIDE */}
        {/* ========================================================================= */}
        {activeTab === 'guide' && <DiscHollandGuide />}

        {/* ========================================================================= */}
        {/* TAB 5: ADMIN DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'admin' && currentUser?.role === 'admin' && (
          <AdminDashboard currentUser={currentUser} />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        requiredForTest={authRequiredForTest}
        initialSchool={studentSchool}
        onSchoolChange={setStudentSchool}
      />

      {/* Assessment Test Modal */}
      <AssessmentModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        questions={activeQuestions}
        answers={answers}
        onSelectAnswer={handleSelectAnswer}
        onSubmitTest={handleSubmitTest}
        onQuickFillDemo={handleQuickFillDemo}
        initialQuestionIndex={testModalInitialIndex}
        tier={selectedTier}
      />

      {/* Career Detail Modal */}
      {selectedCareerDetail && (
        <CareerDetailModal
          career={selectedCareerDetail}
          onClose={() => setSelectedCareerDetail(null)}
        />
      )}

      {/* Print Single Report Modal */}
      {printReportResult && (
        <PrintReportModal
          result={printReportResult}
          onClose={() => setPrintReportResult(null)}
        />
      )}
    </div>
  );
}
