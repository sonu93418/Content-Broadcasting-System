'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ROLES, ROUTES } from '@/utils/constants';
import Link from 'next/link';
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
} from 'react-icons/hi2';

export default function HomePage() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-[#030712]">
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-text-primary overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <MdCastConnected className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">ContentCast</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="#roles" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Roles</a>
            <Link href="/live/teacher-1" className="text-sm text-text-secondary hover:text-text-primary transition-colors">Live Demo</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href={ROUTES.LOGIN} className="btn-primary py-2 px-5 text-sm">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/4 rounded-full blur-[140px]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-primary-light">Educational Content Broadcasting Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in">
            Seamless Content Delivery{' '}
            <span className="gradient-text">From Teachers</span>{' '}
            <span className="text-text-primary">To Students</span>
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: '100ms' }}>
            ContentCast empowers educational institutions with a streamlined workflow — teachers upload subject-based content, principals approve it, and students view live broadcasts in real-time.
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
                <p className="text-xs text-text-muted mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-primary-light uppercase tracking-widest">Features</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Everything You Need for <span className="gradient-text">Content Broadcasting</span></h2>
            <p className="text-text-secondary max-w-xl mx-auto">A complete platform designed to make educational content delivery efficient, organized, and impactful.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HiOutlineCloudArrowUp, title: 'Easy Upload', desc: 'Drag-and-drop file uploads with preview, supporting JPG, PNG, and GIF formats up to 10MB.', color: 'primary' },
              { icon: HiOutlineShieldCheck, title: 'Approval Workflow', desc: 'Principals review, approve, or reject content with mandatory reasons before it goes live.', color: 'success' },
              { icon: HiOutlineSignal, title: 'Live Broadcasting', desc: 'Students view approved content in real-time with auto-rotation and 30-second polling refresh.', color: 'accent' },
              { icon: HiOutlineClock, title: 'Smart Scheduling', desc: 'Set start and end times with rotation duration. Content auto-activates and expires on schedule.', color: 'warning' },
              { icon: HiOutlineChartBar, title: 'Dashboard Analytics', desc: 'Visual stat cards showing total, pending, approved, and rejected content at a glance.', color: 'danger' },
              { icon: HiOutlineGlobeAlt, title: 'Public Access', desc: 'No login required for students — just share the live link and they can view active broadcasts.', color: 'secondary' },
            ].map((f, i) => {
              const colorMap = {
                primary: { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary-light' },
                success: { bg: 'bg-success/10', border: 'border-success/20', text: 'text-success' },
                accent: { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent' },
                warning: { bg: 'bg-warning/10', border: 'border-warning/20', text: 'text-warning' },
                danger: { bg: 'bg-danger/10', border: 'border-danger/20', text: 'text-danger' },
                secondary: { bg: 'bg-secondary/10', border: 'border-secondary/20', text: 'text-secondary' },
              };
              const c = colorMap[f.color];
              return (
                <div key={i} className="glass-card glass-card-hover p-6 group" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <f.icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">{f.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 px-4 relative">
        <div className="absolute left-0 w-full h-full bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-primary-light uppercase tracking-widest">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">How It <span className="gradient-text">Works</span></h2>
            <p className="text-text-secondary max-w-xl mx-auto">Three simple steps from content creation to live broadcasting.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Teacher Uploads', desc: 'Teachers create content with title, subject, file, description, and schedule it with start/end times.', icon: HiOutlineCloudArrowUp, color: '#818cf8' },
              { step: '02', title: 'Principal Reviews', desc: 'Principals see pending content, preview it, and approve or reject with a mandatory reason.', icon: HiOutlineShieldCheck, color: '#34d399' },
              { step: '03', title: 'Students Watch Live', desc: 'Approved content broadcasts on a public page with auto-rotation — no login needed for students.', icon: HiOutlineSignal, color: '#22d3ee' },
            ].map((s, i) => (
              <div key={i} className="relative text-center">
                <div className="text-6xl font-black text-surface-lighter/50 mb-4">{s.step}</div>
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  <s.icon className="w-8 h-8" style={{ color: s.color }} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-14 -right-4 text-text-muted text-2xl">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROLE-BASED AUTH SECTION ===== */}
      <section id="roles" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-primary-light uppercase tracking-widest">Access</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">Choose Your <span className="gradient-text">Role</span></h2>
            <p className="text-text-secondary max-w-xl mx-auto">Sign in as a Teacher to upload content, or as a Principal to manage approvals. Students can access live content without login.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teacher Card */}
            <Link href="/login?role=teacher" className="glass-card p-8 text-center group cursor-pointer border border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/25 group-hover:scale-110 transition-transform">
                <HiOutlineAcademicCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Teacher</h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">Upload content, set schedules, track approval status, and manage your submissions.</p>
              <div className="bg-surface rounded-xl p-3 mb-4 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-primary-light shrink-0" />Upload & schedule content</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-primary-light shrink-0" />Track content approval status</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-primary-light shrink-0" />View dashboard analytics</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-primary-light shrink-0" />Share live broadcast link</div>
              </div>
              <div className="bg-surface rounded-lg p-2.5 mb-4">
                <p className="text-[11px] text-text-muted">Demo: <span className="text-text-secondary">teacher@school.com</span> / <span className="text-text-secondary">teacher123</span></p>
              </div>
              <span className="btn-primary py-2.5 px-6 text-sm inline-flex items-center gap-2 group-hover:shadow-lg group-hover:shadow-primary/30">
                Sign In as Teacher <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Principal Card */}
            <Link href="/login?role=principal" className="glass-card p-8 text-center group cursor-pointer border border-success/10 hover:border-success/40 transition-all duration-300 hover:shadow-lg hover:shadow-success/10 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-success to-emerald-700 shadow-lg shadow-success/25 group-hover:scale-110 transition-transform">
                <HiOutlineShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Principal</h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">Review all content, approve or reject with reasons, and oversee institutional broadcasts.</p>
              <div className="bg-surface rounded-xl p-3 mb-4 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-success shrink-0" />View all submitted content</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-success shrink-0" />Approve or reject with reason</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-success shrink-0" />Filter by status & search</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-success shrink-0" />Institutional analytics</div>
              </div>
              <div className="bg-surface rounded-lg p-2.5 mb-4">
                <p className="text-[11px] text-text-muted">Demo: <span className="text-text-secondary">principal@school.com</span> / <span className="text-text-secondary">principal123</span></p>
              </div>
              <span className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-success to-emerald-700 group-hover:shadow-lg group-hover:shadow-success/30 transition-all">
                Sign In as Principal <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Student Card */}
            <Link href="/live/teacher-1" className="glass-card p-8 text-center group cursor-pointer border border-accent/10 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gradient-to-br from-accent to-cyan-700 shadow-lg shadow-accent/25 group-hover:scale-110 transition-transform">
                <HiOutlineUserGroup className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Student</h3>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">View live broadcast content from your teachers — no account or login required.</p>
              <div className="bg-surface rounded-xl p-3 mb-4 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-accent shrink-0" />View active broadcasts</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-accent shrink-0" />Auto-refreshing content</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-accent shrink-0" />No login required</div>
                <div className="flex items-center gap-2 text-xs text-text-secondary"><HiOutlineCheckBadge className="w-3.5 h-3.5 text-accent shrink-0" />Content auto-rotation</div>
              </div>
              <div className="bg-surface rounded-lg p-2.5 mb-4">
                <p className="text-[11px] text-text-muted">Public access via <span className="text-text-secondary">/live/:teacherId</span></p>
              </div>
              <span className="inline-flex items-center gap-2 py-2.5 px-6 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-accent to-cyan-700 group-hover:shadow-lg group-hover:shadow-accent/30 transition-all">
                View Live Content <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <MdCastConnected className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold gradient-text">ContentCast</span>
          </div>
          <p className="text-xs text-text-muted">Content Broadcasting System — Built for Educational Institutions</p>
          <div className="flex gap-4">
            <Link href={ROUTES.LOGIN} className="text-xs text-text-secondary hover:text-text-primary transition-colors">Sign In</Link>
            <Link href="/live/teacher-1" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Live Demo</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
