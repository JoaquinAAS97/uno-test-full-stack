'use client';
import Button from "./button";
import { useAuthForm } from "../hooks/useAuthForm";
import { AuthInputs } from "./authInputs";
import { AuthMessage } from "./authMessage";
import { AuthToggle } from "./authToggle";

export default function Form() {
  const {
    rut, setRut,
    name, setName,
    isLogin, setIsLogin,
    message,
    handleLogin,
    handleRegister,
    loading
  } = useAuthForm();

  return (
    <div className="w-md m-auto my-50">
      <form
        name="form-game"
        className="flex flex-col gap-10"
        onSubmit={isLogin ? handleLogin : handleRegister}
      >
        <h2 className="text-2xl text-center font-black">
          Bienvenido al Desafío de Uno Fullstack
        </h2>

        <AuthInputs rut={rut} setRut={setRut} name={name} setName={setName} isLogin={isLogin} />

        <div className="flex flex-row justify-center gap-6">
          {isLogin ? (
            <Button type="submit" label="Login" />
          ) : (
            <Button type="submit" label="Register" />
          )}
        </div>

        {loading && <p className="text-center text-gray-300">Procesando...</p>}

        <AuthMessage message={message} />

        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
      </form>
    </div>
  );
}
