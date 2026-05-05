'use client';

import { memo } from 'react';
import Image from 'next/image';
import StatusBadge from './StatusBadge';
import { formatDate, getScheduleStatus, truncateText } from '@/utils/helpers';
import { HiOutlineClock, HiOutlineCalendar, HiOutlineUser } from 'react-icons/hi2';

/**
 * Premium 3D content card with enhanced visuals
 */
function ContentCard({
  content,
  showTeacher = false,
  showActions = false,
  onApprove,
  onReject,
  onView,
  delay = 0,
}) {
  const scheduleStatus = getScheduleStatus(content.startTime, content.endTime);

  return (
    <div
      className="glass-card glass-card-hover overflow-hidden animate-fade-in group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Image Preview */}
      <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-surface-light)' }}>
        {content.fileUrl ? (
          <Image
            src={content.fileUrl}
            alt={content.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            unoptimized
          />
        ) : null}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 60%)' }} />

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />

        {/* Status badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={content.status} />
        </div>
        {scheduleStatus && (
          <div className="absolute top-3 right-3">
            <StatusBadge status={scheduleStatus} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-primary-light bg-primary/10 px-2.5 py-1 rounded-full border border-primary/15">
            {content.subject}
          </span>
        </div>

        <h3 className="text-lg font-bold mb-1.5 line-clamp-1" style={{ color: 'var(--text-primary)' }}>
          {content.title}
        </h3>

        {content.description && (
          <p className="text-sm mb-3 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {truncateText(content.description, 100)}
          </p>
        )}

        {/* Meta info */}
        <div className="space-y-1.5 mb-4">
          {showTeacher && (
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <HiOutlineUser className="w-3.5 h-3.5" />
              <span>{content.teacherName}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            <span>{formatDate(content.startTime)} — {formatDate(content.endTime)}</span>
          </div>
          {content.rotationDuration && (
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <HiOutlineClock className="w-3.5 h-3.5" />
              <span>{content.rotationDuration}s rotation</span>
            </div>
          )}
        </div>

        {/* Rejection reason */}
        {content.status === 'rejected' && content.rejectionReason && (
          <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 mb-4">
            <p className="text-xs text-danger font-medium mb-0.5">Rejection Reason:</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{content.rejectionReason}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && content.status === 'pending' && (
          <div className="flex gap-2 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => onApprove?.(content.id)}
              className="btn-success flex-1 text-sm py-2"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => onReject?.(content)}
              className="btn-danger flex-1 text-sm py-2"
            >
              ✗ Reject
            </button>
          </div>
        )}

        {onView && (
          <button
            onClick={() => onView(content)}
            className="w-full btn-secondary text-sm py-2 mt-2"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(ContentCard);
