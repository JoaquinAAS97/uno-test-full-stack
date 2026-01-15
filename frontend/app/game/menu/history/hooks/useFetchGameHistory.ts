'use client';
import { useEffect, useState } from "react";
import { ResponseHistory } from "../interfaces/history.interface";
import { ApiError } from "@/app/game/interfaces/Error.interface";



export function useFetchGameHistory(rut: string | null) {
  const [data, setData] = useState<ResponseHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!rut) return;

    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/desafio-uno/game-session/${rut}`);
        const json: unknown = await res.json();

        if (!res.ok) {
          const msg = (json as ApiError).message ?? "Error al obtener historial";
          throw new Error(msg);
        }

        const mapped: ResponseHistory[] = (json as ResponseHistory[]).map((item) => ({
          id: item.id,
          finishedAt: item.finishedAt,
          resultGame: item.resultGame,
          errors: item.errors,
          hits: item.hits,
          codeDeck: item.codeDeck,
        }));

        setData(mapped);
      } catch (err: unknown) {
        const errorObj = err as Error;
        setError(errorObj.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [rut]);

  return { data, loading, error };
}
