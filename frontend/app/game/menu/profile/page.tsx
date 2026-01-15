'use client';

import { useState } from "react";

type User = { id: string; rut: string; name: string };

export default function ProfilePage() {
  const [user] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  });

  return (
    <div className="flex flex-row justify-center mt-20">
      {user ? (
        <h2 className="text-3xl font-bold">Bienvenido/a {user.name}</h2>
      ) : (
        <h2 className="text-3xl font-bold text-red-500">No hay usuario en sesión</h2>
      )}
    </div>
  );
}
