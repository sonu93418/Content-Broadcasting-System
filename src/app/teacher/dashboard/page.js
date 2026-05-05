'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useContentStats } from '@/hooks/useContent';
import StatCard from '@/components/ui/StatCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import ErrorState from '@/components/ui/ErrorState';
import { ROLES } from '@/utils/constants';
import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCloudArrowUp,
  HiOutlineSignal,
  HiOutlineClipboardDocumentList,
  HiOutlineLink,
  HiOutlineArrowTopRightOnSquare,
} from 'react-icons/hi2';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { stats, loading, error, refetch } = useContentStats(user?.id);
  const [liveUrl, setLiveUrl] = useState('');

  useEffect(() => {
    setLiveUrl(`${window.location.origin}/live/${user?.id}`);
  }, [user?.id]);

  return (
    <DashboardLayout allowedRole={ROLES.TEACHER}>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Here&apos;s an overview of your content activity</p>
        </div>

        {/* Stats */}
        {loading ? (
          <SkeletonLoader type="card" count={4} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Total Uploaded" value={stats.total} icon={HiOutlineDocumentText} color="primary" delay={0} />
            <StatCard label="Pending Review" value={stats.pending} icon={HiOutlineClock} color="warning" delay={100} />
            <StatCard label="Approved" value={stats.approved} icon={HiOutlineCheckCircle} color="success" delay={200} />
            <StatCard label="Rejected" value={stats.rejected} icon={HiOutlineXCircle} color="danger" delay={300} />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link href={ROUTES.TEACHER.UPLOAD} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #c2785c, #a0604a)', boxShadow: '0 4px 12px rgba(194,120,92,0.15)' }}>
                <HiOutlineCloudArrowUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Upload Content</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Create and submit new content</p>
              </div>
            </div>
          </Link>

          <Link href={ROUTES.TEACHER.MY_CONTENT} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #d4a853, #b88e3a)', boxShadow: '0 4px 12px rgba(212,168,83,0.15)' }}>
                <HiOutlineClipboardDocumentList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>My Content</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Track your submissions</p>
              </div>
            </div>
          </Link>

          <Link href={`/live/${user?.id}`} target="_blank" className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #6dae7f, #4e9460)', boxShadow: '0 4px 12px rgba(109,174,127,0.15)' }}>
                <HiOutlineSignal className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Live Preview</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>View your broadcast page</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Live link */}
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h3 className="text-base font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <HiOutlineLink className="w-5 h-5" style={{ color: 'var(--color-primary)' }} /> Your Live Broadcasting Link
          </h3>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>Share this link with students to view your active content:</p>
          <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <code className="text-sm flex-1 truncate" style={{ color: 'var(--color-primary-light)' }}>
              {liveUrl || `/live/${user?.id}`}
            </code>
            <button onClick={() => { navigator.clipboard?.writeText(liveUrl); }} className="btn-primary text-xs py-2 px-4 shrink-0">
              Copy Link
            </button>
          </div>
        </div>

        {/* Student demo image — MacBook Frame */}
        <div className="glass-card animate-fade-in overflow-hidden" style={{ animationDelay: '600ms', borderRadius: '16px' }}>
          {/* MacBook Window Chrome */}
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'var(--bg-surface-light)', borderBottom: '1px solid var(--border-color)' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
            <span className="text-xs font-medium ml-3" style={{ color: 'var(--text-muted)' }}>ContentCast — Live Student View</span>
          </div>
          {/* Content */}
          <div className="p-2.5">
            <div className="rounded-lg overflow-hidden relative">
              <img src="/mock/student-demo.png" alt="Indian classroom broadcast view" className="w-full h-auto object-cover" style={{ maxHeight: '280px', objectFit: 'cover' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: 'rgba(199,92,92,0.8)' }}>
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-white" /></span>
                LIVE — Student View
              </div>
              <a href={`/live/${user?.id}`} target="_blank" className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white transition-all hover:scale-105" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)' }}>
                Open <HiOutlineArrowTopRightOnSquare className="w-3 h-3" />
              </a>
            </div>
            <p className="text-center text-xs mt-2.5 mb-1" style={{ color: 'var(--text-muted)' }}>This is how students see your approved broadcast content</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
