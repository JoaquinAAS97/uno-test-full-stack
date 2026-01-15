'use client';
import { useState, useEffect } from "react";
import { CardProps } from "../interfaces/cards.interface";

type GameCard = CardProps & {
  gameId: string;
  pairId: string;
  match: boolean;
  flipped: boolean;
};

export function useMemoryGame(initialCards: CardProps[]) {
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<GameCard[]>([]);
  const [hits, setHits] = useState(0);
  const [errors, setErrors] = useState(0);

  // ✅ sincronizar solo si initialCards cambia y cards está vacío
  useEffect(() => {
    if (initialCards.length > 0 && cards.length === 0) {
      setCards(
        initialCards.map((c, index) => ({
          ...c,
          flipped: false,
          match: false,
          gameId: `${c.id}-${index}`,
          pairId: c.id,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCards]);

  const handleCardClick = (card: GameCard) => {
    if (flippedCards.length === 2) return;
    if (card.match || card.flipped) return;

    setCards(prev =>
      prev.map(c =>
        c.gameId === card.gameId ? { ...c, flipped: true } : c
      )
    );

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        setCards(prev =>
          prev.map(c =>
            c.gameId === first.gameId || c.gameId === second.gameId
              ? { ...c, match: true }
              : c
          )
        );
        setHits(h => h + 1);
        setFlippedCards([]);
      } else {
        setErrors(e => e + 1);
        setTimeout(() => {
          setCards(prev =>
            prev.map(c =>
              c.gameId === first.gameId || c.gameId === second.gameId
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return { cards, flippedCards, hits, errors, handleCardClick };
}
