'use client';

import { useState, useEffect } from 'react';
import { Joke } from '@/lib/jokes-db';
import { createSlug } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';
import { addFavoriteJoke, removeFavoriteJoke } from '@/lib/firestore';
import { PremiumModal } from './PremiumModal';

interface JokeCardProps {
  joke: Joke;
  showAuthor?: boolean;
}

export function JokeCard({ joke, showAuthor = true }: JokeCardProps) {
  const slug = createSlug(joke);
  const { user, userProfile, loading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoadingFav, setIsLoadingFav] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const jokeUrl = `https://violajoke.com/joke/${slug}`;

  // Load favorite status on mount or when user changes
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      // Free user without account - check localStorage
      const favorites = JSON.parse(localStorage.getItem('favoritedJokes') || '[]');
      setIsFavorited(favorites.includes(joke.id));
    } else {
      // Logged in user - check Firestore
      setIsFavorited(userProfile?.favoriteJokes?.includes(joke.id) || false);
    }
  }, [user, userProfile, authLoading, joke.id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jokeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Failed to copy link');
    }
  };

  const handleFavorite = async () => {
    if (!user) {
      // Not signed in - show premium modal
      setShowPremiumModal(true);
      return;
    }

    if (!user) {
      // Free user without account - use localStorage
      const favorites = JSON.parse(localStorage.getItem('favoritedJokes') || '[]');
      const index = favorites.indexOf(joke.id);

      if (index > -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(joke.id);
      }

      localStorage.setItem('favoritedJokes', JSON.stringify(favorites));
      setIsFavorited(!isFavorited);
      return;
    }

    // Premium user or logged-in user
    if (!userProfile?.isPremium && !user) {
      alert('Favorites are a premium feature. Upgrade to save your favorite jokes!');
      return;
    }

    setIsLoadingFav(true);
    try {
      if (isFavorited) {
        await removeFavoriteJoke(user, joke.id);
      } else {
        await addFavoriteJoke(user, joke.id);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Failed to update favorite:', error);
      alert('Failed to update favorite');
    } finally {
      setIsLoadingFav(false);
    }
  };

  return (
    <>
      <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
        <p className="mb-6 text-lg leading-relaxed text-gray-800">{joke.content}</p>

        <div className="flex items-center justify-between">
          <div>
            {showAuthor && joke.author && joke.author.trim() !== '' && joke.author.toLowerCase() !== 'anonymous' && (
              <p className="text-sm text-gray-600">— {joke.author}</p>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            <button
              onClick={handleFavorite}
              disabled={isLoadingFav}
              className="rounded-lg bg-viola-light px-4 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white whitespace-nowrap disabled:opacity-50"
              title={user ? 'Add to favorites' : 'Sign in to favorite'}
            >
              {isFavorited ? '❤️ Favorited' : '🤍 Favorite'}
            </button>

            <button
              onClick={handleCopyLink}
              className="rounded-lg bg-viola-light px-4 py-2 text-sm font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white whitespace-nowrap"
            >
              {copied ? '✓ Shared' : '📤 Share'}
            </button>
          </div>
        </div>
      </article>

      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
    </>
  );
}
