'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth.service';
import { getToken, setToken, removeToken } from '@/services/api-client';
import { ROLES, ROUTES } from '@/utils/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userData = await authService.getProfile(token);
        setUser(userData);
      } catch {
        removeToken();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);
    try {
      const { user: userData, token } = await authService.login(email, password);
      setToken(token);
      setUser(userData);

      // Redirect based on role
      if (userData.role === ROLES.PRINCIPAL) {
        router.push(ROUTES.PRINCIPAL.DASHBOARD);
      } else if (userData.role === ROLES.TEACHER) {
        router.push(ROUTES.TEACHER.DASHBOARD);
      }

      return userData;
    } catch (err) {
      const message = err?.message || 'Login failed. Please try again.';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    setError(null);
    router.push(ROUTES.LOGIN);
  }, [router]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isTeacher: user?.role === ROLES.TEACHER,
    isPrincipal: user?.role === ROLES.PRINCIPAL,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
