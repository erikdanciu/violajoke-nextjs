import { Metadata } from 'next';
import { db } from '@/lib/jokes-db';
import { getIdFromSlug, createSlug, generateArticleSchema } from '@/lib/utils';
import { JokeCard } from '@/components/JokeCard';
import { ShareButtons } from '@/components/ShareButtons';
import { AdSlot } from '@/components/AdSlot';
import Link from 'next/link';

interface JokePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: JokePageProps): Promise<Metadata> {
  const jokeId = getIdFromSlug(params.slug);
  const joke = await db.getJoke(jokeId);

  if (!joke || !joke.approved) {
    return {
      title: 'Joke Not Found',
    };
  }

  const description = joke.content.substring(0, 160);

  return {
    title: `Viola Joke | ${joke.content.substring(0, 60)}...`,
    description,
    openGraph: {
      type: 'article',
      title: joke.content.substring(0, 60),
      description,
      url: `https://violajoke.com/joke/${params.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: joke.content.substring(0, 60),
      description,
    },
    alternates: {
      canonical: `https://violajoke.com/joke/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const jokes = await db.listApprovedJokes();
  return jokes.map((joke) => ({
    slug: createSlug(joke),
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function JokePage({ params }: JokePageProps) {
  const jokeId = getIdFromSlug(params.slug);
  const joke = await db.getJoke(jokeId);

  if (!joke || !joke.approved) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Joke Not Found</h1>
        <Link href="/jokes" className="text-viola-purple hover:text-viola-dark font-semibold">
          ← Back to all jokes
        </Link>
      </div>
    );
  }

  const schema = generateArticleSchema(joke, params.slug);

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mb-6">
        <Link href="/jokes" className="text-viola-purple hover:text-viola-dark font-semibold text-sm">
          ← Back to all jokes
        </Link>
      </div>

      <JokeCard joke={joke} showAuthor showTags />

      <AdSlot position="middle" />

      <div className="mt-8 text-center">
        <ShareButtons
          url={`https://violajoke.com/joke/${params.slug}`}
          title={joke.content.substring(0, 50)}
        />
      </div>

      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">More like this</h2>
        <div className="grid gap-4">
          {joke.tags.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Related tags:</p>
              <div className="flex flex-wrap gap-2">
                {joke.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="rounded-full bg-viola-light px-3 py-1 text-xs font-medium text-viola-dark transition-colors hover:bg-viola-purple hover:text-white"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AdSlot position="bottom" />
    </div>
  );
}
