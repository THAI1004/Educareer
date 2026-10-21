import React from 'react';
import {
  Compass,
  History,
  Table,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  User,
  Shield,
  Sparkles
} from 'lucide-react';
import type { UserProfile } from '../types/career.ts';

interface HeaderProps {
  activeTab: 'counseling' | 'matrix' | 'history' | 'guide' | 'admin';
  setActiveTab: (tab: 'counseling' | 'matrix' | 'history' | 'guide' | 'admin') => void;
  historyCount: number;
  currentUser: UserProfile | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  currentUser,
  onOpenLogin,
  onLogout
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            {/* Logo & Edukids Brand Aesthetic */}
            <div
              onClick={() => setActiveTab('counseling')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FF5722] flex items-center justify-center text-white shadow-md shadow-orange-500/20 shrink-0 transform hover:scale-105 transition-transform">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-heading font-black text-base sm:text-xl text-slate-900 tracking-tight">
                    EduCareer<span className="text-orange-500">.</span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                    THPT
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('counseling')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'counseling'
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/70'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Tư Vấn THPT</span>
              </button>

              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('matrix')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'matrix'
                      ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                      : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/70'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  <span>Ma Trận Ngành</span>
                </button>
              )}

              <button
                onClick={() => setActiveTab('history')}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'history'
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/70'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Lịch Sử</span>
                {historyCount > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      activeTab === 'history'
                        ? 'bg-white text-orange-600'
                        : 'bg-orange-500 text-white'
                    }`}
                  >
                    {historyCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                  activeTab === 'guide'
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50/70'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Cẩm Nang</span>
              </button>

              {/* Admin Management Tab */}
              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 ${
                    activeTab === 'admin'
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                      : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Quản Trị</span>
                </button>
              )}
            </nav>

            {/* User Auth Section & Mobile Menu Trigger */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 relative">
              {currentUser ? (
                <>
                  <div
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 cursor-pointer transition-colors"
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold ${
                        currentUser.role === 'admin' ? 'bg-rose-600' : 'bg-orange-500'
                      }`}
                    >
                      {currentUser.role === 'admin' ? (
                        <Shield className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[130px]">
                        {currentUser.email}
                      </p>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold block sm:hidden">
                      {currentUser.role === 'admin' ? 'Admin' : 'HS'}
                    </span>
                  </div>

                  <button
                    onClick={onLogout}
                    title="Đăng xuất"
                    className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>

                  {/* Mobile User Popover Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-12 sm:top-14 w-60 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 space-y-2 animate-in fade-in-50 duration-150">
                      <div className="border-b pb-2">
                        <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                        <span
                          className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            currentUser.role === 'admin'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}
                        >
                          Vai trò: {currentUser.role === 'admin' ? 'Quản Trị Viên (Admin)' : 'Học Sinh THPT'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <button
                          onClick={() => {
                            setActiveTab('counseling');
                            setIsUserMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-left cursor-pointer transition-colors ${
                            activeTab === 'counseling'
                              ? 'bg-orange-500 text-white'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>Giao diện Học Sinh THPT</span>
                        </button>

                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => {
                              setActiveTab('admin');
                              setIsUserMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-left cursor-pointer transition-colors ${
                              activeTab === 'admin'
                                ? 'bg-rose-600 text-white'
                                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
                            }`}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Trang Quản Trị (Admin)</span>
                          </button>
                        )}
                      </div>

                      <div className="pt-2 border-t">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            onLogout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất tài khoản</span>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl bg-[#FF5722] hover:bg-[#F4511E] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer hover:shadow-lg"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng Nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Fixed Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('counseling')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            activeTab === 'counseling' ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Tư Vấn</span>
        </button>

        {currentUser?.role === 'admin' && (
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
              activeTab === 'matrix' ? 'text-orange-600' : 'text-slate-500'
            }`}
          >
            <Table className="w-4 h-4" />
            <span>Ma Trận</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('history')}
          className={`relative flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
            activeTab === 'history' ? 'text-orange-600' : 'text-slate-500'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Lịch Sử</span>
          {historyCount > 0 && (
            <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-orange-500" />
          )}
        </button>

        {currentUser?.role === 'admin' ? (
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
              activeTab === 'admin' ? 'text-rose-600' : 'text-slate-500'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Quản Trị</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer ${
              activeTab === 'guide' ? 'text-orange-600' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cẩm Nang</span>
          </button>
        )}
      </div>
    </>
  );
};
