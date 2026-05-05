'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useLiveContent } from '@/hooks/useContent';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import Image from 'next/image';
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
} from 'react-icons/hi2';

export default function LivePage() {
  const params = useParams();
  const teacherId = params.teacherId;
  const { data, loading, error, refetch } = useLiveContent(teacherId, 30000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshCountdown, setRefreshCountdown] = useState(30);

  const currentContent = data?.[currentIndex];
  const rotationSec = currentContent?.rotationDuration || 30;

  // Auto-rotate content with progress bar
  useEffect(() => {
    if (!data || data.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const step = 100 / (rotationSec * 10); // 100ms ticks
        if (prev >= 100) {
          setCurrentIndex((i) => (i + 1) % data.length);
          return 0;
        }
        return prev + step;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [data, isPaused, rotationSec]);

  // Reset progress on manual navigation
  const goTo = useCallback((index) => {
    setCurrentIndex(index);
    setProgress(0);
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

  useEffect(() => { setLastRefresh(new Date()); setRefreshCountdown(30); }, [data]);

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[180px]" />
      </div>

      {/* ===== HEADER ===== */}
      <header className="border-b border-border bg-surface/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/15">
                <MdCastConnected className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold text-text-primary leading-tight">ContentCast</h1>
                <p className="text-[10px] text-text-muted">Live Broadcasting</p>
              </div>
            </Link>

            {/* Separator */}
            <div className="w-px h-8 bg-border hidden sm:block" />

            {/* Teacher info */}
            {currentContent && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-text-secondary">
                <HiOutlineAcademicCap className="w-4 h-4 text-primary-light" />
                <span>{currentContent.teacherName}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Refresh indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted">
              <HiOutlineArrowPath className="w-3.5 h-3.5" />
              <span>Refresh in {refreshCountdown}s</span>
            </div>

            {/* Live badge */}
            {data && data.length > 0 && (
              <div className="flex items-center gap-2 status-badge status-active">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current" />
                </span>
                LIVE
              </div>
            )}

            {/* Manual refresh */}
            <button
              onClick={() => { refetch(); setRefreshCountdown(30); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-surface-lighter transition-colors"
              title="Refresh now"
            >
              <HiOutlineArrowPath className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        {loading ? (
          <SkeletonLoader type="live" />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : !data || data.length === 0 ? (
          <div className="py-20">
            <EmptyState
              icon={HiOutlineSignal}
              title="No content available"
              description="There is no active broadcast content from this teacher right now. Content will appear here when the teacher schedules approved content."
              action={
                <div className="flex flex-col items-center gap-3">
                  <button onClick={refetch} className="btn-secondary flex items-center gap-2">
                    <HiOutlineArrowPath className="w-4 h-4" /> Refresh
                  </button>
                  <p className="text-xs text-text-muted">Auto-refreshes every 30 seconds</p>
                </div>
              }
            />
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">

            {/* ===== CONTENT DISPLAY ===== */}
            <div className="glass-card overflow-hidden relative" style={{ animation: 'pulse-glow 4s infinite' }}>

              {/* Progress bar (top of card) */}
              {data.length > 1 && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-surface-lighter z-10">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}

              {/* Image display */}
              <div
                className="relative bg-surface-light overflow-hidden cursor-pointer"
                style={{ minHeight: '300px', maxHeight: '500px', height: '50vh' }}
                onClick={() => setIsPaused((p) => !p)}
              >
                {currentContent?.fileUrl && (
                  <Image
                    key={currentContent.id}
                    src={currentContent.fileUrl}
                    alt={currentContent.title}
                    fill
                    className="object-contain animate-fade-in"
                    priority
                    unoptimized
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}

                {/* Pause overlay */}
                {isPaused && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10 animate-fade-in">
                    <div className="bg-surface/80 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center gap-3">
                      <div className="w-3 h-8 bg-white rounded-sm" />
                      <div className="w-3 h-8 bg-white rounded-sm" />
                      <span className="text-sm font-medium text-text-primary ml-2">Paused — Click to resume</span>
                    </div>
                  </div>
                )}

                {/* Navigation arrows (only if multiple items) */}
                {data.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/70 backdrop-blur flex items-center justify-center hover:bg-surface transition-colors z-10 opacity-0 group-hover:opacity-100 sm:opacity-70"
                    >
                      <HiOutlineArrowLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface/70 backdrop-blur flex items-center justify-center hover:bg-surface transition-colors z-10 opacity-0 group-hover:opacity-100 sm:opacity-70"
                    >
                      <HiOutlineArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}

                {/* Content counter overlay */}
                {data.length > 1 && (
                  <div className="absolute top-4 right-4 bg-surface/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-text-primary z-10">
                    {currentIndex + 1} / {data.length}
                  </div>
                )}
              </div>

              {/* Content details */}
              <div className="p-6 sm:p-8 border-t border-border">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary-light bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        {currentContent?.subject}
                      </span>
                      {data.length > 1 && (
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <HiOutlineClock className="w-3.5 h-3.5" />
                          {rotationSec}s per slide
                        </span>
                      )}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2">
                      {currentContent?.title}
                    </h2>
                    {currentContent?.description && (
                      <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                        {currentContent.description}
                      </p>
                    )}
                  </div>

                  {/* Schedule info */}
                  <div className="shrink-0 bg-surface rounded-xl p-4 sm:w-56">
                    <p className="text-[11px] text-text-muted uppercase tracking-wider font-semibold mb-2">Schedule</p>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-text-muted">Start</span>
                        <span className="text-text-secondary">{formatDate(currentContent?.startTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">End</span>
                        <span className="text-text-secondary">{formatDate(currentContent?.endTime)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-muted">Teacher</span>
                        <span className="text-text-secondary">{currentContent?.teacherName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== SLIDE INDICATORS ===== */}
            {data.length > 1 && (
              <div className="flex items-center justify-center gap-2 py-2">
                {data.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => goTo(i)}
                    className={`relative transition-all duration-300 rounded-full ${
                      i === currentIndex
                        ? 'w-10 h-3 bg-primary-light'
                        : 'w-3 h-3 bg-surface-lighter hover:bg-border-light'
                    }`}
                    title={item.title}
                  />
                ))}
              </div>
            )}

            {/* ===== ALL ACTIVE CONTENT LIST ===== */}
            {data.length > 1 && (
              <div className="glass-card p-6">
                <h3 className="text-sm font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <HiOutlineSignal className="w-4 h-4 text-accent" />
                  All Active Broadcasts ({data.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {data.map((item, i) => (
                    <button
                      key={item.id}
                      onClick={() => goTo(i)}
                      className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                        i === currentIndex
                          ? 'bg-primary/10 border border-primary/25'
                          : 'bg-surface hover:bg-surface-lighter border border-transparent'
                      }`}
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-lighter">
                        {item.fileUrl && (
                          <Image src={item.fileUrl} alt={item.title} fill className="object-cover" unoptimized />
                        )}
                        {i === currentIndex && (
                          <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium truncate ${i === currentIndex ? 'text-primary-light' : 'text-text-primary'}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-text-muted">{item.subject}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ===== FOOTER INFO ===== */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 text-xs text-text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  Auto-refreshing every 30 seconds
                </span>
                {data.length > 1 && (
                  <span>Use ← → arrow keys to navigate • Space to pause</span>
                )}
              </div>
              <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
