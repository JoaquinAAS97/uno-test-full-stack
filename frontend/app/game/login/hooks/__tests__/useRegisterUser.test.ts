import { renderHook, act } from "@testing-library/react";
import { useRegister } from "../useRegisterUser"; // 👈 ajusta la ruta según tu proyecto

// Mock de fetch
global.fetch = jest.fn();

describe("useRegister hook", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("debería inicializar con loading en false", () => {
    const { result } = renderHook(() => useRegister());
    expect(result.current.loading).toBe(false);
  });

  it("debería manejar registro exitoso", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "456", name: "Bernardo" }),
    });

    const { result } = renderHook(() => useRegister());

    await act(async () => {
      const data = await result.current.register("13449791-k", "Bernardo");
      expect(data).toEqual({ id: "456", name: "Bernardo" });
    });

    expect(result.current.loading).toBe(false);
  });

  it("debería manejar error en registro", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ statusCode: 400, message: "Invalid data" }),
    });

    const { result } = renderHook(() => useRegister());

    await expect(
      act(async () => {
        await result.current.register("13449791-k", "Bernardo");
      })
    ).rejects.toEqual({ statusCode: 400, message: "Invalid data" });

    expect(result.current.loading).toBe(false);
  });
});
