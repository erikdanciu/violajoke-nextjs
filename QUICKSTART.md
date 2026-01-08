# ⚡ Quick Setup (5 minutes)

## 1. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✓

## 2. Set Admin Password

```bash
# .env.local
ADMIN_SECRET=your-super-secret-password
```

Visit `/admin`, login with your password ✓

## 3. Add Jokes

**Option A: Edit JSON directly**
```bash
# data/jokes.json
[
  {
    "id": "my-joke-1",
    "content": "Why do violas need therapy? Too many emotional strings attached.",
    "tags": ["music", "emotions"],
    "author": "You",
    "approved": true
  }
]
```
Restart dev server (Ctrl+C, `npm run dev`)

**Option B: User submissions**
- Go to `/submit`
- Fill form, submit
- Go to `/admin`, approve it ✓

## 4. Deploy to Vercel (Free)

```bash
git init && git add . && git commit -m "initial" && git push
```

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your repo
4. Add env var: `ADMIN_SECRET=your-password`
5. Click Deploy ✓

That's it! Your site is live at `yourrepo.vercel.app`.

## 5. Custom Domain

In Vercel dashboard:
- Settings → Domains → Add your domain
- Follow DNS instructions ✓

---

**Boom. You're done.** 🎵

Next: Read [README.md](./README.md) for full features.
