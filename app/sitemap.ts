import { db } from '@/lib/jokes-db';
import { createSlug } from '@/lib/utils';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jokes = await db.listApprovedJokes();
  const tags = await db.getAllTags();

  const jokeEntries: MetadataRoute.Sitemap = jokes.map((joke) => ({
    url: `https://violajoke.com/joke/${createSlug(joke)}`,
    lastModified: joke.createdAt ? new Date(joke.createdAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const tagEntries: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `https://violajoke.com/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: 'https://violajoke.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: 'https://violajoke.com/jokes',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: 'https://violajoke.com/submit',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    ...jokeEntries,
    ...tagEntries,
  ];
}
