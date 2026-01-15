'use client';
import Input from "./input";
import { AuthInputsProps } from "./interfaces/Auth-Input.interface";

export function AuthInputs({ rut, setRut, name, setName, isLogin }: AuthInputsProps) {
  return (
    <div className="flex flex-col gap-5">
      <Input
        name="rut"
        label="your RUT"
        type="text"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
      />

      {!isLogin && (
        <Input
          name="name"
          label="your Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
    </div>
  );
}
