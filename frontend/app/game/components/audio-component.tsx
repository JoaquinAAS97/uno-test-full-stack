'use client';

import { useAudio } from "../hook/audio";

export default function AudioController() {
  const { toggle, isPlaying } = useAudio('/music/game-init.mp3');

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
    >
      {isPlaying ? "⏸️ Pause Music" : "🎵 Play Music"}
    </button>
  );
}
