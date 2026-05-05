'use client';

import { useState, useCallback } from 'react';
import contentService from '@/services/content.service';
import { validateFile } from '@/utils/helpers';

/**
 * Hook for managing file upload state and content creation
 */
export function useUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const upload = useCallback(async (contentData) => {
    setUploading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);

    try {
      // Validate file
      if (contentData.file) {
        const fileErrors = validateFile(contentData.file);
        if (fileErrors.length > 0) {
          throw new Error(fileErrors.join(', '));
        }
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Create content via service
      const fileUrl = contentData.file
        ? URL.createObjectURL(contentData.file)
        : '/mock/placeholder.png';

      const result = await contentService.create({
        ...contentData,
        fileUrl,
        fileName: contentData.file?.name || 'upload.png',
        fileType: contentData.file?.type || 'image/png',
        fileSize: contentData.file?.size || 0,
      });

      clearInterval(progressInterval);
      setProgress(100);
      setSuccess(true);

      // Reset progress after animation
      setTimeout(() => {
        setProgress(0);
      }, 1500);

      return result;
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUploading(false);
    setProgress(0);
    setError(null);
    setSuccess(false);
  }, []);

  return { upload, uploading, progress, error, success, reset };
}
