// Mock data for development - easily replaceable with real API
import { generateId } from '@/utils/helpers';

// Use a STABLE reference time (today at midnight) so SSR and client produce the same dates.
// This avoids React hydration mismatch errors from Date.now() differing between server & client.
const REF = new Date();
REF.setHours(12, 0, 0, 0); // noon today — stable within the same calendar day
const REF_MS = REF.getTime();

function daysAgo(days) {
  return new Date(REF_MS - days * 86400000).toISOString();
}
function daysFromNow(days) {
  return new Date(REF_MS + days * 86400000).toISOString();
}
function hoursFromNow(hours) {
  return new Date(REF_MS + hours * 3600000).toISOString();
}

const MOCK_USERS = [
  {
    id: 'teacher-1',
    email: 'teacher@school.com',
    password: 'teacher123',
    name: 'Sarah Johnson',
    role: 'teacher',
    avatar: null,
  },
  {
    id: 'teacher-2',
    email: 'teacher2@school.com',
    password: 'teacher123',
    name: 'Michael Chen',
    role: 'teacher',
    avatar: null,
  },
  {
    id: 'principal-1',
    email: 'principal@school.com',
    password: 'principal123',
    name: 'Dr. Robert Williams',
    role: 'principal',
    avatar: null,
  },
];

let MOCK_CONTENT = [
  {
    id: 'content-1',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'Introduction to Algebra',
    subject: 'Mathematics',
    description: 'A comprehensive overview of algebraic expressions, equations, and problem-solving techniques for Grade 8 students.',
    fileUrl: '/mock/algebra.png',
    fileName: 'algebra-intro.png',
    fileType: 'image/png',
    fileSize: 2048000,
    status: 'approved',
    rejectionReason: null,
    startTime: daysAgo(5),
    endTime: daysFromNow(10),
    rotationDuration: 30,
    createdAt: daysAgo(8),
    updatedAt: daysAgo(6),
  },
  {
    id: 'content-2',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'Photosynthesis Process',
    subject: 'Biology',
    description: 'Visual explanation of the photosynthesis process including light and dark reactions.',
    fileUrl: '/mock/photosynthesis.png',
    fileName: 'photosynthesis.jpg',
    fileType: 'image/jpeg',
    fileSize: 3500000,
    status: 'pending',
    rejectionReason: null,
    startTime: hoursFromNow(12),
    endTime: daysFromNow(10),
    rotationDuration: 45,
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: 'content-3',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'World War II Timeline',
    subject: 'History',
    description: 'Key events and dates of World War II presented in a visual timeline format.',
    fileUrl: '/mock/ww2.png',
    fileName: 'ww2-timeline.png',
    fileType: 'image/png',
    fileSize: 4200000,
    status: 'rejected',
    rejectionReason: 'Image resolution is too low. Please upload a higher quality version for better readability on broadcast screens.',
    startTime: daysAgo(3),
    endTime: daysFromNow(2),
    rotationDuration: 60,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(4),
  },
  {
    id: 'content-4',
    teacherId: 'teacher-2',
    teacherName: 'Michael Chen',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    description: 'Illustrated guide to Newton\'s three laws of motion with real-world examples.',
    fileUrl: '/mock/newton.png',
    fileName: 'newtons-laws.jpg',
    fileType: 'image/jpeg',
    fileSize: 2800000,
    status: 'approved',
    rejectionReason: null,
    startTime: daysAgo(4),
    endTime: daysFromNow(8),
    rotationDuration: 30,
    createdAt: daysAgo(6),
    updatedAt: daysAgo(5),
  },
  {
    id: 'content-5',
    teacherId: 'teacher-2',
    teacherName: 'Michael Chen',
    title: 'Periodic Table Interactive',
    subject: 'Chemistry',
    description: 'Color-coded periodic table with element properties and common compounds.',
    fileUrl: '/mock/periodic.png',
    fileName: 'periodic-table.png',
    fileType: 'image/png',
    fileSize: 5100000,
    status: 'pending',
    rejectionReason: null,
    startTime: daysFromNow(2),
    endTime: daysFromNow(15),
    rotationDuration: 45,
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'content-6',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'Shakespeare\'s Sonnets',
    subject: 'English',
    description: 'Analysis of key Shakespeare sonnets with literary devices highlighted.',
    fileUrl: '/mock/shakespeare.png',
    fileName: 'sonnets.gif',
    fileType: 'image/gif',
    fileSize: 1200000,
    status: 'approved',
    rejectionReason: null,
    startTime: daysAgo(2),
    endTime: daysFromNow(5),
    rotationDuration: 60,
    createdAt: daysAgo(4),
    updatedAt: daysAgo(3),
  },
  {
    id: 'content-7',
    teacherId: 'teacher-2',
    teacherName: 'Michael Chen',
    title: 'Python Programming Basics',
    subject: 'Computer Science',
    description: 'Introduction to Python programming: variables, loops, and functions.',
    fileUrl: '/mock/python.png',
    fileName: 'python-basics.png',
    fileType: 'image/png',
    fileSize: 1800000,
    status: 'pending',
    rejectionReason: null,
    startTime: daysFromNow(3),
    endTime: daysFromNow(13),
    rotationDuration: 30,
    createdAt: daysAgo(2),
    updatedAt: daysAgo(2),
  },
  {
    id: 'content-8',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'Geometry Formulas',
    subject: 'Mathematics',
    description: 'Essential geometry formulas for circles, triangles, and polygons with visual diagrams.',
    fileUrl: '/mock/geometry.png',
    fileName: 'geometry.jpg',
    fileType: 'image/jpeg',
    fileSize: 2500000,
    status: 'approved',
    rejectionReason: null,
    startTime: daysAgo(10),
    endTime: daysFromNow(20),
    rotationDuration: 45,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(11),
  },
  {
    id: 'content-9',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'Cell Division & Mitosis',
    subject: 'Biology',
    description: 'Step-by-step visual guide to mitosis and cell division phases with labeled diagrams.',
    fileUrl: '/mock/photosynthesis.png',
    fileName: 'cell-division.png',
    fileType: 'image/png',
    fileSize: 3100000,
    status: 'approved',
    rejectionReason: null,
    startTime: hoursFromNow(2),
    endTime: daysFromNow(7),
    rotationDuration: 40,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'content-10',
    teacherId: 'teacher-1',
    teacherName: 'Sarah Johnson',
    title: 'French Revolution Overview',
    subject: 'History',
    description: 'Key events of the French Revolution from 1789-1799 with timeline and cause-effect analysis.',
    fileUrl: '/mock/ww2.png',
    fileName: 'french-revolution.png',
    fileType: 'image/png',
    fileSize: 2700000,
    status: 'approved',
    rejectionReason: null,
    startTime: daysFromNow(1),
    endTime: daysFromNow(10),
    rotationDuration: 50,
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
];

// Simulate network delay
function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simulate occasional errors (set to false for stable demo)
const SIMULATE_ERRORS = false;
function maybeError() {
  if (SIMULATE_ERRORS && Math.random() < 0.1) {
    throw new Error('Simulated network error');
  }
}

export const mockAuthService = {
  async login(email, password) {
    await delay(800);
    maybeError();
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userData } = user;
    return {
      user: userData,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    };
  },

  async getProfile(token) {
    await delay(300);
    // Token format: 'mock-jwt-token-{userId}-{timestamp}'
    // userId can contain hyphens (e.g. 'teacher-1'), so extract between 'token-' and last '-'
    const parts = token?.split('-') || [];
    // parts: ['mock', 'jwt', 'token', 'teacher', '1', 'timestamp']
    // userId = everything from index 3 to second-to-last, joined by '-'
    const userId = parts.length > 4 ? parts.slice(3, -1).join('-') : '';
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) throw new Error('Invalid token');
    const { password: _, ...userData } = user;
    return userData;
  },
};

export const mockContentService = {
  async getAll(filters = {}) {
    await delay(500);
    maybeError();
    let results = [...MOCK_CONTENT];

    if (filters.status) {
      results = results.filter((c) => c.status === filters.status);
    }
    if (filters.teacherId) {
      results = results.filter((c) => c.teacherId === filters.teacherId);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q)
      );
    }

    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return { data: results, total: results.length };
  },

  async getById(id) {
    await delay(400);
    maybeError();
    const content = MOCK_CONTENT.find((c) => c.id === id);
    if (!content) throw new Error('Content not found');
    return content;
  },

  async getByTeacherId(teacherId) {
    await delay(500);
    maybeError();
    const results = MOCK_CONTENT.filter((c) => c.teacherId === teacherId).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return { data: results, total: results.length };
  },

  async create(data) {
    await delay(1000);
    maybeError();
    const newContent = {
      id: `content-${generateId()}`,
      ...data,
      status: 'pending',
      rejectionReason: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    MOCK_CONTENT = [newContent, ...MOCK_CONTENT];
    return newContent;
  },

  async getLiveContent(teacherId) {
    await delay(500);
    maybeError();
    const now = new Date();
    const results = MOCK_CONTENT.filter((c) => {
      if (c.teacherId !== teacherId) return false;
      if (c.status !== 'approved') return false;
      const start = new Date(c.startTime);
      const end = new Date(c.endTime);
      return now >= start && now <= end;
    });
    return { data: results, total: results.length };
  },

  async getScheduledContent(teacherId) {
    await delay(400);
    maybeError();
    const now = new Date();
    const results = MOCK_CONTENT.filter((c) => {
      if (c.teacherId !== teacherId) return false;
      if (c.status !== 'approved') return false;
      const start = new Date(c.startTime);
      return start > now; // starts in the future
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    return { data: results, total: results.length };
  },

  async getStats(teacherId) {
    await delay(400);
    const items = teacherId
      ? MOCK_CONTENT.filter((c) => c.teacherId === teacherId)
      : MOCK_CONTENT;
    return {
      total: items.length,
      pending: items.filter((c) => c.status === 'pending').length,
      approved: items.filter((c) => c.status === 'approved').length,
      rejected: items.filter((c) => c.status === 'rejected').length,
    };
  },
};

export const mockApprovalService = {
  async approve(contentId) {
    await delay(800);
    maybeError();
    const index = MOCK_CONTENT.findIndex((c) => c.id === contentId);
    if (index === -1) throw new Error('Content not found');
    MOCK_CONTENT[index] = {
      ...MOCK_CONTENT[index],
      status: 'approved',
      rejectionReason: null,
      updatedAt: new Date().toISOString(),
    };
    return MOCK_CONTENT[index];
  },

  async reject(contentId, reason) {
    await delay(800);
    maybeError();
    if (!reason || !reason.trim()) throw new Error('Rejection reason is required');
    const index = MOCK_CONTENT.findIndex((c) => c.id === contentId);
    if (index === -1) throw new Error('Content not found');
    MOCK_CONTENT[index] = {
      ...MOCK_CONTENT[index],
      status: 'rejected',
      rejectionReason: reason,
      updatedAt: new Date().toISOString(),
    };
    return MOCK_CONTENT[index];
  },
};
