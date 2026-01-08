'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Joke } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { SearchForm } from '@/components/SearchForm';
import { AdSlot } from '@/components/AdSlot';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setJokes(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-bold text-viola-purple mb-8">Search Jokes</h1>

      <SearchForm />

      <AdSlot position="top" />

      {query && (
        <div className="my-8">
          {loading ? (
            <p className="text-gray-600">Loading results...</p>
          ) : jokes.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-6">Found {jokes.length} jokes for "{query}"</p>
              <div className="space-y-6">
                {jokes.map((joke) => (
                  <JokeCard key={joke.id} joke={joke} showTags />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No jokes found matching "{query}".</p>
              <p className="text-sm text-gray-500">Try different keywords or browse all jokes</p>
              <Link
                href="/jokes"
                className="inline-block mt-4 text-viola-purple hover:text-viola-dark font-semibold"
              >
                Browse all jokes
              </Link>
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-12">
          <p className="text-gray-600">Enter a search term to find jokes</p>
        </div>
      )}

      <AdSlot position="bottom" />
    </div>
  );
}
