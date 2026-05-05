// Application constants

export const ROLES = {
  TEACHER: 'teacher',
  PRINCIPAL: 'principal',
};

export const CONTENT_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

export const SCHEDULE_STATUS = {
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  EXPIRED: 'expired',
};

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Art',
  'Music',
  'Physical Education',
];

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const FILE_TYPE_LABELS = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const ROUTES = {
  LOGIN: '/login',
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    UPLOAD: '/teacher/upload',
    MY_CONTENT: '/teacher/my-content',
  },
  PRINCIPAL: {
    DASHBOARD: '/principal/dashboard',
    PENDING: '/principal/pending',
    ALL_CONTENT: '/principal/all-content',
  },
  LIVE: '/live',
};
