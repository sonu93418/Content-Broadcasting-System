/**
 * Authentication Service
 * All auth-related API calls go through this service layer.
 * To connect to a real backend, replace mock calls with apiCall().
 */
import { mockAuthService } from './mock-data';
// import { apiCall } from './api-client';

const authService = {
  /**
   * Login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{user: Object, token: string}>}
   */
  async login(email, password) {
    // Replace with: return apiCall('POST', '/api/auth/login', { email, password });
    return mockAuthService.login(email, password);
  },

  /**
   * Get current user profile from token
   * @param {string} token
   * @returns {Promise<Object>}
   */
  async getProfile(token) {
    // Replace with: return apiCall('GET', '/api/auth/profile');
    return mockAuthService.getProfile(token);
  },
};

export default authService;
