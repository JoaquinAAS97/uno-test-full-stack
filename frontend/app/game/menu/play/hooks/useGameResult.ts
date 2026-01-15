'use client';
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUserId } from "./useUserId";
import { sendGameResult } from "./useSendGameResult";
import { GameResultProps } from "../interfaces/game-result.interface";

export function useGameResult({ hits, errors, codeDeck }: GameResultProps) {
  const router = useRouter();
  const idUser = useUserId();

  const handleSend = useCallback(
    async (resultGame: "win" | "lose" | "surrender") => {
      if (!idUser) {
        console.error("No se encontró idUser en localStorage");
        return;
      }

      if (!codeDeck) {
        console.error("No se encontró codeDeck");
        return;
      }

      try {
        const data = await sendGameResult({
          idUser,
          resultGame,
          hits,
          errors,
          codeDeck,
        });
        console.log("Resultado enviado:", data);

        setTimeout(() => {
          router.push("/game/menu/profile");
        }, 2000);
      } catch (err) {
        console.error("Error enviando resultado:", err);
      }
    },
    [idUser, codeDeck, hits, errors, router]
  );

  useEffect(() => {
    if (!idUser || !codeDeck) return;

    if (errors >= 20) {
      handleSend("lose");
    } else if (hits >= 40) {
      handleSend("win");
    }
  }, [hits, errors, codeDeck, idUser, handleSend]);

  return { surrender: () => handleSend("surrender") };
}
