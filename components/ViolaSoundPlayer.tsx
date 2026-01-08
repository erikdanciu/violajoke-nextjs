'use client';

import { useState, useEffect } from 'react';

interface ViolaSoundPlayerProps {
  soundUrls?: string[];
  premiumMode?: boolean;
}

export function ViolaSoundPlayer({ soundUrls = [], premiumMode = false }: ViolaSoundPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [lastIndex, setLastIndex] = useState(-1);

  // Get random sound, ensuring it's not the same as the last one
  const getRandomIndex = (exclude: number): number => {
    if (soundUrls.length <= 1) return 0;

    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * soundUrls.length);
    } while (randomIndex === exclude && soundUrls.length > 1);

    return randomIndex;
  };

  const playNext = () => {
    if (soundUrls.length === 0) {
      alert('Please upload viola sound files first in the dashboard');
      return;
    }

    const nextIndex = getRandomIndex(lastIndex);
    setCurrentIndex(nextIndex);
    setLastIndex(nextIndex);

    const newAudio = new Audio(soundUrls[nextIndex]);
    newAudio.volume = premiumMode ? 1.0 : 0.7; // Premium gets higher volume
    newAudio.addEventListener('ended', () => {
      playNext();
    });

    if (audio) audio.pause();
    setAudio(newAudio);
    newAudio.play();
    setIsPlaying(true);
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className={`rounded-lg border-2 ${premiumMode ? 'border-viola-accent bg-gradient-to-br from-rose-50 to-pink-50' : 'border-viola-purple bg-white'} p-6 shadow-md`}>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-viola-purple mb-2">
          🎻 Viola Sounds
        </h3>
        <p className="text-sm text-gray-600">
          {soundUrls.length} sound{soundUrls.length !== 1 ? 's' : ''} available
          {premiumMode && <span className="ml-2 inline-block bg-viola-accent text-white px-2 py-1 rounded text-xs">HIGH VOLUME</span>}
        </p>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={playNext}
          disabled={soundUrls.length === 0}
          className={`rounded-lg px-6 py-3 font-semibold text-white transition-all ${
            premiumMode
              ? 'bg-viola-accent hover:bg-rose-600'
              : 'bg-viola-purple hover:bg-viola-dark'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isPlaying ? '⏭️ Next' : '▶️ Play Random'}
        </button>
        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className="rounded-lg border-2 border-viola-purple px-6 py-3 font-semibold text-viola-purple transition-all hover:bg-viola-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏹️ Stop
        </button>
      </div>

      {soundUrls.length === 0 && (
        <p className="mt-4 text-center text-xs text-gray-500 italic">
          Sound files not uploaded yet
        </p>
      )}

      {isPlaying && soundUrls.length > 0 && (
        <p className="mt-4 text-center text-sm text-viola-purple font-medium animate-pulse">
          🎵 Now playing sound {currentIndex + 1} of {soundUrls.length}
        </p>
      )}
    </div>
  );
}
