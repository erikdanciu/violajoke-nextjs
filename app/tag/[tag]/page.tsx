import { Metadata } from 'next';
import { db } from '@/lib/jokes-db';
import { JokeCard } from '@/components/JokeCard';
import { AdSlot } from '@/components/AdSlot';
import Link from 'next/link';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `Viola Jokes about "${tag}" | Viola Joke`,
    description: `Browse viola jokes tagged with "${tag}".`,
    openGraph: {
      title: `Viola Jokes about "${tag}"`,
      description: `Discover funny jokes about ${tag}.`,
      url: `https://violajoke.com/tag/${params.tag}`,
    },
  };
}

export async function generateStaticParams() {
  const tags = await db.getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export const revalidate = 3600;

export default async function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const jokes = await db.listByTag(tag);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8">
        <Link href="/jokes" className="text-viola-purple hover:text-viola-dark text-sm font-semibold mb-4 inline-block">
          ← Back to all jokes
        </Link>
        <h1 className="text-3xl font-bold text-viola-purple mb-2">Jokes about "{tag}"</h1>
        <p className="text-gray-600">Found {jokes.length} jokes</p>
      </div>

      <AdSlot position="top" />

      {jokes.length > 0 ? (
        <div className="space-y-6 my-8">
          {jokes.map((joke) => (
            <JokeCard key={joke.id} joke={joke} showTags />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No jokes found for this tag.</p>
          <Link href="/jokes" className="text-viola-purple hover:text-viola-dark font-semibold">
            Browse all jokes
          </Link>
        </div>
      )}

      <AdSlot position="bottom" />
    </div>
  );
}
