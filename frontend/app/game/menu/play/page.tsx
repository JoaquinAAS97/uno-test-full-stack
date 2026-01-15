'use client';

import { useState } from "react";
import { Cards } from "./components/Cards";
import { useDeckCards } from "./hooks/useDeckCards";
import { useSeedCards } from "./hooks/useSeedCard";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { useGameResult } from "./hooks/useGameResult";
import { useAudio } from "../../hook/audio";

export default function PlayPage() {
  const { loading: seedLoading, error: seedError } = useSeedCards();
  const { cards: initialCards, loading, error, codeDeck } = useDeckCards();
  const { cards, hits, errors, handleCardClick } = useMemoryGame(initialCards);
  const { surrender } = useGameResult({ hits, errors, codeDeck });
  const { play, pause } = useAudio("/music/game-init.mp3");

  const [userName] = useState(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return "Jugador";
      const parsed = JSON.parse(userData);
      return parsed.name || "Jugador";
    } catch {
      return "Jugador";
    }
  });

  // reproducir música al montar
  useState(() => {
    play();
    return () => pause();
  });

  const finalMessage =
    errors >= 20
      ? `${userName} ha perdido 😢`
      : hits >= 40
      ? `${userName} wins 🎉`
      : null;

  if (seedLoading || loading) {
    return <p className="text-center mt-10">Cargando cartas...</p>;
  }

  if (seedError || error) {
    return <p className="text-center mt-10 text-red-500">{seedError || error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Juego de Cartas</h1>

      <div className="mb-6 flex gap-6 text-lg font-semibold">
        <p className="text-green-600">Aciertos: {hits}</p>
        <p className="text-red-600">Errores: {errors}</p>
      </div>

      <button
        onClick={() => surrender()}
        className="bg-red-600 text-white px-4 py-2 rounded mb-6 hover:bg-red-700"
      >
        Surrender
      </button>

      {finalMessage && (
        <div className="text-center text-2xl font-bold text-blue-600 mb-6">
          {finalMessage}
        </div>
      )}

      <div
        className="
          grid gap-2
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          xl:grid-cols-8
        "
      >
        {cards.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No hay cartas para mostrar
          </p>
        ) : (
          cards.map((card) => (
            <Cards
              key={card.gameId}
              {...card}
              flipped={card.flipped || card.match}
              onClick={() => handleCardClick(card)}
            />
          ))
        )}
      </div>
    </div>
  );
}
