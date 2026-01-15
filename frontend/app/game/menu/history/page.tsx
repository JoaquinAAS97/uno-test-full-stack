'use client';

import { useGameHistory } from "./hooks/useGameHistory"; 

export default function PageHistory() {
  const { sessions, loading, error } = useGameHistory();

  if (loading) {
    return <p className="text-center mt-10">Cargando historial...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Historial de Juego</h1>
      {sessions.length === 0 ? (
        <p>No hay partidas registradas.</p>
      ) : (
        <ul className="space-y-2">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="border p-3 text-black rounded bg-gray-100"
            >
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(session.finishedAt).toLocaleString()}
              </p>
              <p><strong>Resultado:</strong> {session.resultGame}</p>
              <p><strong>Errores:</strong> {session.errors}</p>
              <p><strong>Aciertos:</strong> {session.hits}</p>
              <p><strong>Código de mazo:</strong> {session.codeDeck}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
