'use client';
import { useEffect, useState } from "react";
import { DeckCard } from "../interfaces/deck-cards.interface";

export function useFetchDeckCards() {
  const [data, setData] = useState<DeckCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeck = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/desafio-uno/deck-cards");
        const json: DeckCard[] = await res.json();

        if (!res.ok) {
          throw new Error("Error al obtener cartas");
        }

        setData(json);
      } catch (err: unknown) {
        const errorObj = err as Error;
        setError(errorObj.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeck();
  }, []);

  return { data, loading, error };
}
