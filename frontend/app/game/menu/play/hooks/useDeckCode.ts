'use client';
import { useMemo } from "react";
import { DeckCard } from "../interfaces/deck-cards.interface";

export function useDeckCode(cards: DeckCard[]) {
  return useMemo(() => {
    if (cards.length > 0) {
      return cards[0].code_Deck;
    }
    return null;
  }, [cards]);
}
