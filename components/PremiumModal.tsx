'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative rounded-lg bg-white p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4 text-4xl">❤️</div>
          <h2 className="text-2xl font-bold text-viola-purple mb-2">Save Your Favorites</h2>
          <p className="text-gray-600 mb-6">
            Sign in and upgrade to premium to save your favorite viola jokes and access unlimited content.
          </p>

          {/* Benefits */}
          <div className="bg-viola-light/20 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-viola-purple mb-3">Premium gives you:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-viola-accent">✓</span> Unlimited jokes (no daily limits)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-viola-accent">✓</span> Save favorite jokes forever
              </li>
              <li className="flex items-center gap-2">
                <span className="text-viola-accent">✓</span> Ad-free experience
              </li>
              <li className="flex items-center gap-2">
                <span className="text-viola-accent">✓</span> Full sound library access
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Link
            href="/premium"
            onClick={onClose}
            className="block w-full rounded-lg bg-gradient-to-r from-viola-purple to-viola-accent px-6 py-3 font-bold text-white transition-all hover:shadow-lg mb-3"
          >
            Learn More About Premium
          </Link>

          <button
            onClick={onClose}
            className="w-full rounded-lg border-2 border-gray-300 px-6 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
