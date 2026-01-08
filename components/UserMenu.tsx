'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';
import { useState } from 'react';

export function UserMenu() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  if (loading) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={handleSignIn}
        className="rounded-lg bg-viola-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-viola-dark"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-viola-light px-3 py-2 transition-colors hover:bg-viola-purple hover:text-white"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-viola-purple text-white flex items-center justify-center text-xs">
            {user.email?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <span className="text-sm font-medium hidden sm:inline">
          {user.displayName?.split(' ')[0] || 'User'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          <div className="border-b border-gray-200 px-4 py-3">
            <p className="text-sm font-semibold text-gray-800">{user.displayName || 'User'}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
            {userProfile?.isPremium && (
              <p className="text-xs text-viola-accent font-semibold mt-1">✨ Premium Member</p>
            )}
          </div>

          <div className="py-2">
            <Link
              href="/my-jokes"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ❤️ My Jokes
            </Link>
            {!userProfile?.isPremium && (
              <Link
                href="/premium"
                className="block px-4 py-2 text-sm text-viola-accent font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                ✨ Premium - $4.99
              </Link>
            )}
          </div>

          <div className="border-t border-gray-200 py-2">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
