'use client';

import { useState, useRef, memo, useCallback } from 'react';
import { HiOutlineCloudArrowUp, HiOutlineXMark, HiOutlinePhoto } from 'react-icons/hi2';
import { validateFile, formatFileSize } from '@/utils/helpers';
import { ALLOWED_FILE_TYPES } from '@/utils/constants';

/**
 * Drag-and-drop file upload component with preview
 */
function FileUpload({ value, onChange, error: externalError, disabled = false }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [internalError, setInternalError] = useState(null);
  const inputRef = useRef(null);

  const error = externalError || internalError;

  const handleFile = useCallback((file) => {
    if (!file) return;

    const errors = validateFile(file);
    if (errors.length > 0) {
      setInternalError(errors.join(', '));
      return;
    }

    setInternalError(null);

    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    onChange?.(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    if (disabled) return;

    const file = e.dataTransfer?.files?.[0];
    handleFile(file);
  }, [disabled, handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) setDragActive(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setPreview(null);
    setInternalError(null);
    onChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onChange]);

  return (
    <div>
      {preview ? (
        /* Preview state */
        <div className="relative glass-card overflow-hidden animate-scale-in">
          <div className="relative h-56 bg-surface-light">
            <img
              src={preview}
              alt="Upload preview"
              className="w-full h-full object-contain"
            />
            {!disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-surface/80 backdrop-blur flex items-center justify-center hover:bg-danger transition-colors"
                type="button"
              >
                <HiOutlineXMark className="w-5 h-5 text-white" />
              </button>
            )}
          </div>
          {value && (
            <div className="px-4 py-3 border-t border-border flex items-center gap-3">
              <HiOutlinePhoto className="w-5 h-5 text-primary-light" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-text-primary truncate">{value.name}</p>
                <p className="text-xs text-text-muted">{formatFileSize(value.size)}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Upload state */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !disabled && inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-danger/50 bg-danger/5'
              : 'border-border hover:border-primary/50 hover:bg-surface-light/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_FILE_TYPES.join(',')}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />

          <div className="flex flex-col items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              dragActive ? 'bg-primary/20' : 'bg-surface-light'
            }`}>
              <HiOutlineCloudArrowUp className={`w-7 h-7 ${dragActive ? 'text-primary-light' : 'text-text-muted'}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">
                {dragActive ? 'Drop your file here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-text-muted mt-1">
                JPG, PNG, or GIF • Max 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-danger animate-fade-in">{error}</p>
      )}
    </div>
  );
}

export default memo(FileUpload);
