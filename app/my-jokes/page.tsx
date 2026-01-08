'use client';

import { useEffect, useState } from 'react';
import { Joke } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { AdSlot } from '@/components/AdSlot';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function MyJokesPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (authLoading) return;

      if (!user) {
        // Free user without account - use localStorage
        const favoritedIds = JSON.parse(localStorage.getItem('favoritedJokes') || '[]');

        if (favoritedIds.length === 0) {
          setLoading(false);
          return;
        }

        try {
          const res = await fetch('/api/jokes');
          if (res.ok) {
            const data = await res.json();
            const favoriteJokes = data.filter((joke: Joke) => favoritedIds.includes(joke.id));
            setJokes(favoriteJokes);
          }
        } catch (error) {
          console.error('Failed to load favorite jokes:', error);
        } finally {
          setLoading(false);
        }
      } else {
        // Logged-in user - use Firestore
        const favoritedIds = userProfile?.favoriteJokes || [];

        if (favoritedIds.length === 0) {
          setLoading(false);
          return;
        }

        try {
          const res = await fetch('/api/jokes');
          if (res.ok) {
            const data = await res.json();
            const favoriteJokes = data.filter((joke: Joke) => favoritedIds.includes(joke.id));
            setJokes(favoriteJokes);
          }
        } catch (error) {
          console.error('Failed to load favorite jokes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadFavorites();
  }, [user, userProfile, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-gray-600">Loading your favorite jokes...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-viola-purple mb-4">My Jokes</h1>
        <p className="text-gray-600 mb-6">Sign in to save and view your favorite jokes!</p>
        <p className="text-gray-500 mb-6">
          Your favorite jokes will be synced across all your devices.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-viola-light px-8 py-3 font-bold text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (jokes.length === 0) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-viola-purple mb-4">My Jokes</h1>
        <p className="text-gray-600 mb-6">You haven't saved any favorite jokes yet.</p>
        <p className="text-gray-500 mb-6">Click the ❤️ button on jokes to add them to your collection.</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-viola-light px-8 py-3 font-bold text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
        >
          Browse Jokes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-viola-purple mb-2">My Jokes</h1>
        <p className="text-gray-600">
          {jokes.length} favorite joke{jokes.length !== 1 ? 's' : ''} saved
        </p>
      </div>

      <AdSlot position="top" />

      <div className="space-y-6 my-8">
        {jokes.map((joke) => (
          <JokeCard key={joke.id} joke={joke} />
        ))}
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
