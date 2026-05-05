/**
 * API Client - Centralized HTTP client
 * Replace this with real axios/fetch calls when connecting to a backend
 */

const TOKEN_KEY = 'cbs_auth_token';

/**
 * Get stored auth token
 */
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Set auth token
 */
export function setToken(token) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Remove auth token
 */
export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Create headers with auth token
 */
export function getAuthHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Generic API call wrapper
 * When connecting to a real backend, replace mock imports in service files
 * and use this client for actual HTTP calls
 */
export async function apiCall(method, url, data = null) {
  const headers = getAuthHeaders();

  const config = {
    method,
    headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API Error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error. Please check your connection.');
    }
    throw error;
  }
}
