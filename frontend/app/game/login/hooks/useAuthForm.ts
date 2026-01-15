'use client';
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "./useRegisterUser";
import { ApiError } from "../../interfaces/Error.interface";


export function useAuthForm() {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { login, loading: loginLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(rut);
      setMessage({ type: "success", text: "Login exitoso ✅" });
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.statusCode === 404) {
        setMessage({ type: "error", text: "El rut no está registrado ❌" });
      } else if (error.statusCode === 400) {
        setMessage({ type: "error", text: "Solicitud inválida ❌" });
      } else {
        setMessage({ type: "error", text: "Error en login ❌" });
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(rut, name);
      setMessage({ type: "success", text: "Registro exitoso ✅" });
      console.log("Registro:", data);
    } catch (err: unknown) {
      const error = err as ApiError;
      if (error.statusCode === 400) {
        setMessage({ type: "error", text: "El rut ya está registrado o tus datos son inválidos ❌" });
      } else {
        setMessage({ type: "error", text: "Error en registro ❌" });
      }
    }
  };

  const loading = isLogin ? loginLoading : registerLoading;

  return {
    rut, setRut,
    name, setName,
    isLogin, setIsLogin,
    message,
    handleLogin,
    handleRegister,
    loading
  };
}
