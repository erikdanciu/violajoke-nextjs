#!/usr/bin/env node

/**
 * Generate sitemap.xml at build time
 * Usage: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

async function generateSitemap() {
  const jokesPath = path.join(__dirname, '../data/jokes.json');
  const jokes = JSON.parse(fs.readFileSync(jokesPath, 'utf-8'));
  const approvedJokes = jokes.filter((j) => j.approved);

  // Get unique tags
  const tags = new Set();
  approvedJokes.forEach((joke) => {
    joke.tags.forEach((tag) => tags.add(tag));
  });

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://violajoke.com</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://violajoke.com/jokes</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://violajoke.com/submit</loc>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
`;

  // Add joke URLs
  approvedJokes.forEach((joke) => {
    const slug = createSlug(joke);
    sitemap += `  <url>
    <loc>https://violajoke.com/joke/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Add tag URLs
  tags.forEach((tag) => {
    sitemap += `  <url>
    <loc>https://violajoke.com/tag/${encodeURIComponent(tag)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
  console.log('✓ Sitemap generated:', approvedJokes.length, 'jokes,', tags.size, 'tags');
}

function createSlug(joke) {
  const slug = joke.content
    .toLowerCase()
    .substring(0, 60)
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return `${slug}-${joke.id}`;
}

generateSitemap().catch(console.error);
