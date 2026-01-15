import { renderHook } from "@testing-library/react";
import { useUserRut } from "../useUserRut";

describe("useUserRut", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("debería devolver null si no hay nada en localStorage", () => {
    const { result } = renderHook(() => useUserRut());
    expect(result.current).toBeNull();
  });

  it("debería devolver el rut si existe en localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ rut: "13449791-k" }));
    const { result } = renderHook(() => useUserRut());
    expect(result.current).toBe("13449791-k");
  });

  it("debería devolver null si el objeto no tiene rut", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Joaquín" }));
    const { result } = renderHook(() => useUserRut());
    expect(result.current).toBeNull();
  });

  it("debería devolver null si el JSON está corrupto", () => {
    localStorage.setItem("user", "{rut:13449791-k"); 
    const { result } = renderHook(() => useUserRut());
    expect(result.current).toBeNull();
  });
});
