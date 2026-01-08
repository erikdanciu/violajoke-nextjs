'use client';

import { useEffect, useState } from 'react';
import { Joke } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { AdSlot } from '@/components/AdSlot';
import { TuneButton } from '@/components/TuneButton';
import { ViolaSoundPlayer } from '@/components/ViolaSoundPlayer';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { getJokesRemaining, incrementJokesToday } from '@/lib/firestore';

export default function HomePage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(false);
  const [jokesLeftToday, setJokesLeftToday] = useState(10);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load jokes remaining on mount
  useEffect(() => {
    const loadJokesRemaining = async () => {
      if (authLoading) return;

      if (!user) {
        // Free user - use localStorage
        const jokesUsed = parseInt(localStorage.getItem(`jokesUsed_${new Date().toDateString()}`) || '0', 10);
        const remaining = 10 - jokesUsed;
        setJokesLeftToday(remaining);
        setIsLimitReached(remaining <= 0);
      } else {
        // Premium users get unlimited
        if (userProfile?.isPremium) {
          setJokesLeftToday(999);
          setIsLimitReached(false);
        } else {
          // Free logged-in users check Firestore
          try {
            const remaining = await getJokesRemaining(user);
            setJokesLeftToday(remaining);
            setIsLimitReached(remaining <= 0);
          } catch (error) {
            console.error('Failed to get jokes remaining:', error);
          }
        }
      }

      // Load first joke
      if (!isLimitReached) {
        fetchRandomJoke();
      }
    };

    loadJokesRemaining();
  }, [user, userProfile, authLoading]);

  const fetchRandomJoke = async () => {
    if (isLimitReached) {
      alert('You\'ve reached your 10 jokes today! Go premium for unlimited jokes.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/random');
      if (res.ok) {
        const data = await res.json();
        setJoke(data);

        // Increment count
        if (!user) {
          // Free user without account - use localStorage
          const today = new Date().toDateString();
          const key = `jokesUsed_${today}`;
          const current = parseInt(localStorage.getItem(key) || '0', 10);
          localStorage.setItem(key, String(current + 1));
          const remaining = 10 - (current + 1);
          setJokesLeftToday(remaining);
          setIsLimitReached(remaining <= 0);
        } else if (!userProfile?.isPremium) {
          // Free user with account - use Firestore
          try {
            await incrementJokesToday(user);
            const remaining = await getJokesRemaining(user);
            setJokesLeftToday(remaining);
            setIsLimitReached(remaining <= 0);
          } catch (error) {
            console.error('Failed to increment jokes:', error);
          }
        }
        // Premium users don't need to track
      }
    } catch {
      alert('Failed to load joke');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-viola-purple mb-2">Viola Jokes</h1>
        <p className="text-lg text-gray-600 mb-6">
          Free: {jokesLeftToday} jokes left today
        </p>
      </div>

      {isLimitReached ? (
        <div className="mb-12 rounded-lg border-2 border-viola-accent bg-rose-50 p-6 text-center">
          <h2 className="text-2xl font-bold text-viola-dark mb-3">Daily Limit Reached</h2>
          <p className="text-gray-700 mb-4">You&apos;ve enjoyed 10 free jokes today. Get unlimited access:</p>
          <Link
            href="/premium"
            className="inline-block rounded-lg bg-viola-accent px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-rose-600"
          >
            ✨ Premium - Lifetime $4.99
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {joke && (
            <>
              <JokeCard joke={joke} showTags={true} />
            </>
          )}

          <div className="text-center">
            <button
              onClick={fetchRandomJoke}
              disabled={loading}
              className="rounded-lg bg-viola-purple px-8 py-4 text-xl font-bold text-white transition-all hover:bg-viola-dark disabled:opacity-50"
            >
              {loading ? '⏳ Loading...' : '🎵 Click for joke'}
            </button>
          </div>
        </div>
      )}

      <AdSlot position="top" />

      {/* Divider */}
      <div className="my-6 border-t-2 border-viola-light"></div>

      {/* Other Amazing Features Section */}
      <div className="mt-6 mb-12">
        <h2 className="text-2xl font-bold text-viola-purple mb-8 text-center">Other amazing features</h2>
        <div className="space-y-8">
          <div>
            <TuneButton audioUrl="/audio/440hz.mp3" />
          </div>

          <div>
            <ViolaSoundPlayer soundUrls={[
              '/audio/viola-1.mp3',
              '/audio/viola-2.mp3',
              '/audio/viola-3.mp3',
            ]} />
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="my-12 rounded-lg bg-gradient-to-r from-viola-light to-viola-accent/20 p-8">
        <h2 className="text-2xl font-bold text-viola-purple mb-6 text-center">Unlock with Premium</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <h3 className="font-semibold text-gray-800">Unlimited Jokes</h3>
              <p className="text-sm text-gray-600">No daily limits, joke forever</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">❤️</span>
            <div>
              <h3 className="font-semibold text-gray-800">Favorite Jokes</h3>
              <p className="text-sm text-gray-600">Save your favorites in "My Jokes"</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🎵</span>
            <div>
              <h3 className="font-semibold text-gray-800">All Sounds</h3>
              <p className="text-sm text-gray-600">Browse entire viola sound library</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🎼</span>
            <div>
              <h3 className="font-semibold text-gray-800">Baroque Tuning</h3>
              <p className="text-sm text-gray-600">415 Hz tuning fork for period music</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>
            <div>
              <h3 className="font-semibold text-gray-800">Analytics</h3>
              <p className="text-sm text-gray-600">Track your favorite joke types</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📥</span>
            <div>
              <h3 className="font-semibold text-gray-800">Ad-Free</h3>
              <p className="text-sm text-gray-600">Clean, distraction-free experience</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <Link
            href="/premium"
            className="inline-block rounded-lg bg-viola-accent px-8 py-3 font-bold text-white transition-colors hover:bg-rose-600"
          >
            ✨ Go Premium - Lifetime: $4.99
          </Link>
        </div>
      </div>

      <div className="mt-12 space-y-4 text-center">
        <div>
          <div className="bg-gradient-to-r from-viola-light/30 to-viola-accent/10 rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-viola-purple mb-2">810+ Jokes in Our Collection</h2>
            <p className="text-gray-700">The largest viola joke database on the internet</p>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">More viola content</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              href="/jokes"
              className="rounded-lg bg-viola-light px-6 py-3 font-semibold text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
            >
              Browse Jokes
            </Link>
            <Link
              href="/submit"
              className="rounded-lg bg-gray-200 px-6 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-300"
            >
              Submit Your Joke
            </Link>
          </div>
        </div>
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
