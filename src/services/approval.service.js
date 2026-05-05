/**
 * Approval Service
 * All approval-related API calls go through this service layer.
 * To connect to a real backend, replace mock calls with apiCall().
 */
import { mockApprovalService } from './mock-data';
// import { apiCall } from './api-client';

const approvalService = {
  /**
   * Approve content by ID
   * @param {string} contentId
   * @returns {Promise<Object>}
   */
  async approve(contentId) {
    // Replace with: return apiCall('PUT', `/api/approval/${contentId}/approve`);
    return mockApprovalService.approve(contentId);
  },

  /**
   * Reject content by ID with reason
   * @param {string} contentId
   * @param {string} reason
   * @returns {Promise<Object>}
   */
  async reject(contentId, reason) {
    // Replace with: return apiCall('PUT', `/api/approval/${contentId}/reject`, { reason });
    return mockApprovalService.reject(contentId, reason);
  },
};

export default approvalService;
