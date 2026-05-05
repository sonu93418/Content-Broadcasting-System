'use client';

import { useEffect } from 'react';
import { HiOutlineBell, HiOutlineCheckCircle } from 'react-icons/hi2';

/**
 * NewsletterForm Component
 * 
 * Embeds Visme B2B Newsletter Subscription form
 * Allows users to subscribe to updates about ContentCast
 * 
 * Features:
 * - Professional B2B newsletter signup
 * - Embedded Visme form widget
 * - Responsive design
 * - Optional display toggle
 */
export default function NewsletterForm({ showOptional = true }) {
  useEffect(() => {
    // Load Visme embed script
    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!showOptional) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-8 animate-fade-in">
      <div className="glass-card p-6 border border-primary/10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(194, 120, 92, 0.1)' }}>
            <HiOutlineBell className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Stay Updated</h3>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Subscribe to ContentCast updates</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
          Get exclusive insights on content broadcasting, latest features, and best practices delivered to your inbox.
        </p>

        {/* Visme Form Embed */}
        <div className="visme-embed mb-4">
          <div
            className="visme_d"
            data-title="B2B Newsletter Subscription"
            data-url="j0nrp1zk-b2b-newsletter-subscription?fullPage=false"
            data-domain="forms"
            data-full-page="false"
            data-min-height="300px"
            data-form-id="178027"
          />
        </div>

        {/* Benefits */}
        <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center gap-2">
            <HiOutlineCheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Weekly tips & tutorials</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineCheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Feature announcements</span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineCheckCircle className="w-4 h-4" style={{ color: 'var(--color-success)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Exclusive content access</span>
          </div>
        </div>
      </div>
    </div>
  );
}
