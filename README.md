# 🎵 Viola Joke - Modern Multi-Page Joke Site

A fast, SEO-friendly viola joke site built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Designed to be simple, scalable, and monetization-ready.

## Features

✨ **Core**
- 🎯 Home page with random joke button
- 📖 Browse all jokes with pagination
- 🏷️ Browse jokes by tag/category
- 🔍 Full-text search (client-side, can upgrade to server-side)
- 📝 User joke submissions with moderation queue
- 🔐 Simple admin panel (password-protected)

🚀 **Performance & SEO**
- ⚡ Static generation for joke pages (ISR)
- 📄 Dynamic metadata (Open Graph, Twitter Cards)
- 🗺️ Auto-generated `sitemap.xml` and `robots.txt`
- 📡 RSS feed at `/feed.xml`
- 🔗 Canonical URLs
- 📱 Mobile-responsive design

🛡️ **Submissions & Safety**
- 🍯 Honeypot spam protection
- ⏱️ IP-based rate limiting
- ✅ Moderation queue (submit → review → publish)
- 🔒 Admin panel with secret key auth

💰 **Monetization Ready**
- 📢 Placeholder `<AdSlot>` component for AdSense
- 🎨 Minimal, non-intrusive ad placement
- ⚙️ Config-driven (enable via `NEXT_PUBLIC_ADS_ENABLED`)
- 📊 GA4/Plausible analytics hooks

## Project Structure

```
violajoke/
├── app/
│   ├── (pages)
│   │   ├── page.tsx                 # Home
│   │   ├── jokes/page.tsx           # Browse all jokes
│   │   ├── joke/[slug]/page.tsx     # Individual joke (dynamic)
│   │   ├── tag/[tag]/page.tsx       # Jokes by tag
│   │   ├── search/page.tsx          # Search page
│   │   ├── submit/page.tsx          # Submit joke form
│   │   ├── admin/page.tsx           # Admin panel
│   │   ├── not-found.tsx            # 404 page
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global styles
│   ├── api/
│   │   ├── random/route.ts          # GET /api/random (random joke)
│   │   ├── search/route.ts          # GET /api/search?q=... (search)
│   │   ├── submit/route.ts          # POST /api/submit (submit joke)
│   │   └── admin/
│   │       ├── login/route.ts       # POST /api/admin/login
│   │       ├── submissions/route.ts # GET /api/admin/submissions
│   │       ├── approve/route.ts     # POST /api/admin/approve
│   │       └── delete/route.ts      # POST /api/admin/delete
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── robots.ts                    # robots.txt
│   └── feed.xml/route.ts            # RSS feed
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── JokeCard.tsx                 # Display joke
│   ├── ShareButtons.tsx             # Copy/share buttons
│   ├── SearchForm.tsx               # Search input
│   ├── Pagination.tsx               # Pagination controls
│   └── AdSlot.tsx                   # Ad placeholder
├── lib/
│   ├── jokes-db.ts                  # Data abstraction layer
│   ├── utils.ts                     # Slug generation, formatting
│   └── submissions.ts               # Rate limiting, validation
├── data/
│   └── jokes.json                   # Joke database (JSON)
├── public/                          # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── vercel.json
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- **Node.js** 18+ (or use `nvm`)
- **npm** or **yarn**

### Installation

1. **Clone/extract the project**
   ```bash
   cd violajoke
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   ADMIN_SECRET=your-super-secret-password-change-this
   NEXT_PUBLIC_GA_ID=          # Optional: Google Analytics ID (e.g., G-XXX)
   NEXT_PUBLIC_ADS_ENABLED=false  # Enable ads: true or false
   SUBMISSION_RATE_LIMIT=5      # Submissions per IP per hour
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

5. **Access the admin panel**
   - Go to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Login with your `ADMIN_SECRET`
   - Review and approve/delete submissions

## Managing Jokes

### Adding Jokes (via JSON)

Edit `data/jokes.json` to add or edit jokes directly:

```json
{
  "id": "unique-id",
  "content": "Why did the viola player go to jail? Because they were caught with too many sharp notes!",
  "tags": ["music", "puns"],
  "author": "Anonymous",
  "approved": true
}
```

**Important fields:**
- `id`: Unique identifier (string, e.g., "1", "my-joke-123")
- `content`: The joke text (required, 10–500 chars)
- `tags`: Array of categories (e.g., `["music", "humor"]`)
- `author`: Who wrote it (optional)
- `approved`: Must be `true` to show on the site

### Adding Jokes (User Submissions)

Users can submit jokes via `/submit` page. Submissions go to a moderation queue and appear in `/admin`. Once approved, they're added to the main site.

### Data Layer Abstraction

The `lib/jokes-db.ts` file is an abstraction layer. Currently, it reads/writes to `data/jokes.json`, but you can easily swap the implementation to use:
- **SQLite** (via `better-sqlite3`)
- **PostgreSQL** (via `pg` or `prisma`)
- **MongoDB**
- **Supabase**

No page rewrites needed—just modify the `JSONJokesDB` class or create a new `PostgresJokesDB` class.

**Example: Swap to Postgres**
```typescript
// lib/jokes-db.ts
// export const db = new JSONJokesDB();  // ← remove this
export const db = new PostgresJokesDB(); // ← add this
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repo
   - Vercel will auto-detect Next.js config

3. **Set environment variables in Vercel Dashboard**
   - Go to **Settings → Environment Variables**
   - Add:
     - `ADMIN_SECRET` = your password
     - `NEXT_PUBLIC_GA_ID` = (optional) your GA ID
     - `NEXT_PUBLIC_ADS_ENABLED` = false (or true if ready for ads)

4. **Deploy**
   - Push to `main` → automatic deployment
   - Vercel will build and deploy in ~1–2 minutes

### Deploy to Other Hosts

The project is framework-agnostic. You can deploy to:
- **Netlify**: `npm run build` + deploy `.next` folder
- **Railway.app**: Auto-detect Next.js
- **DigitalOcean App Platform**: Choose Node.js
- **Self-hosted (VPS)**: Run `npm run build` then `npm start`

## Features in Detail

### Static Generation & ISR

Joke pages are **pre-rendered at build time** using `generateStaticParams()`:
```typescript
// app/joke/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour
export async function generateStaticParams() { ... }
```

This means:
- ✅ Fast page loads (100+ lighthouse score)
- ✅ SEO-friendly (search engines love static pages)
- ✅ Updated hourly without full rebuild

### Monetization (Ads)

The `<AdSlot>` component is placed on home and joke pages. To enable ads:

1. Set `NEXT_PUBLIC_ADS_ENABLED=true` in `.env.local`
2. Replace the placeholder with your ad code:
   ```typescript
   // components/AdSlot.tsx
   if (enabled) {
     return (
       <div className="ad-slot">
         <script async src="https://pagead2.googlesyndication.com/..."></script>
         {/* Your AdSense code here */}
       </div>
     );
   }
   ```
3. Test locally, deploy to production

**Ad placement:**
- Top of home page
- Middle of individual joke pages
- Bottom of browse/search pages

Non-intrusive; UX-friendly.

### Analytics

Add Google Analytics or Plausible:

```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

The GA4 script is auto-injected in `app/layout.tsx`:
```typescript
{process.env.NEXT_PUBLIC_GA_ID && (
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
)}
```

### Rate Limiting & Submissions

Submissions are rate-limited per IP (default: 5 per hour). Edit in `.env.local`:
```bash
SUBMISSION_RATE_LIMIT=10
```

Validation:
- Honeypot field (hidden) to catch bots
- Min 10 chars, max 500 chars
- No HTML/scripts allowed

## SEO Essentials

✅ **Dynamic Metadata**
- Title, description, OG image for each page
- Canonical URLs to prevent duplication

✅ **Structured Data**
- JSON-LD schema for articles (jokes)
- Breadcrumb schema for navigation

✅ **Sitemap & Robots**
- Auto-generated `sitemap.xml` with all jokes + tags
- `robots.txt` blocks `/admin`

✅ **RSS Feed**
- Public feed at `/feed.xml`
- Latest 50 jokes

✅ **Performance**
- Image optimization
- CSS-in-JS (Tailwind)
- Code splitting (Next.js auto)
- ISR for fast updates

## Customization

### Change Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'viola-purple': '#9b59b6',  // ← change this
      'viola-dark': '#6c3483',
      'viola-light': '#d7bde2',
    },
  },
},
```

### Change Jokes Per Page

Edit `app/jokes/page.tsx`:
```typescript
const JOKES_PER_PAGE = 20; // was 10
```

### Custom Domain

1. Buy a domain (e.g., Namecheap, GoDaddy)
2. In Vercel dashboard:
   - **Settings → Domains**
   - Add your custom domain
   - Follow DNS instructions

3. Wait 5–30 minutes for DNS to propagate

### Enable Merch Links

Add a `<MerchSlot>` component (similar to `<AdSlot>`):
```typescript
// components/MerchSlot.tsx
export function MerchSlot() {
  if (!process.env.NEXT_PUBLIC_MERCH_ENABLED) return null;
  return <div>Your merch links here</div>;
}
```

## Production Checklist

- [ ] Set `ADMIN_SECRET` to a strong password
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure custom domain
- [ ] Add Google Analytics ID (`NEXT_PUBLIC_GA_ID`)
- [ ] Test admin panel (`/admin`)
- [ ] Test submissions (`/submit`)
- [ ] Verify SEO (check `sitemap.xml`, `robots.txt`)
- [ ] Run `npm run build` locally to catch errors
- [ ] Monitor Core Web Vitals in Vercel Analytics

## Common Tasks

### I want to change my admin password
Edit `.env.local`:
```env
ADMIN_SECRET=new-password-here
```
Redeploy: `git push` (auto-deploys on Vercel)

### I want to disable submissions
Remove the `/submit` route (delete `app/submit/page.tsx`) or hide the link in `components/Header.tsx`.

### I want to add more metadata to jokes
Edit `data/jokes.json` to include new fields (e.g., `difficulty`, `source`), then update the types in `lib/jokes-db.ts` and update components to display them.

### I want to migrate to a database
1. Install your database driver (e.g., `npm install pg`)
2. Create a new class in `lib/jokes-db.ts` (e.g., `PostgresJokesDB`)
3. Implement the `JokesDB` interface
4. Update the export: `export const db = new PostgresJokesDB()`
5. No page rewrites needed!

## Troubleshooting

**Issue: Admin panel says "Invalid password"**
- Ensure `ADMIN_SECRET` is set in `.env.local`
- Reload the page after updating `.env.local`

**Issue: Jokes not appearing**
- Check `data/jokes.json` is valid JSON (use a JSON validator)
- Ensure `approved: true` for jokes you want to display
- Clear Next.js cache: `rm -rf .next && npm run dev`

**Issue: Images not loading**
- Place images in `public/` folder
- Reference as `/filename.png`

**Issue: Slow build times**
- Check `lib/jokes-db.ts` for file I/O on every build
- Use ISR (`revalidate: 3600`) to avoid rebuilding on every joke change

## Contributing

To add features:
1. Create a new branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test locally: `npm run dev`
4. Push and open a PR

## License

MIT. Feel free to use, modify, and distribute.

## Support

Questions? File an issue on GitHub or check the [Next.js docs](https://nextjs.org/docs).

---

**Made with 🎵 for viola enthusiasts worldwide.**
