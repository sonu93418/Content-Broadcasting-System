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

const ROLE_OPTIONS = {
  teacher: {
    title: 'Teacher access',
    label: 'Sign in as Teacher',
    description: 'Upload content, manage schedules, and track approval progress.',
    accent: 'linear-gradient(135deg, #c2785c, #a0604a)',
    icon: '🎓',
    points: ['Fast content upload', 'Approval tracking', 'Schedule management'],
  },
  principal: {
    title: 'Principal access',
    label: 'Sign in as Principal',
    description: 'Review submissions, approve broadcasts, and manage approvals.',
    accent: 'linear-gradient(135deg, #6dae7f, #4e9460)',
    icon: '🛡️',
    points: ['Review and approve', 'Broadcast control', 'Oversight dashboard'],
  },
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
      // Start redirect animation on next render using setTimeout
      const animTimer = setTimeout(() => {
        setIsRedirecting(true);
      }, 0);
      
      // Wait for animation, then redirect
      const redirectTimer = setTimeout(() => {
        const redirectPath = user.role === ROLES.PRINCIPAL ? ROUTES.PRINCIPAL.DASHBOARD : ROUTES.TEACHER.DASHBOARD;
        router.replace(redirectPath);
      }, 1000);

      return () => {
        clearTimeout(animTimer);
        clearTimeout(redirectTimer);
      };
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => { 
    return () => clearError(); 
  }, [clearError]);

  const activeRole = selectedRole ? ROLE_OPTIONS[selectedRole] : null;

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

  const renderRoleCard = (role) => {
    const option = ROLE_OPTIONS[role];

    return (
      <button
        key={role}
        onClick={() => handleRoleSelect(role)}
        className="group w-full text-left rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--card-border)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-105"
            style={{ background: option.accent, boxShadow: '0 10px 24px rgba(0,0,0,0.16)' }}
          >
            {option.icon}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--text-muted)' }}>
                  {option.title}
                </p>
                <h3 className="mt-1 text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  {option.label}
                </h3>
              </div>
              <HiOutlineArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--color-primary)' }} />
            </div>

            <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {option.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {option.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ background: 'var(--bg-surface-light)', color: 'var(--text-secondary)' }}
                >
                  {point}
                </span>
              ))}
            </div>
          </div>
        </div>
      </button>
    );
  };

  // Animated redirect screen
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
        <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(circle at top, rgba(194,120,92,0.18) 0%, transparent 42%), radial-gradient(circle at bottom right, rgba(109,174,127,0.12) 0%, transparent 32%)' }} />

        <div className="relative z-10 w-full max-w-md glass-card p-6 sm:p-8 text-center animate-scale-in">
          <div className="w-20 h-20 rounded-3xl gradient-bg flex items-center justify-center mx-auto text-white shadow-lg">
            <Logo size={40} />
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: 'var(--text-muted)' }}>
              Secure sign-in
            </p>
            <h2 className="text-2xl font-bold gradient-text">Authenticating</h2>
            <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
              Preparing your dashboard experience. Please wait a moment.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.16s' }} />
            <div className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.32s' }} />
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(194,120,92,0.06) 0%, transparent 45%), radial-gradient(circle at right 15%, rgba(109,174,127,0.05) 0%, transparent 36%), radial-gradient(circle at bottom left, rgba(212,168,83,0.04) 0%, transparent 34%)' }} />
      <div className="absolute right-8 top-20 h-56 w-56 rounded-full blur-3xl" style={{ background: 'rgba(194,120,92,0.06)' }} />

      <div className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all hover:-translate-x-0.5 hover:shadow-md" style={{ color: 'var(--text-secondary)', background: 'var(--bg-card)', borderColor: 'var(--card-border)' }}>
          <HiOutlineArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-4 pb-6 pt-2 sm:px-6 lg:px-8 lg:min-h-[calc(100vh-88px)]">
        <div className="grid w-full gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="flex flex-col justify-center rounded-[1.75rem] p-2 sm:p-4 lg:pr-6 animate-fade-in">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: 'var(--bg-card)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}>
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-success)' }} />
                Secure access for educators
              </div>

              <div className="mt-5 flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg animate-float">
                  <Logo size={30} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl" style={{ color: 'var(--text-primary)' }}>
                    ContentCast
                  </h1>
                  <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>
                    Content Broadcasting System
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-lg text-sm leading-7 sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                A refined login workspace for teachers and principals to manage content, approvals, and broadcasts from one focused dashboard.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { title: 'Multi-role access', text: 'Teacher and principal paths.' },
                  { title: 'Approval ready', text: 'Fast review workflow.' },
                  { title: 'Trusted delivery', text: 'Clear, secure broadcasting.' },
                ].map((item) => (
                  <div key={item.title} className="glass-card p-3.5">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] gradient-text">{item.title}</div>
                    <p className="mt-2 text-xs leading-5 sm:text-sm sm:leading-6" style={{ color: 'var(--text-secondary)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Designed for quick role selection',
                  'Accessible light and dark mode support',
                  'Demo credentials prefilled for faster testing',
                  'One clean path to the right dashboard',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border px-3.5 py-3" style={{ background: 'var(--bg-card)', borderColor: 'var(--card-border)' }}>
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}>
                      ✓
                    </span>
                    <p className="text-xs leading-5 sm:text-sm sm:leading-6" style={{ color: 'var(--text-secondary)' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              {!selectedRole && (
                <div className="glass-card p-5 sm:p-6 animate-scale-in">
                  <div className="mb-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--text-muted)' }}>
                      Choose access type
                    </p>
                    <h2 className="mt-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      Select your role to continue
                    </h2>
                    <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                      The experience adapts instantly to Teacher or Principal sign-in so you land on the right dashboard with fewer steps.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {renderRoleCard('teacher')}
                    {renderRoleCard('principal')}
                  </div>
                </div>
              )}

              {selectedRole && activeRole && (
                <div className="glass-card p-5 sm:p-6 animate-scale-in relative overflow-hidden">
                  <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl" style={{ background: selectedRole === 'teacher' ? 'rgba(194,120,92,0.12)' : 'rgba(109,174,127,0.12)' }} />

                  <div className="relative flex items-center gap-3 pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base shadow-md"
                          style={{ background: activeRole.accent }}
                        >
                          {activeRole.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--text-muted)' }}>
                            {activeRole.title}
                          </p>
                          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            Welcome back
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                      <p className="text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                        {activeRole.description}
                      </p>

                      {authError && (
                        <div className="mt-3 rounded-2xl border p-3" style={{ background: 'rgba(239, 68, 68, 0.06)', borderColor: 'rgba(239, 68, 68, 0.22)' }}>
                          <p className="text-sm font-medium text-red-600">{authError}</p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3.5">
                        <div className="animate-fade-in" style={{ animationDelay: '0.05s' }}>
                          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Email Address</label>
                          <div className="relative group">
                            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--text-muted)' }} />
                            <input 
                              {...register('email')} 
                              type="email" 
                              placeholder="Enter your email" 
                              className={`w-full pl-12 pr-4 py-2.5 rounded-2xl font-medium transition-all duration-200 border outline-none ${errors.email ? 'border-red-500' : 'border-transparent focus:border-primary/40'}`}
                              style={{ 
                                background: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
                              }}
                              autoComplete="email" 
                            />
                          </div>
                          {errors.email && <p className="mt-2 text-sm font-medium text-red-600">{errors.email.message}</p>}
                        </div>

                        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                          <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Password</label>
                          <div className="relative group">
                            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200" style={{ color: 'var(--text-muted)' }} />
                            <input 
                              {...register('password')} 
                              type={showPassword ? 'text' : 'password'} 
                              placeholder="Enter your password" 
                              className={`w-full pl-12 pr-12 py-2.5 rounded-2xl font-medium transition-all duration-200 border outline-none ${errors.password ? 'border-red-500' : 'border-transparent focus:border-primary/40'}`}
                              style={{ 
                                background: 'var(--bg-surface)',
                                color: 'var(--text-primary)',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
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

                        <button 
                          type="submit" 
                          disabled={isSubmitting || isRedirecting} 
                          className="w-full py-2.5 mt-0.5 text-base font-bold flex items-center justify-center gap-3 rounded-2xl transition-all duration-200 relative overflow-hidden" 
                          style={{ 
                            background: isSubmitting ? 'var(--color-primary)' : activeRole.accent,
                            color: 'white',
                            opacity: isSubmitting || isRedirecting ? 0.75 : 1,
                            cursor: isSubmitting || isRedirecting ? 'not-allowed' : 'pointer',
                            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
                          }}
                        >
                          {isSubmitting && <div className="absolute inset-0 bg-white/20 animate-pulse" />}

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
                    </div>

                    <aside className="rounded-2xl border p-4 sm:p-4.5" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                      <div className="rounded-2xl p-3.5 text-white" style={{ background: activeRole.accent }}>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">Demo access</p>
                        <p className="mt-2 text-base font-bold">Prefilled credentials</p>
                        <p className="mt-2 text-sm leading-6 opacity-90">Use the details below for a quick sign-in.</p>
                      </div>

                      <div className="mt-3.5 space-y-2.5">
                        <div className="rounded-2xl px-3.5 py-2.5" style={{ background: 'var(--bg-surface-light)' }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Email</p>
                          <p className="mt-1 break-all text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{DEMO_CREDS[selectedRole]?.email}</p>
                        </div>
                        <div className="rounded-2xl px-3.5 py-2.5" style={{ background: 'var(--bg-surface-light)' }}>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Password</p>
                          <p className="mt-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{DEMO_CREDS[selectedRole]?.password}</p>
                        </div>
                      </div>
                    </aside>
                  </div>

                  {isSubmitting && (
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-transparent to-black/5 animate-fade-in pointer-events-none" />
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
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
