import { renderHook, waitFor } from "@testing-library/react";
import { useSeedCards } from "../useSeedCard";


describe("useSeedCards", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("debería devolver message cuando fetch es exitoso", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve("Cartas inicializadas correctamente"),
      } as Response)
    );

    const { result } = renderHook(() => useSeedCards());

 
    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.message).toBe(
      JSON.stringify({ message: "Cartas inicializadas correctamente" })
    );
    expect(result.current.error).toBeNull();
  });

  it("debería devolver error cuando fetch responde con ok=false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("Error al inicializar cartas"),
      } as Response)
    );

    const { result } = renderHook(() => useSeedCards());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.message).toBeNull();
    expect(result.current.error).toBe("Error al inicializar cartas");
  });

  it("debería manejar excepciones en fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const { result } = renderHook(() => useSeedCards());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.message).toBeNull();
    expect(result.current.error).toBe("Network error");
  });
});
