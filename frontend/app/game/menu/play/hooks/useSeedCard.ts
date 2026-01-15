'use client';
import { useEffect, useState } from "react";
import { ApiError } from "@/app/game/interfaces/Error.interface";

export function useSeedCards() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeed = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/desafio-uno/seed-cards");
        const text = await res.text();

        if (!res.ok) {
          throw new Error(text || "Error al inicializar cartas");
        }

        setMessage(JSON.stringify({ message: text }));
      } catch (err: unknown) {
        const errorObj = err as Error | ApiError;
        setError(errorObj.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchSeed();
  }, []);

  return { message, loading, error };
}
