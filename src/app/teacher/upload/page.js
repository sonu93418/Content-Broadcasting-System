'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FileUpload from '@/components/ui/FileUpload';
import { useAuth } from '@/context/AuthContext';
import { useUpload } from '@/hooks/useUpload';
import { ROLES, SUBJECTS, ROUTES } from '@/utils/constants';
import { HiOutlineCloudArrowUp, HiOutlineCheckCircle } from 'react-icons/hi2';

const uploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Max 100 chars'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().max(500).optional(),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  rotationDuration: z.string().optional(),
}).refine((d) => !d.startTime || !d.endTime || new Date(d.endTime) > new Date(d.startTime), {
  message: 'End time must be after start time', path: ['endTime'],
});

export default function UploadContentPage() {
  const { user } = useAuth();
  const { upload, uploading, progress, error: uploadError, success } = useUpload();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: { title: '', subject: '', description: '', startTime: '', endTime: '', rotationDuration: '30' },
  });

  const onSubmit = useCallback(async (data) => {
    if (!file) { setFileError('File is required'); return; }
    setFileError(null);
    try {
      await upload({ ...data, file, teacherId: user?.id, teacherName: user?.name, rotationDuration: parseInt(data.rotationDuration) || 30 });
      setTimeout(() => { reset(); setFile(null); router.push(ROUTES.TEACHER.MY_CONTENT); }, 1500);
    } catch { /* handled in hook */ }
  }, [file, upload, user, reset, router]);

  if (success) {
    return (
      <DashboardLayout allowedRole={ROLES.TEACHER}>
        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center mx-auto mb-4">
              <HiOutlineCheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Content Uploaded!</h3>
            <p className="text-text-secondary">Your content has been submitted for review.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout allowedRole={ROLES.TEACHER}>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">Upload Content</h1>
          <p className="text-text-secondary">Submit new educational content for approval</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
          {uploadError && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4"><p className="text-sm text-danger">{uploadError}</p></div>
          )}

          <div className="glass-card p-6">
            <label className="block text-sm font-medium text-text-primary mb-3">Content File <span className="text-danger">*</span></label>
            <FileUpload value={file} onChange={(f) => { setFile(f); setFileError(null); }} error={fileError} disabled={uploading} />
          </div>

          <div className="glass-card p-6 space-y-5">
            <h3 className="text-base font-semibold text-text-primary">Content Details</h3>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Title <span className="text-danger">*</span></label>
              <input {...register('title')} placeholder="e.g., Introduction to Algebra" className={`input-field ${errors.title ? 'border-danger' : ''}`} disabled={uploading} />
              {errors.title && <p className="mt-1.5 text-sm text-danger">{errors.title.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Subject <span className="text-danger">*</span></label>
              <select {...register('subject')} className={`input-field appearance-none cursor-pointer ${errors.subject ? 'border-danger' : ''}`} disabled={uploading}>
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subject && <p className="mt-1.5 text-sm text-danger">{errors.subject.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Description</label>
              <textarea {...register('description')} placeholder="Brief description..." rows={3} className="input-field resize-none" disabled={uploading} />
            </div>
          </div>

          <div className="glass-card p-6 space-y-5">
            <h3 className="text-base font-semibold text-text-primary">Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Start Time <span className="text-danger">*</span></label>
                <input {...register('startTime')} type="datetime-local" className={`input-field ${errors.startTime ? 'border-danger' : ''}`} disabled={uploading} />
                {errors.startTime && <p className="mt-1.5 text-sm text-danger">{errors.startTime.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">End Time <span className="text-danger">*</span></label>
                <input {...register('endTime')} type="datetime-local" className={`input-field ${errors.endTime ? 'border-danger' : ''}`} disabled={uploading} />
                {errors.endTime && <p className="mt-1.5 text-sm text-danger">{errors.endTime.message}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Rotation Duration</label>
              <select {...register('rotationDuration')} className="input-field appearance-none cursor-pointer" disabled={uploading}>
                <option value="15">15 seconds</option><option value="30">30 seconds</option><option value="45">45 seconds</option>
                <option value="60">60 seconds</option><option value="90">90 seconds</option><option value="120">120 seconds</option>
              </select>
            </div>
          </div>

          {uploading && (
            <div className="glass-card p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">Uploading...</span>
                <span className="text-sm font-medium text-primary-light">{progress}%</span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full gradient-bg rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <button type="submit" disabled={uploading} className="btn-primary w-full py-3.5 text-base flex items-center justify-center gap-2">
            {uploading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>) : (<><HiOutlineCloudArrowUp className="w-5 h-5" />Submit for Review</>)}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
