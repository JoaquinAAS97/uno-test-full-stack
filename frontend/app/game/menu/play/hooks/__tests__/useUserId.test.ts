import { renderHook } from "@testing-library/react";
import { useUserId } from "../useUserId";

describe("useUserId", () => {
  beforeEach(() => {

    localStorage.clear();
  });

  it("debería devolver null si no hay datos en localStorage", () => {
    const { result } = renderHook(() => useUserId());
    expect(result.current).toBeNull();
  });

  it("debería devolver el idUser si existe en localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ id: "user-123" }));

    const { result } = renderHook(() => useUserId());
    expect(result.current).toBe("user-123");
  });

  it("debería devolver null si el JSON está mal formado", () => {
    localStorage.setItem("user", "{malformed-json}");

    const { result } = renderHook(() => useUserId());
    expect(result.current).toBeNull();
  });

  it("debería devolver null si el objeto no tiene id", () => {
    localStorage.setItem("user", JSON.stringify({ name: "Joaquín" }));

    const { result } = renderHook(() => useUserId());
    expect(result.current).toBeNull();
  });
});
