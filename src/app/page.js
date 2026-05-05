'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { ROLES, ROUTES } from '@/utils/constants';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { MdCastConnected } from 'react-icons/md';
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

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const { isDark } = useTheme();
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
      {/* Sakura ambient */}
      <div className="sakura-bg">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="petal" style={{
            left: `${10 + i * 12}%`,
            animationDuration: `${8 + i * 2}s`,
            animationDelay: `${i * 1.5}s`,
            width: `${6 + (i % 3) * 4}px`,
            height: `${6 + (i % 3) * 4}px`,
          }} />
        ))}
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'shadow-xl' : ''}`}
        style={{
          background: scrolled ? 'var(--overlay-bg)' : 'transparent',
          backdropFilter: scrolled ? 'var(--glass-blur)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
              <MdCastConnected className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">ContentCast</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link key={link.label} href={link.href} className="text-sm font-medium transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </Link>
              ) : (
                <a key={link.label} href={link.href} className="text-sm font-medium transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>
                  {link.label}
                </a>
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
          <div className="md:hidden animate-fade-in" style={{ background: 'var(--overlay-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) =>
                link.isRoute ? (
                  <Link key={link.label} href={link.href} className="block py-2.5 px-4 rounded-xl text-sm transition-all" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileMenu(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className="block py-2.5 px-4 rounded-xl text-sm transition-all" style={{ color: 'var(--text-secondary)' }} onClick={() => setMobileMenu(false)}>
                    {link.label}
                  </a>
                )
              )}
              <Link href={ROUTES.LOGIN} className="btn-primary py-2.5 px-5 text-sm w-full text-center block mt-3" onClick={() => setMobileMenu(false)}>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 animate-fade-in animate-glow-border" style={{ background: 'rgba(232,121,160,0.08)', border: '1px solid rgba(232,121,160,0.15)' }}>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary-light">🌸 Educational Content Broadcasting</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in">
            Seamless Content Delivery{' '}
            <span className="gradient-text">From Teachers</span>{' '}
            <span style={{ color: 'var(--text-primary)' }}>To Students</span>
          </h1>

          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ color: 'var(--text-secondary)', animationDelay: '100ms' }}>
            ContentCast empowers educational institutions with a streamlined workflow — teachers upload, principals approve, students view live broadcasts in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <Link href={ROUTES.LOGIN} className="btn-primary px-8 py-3.5 text-base flex items-center justify-center gap-2 group">
              Get Started <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/live/teacher-1" className="btn-secondary px-8 py-3.5 text-base flex items-center justify-center gap-2">
              <HiOutlineSignal className="w-4 h-4" /> View Live Demo
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { num: '3', label: 'User Roles' },
              { num: '∞', label: 'Content Uploads' },
              { num: '24/7', label: 'Live Broadcasting' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold gradient-text">{s.num}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDENT DEMO FRAME ===== */}
      <section className="py-16 px-4 relative">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card p-2 sm:p-3 animate-glow-border" style={{ borderRadius: '24px' }}>
            <div className="rounded-[18px] overflow-hidden relative" style={{ boxShadow: '0 20px 80px rgba(232,121,160,0.15), 0 8px 30px rgba(0,0,0,0.3)' }}>
              <img
                src="/mock/student-demo.png"
                alt="Student viewing live broadcast content"
                className="w-full h-auto object-cover"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white" style={{ background: 'rgba(248,113,113,0.85)', backdropFilter: 'blur(8px)' }}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                  LIVE BROADCAST
                </div>
                <span className="text-xs text-white/80 font-medium px-3 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>Student View</span>
              </div>
            </div>
          </div>
          <p className="text-center text-xs mt-4" style={{ color: 'var(--text-muted)' }}>🌸 Students view approved content in real-time — no login required</p>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Everything You Need for <span className="gradient-text">Broadcasting</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">A complete platform for efficient, organized educational content delivery.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiOutlineCloudArrowUp, title: 'Easy Upload', desc: 'Drag-and-drop file uploads with preview, supporting JPG, PNG, and GIF formats up to 10MB.', color: '#e879a0' },
              { icon: HiOutlineShieldCheck, title: 'Approval Workflow', desc: 'Principals review, approve, or reject content with mandatory reasons before it goes live.', color: '#34d399' },
              { icon: HiOutlineSignal, title: 'Live Broadcasting', desc: 'Students view approved content in real-time with auto-rotation and 30-second polling refresh.', color: '#fbbf24' },
              { icon: HiOutlineClock, title: 'Smart Scheduling', desc: 'Set start and end times with rotation duration. Content auto-activates and expires on schedule.', color: '#fb923c' },
              { icon: HiOutlineChartBar, title: 'Dashboard Analytics', desc: 'Visual stat cards showing total, pending, approved, and rejected content at a glance.', color: '#c084fc' },
              { icon: HiOutlineGlobeAlt, title: 'Public Access', desc: 'No login required for students — just share the live link and they can view active broadcasts.', color: '#38bdf8' },
            ].map((f, i) => (
              <div key={i} className="glass-card glass-card-hover p-6 group" style={{ animationDelay: `${i * 80}ms` }}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}25`, boxShadow: `0 6px 20px ${f.color}20` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="absolute left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">How It <span className="gradient-text">Works</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">Three simple steps from content creation to live broadcasting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Teacher Uploads', desc: 'Teachers create content with title, subject, file, description, and schedule it with start/end times.', icon: HiOutlineCloudArrowUp, color: '#e879a0' },
              { step: '02', title: 'Principal Reviews', desc: 'Principals see pending content, preview it, and approve or reject with a mandatory reason.', icon: HiOutlineShieldCheck, color: '#34d399' },
              { step: '03', title: 'Students Watch Live', desc: 'Approved content broadcasts on a public page with auto-rotation — no login needed for students.', icon: HiOutlineSignal, color: '#fbbf24' },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="text-6xl font-black mb-4" style={{ color: 'var(--bg-surface-lighter)', opacity: 0.5 }}>{s.step}</div>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-float" style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, boxShadow: `0 8px 30px ${s.color}20`, animationDelay: `${i * 0.5}s` }}>
                  <s.icon className="w-8 h-8" style={{ color: s.color }} />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-14 -right-4 text-2xl" style={{ color: 'var(--text-muted)' }}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROLE-BASED AUTH SECTION ===== */}
      <section id="roles" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Access</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Choose Your <span className="gradient-text">Role</span></h2>
            <p style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto">Sign in as a Teacher to upload content, or as a Principal to manage approvals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teacher Card */}
            <Link href="/login?role=teacher" className="glass-card p-7 text-center group cursor-pointer transition-all duration-400 hover:shadow-xl hover:-translate-y-4" style={{ borderColor: 'rgba(232,121,160,0.1)' }}>
              <div className="w-[72px] h-[72px] rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:shadow-primary/35">
                <HiOutlineAcademicCap className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Teacher</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Upload content, set schedules, track approval status.</p>
              <div className="rounded-xl p-3 mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['Upload & schedule content', 'Track approval status', 'View dashboard analytics', 'Share live broadcast link'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 text-primary-light shrink-0" />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Demo: <span style={{ color: 'var(--text-secondary)' }}>teacher@school.com</span> / <span style={{ color: 'var(--text-secondary)' }}>teacher123</span></p>
              </div>
              <span className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2">
                Sign In as Teacher <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Principal Card */}
            <Link href="/login?role=principal" className="glass-card p-7 text-center group cursor-pointer transition-all duration-400 hover:shadow-xl hover:-translate-y-4" style={{ borderColor: 'rgba(52,211,153,0.1)' }}>
              <div className="w-[72px] h-[72px] rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-success to-emerald-700 shadow-lg shadow-success/25 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:shadow-success/35">
                <HiOutlineShieldCheck className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Principal</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Review, approve or reject content with reasons.</p>
              <div className="rounded-xl p-3 mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['View all submitted content', 'Approve or reject with reason', 'Filter by status & search', 'Institutional analytics'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 text-success shrink-0" />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Demo: <span style={{ color: 'var(--text-secondary)' }}>principal@school.com</span> / <span style={{ color: 'var(--text-secondary)' }}>principal123</span></p>
              </div>
              <span className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-success to-emerald-700 shadow-lg shadow-success/25 group-hover:shadow-xl group-hover:shadow-success/35 transition-all" style={{ boxShadow: '0 6px 20px rgba(52,211,153,0.3), 0 1px 0 rgba(255,255,255,0.15) inset' }}>
                Sign In as Principal <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Student Card */}
            <Link href="/live/teacher-1" className="glass-card p-7 text-center group cursor-pointer transition-all duration-400 hover:shadow-xl hover:-translate-y-4" style={{ borderColor: 'rgba(251,191,36,0.1)' }}>
              <div className="w-[72px] h-[72px] rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-accent to-amber-600 shadow-lg shadow-accent/25 group-hover:scale-110 transition-transform group-hover:shadow-xl group-hover:shadow-accent/35">
                <HiOutlineUserGroup className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Student</h3>
              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>View live broadcast content — no login required.</p>
              <div className="rounded-xl p-3 mb-4 text-left space-y-2" style={{ background: 'var(--bg-surface-light)' }}>
                {['View active broadcasts', 'Auto-refreshing content', 'No login required', 'Content auto-rotation'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}><HiOutlineCheckBadge className="w-3.5 h-3.5 text-accent shrink-0" />{t}</div>
                ))}
              </div>
              <div className="rounded-lg p-2.5 mb-4" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Public access via <span style={{ color: 'var(--text-secondary)' }}>/live/:teacherId</span></p>
              </div>
              <span className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-accent to-amber-600 shadow-lg shadow-accent/25 group-hover:shadow-xl group-hover:shadow-accent/35 transition-all" style={{ boxShadow: '0 6px 20px rgba(251,191,36,0.3), 0 1px 0 rgba(255,255,255,0.15) inset' }}>
                View Live Content <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ borderTop: '1px solid var(--border-color)' }} className="py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-md shadow-primary/15">
              <MdCastConnected className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold gradient-text">ContentCast</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>🌸 Content Broadcasting System — Built for Educational Institutions</p>
          <div className="flex gap-4">
            <Link href={ROUTES.LOGIN} className="text-xs transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>Sign In</Link>
            <Link href="/live/teacher-1" className="text-xs transition-colors hover:text-primary-light" style={{ color: 'var(--text-secondary)' }}>Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
