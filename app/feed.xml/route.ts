import { db } from '@/lib/jokes-db';
import { createSlug } from '@/lib/utils';

async function generateRSS() {
  const jokes = await db.listApprovedJokes();
  const site = 'https://violajoke.com';

  const rssItems = jokes
    .slice(0, 50)
    .map(
      (joke) =>
        `
    <item>
      <title>${escapeXml(joke.content.substring(0, 60))}</title>
      <link>${site}/joke/${createSlug(joke)}</link>
      <guid>${site}/joke/${createSlug(joke)}</guid>
      <description>${escapeXml(joke.content)}</description>
      ${joke.author ? `<author>${escapeXml(joke.author)}</author>` : ''}
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  `
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Viola Joke</title>
    <link>${site}</link>
    <description>The best viola jokes and humor</description>
    <language>en-us</language>
    <ttl>60</ttl>
    ${rssItems}
  </channel>
</rss>`;
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  try {
    const rss = await generateRSS();
    return new Response(rss, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return new Response('Failed to generate RSS feed', { status: 500 });
  }
}
