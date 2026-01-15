'use client';
import { useFetchDeckCards } from "./useFetchDeckCards";
import { useDeckCode } from "./useDeckCode";

export function useDeckCards() {
  const { data, loading, error } = useFetchDeckCards();
  const codeDeck = useDeckCode(data);

  return { cards: data, codeDeck, loading, error };
}
