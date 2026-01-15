'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (rut: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/desafio-uno/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut }),
      });

      const data = await res.json();

      if (!res.ok) {
        return Promise.reject(data);
      }

      const { id, name } = data;
      localStorage.setItem("user", JSON.stringify({ id, rut, name }));

      router.push("/game/menu/profile");

      return data;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
