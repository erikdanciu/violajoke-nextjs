import { Joke } from './jokes-db';

/**
 * Create a URL-safe slug from joke content or ID
 */
export function createSlug(joke: Joke): string {
  // Use first 60 chars of content, convert to slug
  const slug = joke.content
    .toLowerCase()
    .substring(0, 60)
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return `${slug}-${joke.id}`;
}

/**
 * Extract ID from slug
 */
export function getIdFromSlug(slug: string): string {
  const parts = slug.split('-');
  return parts[parts.length - 1];
}

/**
 * Format date for display
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Generate breadcrumb schema for JSON-LD
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://violajoke.com${item.url}`,
    })),
  };
}

/**
 * Generate article schema for JSON-LD
 */
export function generateArticleSchema(joke: Joke, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: truncate(joke.content, 100),
    description: truncate(joke.content, 160),
    image: 'https://violajoke.com/og-image.png',
    author: {
      '@type': 'Person',
      name: joke.author || 'Viola Joke Generator',
    },
    url: `https://violajoke.com/joke/${slug}`,
  };
}
