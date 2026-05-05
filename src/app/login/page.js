'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { ROLES, ROUTES } from '@/utils/constants';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { MdCastConnected } from 'react-icons/md';
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

  const defaultVals = selectedRole && DEMO_CREDS[selectedRole]
    ? DEMO_CREDS[selectedRole]
    : { email: '', password: '' };

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultVals,
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      router.replace(user.role === ROLES.PRINCIPAL ? ROUTES.PRINCIPAL.DASHBOARD : ROUTES.TEACHER.DASHBOARD);
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => { return () => clearError(); }, [clearError]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    clearError();
    if (DEMO_CREDS[role]) {
      setValue('email', DEMO_CREDS[role].email);
      setValue('password', DEMO_CREDS[role].password);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try { await login(data.email, data.password); }
    catch { /* handled in context */ }
    finally { setIsSubmitting(false); }
  };

  if (authLoading && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
      {/* Ambient blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-[100px]" />

      {/* Sakura petals */}
      <div className="sakura-bg">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="petal" style={{
            left: `${15 + i * 18}%`,
            animationDuration: `${10 + i * 3}s`,
            animationDelay: `${i * 2}s`,
          }} />
        ))}
      </div>

      {/* Top bar with back + theme toggle */}
      <div className="fixed top-0 left-0 right-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:text-primary-light hover:-translate-x-1 rounded-xl px-3 py-2" style={{ color: 'var(--text-secondary)' }}>
          <HiOutlineArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20 animate-float">
            <MdCastConnected className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">ContentCast</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Content Broadcasting System</p>
        </div>

        {/* Role selector */}
        {!selectedRole && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-semibold text-center mb-2" style={{ color: 'var(--text-primary)' }}>Choose your role</h2>

            <button onClick={() => handleRoleSelect('teacher')} className="w-full glass-card glass-card-hover p-5 flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <HiOutlineAcademicCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Sign in as Teacher</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Upload content, manage schedules, track approvals</p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-primary-light opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>

            <button onClick={() => handleRoleSelect('principal')} className="w-full glass-card glass-card-hover p-5 flex items-center gap-4 group text-left">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-success to-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-success/20">
                <HiOutlineShieldCheck className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Sign in as Principal</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Review content, approve/reject, manage broadcasts</p>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 text-success opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        )}

        {/* Login form */}
        {selectedRole && (
          <div className="glass-card p-8 animate-scale-in">
            <div className="flex items-center gap-3 mb-6">
              <button onClick={() => { setSelectedRole(null); clearError(); reset({ email: '', password: '' }); }} className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:-translate-x-1" style={{ background: 'var(--bg-surface-light)', border: '1px solid var(--border-color)' }}>
                <HiOutlineArrowLeft className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              </button>
              <div>
                <h2 className="text-lg font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{selectedRole} Login</h2>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Enter your credentials to continue</p>
              </div>
            </div>

            {authError && (
              <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 mb-6 animate-fade-in">
                <p className="text-sm text-danger">{authError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                <div className="relative">
                  <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  <input {...register('email')} type="email" placeholder="Enter your email" className={`input-field pl-12 ${errors.email ? 'border-danger' : ''}`} autoComplete="email" />
                </div>
                {errors.email && <p className="mt-1.5 text-sm text-danger animate-fade-in">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                  <input {...register('password')} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className={`input-field pl-12 pr-12 ${errors.password ? 'border-danger' : ''}`} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} tabIndex={-1}>
                    {showPassword ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-sm text-danger animate-fade-in">{errors.password.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-3 text-base flex items-center justify-center gap-2">
                {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>) : 'Sign In'}
              </button>
            </form>

            <div className="mt-5 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
              <p className="text-xs text-center mb-2" style={{ color: 'var(--text-muted)' }}>Demo Credentials (pre-filled)</p>
              <div className="rounded-xl p-3 text-center" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{DEMO_CREDS[selectedRole]?.email} / {DEMO_CREDS[selectedRole]?.password}</p>
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
