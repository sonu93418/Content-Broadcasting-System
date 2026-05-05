/**
 * Content Service
 * All content-related API calls go through this service layer.
 * To connect to a real backend, replace mock calls with apiCall().
 */
import { mockContentService } from './mock-data';
// import { apiCall } from './api-client';

const contentService = {
  /**
   * Get all content with optional filters
   * @param {Object} filters - { status, teacherId, search }
   * @returns {Promise<{data: Array, total: number}>}
   */
  async getAll(filters = {}) {
    // Replace with: return apiCall('GET', `/api/content?${new URLSearchParams(filters)}`);
    return mockContentService.getAll(filters);
  },

  /**
   * Get content by ID
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    // Replace with: return apiCall('GET', `/api/content/${id}`);
    return mockContentService.getById(id);
  },

  /**
   * Get content by teacher ID
   * @param {string} teacherId
   * @returns {Promise<{data: Array, total: number}>}
   */
  async getByTeacherId(teacherId) {
    // Replace with: return apiCall('GET', `/api/content/teacher/${teacherId}`);
    return mockContentService.getByTeacherId(teacherId);
  },

  /**
   * Create new content
   * @param {Object} data - Content data with file
   * @returns {Promise<Object>}
   */
  async create(data) {
    // For real backend with file upload:
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, val]) => formData.append(key, val));
    // return apiCall('POST', '/api/content', formData);
    return mockContentService.create(data);
  },

  /**
   * Get live/active content for a teacher
   * @param {string} teacherId
   * @returns {Promise<{data: Array, total: number}>}
   */
  async getLiveContent(teacherId) {
    // Replace with: return apiCall('GET', `/api/content/live/${teacherId}`);
    return mockContentService.getLiveContent(teacherId);
  },

  /**
   * Get content statistics
   * @param {string|null} teacherId - Optional teacher filter
   * @returns {Promise<{total, pending, approved, rejected}>}
   */
  async getStats(teacherId = null) {
    // Replace with: return apiCall('GET', `/api/content/stats${teacherId ? `?teacherId=${teacherId}` : ''}`);
    return mockContentService.getStats(teacherId);
  },
};

export default contentService;
