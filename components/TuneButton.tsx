'use client';

import { useState } from 'react';

interface TuneButtonProps {
  audioUrl?: string;
}

export function TuneButton({ audioUrl }: TuneButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (!audioUrl) {
      alert('Please upload an audio file first in the dashboard');
      return;
    }

    if (isPlaying && audio) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio) {
        const newAudio = new Audio(audioUrl);
        newAudio.loop = true;
        newAudio.addEventListener('ended', () => {
          newAudio.currentTime = 0;
          newAudio.play();
        });
        setAudio(newAudio);
        newAudio.play();
      } else {
        audio.play();
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div className="rounded-lg border-2 border-viola-purple bg-white p-6 shadow-md">
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold text-viola-purple mb-2">🎵 Tuning Fork</h3>
        <p className="text-sm text-gray-600">440 Hz Concert Pitch</p>
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={handlePlay}
          disabled={!audioUrl}
          className="rounded-lg bg-viola-purple px-6 py-3 font-semibold text-white transition-all hover:bg-viola-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button
          onClick={handleStop}
          disabled={!isPlaying}
          className="rounded-lg border-2 border-viola-purple px-6 py-3 font-semibold text-viola-purple transition-all hover:bg-viola-light disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ⏹️ Stop
        </button>
      </div>

      {!audioUrl && (
        <p className="mt-4 text-center text-xs text-gray-500 italic">
          Audio file not uploaded yet
        </p>
      )}
    </div>
  );
}
