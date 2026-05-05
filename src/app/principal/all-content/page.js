'use client';

import { useState, useMemo, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ContentCard from '@/components/ui/ContentCard';
import SearchFilter from '@/components/ui/SearchFilter';
import SkeletonLoader from '@/components/ui/SkeletonLoader';
import EmptyState from '@/components/ui/EmptyState';
import ErrorState from '@/components/ui/ErrorState';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import { useContent } from '@/hooks/useContent';
import { ROLES } from '@/utils/constants';
import { debounce, formatDate, getScheduleStatus } from '@/utils/helpers';
import { HiOutlineRectangleStack } from 'react-icons/hi2';
import Image from 'next/image';

export default function AllContentPage() {
  const { data, loading, error, refetch } = useContent();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedContent, setSelectedContent] = useState(null);

  const debouncedSearch = useCallback(debounce((val) => setSearch(val), 300), []);

  const filtered = useMemo(() => {
    let items = data || [];
    if (statusFilter) items = items.filter((c) => c.status === statusFilter);
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((c) => c.title.toLowerCase().includes(q) || c.subject.toLowerCase().includes(q) || c.teacherName.toLowerCase().includes(q));
    }
    return items;
  }, [data, statusFilter, search]);

  return (
    <DashboardLayout allowedRole={ROLES.PRINCIPAL}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">All Content</h1>
            <p className="text-text-secondary">Browse all submitted content across the institution</p>
          </div>
          <span className="text-sm text-text-muted">{filtered.length} items</span>
        </div>

        <SearchFilter searchValue={search} onSearchChange={(v) => { setSearch(v); debouncedSearch(v); }} statusFilter={statusFilter} onStatusChange={setStatusFilter} />

        {loading ? (
          <SkeletonLoader type="content-card" count={6} />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={HiOutlineRectangleStack} title="No content found" description={search || statusFilter ? 'Try adjusting your filters' : 'No content has been submitted yet.'} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <ContentCard key={item.id} content={item} showTeacher delay={i * 60} onView={setSelectedContent} />
            ))}
          </div>
        )}

        <Modal isOpen={!!selectedContent} onClose={() => setSelectedContent(null)} title="Content Details" maxWidth="max-w-2xl">
          {selectedContent && (
            <div className="space-y-4">
              {selectedContent.fileUrl && (
                <div className="relative h-56 bg-surface rounded-xl overflow-hidden">
                  <Image src={selectedContent.fileUrl} alt={selectedContent.title} fill className="object-contain" unoptimized />
                </div>
              )}
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedContent.status} />
                {getScheduleStatus(selectedContent.startTime, selectedContent.endTime) && <StatusBadge status={getScheduleStatus(selectedContent.startTime, selectedContent.endTime)} />}
              </div>
              <h3 className="text-lg font-semibold text-text-primary">{selectedContent.title}</h3>
              <p className="text-sm text-primary-light">{selectedContent.subject}</p>
              <p className="text-xs text-text-muted">By {selectedContent.teacherName}</p>
              {selectedContent.description && <p className="text-sm text-text-secondary">{selectedContent.description}</p>}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-text-muted">Start:</span> <span className="text-text-primary ml-1">{formatDate(selectedContent.startTime)}</span></div>
                <div><span className="text-text-muted">End:</span> <span className="text-text-primary ml-1">{formatDate(selectedContent.endTime)}</span></div>
              </div>
              {selectedContent.status === 'rejected' && selectedContent.rejectionReason && (
                <div className="bg-danger/10 border border-danger/20 rounded-lg p-3">
                  <p className="text-xs text-danger font-medium mb-1">Rejection Reason:</p>
                  <p className="text-sm text-text-secondary">{selectedContent.rejectionReason}</p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
