# Google Analytics 4 Setup Guide

Google Analytics is already integrated into your Next.js app! Follow these steps to enable it:

## Step 1: Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Admin"** (gear icon in bottom left)
3. Click **"Create Property"** or select an existing property
4. Set up a web data stream:
   - Property name: `Viola Joke`
   - Website URL: `https://violajoke.com`
   - Choose your timezone and currency
5. Click **"Create"** and then **"Create data stream"**
6. Select "Web" as the platform
7. Enter your website URL: `https://violajoke.com`
8. Enter stream name: `Viola Joke Web`

## Step 2: Get Your Measurement ID

1. In your new data stream, you'll see a **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Copy this ID

## Step 3: Add to Environment Variables

1. Open `.env.local` in your project root
2. Add this line:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. Save the file

## Step 4: Restart Your Development Server

1. Stop your development server (Ctrl+C)
2. Run `npm run dev` to restart

## Step 5: Verify It's Working

1. Open your site in a browser: `http://localhost:3000`
2. Open DevTools (F12) and go to the **Console** tab
3. Look for messages like `gtag loaded successfully` or check the **Network** tab for `gtag.js` requests
4. Go back to Google Analytics and look for real-time visitors

## What's Tracked

The Google Analytics script automatically tracks:
- Page views
- User sessions
- User engagement
- Traffic sources
- Device information
- Browser information

## Security Note

The `NEXT_PUBLIC_` prefix makes this variable available to the browser (it's safe because GA IDs are meant to be public).

## Deployment to Vercel

When deploying to Vercel:
1. Go to your project settings in Vercel
2. Add Environment Variable:
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: `G-XXXXXXXXXX` (your measurement ID)
3. Redeploy your project

Google Analytics will then be active on your production site!
