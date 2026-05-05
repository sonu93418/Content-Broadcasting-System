import { CONTENT_STATUS, SCHEDULE_STATUS, ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './constants';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

/**
 * Format a date string to a human-readable format
 */
export function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return format(date, 'MMM dd, yyyy HH:mm');
  } catch {
    return '—';
  }
}

/**
 * Format a date for datetime-local input
 */
export function formatDateForInput(dateStr) {
  if (!dateStr) return '';
  try {
    const date = typeof dateStr === 'string' ? parseISO(dateStr) : dateStr;
    return format(date, "yyyy-MM-dd'T'HH:mm");
  } catch {
    return '';
  }
}

/**
 * Determine schedule status from start/end times
 */
export function getScheduleStatus(startTime, endTime) {
  if (!startTime || !endTime) return null;

  const now = new Date();
  const start = typeof startTime === 'string' ? parseISO(startTime) : startTime;
  const end = typeof endTime === 'string' ? parseISO(endTime) : endTime;

  if (isBefore(now, start)) return SCHEDULE_STATUS.SCHEDULED;
  if (isAfter(now, end)) return SCHEDULE_STATUS.EXPIRED;
  return SCHEDULE_STATUS.ACTIVE;
}

/**
 * Validate file type and size
 */
export function validateFile(file) {
  const errors = [];

  if (!file) {
    errors.push('File is required');
    return errors;
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    errors.push('File type must be JPG, PNG, or GIF');
  }

  if (file.size > MAX_FILE_SIZE) {
    errors.push('File size must be less than 10MB');
  }

  return errors;
}

/**
 * Format file size to human-readable
 */
export function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let unitIndex = 0;
  let size = bytes;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Get status badge class name
 */
export function getStatusClass(status) {
  const map = {
    [CONTENT_STATUS.PENDING]: 'status-pending',
    [CONTENT_STATUS.APPROVED]: 'status-approved',
    [CONTENT_STATUS.REJECTED]: 'status-rejected',
    [SCHEDULE_STATUS.ACTIVE]: 'status-active',
    [SCHEDULE_STATUS.SCHEDULED]: 'status-scheduled',
    [SCHEDULE_STATUS.EXPIRED]: 'status-expired',
  };
  return map[status] || 'status-pending';
}

/**
 * Truncate text to a max length
 */
export function truncateText(text, maxLength = 80) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Generate a simple unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
