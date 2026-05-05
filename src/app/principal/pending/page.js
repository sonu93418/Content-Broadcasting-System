'use client';

import { useState, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ContentCard from '@/components/ui/ContentCard';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import Modal from '@/components/ui/Modal';
import { useContent } from '@/hooks/useContent';
import approvalService from '@/services/approval.service';
import { ROLES, CONTENT_STATUS } from '@/utils/constants';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';

export default function PendingApprovalsPage() {
  const { data, loading, error, refetch } = useContent({ status: CONTENT_STATUS.PENDING });
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [actionError, setActionError] = useState(null);

  const handleApprove = useCallback(async (id) => {
    setActionLoading(id);
    setActionError(null);
    try {
      await approvalService.approve(id);
      refetch();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }, [refetch]);

  const handleRejectSubmit = useCallback(async () => {
    if (!rejectReason.trim()) return;
    setActionLoading(rejectModal?.id);
    setActionError(null);
    try {
      await approvalService.reject(rejectModal.id, rejectReason);
      setRejectModal(null);
      setRejectReason('');
      refetch();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setActionLoading(null);
    }
  }, [rejectModal, rejectReason, refetch]);

  return (
    <DashboardLayout allowedRole={ROLES.PRINCIPAL}>
      <div className="space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">Pending Approvals</h1>
          <p className="text-text-secondary">Review and approve or reject submitted content</p>
        </div>

        {actionError && (
          <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 animate-fade-in">
            <p className="text-sm text-danger">{actionError}</p>
          </div>
        )}

        {loading ? (
          <SkeletonLoader type="content-card" count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : data.length === 0 ? (
          <EmptyState icon={HiOutlineClipboardDocumentCheck} title="All caught up!" description="No pending content to review right now." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, i) => (
              <ContentCard key={item.id} content={item} showTeacher showActions onApprove={handleApprove} onReject={(c) => { setRejectModal(c); setRejectReason(''); }} delay={i * 80} />
            ))}
          </div>
        )}

        {/* Reject Modal */}
        <Modal isOpen={!!rejectModal} onClose={() => setRejectModal(null)} title="Reject Content">
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              Rejecting: <span className="text-text-primary font-medium">{rejectModal?.title}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Rejection Reason <span className="text-danger">*</span></label>
              <textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} placeholder="Provide a clear reason for rejection..." rows={4} className="input-field resize-none" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setRejectModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={handleRejectSubmit} disabled={!rejectReason.trim() || actionLoading === rejectModal?.id} className="btn-danger flex-1 flex items-center justify-center gap-2">
                {actionLoading === rejectModal?.id ? (<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />) : 'Reject Content'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
