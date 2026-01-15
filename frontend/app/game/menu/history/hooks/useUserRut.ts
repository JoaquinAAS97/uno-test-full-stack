'use client';
import { useState } from "react";

export function useUserRut() {
  const [rut] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return parsed?.rut ?? null;
    } catch {
      return null;
    }
  });

  return rut;
}
