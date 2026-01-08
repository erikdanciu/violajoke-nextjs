# Migration Guide: From Simple HTML to Next.js

If you're migrating from the old `violajoke.com` (single HTML page), here's how to transition:

## Step 1: Backup Your Current Site

```bash
# Save the old files somewhere safe
mkdir old-violajoke
cp -r ~/path/to/old/violajoke/* old-violajoke/
```

## Step 2: Extract Old Jokes

If you have jokes in the old HTML/JS, extract them to `data/jokes.json`:

**Old format** (if stored in JS):
```javascript
// old js/index.js
const jokes = [
  "Why did the viola player go to jail?",
  ...
];
```

**New format** (data/jokes.json):
```json
[
  {
    "id": "1",
    "content": "Why did the viola player go to jail?",
    "tags": ["humor"],
    "author": "Anonymous",
    "approved": true
  }
]
```

Use this script to convert:
```bash
# Convert old joke list to JSON
node scripts/convert-old-jokes.js < old-jokes.txt > data/jokes.json
```

## Step 3: Set Up New Site

```bash
cd /path/to/new/violajoke-nextjs
npm install
npm run dev
```

## Step 4: Test Locally

- [ ] Home page loads: `http://localhost:3000`
- [ ] Random joke button works
- [ ] Browse page shows all jokes: `/jokes`
- [ ] Individual joke pages work: `/joke/[slug]`
- [ ] Tags work: `/tag/humor`
- [ ] Search works: `/search?q=piano`
- [ ] Admin works: `/admin` (password from `.env.local`)

## Step 5: Deploy to Vercel

```bash
git init
git add .
git commit -m "Migrate to Next.js"
git remote add origin https://github.com/YOUR_USERNAME/violajoke.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Set environment variables (ADMIN_SECRET, etc)
4. Deploy

## Step 6: Point Domain to New Site

**With Vercel:**
- Add your domain in Vercel dashboard
- Follow DNS instructions

**With other registrar:**
- Change DNS nameservers to Vercel's
- Or use CNAME to `cname.vercel.com`

## Step 7: Old Site Redirect (Optional)

Add redirect rules to route old traffic to new site:

```javascript
// vercel.json
{
  "rewrites": [
    { "source": "/", "destination": "/" }
  ]
}
```

Or add a simple redirect page:
```html
<!-- old index.html -->
<script>
  window.location.href = 'https://violajoke.com';
</script>
```

## What Improved?

| Feature | Old | New |
|---------|-----|-----|
| **Pages** | 1 static HTML | 10+ dynamic pages |
| **SEO** | Basic | Sitemap, OG tags, RSS feed |
| **Browse** | Button only | Browse + pagination |
| **Search** | None | Full-text search |
| **Submissions** | None | User joke submissions + moderation |
| **Admin** | None | Password-protected panel |
| **Monetization** | Hardcoded | Configurable ad slots |
| **Performance** | Slow | Fast (ISR, static generation) |
| **Scalability** | Manual updates | Database-ready |

## Troubleshooting

**Q: My jokes aren't showing up**
A: Check `approved: true` in `data/jokes.json`. Unapproved jokes only appear in `/admin`.

**Q: Admin password isn't working**
A: Ensure `ADMIN_SECRET` is set in `.env.local` and you reloaded the page.

**Q: Old jokes lost?**
A: Add them back to `data/jokes.json` manually or use a migration script.

**Q: Domain not pointing to new site?**
A: DNS changes take 5–30 minutes. Use `nslookup violajoke.com` to check.

## Rollback Plan

If something goes wrong:
1. Keep the old site hosted elsewhere temporarily
2. Update domain DNS back to old host
3. Debug the new site locally
4. Re-deploy when ready

---

**Migration complete! You now have a modern, scalable joke site.** 🎉
