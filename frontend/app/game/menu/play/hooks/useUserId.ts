'use client';
import { useState } from "react";

export function useUserId() {
  const [idUser] = useState<string | null>(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) return null;
      const parsed = JSON.parse(userData);
      return parsed.id ?? null;
    } catch {
      return null;
    }
  });

  return idUser;
}
