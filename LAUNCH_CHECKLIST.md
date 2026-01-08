# 📋 Pre-Launch Checklist

Use this checklist to ensure your site is production-ready before going live.

## Local Testing

- [ ] Run `npm install` without errors
- [ ] Run `npm run dev` — site loads at `http://localhost:3000`
- [ ] Home page displays a random joke
- [ ] "Get a Joke" button works
- [ ] Browse page (`/jokes`) shows 10 jokes per page
- [ ] Pagination works (next/previous)
- [ ] Individual joke pages load (`/joke/[slug]`)
- [ ] Can copy joke link & share buttons work
- [ ] Search page works (`/search?q=music`)
- [ ] Tag pages work (`/tag/music`)
- [ ] Submit form works (`/submit`)
  - [ ] Honeypot field is hidden (inspect with dev tools)
  - [ ] Can submit a test joke
- [ ] Admin login works (`/admin`)
  - [ ] Uses password from `.env.local`
  - [ ] Shows pending submissions
  - [ ] Can approve a joke
  - [ ] Can delete a joke
- [ ] 404 page shows for bad URL
- [ ] Footer links work

## Build & Performance

- [ ] Run `npm run build` — build completes without errors
- [ ] No TypeScript errors (`npm run lint`)
- [ ] sitemap.xml is generated (check `app/sitemap.ts`)
- [ ] robots.txt includes `/admin` disallow (check `app/robots.ts`)
- [ ] RSS feed works (`/feed.xml`)
- [ ] Open `robots.txt` in browser — looks valid

## SEO & Metadata

- [ ] Check home page `<title>` in browser tab
- [ ] Check `/jokes` page `<title>`
- [ ] Check individual joke page `<title>` (should include snippet)
- [ ] Open page source: see `<meta name="description">`
- [ ] Open page source: see Open Graph tags (`og:title`, `og:description`)
- [ ] All pages have canonical URLs in source
- [ ] Submit sitemap to Google Search Console:
  - Go to `console.google.com/search-console`
  - Add property: `https://yourdomain.com`
  - Upload sitemap: `https://yourdomain.com/sitemap.xml`

## Environment & Security

- [ ] `.env.local` has a strong `ADMIN_SECRET` (not default)
- [ ] `.env.example` does NOT contain secrets
- [ ] `.env.local` is in `.gitignore`
- [ ] No console.log() with sensitive data in production code
- [ ] Admin routes check authentication
- [ ] Rate limiting is enabled (default: 5 submissions/IP/hour)

## Content

- [ ] At least 20 jokes in `data/jokes.json`
- [ ] All jokes have `approved: true` (or review in admin)
- [ ] Jokes are family-friendly (no hate speech, violence)
- [ ] No duplicate joke IDs
- [ ] Tags are consistent (e.g., "music" not "Music" or "MUSIC")
- [ ] Author names are filled in or set to "Anonymous"

## Deployment

- [ ] GitHub repo created and code pushed
- [ ] Vercel project created (or alternative platform)
- [ ] Environment variables set in deployment:
  - [ ] `ADMIN_SECRET` (set to your password)
  - [ ] `NEXT_PUBLIC_GA_ID` (if using GA4)
  - [ ] `NEXT_PUBLIC_ADS_ENABLED` (set to `false` initially)
- [ ] Deploy build succeeds without errors
- [ ] Production site loads (no CORS, 404s, or 500 errors)
- [ ] All routes work on production URL
- [ ] Admin page works on production
- [ ] Submissions work on production
- [ ] Rate limiting works (test 6 submissions, 6th should fail)

## Domain & DNS

- [ ] Custom domain purchased (or using default Vercel domain)
- [ ] Domain DNS pointing to deployment:
  - [ ] If Vercel: domain added in dashboard, nameservers updated
  - [ ] DNS propagated (check with `nslookup yourdomain.com`)
- [ ] HTTPS working (Vercel auto-enables)
- [ ] Both `yourdomain.com` and `www.yourdomain.com` redirect to one

## Analytics & Monitoring

- [ ] Google Analytics ID set (if using): `NEXT_PUBLIC_GA_ID=G-...`
  - [ ] Check Analytics dashboard receives page views
- [ ] Vercel Analytics dashboard shows traffic
- [ ] Error logs are monitored (Vercel dashboard → Monitoring)

## Monetization (Optional)

- [ ] Google AdSense account created (or plan to add later)
- [ ] Ad code updated in `components/AdSlot.tsx` (if ready)
- [ ] `NEXT_PUBLIC_ADS_ENABLED=true` set in production (if ready)
- [ ] Affiliate links in place (if using)
- [ ] Merch links in place (if using)

## Final Checks

- [ ] README.md is accurate for your site
- [ ] "Viola Joke" branding matches your brand (or updated)
- [ ] No broken links in footer
- [ ] Contact/support info is clear (or added)
- [ ] Backup of old site created (if migrating)
- [ ] Redirect from old site set up (if applicable)
- [ ] Social media links updated (if applicable)

## Post-Launch

- [ ] Monitor for errors (Vercel dashboard)
- [ ] Check analytics daily for first week
- [ ] Approve/moderate joke submissions regularly
- [ ] Share on social media
- [ ] Collect feedback from users
- [ ] Plan next features (ratings, comments, etc.)

---

## Launch Command

```bash
# Final production build
npm run build
npm start  # Test locally

# If all good:
git add .
git commit -m "Final pre-launch"
git push origin main
# Deploy via Vercel dashboard or CLI
```

## After Launch

- [ ] Week 1: Monitor submissions, fix bugs
- [ ] Week 2: Add more jokes (reach 100+)
- [ ] Week 3: Enable ads if revenue-ready
- [ ] Month 1: Optimize based on analytics
- [ ] Month 2: Add user ratings/comments feature

---

**Good luck! 🚀**
