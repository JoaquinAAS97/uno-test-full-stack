import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGameHistory } from "../useFetchGameHistory";

describe("useFetchGameHistory", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("no debería hacer fetch si rut es null", () => {
    const { result } = renderHook(() => useFetchGameHistory(null));
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver data cuando fetch es exitoso", async () => {
    const mockResponse = [
      {
        id: 1,
        finishedAt: "2026-01-14T18:00:00Z",
        resultGame: "win",
        errors: 2,
        hits: 5,
        codeDeck: "ABC123",
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    const { result } = renderHook(() => useFetchGameHistory("13449791-k"));

    // wait finish process
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver error cuando fetch falla", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Error al obtener historial" }),
      } as Response)
    );

    const { result } = renderHook(() => useFetchGameHistory("13449791-k"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Error al obtener historial");
  });

  it("debería manejar excepciones en fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const { result } = renderHook(() => useFetchGameHistory("13449791-k"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });
});
