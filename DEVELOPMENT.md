# Viola Joke - Development Notes

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Database Management

### File Format (data/jokes.json)

```json
[
  {
    "id": "1",
    "content": "The joke text here...",
    "tags": ["music", "humor"],
    "author": "Name",
    "approved": true
  }
]
```

### Adding Jokes

**Option 1: Direct JSON edit**
- Open `data/jokes.json`
- Add new objects
- Restart dev server

**Option 2: User submissions**
- Users submit via `/submit`
- Review in `/admin` with password
- Approve or delete

## Admin Panel

Access: `http://localhost:3000/admin`

Default password is in `.env.local`:
```env
ADMIN_SECRET=change-me
```

## Deployment

### Vercel (Recommended)

```bash
git add .
git commit -m "Initial"
git push origin main
# Connect repo to vercel.com
```

### Other platforms
See README.md for options (Netlify, Railway, etc)

## Extending the Project

### Add a new field to jokes

1. Update `Joke` interface in `lib/jokes-db.ts`
2. Update `data/jokes.json` to include the new field
3. Update components to display it (e.g., `components/JokeCard.tsx`)

### Add categories (instead of tags)

Create `app/category/[slug]/page.tsx` following the same pattern as `app/tag/[tag]/page.tsx`

### Add user ratings/comments

Add `rating`, `comments` fields to `Joke` interface, create `/api/rating` and `/api/comments` endpoints, update UI components.

### Add email notifications

Use a service like SendGrid or Resend:
```bash
npm install resend
```

Then send emails in `/api/submit` after adding a joke.

## Performance Tips

1. **Images**: Use Next.js `<Image>` component for auto-optimization
2. **Fonts**: Consider using `next/font` for self-hosted fonts
3. **Analytics**: Use Plausible (lighter than GA4) if aiming for fast Core Web Vitals
4. **Caching**: Increase `revalidate` on high-traffic pages
5. **Database**: Migrate to PostgreSQL/SQLite if JSON file becomes slow (1000+ jokes)

## SEO Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Check robots.txt blocks `/admin`
- [ ] Verify OpenGraph images on Facebook debugger
- [ ] Test page speed with PageSpeed Insights
- [ ] Check canonical URLs in page source
- [ ] Monitor Core Web Vitals in Vercel Analytics

## Monetization Setup

### Google AdSense

1. Sign up at `adsense.google.com`
2. Get your publisher ID (e.g., `pub-1234567890`)
3. Update `components/AdSlot.tsx`:
   ```typescript
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890" crossOrigin="anonymous"></script>
   <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-1234567890"
        data-ad-slot="1234567890"
        data-ad-format="auto"></ins>
   <script>
     (adsbygoogle = window.adsbygoogle || []).push({});
   </script>
   ```
4. Set `NEXT_PUBLIC_ADS_ENABLED=true` in `.env.local`

### Affiliate Links

Add a `<AffiliateLink>` component in sidebar or footer for music-related products.

### Merchandise

Link to your Printful/Teespring store selling viola-themed merch.

## Backup & Migration

### Backup jokes.json

```bash
cp data/jokes.json data/jokes.backup.json
```

### Migrate to PostgreSQL

```bash
npm install pg
# Create lib/jokes-db-postgres.ts following the interface
# Update lib/jokes-db.ts export to use PostgresJokesDB
```

## Contributing

We welcome contributions! Fork, make a branch, and open a PR.

---

Happy joking! 🎵
