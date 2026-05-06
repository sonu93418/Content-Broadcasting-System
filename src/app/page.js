'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { ROLES, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  HiOutlineCloudArrowUp,
  HiOutlineShieldCheck,
  HiOutlineSignal,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineCheckBadge,
  HiOutlineChartBar,
  HiOutlineGlobeAlt,
  HiOutlineBars3,
  HiOutlineXMark,
} from 'react-icons/hi2';

function EduStreamMark({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edustream-ring" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#123b66" />
          <stop offset="55%" stopColor="#c92c2c" />
          <stop offset="100%" stopColor="#123b66" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" stroke="url(#edustream-ring)" strokeWidth="4" />
      <path d="M19 39h26" stroke="#123b66" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M22 31h20l-10 6-10-6Z" fill="#123b66" />
      <path d="M26 25h12l-1 8h-10l-1-8Z" fill="#123b66" />
      <path d="M24 36h16" stroke="#c92c2c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 23l4 8" stroke="#c92c2c" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="18" r="2.5" fill="#c92c2c" />
      <path d="M49 32v10" stroke="#c92c2c" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 42h10" stroke="#123b66" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function MacBookFrame() {
  return (
    <div className="w-full">
      <div className="rounded-4xl border p-3 sm:p-4 shadow-2xl" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}>
        <div className="rounded-3xl overflow-hidden border" style={{ borderColor: 'var(--border-color)', background: 'linear-gradient(180deg, rgba(18,29,44,0.98) 0%, rgba(10,16,28,0.98) 100%)' }}>
          <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
            <span className="text-xs font-medium ml-2 truncate" style={{ color: 'rgba(255,255,255,0.72)' }}>EduStream — Learn • Approve • Broadcast</span>
          </div>

          <div className="px-3 py-4 sm:px-6 sm:py-8">
            <div className="rounded-[1.2rem] sm:rounded-[1.4rem] border p-3 sm:p-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(18,58,101,0.95) 0%, rgba(201,44,44,0.92) 100%)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <div className="mx-auto flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <EduStreamMark size={38} className="sm:hidden" />
                <EduStreamMark size={56} className="hidden sm:block" />
              </div>
              <h3 className="mt-3 sm:mt-5 text-lg sm:text-2xl font-black tracking-tight text-white">EduStream</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">A focused space for teachers, principals, and live learning broadcasts.</p>

              <div className="mt-3 sm:mt-5 rounded-2xl bg-white/10 p-2.5 sm:p-3 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.22em] text-white/85">
                  <span>Learn</span>
                  <span className="text-white/55">•</span>
                  <span>Approve</span>
                  <span className="text-white/55">•</span>
                  <span>Broadcast</span>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-4 h-3 w-28 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      router.replace(user.role === ROLES.PRINCIPAL ? ROUTES.PRINCIPAL.DASHBOARD : ROUTES.TEACHER.DASHBOARD);
    }
  }, [isAuthenticated, user, loading, router]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenu]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#roles', label: 'Roles' },
    { href: '/live/teacher-1', label: 'Live Demo', isRoute: true },
  ];

  

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg-body)', color: 'var(--text-primary)' }}>

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'shadow-lg' : ''}`}
        style={{
          background: scrolled ? 'var(--overlay-bg)' : 'transparent',
          backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/90 p-1 shadow-sm" style={{ border: '1px solid var(--border-color)' }}>
              <EduStreamMark size={34} />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Edu<span className="gradient-text">Stream</span></span>
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--text-muted)' }}>ContentCast platform</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link key={link.label} href={link.href} className="text-sm font-medium transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>{link.label}</Link>
              ) : (
                <a key={link.label} href={link.href} className="text-sm font-medium transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>{link.label}</a>
              )
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={ROUTES.LOGIN} className="btn-primary py-2 px-5 text-sm hidden sm:inline-flex">Sign In</Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors" style={{ color: 'var(--text-secondary)' }}>
              {mobileMenu ? <HiOutlineXMark className="w-5 h-5" /> : <HiOutlineBars3 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden fixed top-16 left-0 right-0 z-40 animate-fade-in" style={{ background: 'var(--overlay-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link key={link.label} href={link.href} className="block py-2.5 px-4 rounded-xl text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileMenu(false)}>{link.label}</Link>
                ) : (
                  <a key={link.label} href={link.href} className="block py-2.5 px-4 rounded-xl text-sm" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileMenu(false)}>{link.label}</a>
                )
              )}
              <Link href={ROUTES.LOGIN} className="btn-primary py-2.5 px-5 text-sm w-full text-center block mt-3" onClick={() => setMobileMenu(false)}>Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-20 pb-6 sm:pt-28 sm:pb-20 px-4">
        <div className="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 rounded-full blur-[120px] w-48 h-48 sm:w-72 sm:h-72 lg:w-125 lg:h-125" style={{ background: 'rgba(194,120,92,0.04)' }} />

        <div className="max-w-7xl mx-auto relative z-10 grid gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 animate-fade-in" style={{ background: 'rgba(194,120,92,0.06)', border: '1px solid rgba(194,120,92,0.12)' }}>
              <HiOutlineSignal className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium" style={{ color: 'var(--color-primary-light)' }}>Educational Content Broadcasting</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 sm:mb-4 animate-fade-in">
              Seamless Content Delivery{' '}
              <span className="gradient-text">From Teachers</span>{' '}
              <span style={{ color: 'var(--text-primary)' }}>To Students</span>
            </h1>

            <p className="text-sm sm:text-lg max-w-xl mx-auto lg:mx-0 mb-5 sm:mb-8 leading-relaxed animate-fade-in" style={{ color: 'var(--text-secondary)', animationDelay: '100ms' }}>
              ContentCast empowers educational institutions with a streamlined workflow — teachers upload, principals approve, students view live broadcasts in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link href={ROUTES.LOGIN} className="btn-primary w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2 group">
                Get Started <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/live/teacher-1" className="btn-secondary w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2">
                <HiOutlineSignal className="w-4 h-4" /> View Live Demo
              </Link>
            </div>

            <div className="mt-6 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-xs sm:max-w-lg mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {[
                { num: '3', label: 'User Roles' },
                { num: '\u221E', label: 'Content Uploads' },
                { num: '24/7', label: 'Live Broadcasting' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold gradient-text">{s.num}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: '250ms' }}>
            <div className="w-full max-w-xs sm:max-w-md">
              <MacBookFrame />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STUDENT DEMO FRAME ===== */}
      <section className="py-6 sm:py-16 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden" style={{ borderRadius: '20px' }}>
            {/* MacBook Window Chrome */}
            <div className="flex items-center gap-2 px-5 py-3" style={{ background: 'var(--bg-surface-light)', borderBottom: '1px solid var(--border-color)' }}>
              <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
              <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              <span className="text-xs font-medium ml-3" style={{ color: 'var(--text-muted)' }}>ContentCast — Live Broadcasting</span>
            </div>
            {/* Content */}
            <div className="p-2 sm:p-3">
              <div className="relative aspect-video overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src="/mock/student-demo.png"
                  alt="Indian classroom with students viewing broadcast content"
                  fill
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ background: 'rgba(199,92,92,0.85)', backdropFilter: 'blur(8px)' }}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    LIVE BROADCAST
                  </div>
                  <span className="text-xs text-white/80 font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)' }}>Student View</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>Students view approved content in real-time — no login required</p>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-8 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-light)' }}>Features</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mt-3 mb-3 sm:mb-4">Everything You Need for <span className="gradient-text">Broadcasting</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">A complete platform for efficient, organized educational content delivery.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: HiOutlineCloudArrowUp, title: 'Easy Upload', desc: 'Drag-and-drop file uploads with preview, supporting JPG, PNG, and GIF formats up to 10MB.', color: '#c2785c' },
              { icon: HiOutlineShieldCheck, title: 'Approval Workflow', desc: 'Principals review, approve, or reject content with mandatory reasons before it goes live.', color: '#6dae7f' },
              { icon: HiOutlineSignal, title: 'Live Broadcasting', desc: 'Students view approved content in real-time with auto-rotation and 30-second polling refresh.', color: '#d4a853' },
              { icon: HiOutlineClock, title: 'Smart Scheduling', desc: 'Set start and end times with rotation duration. Content auto-activates and expires on schedule.', color: '#a68b6b' },
              { icon: HiOutlineChartBar, title: 'Dashboard Analytics', desc: 'Visual stat cards showing total, pending, approved, and rejected content at a glance.', color: '#c75c5c' },
              { icon: HiOutlineGlobeAlt, title: 'Public Access', desc: 'No login required for students — just share the live link and they can view active broadcasts.', color: '#6b8fb5' },
            ].map((f, i) => (
              <div key={i} className="glass-card glass-card-hover p-4 sm:p-6 group" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300" style={{ background: `${f.color}10`, border: `1px solid ${f.color}18` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-8 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-light)' }}>Workflow</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mt-3 mb-3 sm:mb-4">How It <span className="gradient-text">Works</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">Three simple steps from content creation to live broadcasting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {[
              { step: '01', title: 'Teacher Uploads', desc: 'Teachers create content with title, subject, file, description, and schedule it with start/end times.', icon: HiOutlineCloudArrowUp, color: '#c2785c' },
              { step: '02', title: 'Principal Reviews', desc: 'Principals see pending content, preview it, and approve or reject with a mandatory reason.', icon: HiOutlineShieldCheck, color: '#6dae7f' },
              { step: '03', title: 'Students Watch Live', desc: 'Approved content broadcasts on a public page with auto-rotation — no login needed for students.', icon: HiOutlineSignal, color: '#d4a853' },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="text-4xl sm:text-5xl font-black mb-3 sm:mb-4" style={{ color: 'var(--bg-surface-lighter)', opacity: 0.6 }}>{s.step}</div>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-float" style={{ background: `${s.color}10`, border: `1px solid ${s.color}18`, animationDelay: `${i * 0.5}s` }}>
                  <s.icon className="w-7 h-7" style={{ color: s.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-14 -right-4 text-xl" style={{ color: 'var(--text-muted)' }}>&rarr;</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROLE CARDS ===== */}
      <section id="roles" className="py-8 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary-light)' }}>Access</span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mt-3 mb-3 sm:mb-4">Choose Your <span className="gradient-text">Role</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">Sign in as a Teacher to upload content, or as a Principal to manage approvals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Teacher */}
            <Link href="/login?role=teacher" className="glass-card glass-card-hover p-4 sm:p-7 text-center group block">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-5 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #c2785c, #a0604a)' }}>
                <HiOutlineAcademicCap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>Teacher</h3>
              <p className="text-sm mb-3 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>Upload content, set schedules, track approval status.</p>
              <div className="rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['Upload and schedule content', 'Track approval status', 'View dashboard analytics', 'Share live broadcast link'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--color-primary)' }} />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Demo: <span style={{ color: 'var(--text-secondary)' }}>teacher@school.com / teacher123</span></p>
              </div>
              <span className="btn-primary w-full sm:w-auto py-2.5 px-4 text-sm inline-flex items-center justify-center gap-2">
                Sign In as Teacher <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Principal */}
            <Link href="/login?role=principal" className="glass-card glass-card-hover p-4 sm:p-7 text-center group block">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-5 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #6dae7f, #4e9460)' }}>
                <HiOutlineShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>Principal</h3>
              <p className="text-sm mb-3 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>Review, approve or reject content with reasons.</p>
              <div className="rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['View all submitted content', 'Approve or reject with reason', 'Filter by status and search', 'Institutional analytics'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 shrink-0" style={{ color: '#6dae7f' }} />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Demo: <span style={{ color: 'var(--text-secondary)' }}>principal@school.com / principal123</span></p>
              </div>
              <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-white rounded-xl transition-all" style={{ background: 'linear-gradient(135deg, #6dae7f, #4e9460)', boxShadow: '0 3px 10px rgba(109,174,127,0.2)' }}>
                Sign In as Principal <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Student */}
            <Link href="/live/teacher-1" className="glass-card glass-card-hover p-4 sm:p-7 text-center group block">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mx-auto mb-3 sm:mb-5 flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #d4a853, #b88e3a)' }}>
                <HiOutlineUserGroup className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2" style={{ color: 'var(--text-primary)' }}>Student</h3>
              <p className="text-sm mb-3 sm:mb-5" style={{ color: 'var(--text-secondary)' }}>View live broadcast content — no login required.</p>
              <div className="rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['View active broadcasts', 'Auto-refreshing content', 'No login required', 'Content auto-rotation'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 shrink-0" style={{ color: '#d4a853' }} />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Public access via <span style={{ color: 'var(--text-secondary)' }}>/live/:teacherId</span></p>
              </div>
              <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-bold text-white rounded-xl transition-all" style={{ background: 'linear-gradient(135deg, #d4a853, #b88e3a)', boxShadow: '0 3px 10px rgba(212,168,83,0.2)' }}>
                View Live Content <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: '1px solid var(--border-color)' }} className="py-5 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/90 flex items-center justify-center" style={{ border: '1px solid var(--border-color)' }}>
              <EduStreamMark size={18} />
            </div>
            <span className="text-sm font-bold gradient-text">EduStream</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Content Broadcasting System — Built for Educational Institutions</p>
          <div className="flex gap-4">
            <Link href={ROUTES.LOGIN} className="text-xs transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
            <Link href="/live/teacher-1" className="text-xs transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
