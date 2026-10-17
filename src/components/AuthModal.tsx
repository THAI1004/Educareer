import React, { useState, useEffect } from 'react';
import { Mail, Lock, Shield, User, X, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import type { UserProfile } from '../types/career.ts';

declare global {
  interface Window {
    google?: any;
  }
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  requiredForTest?: boolean;
  initialSchool?: string;
  onSchoolChange?: (school: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  requiredForTest = false,
  initialSchool = '',
  onSchoolChange
}) => {
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [school, setSchool] = useState(initialSchool || 'Trường THPT');

  useEffect(() => {
    if (initialSchool) {
      setSchool(initialSchool);
    }
  }, [initialSchool]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    '702758968217-l13pp11dut6n3scm7tn7tfq82pue0ll9.apps.googleusercontent.com';

  // Decode JWT credential from Google OAuth
  const decodeJwtResponse = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const handleGoogleCallback = async (response: any) => {
    if (!response || !response.credential) {
      setError('Không nhận được thông tin xác thực từ Google');
      return;
    }
    const payload = decodeJwtResponse(response.credential);
    if (!payload || !payload.email) {
      setError('Không thể trích xuất email từ tài khoản Google');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: payload.email,
          name: payload.name || payload.email.split('@')[0],
          role,
          school: school.trim() || 'Trường THPT'
        })
      });

      if (!res.ok) {
        throw new Error('Lỗi đăng nhập hệ thống với tài khoản Google');
      }

      const data = await res.json();
      onLoginSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setIsLoading(false);
    }
  };

  // Render official Google Sign-In button whenever modal opens
  useEffect(() => {
    if (!isOpen) return;

    const initGoogleBtn = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleCallback,
            auto_select: false
          });

          const btnEl = document.getElementById('google-signin-btn-container');
          if (btnEl) {
            btnEl.innerHTML = '';
            window.google.accounts.id.renderButton(btnEl, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              shape: 'pill',
              text: 'continue_with',
              logo_alignment: 'left',
              width: 320
            });
          }
        } catch (e) {
          console.warn('Google GSI init warning:', e);
        }
      }
    };

    const timer = setTimeout(initGoogleBtn, 150);
    return () => clearTimeout(timer);
  }, [isOpen, role, school]);

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Banner with Warm Edukids Aesthetic - Màu cam đơn sắc */}
        <div className="bg-[#FF5722] p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-md">
            <Mail className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-xl font-bold font-heading">
            {role === 'admin' ? 'Đăng Nhập Quản Trị Viên' : 'Đăng Nhập Bằng Gmail'}
          </h3>
          <p className="text-xs text-orange-100 mt-1 max-w-xs mx-auto">
            {requiredForTest
              ? 'Bắt buộc đăng nhập bằng tài khoản Gmail để làm bài test và lưu hồ sơ chứng nhận'
              : 'Đăng nhập Google để lưu trữ kết quả và đồng bộ thời gian thực'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Role Switcher: Học sinh THPT or Quản trị viên */}
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-[#FF5722] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Học Sinh THPT
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Quản Trị Viên (Admin)
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Trường THPT đang theo học
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => {
                const val = e.target.value;
                setSchool(val);
                if (onSchoolChange) onSchoolChange(val);
              }}
              placeholder="ví dụ: THPT Chuyên Hà Nội - Amsterdam"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#FF5722] focus:border-transparent transition-all"
            />
          </div>

          {/* Official Google Sign-In Button */}
          <div className="flex flex-col items-center justify-center pt-3 pb-2">
            <span className="text-xs font-semibold text-slate-500 mb-3 text-center">
              Nhấn nút dưới đây để chọn tài khoản Gmail của bạn:
            </span>
            <div
              id="google-signin-btn-container"
              className="min-h-[44px] flex items-center justify-center w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
