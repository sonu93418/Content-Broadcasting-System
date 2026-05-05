'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import contentService from '@/services/content.service';

/**
 * Hook for fetching and managing content data
 * Handles loading, error, and refresh states
 */
export function useContent(filters = {}, autoFetch = true) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filtersRef = useRef(filters);

  // Update ref when filters change
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  const fetchContent = useCallback(async (overrideFilters) => {
    setLoading(true);
    setError(null);
    try {
      const activeFilters = overrideFilters || filtersRef.current;
      const result = await contentService.getAll(activeFilters);
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchContent(filters);
    }
  // Only re-fetch when filter values actually change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters), autoFetch]);

  return { data, total, loading, error, refetch: fetchContent };
}

/**
 * Hook for fetching teacher-specific content
 */
export function useTeacherContent(teacherId) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    if (!teacherId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await contentService.getByTeacherId(teacherId);
      setData(result.data);
      setTotal(result.total);
    } catch (err) {
      setError(err.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return { data, total, loading, error, refetch: fetchContent };
}

/**
 * Hook for fetching content statistics
 */
export function useContentStats(teacherId = null) {
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await contentService.getStats(teacherId);
      setStats(result);
    } catch (err) {
      setError(err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}

/**
 * Hook for live content with optional polling
 */
export function useLiveContent(teacherId, pollInterval = 30000) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLiveContent = useCallback(async () => {
    if (!teacherId) return;
    try {
      const result = await contentService.getLiveContent(teacherId);
      setData(result.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load live content');
    } finally {
      setLoading(false);
    }
  }, [teacherId]);

  useEffect(() => {
    fetchLiveContent();

    if (pollInterval > 0) {
      const interval = setInterval(fetchLiveContent, pollInterval);
      return () => clearInterval(interval);
    }
  }, [fetchLiveContent, pollInterval]);

  return { data, loading, error, refetch: fetchLiveContent };
}
