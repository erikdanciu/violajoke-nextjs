# Firebase Setup Guide

## Step 1: Install Dependencies

```bash
npm install firebase react-firebase-hooks
```

## Step 2: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Enter project name: `violajoke`
4. Accept terms and create project
5. Wait for project to be ready

## Step 3: Enable Google Sign-In

1. In Firebase Console, go to **Authentication** (left menu)
2. Click **"Get Started"**
3. Click on **"Google"** provider
4. Enable it
5. Set Support email (your Gmail)
6. Click **"Save"**

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database** (left menu)
2. Click **"Create Database"**
3. Choose **"Start in production mode"**
4. Select location closest to you (or US default)
5. Click **"Create"**

## Step 5: Get Firebase Credentials

1. Go to **Project Settings** (gear icon in top right)
2. Click **"Your apps"** tab
3. Click the **Web icon** (`</>`)
4. Register app as "Viola Joke"
5. Copy the config object that appears
6. You'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "violajoke-xxx.firebaseapp.com",
  projectId: "violajoke-xxx",
  storageBucket: "violajoke-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 6: Add Environment Variables

1. Create `.env.local` file in project root (copy from `.env.local.example`)
2. Add your Firebase credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=violajoke-xxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=violajoke-xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=violajoke-xxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456
```

3. **Do NOT commit this file** - add to `.gitignore` (already done)

## Step 7: Update Firestore Rules

In Firebase Console:
1. Go to **Firestore Database**
2. Click **"Rules"** tab
3. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - each user can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

4. Click **"Publish"**

## Step 8: Test Locally

```bash
npm run dev
```

Visit `http://localhost:3000` and click **"Sign In"**
- You should see Google Sign-In popup
- Sign in with your Google account
- You should see your profile in the header

## What You Get

✅ **Users can:**
- Sign in with Google
- Save favorite jokes (synced to Firestore)
- Track daily joke limit per user
- View "My Jokes" page with favorites
- Sign out

✅ **Favorites stored in Firestore:**
- Persists across devices
- Real-time sync

✅ **Daily limits per user:**
- 10 free jokes/day per user
- Premium users: unlimited

## Manual Premium Setup (For Now)

Since payment isn't integrated yet, to make a user premium:

1. Go to Firebase Console
2. Go to **Firestore Database**
3. Click **"Collections"** > **"users"**
4. Find user by their email
5. Edit document and set `isPremium: true`

Users will immediately see premium features!

## Next Steps

When ready to add payment:
1. Integrate **Stripe** or **Lemonsqueezy** for subscription payments
2. Add webhook to automatically set `isPremium: true` when payment succeeds
3. Create checkout page linked to payment processor

For now, you can manually upgrade test users in Firestore for testing.

## Troubleshooting

**"Firebase is not initialized"**
- Make sure `.env.local` has all Firebase credentials
- Restart `npm run dev`

**Sign-in button doesn't work**
- Check Firebase Console > Authentication > Google provider is enabled
- Check `.env.local` has correct credentials

**Favorites not saving**
- Check Firestore Rules are published correctly
- Check user is authenticated (`console.log(user)`)
- Check browser console for errors

**Questions?**
- Check Firebase docs: https://firebase.google.com/docs
- Check Next.js docs: https://nextjs.org/docs
