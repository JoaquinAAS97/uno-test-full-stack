'use client';
import { createContext, useContext } from "react";
import { useAudio } from "../../hook/audio";


const AudioContext = createContext<ReturnType<typeof useAudio> | null>(null);


export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useAudio("/music/game-init.mp3");
  return <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>;
}


export function useAudioContext() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudioContext debe usarse dentro de AudioProvider");
  return ctx;
}
