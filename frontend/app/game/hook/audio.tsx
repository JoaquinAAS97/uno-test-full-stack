'use client';
import { useEffect, useRef, useState } from 'react';

export function useAudio(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
  }, [src]);

  const play = () => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(err => {
      if (err.name !== "AbortError") {
        console.error("Error reproduciendo audio:", err);
      }
    });
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  return { play, pause, toggle, isPlaying };
}
