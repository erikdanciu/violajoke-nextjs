# 🎵 Audio Files Setup Guide

## Overview

Your site now has components ready for audio files:
- **TuneButton** (440 Hz tuning fork)
- **ViolaSoundPlayer** (random viola sounds)

You need to upload your audio files to make them work.

---

## 📁 Where to Put Audio Files

Place all audio files in the `public/audio/` folder:

```
public/
└── audio/
    ├── 440hz.mp3          ← 440 Hz concert pitch
    ├── 415hz-baroque.mp3  ← Baroque tuning (optional)
    ├── viola-1.mp3        ← Viola sound 1
    ├── viola-2.mp3        ← Viola sound 2
    ├── viola-3.mp3        ← Viola sound 3
    └── ...                ← Add more as needed
```

## 🔧 File Requirements

### Format
- **Recommended**: MP3 (best browser compatibility)
- **Supported**: WAV, OGG, FLAC
- **Avoid**: M4A (limited support)

### Specs
- **Bit rate**: 128 kbps or higher
- **Sample rate**: 44.1 kHz or 48 kHz
- **Size**: Under 5MB per file (for fast loading)

### File Names
- Use lowercase with hyphens: `viola-sound-1.mp3` (not `Viola_Sound_1.MP3`)
- No spaces or special characters

---

## 📝 Component Configuration

### 1. TuneButton (440 Hz Tuning Fork)

**Location**: `components/TuneButton.tsx`

**Usage in pages**:
```typescript
import { TuneButton } from '@/components/TuneButton';

// Standard tuning (440 Hz)
<TuneButton audioUrl="/audio/440hz.mp3" />

// Baroque tuning (415 Hz)
<TuneButton audioUrl="/audio/415hz-baroque.mp3" />

// No audio (placeholder)
<TuneButton />
```

**Features**:
- Play button (loops continuously)
- Pause button (pauses the loop)
- Stop button (stops and resets)

### 2. ViolaSoundPlayer (Random Viola Sounds)

**Location**: `components/ViolaSoundPlayer.tsx`

**Usage in pages**:
```typescript
import { ViolaSoundPlayer } from '@/components/ViolaSoundPlayer';

// Basic mode (free)
<ViolaSoundPlayer 
  soundUrls={[
    '/audio/viola-1.mp3',
    '/audio/viola-2.mp3',
    '/audio/viola-3.mp3',
  ]}
/>

// Premium mode (high volume + styling)
<ViolaSoundPlayer 
  soundUrls={[
    '/audio/viola-premium-1.mp3',
    '/audio/viola-premium-2.mp3',
  ]}
  premiumMode={true}
/>
```

**Features**:
- Play Random (shuffles through sounds, never plays same twice in a row)
- Next (skip to next random sound)
- Stop (stop playback)
- Shows current sound number

---

## 📊 Where Audio is Currently Used

### Free Features
- **Home page** (`app/page.tsx`): 
  - TuneButton: `440hz.mp3`
  - ViolaSoundPlayer: 3 viola sounds
  
### Premium Features
- **Premium page** (`app/premium/page.tsx`):
  - TuneButton: `415hz-baroque.mp3` (Baroque tuning)
  - ViolaSoundPlayer: Premium viola sounds with higher volume

---

## 🚀 How to Add Your Audio Files

### Step 1: Create Audio Folder
```bash
mkdir -p public/audio
```

### Step 2: Convert Your Audio to MP3 (if needed)
Use an online converter or ffmpeg:
```bash
ffmpeg -i your-file.wav -q:a 9 440hz.mp3
```

### Step 3: Add Files to `public/audio/`
Copy your files into the folder:
- `440hz.mp3` (tuning fork - 440 Hz concert pitch)
- `415hz-baroque.mp3` (optional - Baroque period tuning)
- `viola-1.mp3`, `viola-2.mp3`, `viola-3.mp3` (your viola recordings)

### Step 4: Update Component References
The URLs are hardcoded in components. Update them if your file names differ:

**For TuneButton** (`components/TuneButton.tsx`):
```typescript
// In app/page.tsx
<TuneButton audioUrl="/audio/your-440hz-file.mp3" />
```

**For ViolaSoundPlayer** (`components/ViolaSoundPlayer.tsx`):
```typescript
// In app/page.tsx
<ViolaSoundPlayer 
  soundUrls={[
    '/audio/your-viola-1.mp3',
    '/audio/your-viola-2.mp3',
    '/audio/your-viola-3.mp3',
  ]}
/>
```

### Step 5: Test Locally
```bash
npm run dev
# Visit http://localhost:3000
# Click "Play" buttons to test
```

### Step 6: Deploy
```bash
git add public/audio
git commit -m "Add audio files"
git push
# Vercel auto-deploys
```

---

## 🎼 Audio File Suggestions

### Tuning Forks
- **440 Hz** (concert pitch, most common)
  - Duration: 5-10 seconds
  - Loops continuously
  
- **415 Hz** (Baroque period tuning)
  - Duration: 5-10 seconds
  - For premium users

### Viola Sounds
Use 2-5 second clips of:
- Full viola note (sustained)
- Viola arpeggio
- Viola scale passage
- Viola vibrato
- Bow sound demo

**Tip**: Record yourself or find royalty-free samples on:
- Freepik.com (audio)
- Pixabay.com (audio)
- Unsplash (audio)
- Freesound.org
- YouTube Audio Library

---

## 🔊 Volume Settings

### Free Mode
- Volume: 70% (file-dependent)
- Files can be quieter quality

### Premium Mode
- Volume: 100% (full volume)
- Files should be professionally mixed

**To adjust volumes**, edit in `components/ViolaSoundPlayer.tsx`:
```typescript
newAudio.volume = premiumMode ? 1.0 : 0.7;
//                                ↑ change this
```

---

## 🐛 Troubleshooting

### "Audio file not found" or clicking doesn't play
**Problem**: File path is wrong or file doesn't exist

**Solution**:
1. Check file exists in `public/audio/`
2. Verify file name in component matches exactly (case-sensitive)
3. Use absolute path: `/audio/filename.mp3` not `audio/filename.mp3`

### Audio plays but sounds bad/low quality
**Problem**: Audio file quality is low

**Solution**:
1. Use higher bitrate (192-320 kbps)
2. Re-encode with ffmpeg: `ffmpeg -i input.wav -b:a 192k output.mp3`
3. Check original file quality

### Audio loops don't loop smoothly
**Problem**: Silence at start/end of file

**Solution**:
1. Edit audio file to remove leader/trailer silence
2. Use Audacity (free) to trim
3. Export with no padding

### Not working on mobile
**Problem**: Browser autoplay policy blocked audio

**Solution**:
- Audio requires user interaction (clicking button)
- This is browser security—not a bug
- Works fine on click

---

## 📱 Mobile Considerations

- Audio plays after user clicks (not auto-play)
- Respects device volume settings
- Works on iOS/Android
- Test on real device before launch

---

## 🔐 Premium Audio Strategy

Consider these audio tier approaches:

**Option 1: Same Files, Better Quality**
```
Free: 128kbps MP3
Premium: 320kbps MP3
```

**Option 2: Different Sounds**
```
Free: 3 basic sounds
Premium: 10+ professional recordings
```

**Option 3: Exclusive Tunings**
```
Free: 440 Hz only
Premium: 415 Hz (Baroque), 432 Hz (healing), 458 Hz (classical)
```

---

## 📚 Next Steps

1. ✅ Create `public/audio/` folder
2. ✅ Record or find your audio files
3. ✅ Convert to MP3 (if needed)
4. ✅ Copy files to `public/audio/`
5. ✅ Update file paths in components
6. ✅ Test locally: `npm run dev`
7. ✅ Deploy: `git push`

**That's it!** Your audio features are now live. 🎵

---

## 🎵 Example Audio Setup (Recommended)

```bash
public/audio/
├── 440hz.mp3              # 10 sec, 128 kbps (free tuning)
├── 415hz-baroque.mp3      # 10 sec, 128 kbps (premium tuning)
├── viola-1.mp3            # 3 sec, 192 kbps (solo passage)
├── viola-2.mp3            # 3 sec, 192 kbps (arpeggio)
├── viola-3.mp3            # 3 sec, 192 kbps (vibrato)
├── viola-4.mp3            # 3 sec, 192 kbps (scale)
└── viola-5.mp3            # 3 sec, 192 kbps (sustained note)
```

Total size: ~5-10 MB (very fast to load)

---

Questions? Check the components:
- `components/TuneButton.tsx`
- `components/ViolaSoundPlayer.tsx`
