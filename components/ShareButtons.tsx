'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled share
      }
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopyLink}
        className="rounded-lg bg-viola-light px-4 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
      >
        {copied ? '✓ Copied' : '📋 Copy link'}
      </button>

      {navigator.share && (
        <button
          onClick={handleShare}
          className="rounded-lg bg-viola-light px-4 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          📤 Share
        </button>
      )}
    </div>
  );
}
