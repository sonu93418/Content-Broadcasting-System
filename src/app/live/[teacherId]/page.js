'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useLiveContent } from '@/hooks/useContent';
import contentService from '@/services/content.service';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { MdCastConnected } from 'react-icons/md';
import { formatDate } from '@/utils/helpers';
import {
  HiOutlineSignal,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineArrowPath,
  HiOutlineCalendarDays,
  HiOutlineBookOpen,
  HiOutlinePlay,
  HiOutlinePause,
} from 'react-icons/hi2';

export default function LivePage() {
  const params = useParams();
  const teacherId = params.teacherId;
  const { data, loading, error, refetch } = useLiveContent(teacherId, 30000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastRefreshText, setLastRefreshText] = useState('—');
  const [refreshCountdown, setRefreshCountdown] = useState(30);
  const [scheduled, setScheduled] = useState([]);
  const [countdowns, setCountdowns] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);

  const currentContent = data?.[currentIndex];
  const rotationSec = currentContent?.rotationDuration || 30;

  // Fetch scheduled content
  useEffect(() => {
    if (!teacherId) return;
    contentService.getScheduledContent(teacherId).then((res) => setScheduled(res.data)).catch(() => {});
  }, [teacherId, data]);

  // Live countdown timers for scheduled items
  useEffect(() => {
    if (!scheduled.length) return;
    const tick = () => {
      const now = Date.now();
      const obj = {};
      scheduled.forEach((item) => {
        const diff = new Date(item.startTime).getTime() - now;
        if (diff > 0) {
          const hrs = Math.floor(diff / 3600000);
          const mins = Math.floor((diff % 3600000) / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          obj[item.id] = hrs > 0 ? `${hrs}h ${mins}m ${secs}s` : mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        } else {
          obj[item.id] = 'Starting now...';
        }
      });
      setCountdowns(obj);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [scheduled]);

  // Auto-rotate content with progress bar
  useEffect(() => {
    if (!data || data.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = 100 / (rotationSec * 10);
        if (prev >= 100) {
          setCurrentIndex((i) => (i + 1) % data.length);
          setImgLoaded(false);
          return 0;
        }
        return prev + step;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [data, isPaused, rotationSec]);

  const goTo = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
    setImgLoaded(false);
  }, []);

  const goPrev = useCallback(() => {
    if (!data?.length) return;
    goTo((currentIndex - 1 + data.length) % data.length);
  }, [data, currentIndex, goTo]);

  const goNext = useCallback(() => {
    if (!data?.length) return;
    goTo((currentIndex + 1) % data.length);
  }, [data, currentIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === ' ') { e.preventDefault(); setIsPaused((p) => !p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goPrev, goNext]);

  // Refresh countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCountdown((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { setLastRefreshText(new Date().toLocaleTimeString()); setRefreshCountdown(30); }, [data]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-body)' }}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Loading broadcast...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-body)' }}>
        <div className="glass-card p-8 text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-danger/10 flex items-center justify-center mx-auto mb-4">
            <HiOutlineSignal className="w-7 h-7 text-danger" />
          </div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Broadcast Error</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{error}</p>
          <button onClick={refetch} className="btn-primary px-6 py-2">Retry</button>
        </div>
      </div>
    );
  }

  // No content state
  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-body)' }}>
        <div className="glass-card p-10 text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--bg-surface-lighter)' }}>
            <HiOutlineSignal className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Active Broadcast</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>There is no active broadcast from this teacher right now.</p>
          <button onClick={refetch} className="btn-secondary flex items-center gap-2 mx-auto">
            <HiOutlineArrowPath className="w-4 h-4" /> Refresh
          </button>

          {scheduled.length > 0 && (
            <div className="mt-8 pt-6 text-left" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <HiOutlineCalendarDays className="w-4 h-4 text-warning" /> Upcoming Scheduled
              </h3>
              <div className="space-y-2">
                {scheduled.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-lg p-3" style={{ background: 'var(--bg-surface)' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.subject}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono font-semibold text-warning">{countdowns[item.id] || '...'}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>starts in</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--bg-body)' }}>
      {/* Background ambient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-30" style={{ background: 'var(--overlay-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/15">
                <MdCastConnected className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>ContentCast</h1>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Live Broadcasting</p>
              </div>
            </Link>
            <div className="w-px h-8 hidden sm:block" style={{ background: 'var(--border-color)' }} />
            {currentContent && (
              <div className="hidden sm:flex items-center gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <HiOutlineAcademicCap className="w-4 h-4 text-primary-light" />
                <span>{currentContent.teacherName}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <HiOutlineArrowPath className="w-3.5 h-3.5" />
              <span>Refresh in {refreshCountdown}s</span>
            </div>
            <div className="flex items-center gap-2 bg-danger/15 border border-danger/30 rounded-full px-3 py-1.5 text-danger text-xs font-bold">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger" />
              </span>
              LIVE
            </div>
            <ThemeToggle />
            <button onClick={() => { refetch(); setRefreshCountdown(30); }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} title="Refresh now">
              <HiOutlineArrowPath className="w-4 h-4" />
            </button>
          </div>
        </div>

        {data.length > 1 && (
          <div className="h-0.5" style={{ background: 'var(--bg-surface-lighter)' }}>
            <div className="h-full bg-gradient-to-r from-primary via-accent to-secondary transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        )}
      </header>

      {/* ===== MAIN BROADCAST AREA ===== */}
      <main className="relative z-10">
        <div className="relative bg-black">
          <div className="relative w-full flex items-center justify-center overflow-hidden cursor-pointer" style={{ minHeight: '50vh', maxHeight: '70vh' }} onClick={() => setIsPaused((p) => !p)}>
            {currentContent?.fileUrl && (
              <img src={currentContent.fileUrl} alt="" className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110" />
            )}
            {currentContent?.fileUrl && (
              <img key={currentContent.id} src={currentContent.fileUrl} alt={currentContent.title} className={`relative max-w-full max-h-[70vh] object-contain z-10 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImgLoaded(true)} />
            )}
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-5">
                <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            )}
            {isPaused && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 animate-fade-in">
                <div className="rounded-2xl px-8 py-4 flex items-center gap-3 shadow-2xl" style={{ background: 'var(--overlay-bg)', backdropFilter: 'blur(12px)' }}>
                  <HiOutlinePause className="w-6 h-6 text-white" />
                  <span className="text-sm font-medium text-white">Paused — Click to resume</span>
                </div>
              </div>
            )}
            {data.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all z-20 border border-white/10">
                  <HiOutlineArrowLeft className="w-5 h-5 text-white" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all z-20 border border-white/10">
                  <HiOutlineArrowRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
            {data.length > 1 && (
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold text-white z-20">
                {currentIndex + 1} / {data.length}
              </div>
            )}
            <button onClick={(e) => { e.stopPropagation(); setIsPaused((p) => !p); }} className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center z-20 border border-white/10 hover:bg-black/70 transition">
              {isPaused ? <HiOutlinePlay className="w-5 h-5 text-white" /> : <HiOutlinePause className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* === CONTENT INFO BAR === */}
        <div style={{ background: 'var(--overlay-bg)', backdropFilter: 'var(--glass-blur)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-primary-light bg-primary/10 px-3 py-1 rounded-full border border-primary/20">{currentContent?.subject}</span>
                  <span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><HiOutlineBookOpen className="w-3.5 h-3.5" />{currentContent?.teacherName}</span>
                  {data.length > 1 && (<span className="text-xs flex items-center gap-1" style={{ color: 'var(--text-muted)' }}><HiOutlineClock className="w-3.5 h-3.5" />{rotationSec}s per slide</span>)}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{currentContent?.title}</h2>
                <p className="text-sm leading-relaxed max-w-3xl" style={{ color: 'var(--text-secondary)' }}>{currentContent?.description}</p>
              </div>
              <div className="shrink-0 rounded-xl p-4 lg:w-60" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <p className="text-[11px] uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}><HiOutlineCalendarDays className="w-3.5 h-3.5" /> Schedule</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Start</span><span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{formatDate(currentContent?.startTime)}</span></div>
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>End</span><span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{formatDate(currentContent?.endTime)}</span></div>
                  <div className="flex justify-between"><span style={{ color: 'var(--text-muted)' }}>Duration</span><span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{rotationSec}s rotation</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === BOTTOM SECTIONS === */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {data.length > 1 && (
            <div className="flex items-center justify-center gap-2">
              {data.map((item, i) => (
                <button key={item.id} onClick={() => goTo(i)} className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'w-10 h-3 bg-primary-light' : 'w-3 h-3'}`} style={i !== currentIndex ? { background: 'var(--bg-surface-lighter)' } : undefined} title={item.title} />
              ))}
            </div>
          )}

          {data.length > 1 && (
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><HiOutlineSignal className="w-4 h-4 text-accent" />All Active Broadcasts ({data.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.map((item, i) => (
                  <button key={item.id} onClick={() => goTo(i)} className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${i === currentIndex ? 'bg-primary/10 border border-primary/25 shadow-lg shadow-primary/5' : 'border border-transparent'}`} style={i !== currentIndex ? { background: 'var(--bg-surface)' } : undefined}>
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--bg-surface-lighter)' }}>
                      <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover" />
                      {i === currentIndex && (<div className="absolute inset-0 bg-primary/20 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-white animate-pulse" /></div>)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${i === currentIndex ? 'text-primary-light' : ''}`} style={i !== currentIndex ? { color: 'var(--text-primary)' } : undefined}>{item.title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.subject} • {item.rotationDuration}s</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {scheduled.length > 0 && (
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><HiOutlineCalendarDays className="w-4 h-4 text-warning" />Upcoming Scheduled ({scheduled.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scheduled.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0" style={{ background: 'var(--bg-surface-lighter)' }}>
                      <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><HiOutlineClock className="w-4 h-4 text-white" /></div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.subject}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-mono font-semibold text-warning">{countdowns[item.id] || '...'}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>starts in</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-xs" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />Auto-refreshing every 30s</span>
              {data.length > 1 && (<span>← → navigate • Space pause</span>)}
            </div>
            <span>Last updated: {lastRefreshText}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
