'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { ROLES, ROUTES } from '@/utils/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineArrowLeft,
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowRight,
} from 'react-icons/hi2';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

const DEMO_CREDS = {
  teacher: { email: 'teacher@school.com', password: 'teacher123' },
  principal: { email: 'principal@school.com', password: 'principal123' },
};

function LoginForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const { login, isAuthenticated, user, loading: authLoading, error: authError, clearError } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roleParam || null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  // Update form values when role changes
  useEffect(() => {
    if (selectedRole && DEMO_CREDS[selectedRole]) {
      const creds = DEMO_CREDS[selectedRole];
      reset({ email: creds.email, password: creds.password });
    } else {
      reset({ email: '', password: '' });
    }
  }, [selectedRole, reset]);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Start redirect animation
      setIsRedirecting(true);
      
      // Wait for animation, then redirect
      const timer = setTimeout(() => {
        const redirectPath = user.role === ROLES.PRINCIPAL ? ROUTES.PRINCIPAL.DASHBOARD : ROUTES.TEACHER.DASHBOARD;
        router.replace(redirectPath);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => { 
    return () => clearError(); 
  }, [clearError]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    clearError();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try { await login(data.email, data.password); }
    catch { /* handled in context */ }
    finally { setIsSubmitting(false); }
  };

  // Animated redirect screen
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
        <div className="absolute inset-0 animate-pulse" style={{ background: 'radial-gradient(circle, rgba(194,120,92,0.1) 0%, transparent 70%)' }} />
        
        <div className="relative z-10 text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center mx-auto text-white animate-bounce">
            <Logo size={40} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold gradient-text mb-2">Authenticating</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Redirecting to your dashboard...</p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  if (authLoading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
      <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[100px]" style={{ background: 'rgba(194,120,92,0.04)' }} />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:-translate-x-1 rounded-xl px-3 py-2" style={{ color: 'var(--text-secondary)' }}>
          <HiOutlineArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto mb-6 text-white animate-float shadow-lg">
            <Logo size={40} />
          </div>
          <h1 className="text-4xl font-bold gradient-text mb-3">ContentCast</h1>
          <p className="text-sm font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>Content Broadcasting System</p>
          
          {/* Website Description */}
          <div className="mb-8 space-y-4">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              The intelligent content broadcasting platform designed for educational institutions
            </p>
            <div className="grid grid-cols-3 gap-3 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <div className="text-center px-2 py-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <div className="text-sm font-bold gradient-text mb-1">Multi-role</div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Access</p>
              </div>
              <div className="text-center px-2 py-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <div className="text-sm font-bold gradient-text mb-1">Real-time</div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Approval</p>
              </div>
              <div className="text-center px-2 py-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <div className="text-sm font-bold gradient-text mb-1">Secure</div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Broadcasting</p>
              </div>
            </div>
          </div>
        </div>

        {/* Combined Newsletter + Role Selector Section */}
        {!selectedRole && (
          <div className="space-y-6">
            {/* Newsletter Card */}
            <div className="glass-card p-6 space-y-4 border border-white/10 hover:border-primary/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0s' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-xl flex-none" style={{ background: 'linear-gradient(135deg, #c2785c, #a0604a)' }}>
                  📧
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1" style={{ color: 'var(--text-primary)' }}>Stay Updated</h3>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Subscribe to ContentCast updates</p>
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Get exclusive insights</p>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Weekly tips & tutorials</span>
                  </div>
                  <div className="flex items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Feature announcements</span>
                  </div>
                  <div className="flex items-center gap-3 animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Exclusive content access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-muted)' }}>SELECT ROLE</span>
              <div className="flex-1 h-px" style={{ background: 'var(--border-color)' }} />
            </div>

            {/* Role Selection - Teacher */}
            <button 
              onClick={() => handleRoleSelect('teacher')} 
              className="w-full glass-card p-6 flex items-center gap-4 group text-left transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg animate-fade-in transform" 
              style={{ animationDelay: '0.5s' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ background: 'linear-gradient(135deg, #c2785c, #a0604a)' }}>
                🎓
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Sign in as Teacher</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Upload content, manage schedules, track approvals</p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 shrink-0" style={{ color: 'var(--color-primary)' }} />
            </button>

            {/* Role Selection - Principal */}
            <button 
              onClick={() => handleRoleSelect('principal')} 
              className="w-full glass-card p-6 flex items-center gap-4 group text-left transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg animate-fade-in transform" 
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-md" style={{ background: 'linear-gradient(135deg, #6dae7f, #4e9460)' }}>
                🛡️
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Sign in as Principal</h3>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Review content, approve/reject, manage broadcasts</p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 shrink-0" style={{ color: '#6dae7f' }} />
            </button>
          </div>
        )}

        {/* Login form */}
        {selectedRole && (
          <div className="glass-card p-8 animate-scale-in">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <button 
                onClick={() => { 
                  setSelectedRole(null); 
                  clearError(); 
                  reset({ email: '', password: '' }); 
                }} 
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:-translate-x-1 active:scale-90 hover:shadow-md" 
                style={{ background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)' }}
              >
                <HiOutlineArrowLeft className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ 
                      background: selectedRole === 'teacher' 
                        ? 'linear-gradient(135deg, #c2785c, #a0604a)' 
                        : 'linear-gradient(135deg, #6dae7f, #4e9460)'
                    }}
                  >
                    {selectedRole === 'teacher' ? '🎓' : '🛡️'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold capitalize" style={{ color: 'var(--text-primary)' }}>
                      {selectedRole} Login
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {selectedRole === 'teacher' 
                        ? 'Upload content, manage schedules, track approvals'
                        : 'Review content, approve/reject, manage broadcasts'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fade-in" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
                <p className="text-sm font-medium text-red-600">{authError}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                <div className="relative group">
                  <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--text-muted)' }} />
                  <input 
                    {...register('email')} 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all duration-200 border ${errors.email ? 'border-red-500' : 'border-transparent'}`}
                    style={{ 
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      borderColor: errors.email ? '#ef4444' : 'transparent'
                    }}
                    autoComplete="email" 
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Password</label>
                <div className="relative group">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--text-muted)' }} />
                  <input 
                    {...register('password')} 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Enter your password" 
                    className={`w-full pl-12 pr-12 py-3 rounded-xl font-medium transition-all duration-200 border ${errors.password ? 'border-red-500' : 'border-transparent'}`}
                    style={{ 
                      background: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      borderColor: errors.password ? '#ef4444' : 'transparent'
                    }}
                    autoComplete="current-password" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 active:scale-95" 
                    style={{ color: 'var(--text-muted)' }} 
                    tabIndex={-1}
                  >
                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm font-medium text-red-600">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting || isRedirecting} 
                className="w-full py-3 mt-6 text-base font-bold flex items-center justify-center gap-3 rounded-xl transition-all duration-200 relative overflow-hidden" 
                style={{ 
                  background: isSubmitting ? 'var(--color-primary)' : 'linear-gradient(135deg, var(--color-primary), #a0604a)',
                  color: 'white',
                  opacity: isSubmitting || isRedirecting ? 0.7 : 1,
                  cursor: isSubmitting || isRedirecting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
                
                <span className="relative flex items-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </span>
              </button>
            </form>

            {/* Animated overlay during submission */}
            {isSubmitting && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/5 animate-fade-in pointer-events-none" />
            )}

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t text-center animate-fade-in" style={{ borderColor: 'var(--border-color)', animationDelay: '0.4s' }}>
              <p className="text-xs font-semibold tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>DEMO CREDENTIALS (AUTO-FILLED)</p>
              <div className="rounded-xl p-4 transition-all duration-200 hover:shadow-md" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Email:</span> {DEMO_CREDS[selectedRole]?.email}
                </p>
                <p className="text-sm font-medium mt-2" style={{ color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Password:</span> {DEMO_CREDS[selectedRole]?.password}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}><div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
