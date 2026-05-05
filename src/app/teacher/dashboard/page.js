'use client';

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
} from 'react-icons/hi2';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { stats, loading, error, refetch } = useContentStats(user?.id);

  return (
    <DashboardLayout allowedRole={ROLES.TEACHER}>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-text-secondary">Here&apos;s an overview of your content activity</p>
        </div>

        {/* Stats */}
        {loading ? (
          <SkeletonLoader type="card" count={4} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total Uploaded"
              value={stats.total}
              icon={HiOutlineDocumentText}
              color="primary"
              delay={0}
            />
            <StatCard
              label="Pending Review"
              value={stats.pending}
              icon={HiOutlineClock}
              color="warning"
              delay={100}
            />
            <StatCard
              label="Approved"
              value={stats.approved}
              icon={HiOutlineCheckCircle}
              color="success"
              delay={200}
            />
            <StatCard
              label="Rejected"
              value={stats.rejected}
              icon={HiOutlineXCircle}
              color="danger"
              delay={300}
            />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <Link href={ROUTES.TEACHER.UPLOAD} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiOutlineDocumentText className="w-6 h-6 text-primary-light" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Upload New Content</h3>
                <p className="text-sm text-text-secondary">Create and submit new educational content</p>
              </div>
            </div>
          </Link>

          <Link href={ROUTES.TEACHER.MY_CONTENT} className="glass-card glass-card-hover p-6 group block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <HiOutlineClock className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">View My Content</h3>
                <p className="text-sm text-text-secondary">Track the status of all your submissions</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Live link hint */}
        <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h3 className="text-lg font-semibold text-text-primary mb-2">📡 Your Live Broadcasting Link</h3>
          <p className="text-sm text-text-secondary mb-3">Share this link with students to view your active content:</p>
          <div className="bg-surface rounded-xl p-3 flex items-center gap-3">
            <code className="text-sm text-primary-light flex-1 truncate">
              {typeof window !== 'undefined' ? window.location.origin : ''}/live/{user?.id}
            </code>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}/live/${user?.id}`);
              }}
              className="btn-secondary text-xs py-1.5 px-3 shrink-0"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
