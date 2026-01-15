'use client';
import { useUserRut } from "./useUserRut";
import { useFetchGameHistory } from "./useFetchGameHistory";

export function useGameHistory() {
  const rut = useUserRut();
  const { data, loading, error } = useFetchGameHistory(rut);

  return { sessions: data, loading, error };
}
