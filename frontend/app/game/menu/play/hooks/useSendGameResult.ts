'use client';
export async function sendGameResult({
  idUser,
  resultGame,
  hits,
  errors,
  codeDeck,
}: {
  idUser: string;
  resultGame: "win" | "lose" | "surrender";
  hits: number;
  errors: number;
  codeDeck: string;
}) {
  const finishedAt = new Date().toISOString();

  const bodyRequest = {
    idUser,
    finishedAt,
    resultGame,
    hits,
    errors,
    codeDeck,
  };

  const res = await fetch("/api/desafio-uno/game-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyRequest),
  });

  if (!res.ok) {
    throw new Error(`Error enviando resultado: ${res.status}`);
  }

  return res.text();
}
