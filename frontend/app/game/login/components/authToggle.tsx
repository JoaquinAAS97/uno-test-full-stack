'use client';

import { AuthToggleProps } from "./interfaces/Auth-Toggle.interface";

export function AuthToggle({ isLogin, setIsLogin }: AuthToggleProps) {
  return (
    <p className="text-center text-blue-600 cursor-pointer mt-4">
      {isLogin ? (
        <span onClick={() => setIsLogin(false)}>¿No tienes cuenta? Regístrate</span>
      ) : (
        <span onClick={() => setIsLogin(true)}>¿Ya tienes cuenta? Inicia sesión</span>
      )}
    </p>
  );
}
