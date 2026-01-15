'use client';

import { AuthMessageProps } from "./interfaces/Auth-Message.interface";

export function AuthMessage({ message }: AuthMessageProps) {
  if (!message) return null;
  return (
    <p
      className={`text-center mt-4 text-sm ${
        message.type === "success" ? "text-green-500" : "text-red-500"
      }`}
    >
      {message.text}
    </p>
  );
}
