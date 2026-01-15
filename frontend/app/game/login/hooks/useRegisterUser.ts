'use client';
import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const register = async (rut: string, name: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/desafio-uno/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut, name }),
      });

      const data = await res.json();

      if (!res.ok) {
        return Promise.reject(data);
      }

      return data;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading };
}
