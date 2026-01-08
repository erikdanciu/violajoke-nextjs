import { Metadata } from 'next';
import { db } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { Pagination } from '@/components/Pagination';
import { AdSlot } from '@/components/AdSlot';

interface JokesPageProps {
  searchParams: {
    page?: string;
  };
}

const JOKES_PER_PAGE = 10;

export const metadata: Metadata = {
  title: 'Browse Viola Jokes | Viola Joke',
  description: 'Browse viola jokes. Unlock unlimited access with Premium.',
  openGraph: {
    title: 'Browse Viola Jokes',
    description: 'Check out our viola joke collection.',
    url: 'https://violajoke.com/jokes',
  },
};

export const revalidate = 3600; // Revalidate every hour

export default async function JokesPage({ searchParams }: JokesPageProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const { jokes, total } = await db.listJokes(1, JOKES_PER_PAGE);

  if (page > 1) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Premium Feature</h1>
        <p className="text-gray-600 mb-6">Browse all jokes with Premium access.</p>
        <a href="/premium" className="inline-block rounded-lg bg-viola-accent px-8 py-3 font-bold text-white transition-colors hover:bg-rose-600">
          ✨ Premium - Lifetime $4.99
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-viola-purple mb-2">Browse Jokes</h1>
        <p className="text-gray-600">
          Showing {jokes.length} of {total} jokes (Free tier)
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
