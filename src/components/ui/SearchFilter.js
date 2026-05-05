'use client';

import { memo } from 'react';
import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';
import { CONTENT_STATUS } from '@/utils/constants';

/**
 * Search and filter bar component
 */
function SearchFilter({
  searchValue = '',
  onSearchChange,
  statusFilter = '',
  onStatusChange,
  placeholder = 'Search by title, subject, or teacher...',
  showStatusFilter = true,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
      {/* Search input */}
      <div className="relative flex-1">
        <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="input-field pl-12"
        />
      </div>

      {/* Status filter */}
      {showStatusFilter && (
        <div className="relative sm:w-48">
          <HiOutlineFunnel className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="input-field pl-11 appearance-none cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value={CONTENT_STATUS.PENDING}>Pending</option>
            <option value={CONTENT_STATUS.APPROVED}>Approved</option>
            <option value={CONTENT_STATUS.REJECTED}>Rejected</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default memo(SearchFilter);
