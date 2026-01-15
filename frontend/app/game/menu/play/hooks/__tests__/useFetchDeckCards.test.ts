import { renderHook, waitFor } from "@testing-library/react";
import { useFetchDeckCards } from "../useFetchDeckCards";
import { DeckCard } from "../../interfaces/deck-cards.interface";

describe("useFetchDeckCards", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("debería devolver data cuando fetch es exitoso", async () => {
    const mockCards: DeckCard[] = [
      {
        id: "1",
        code_Deck: "ABC123",
        created_at: "2026-01-14T18:00:00Z",
        title: "As de Espadas",
        url_img: "/images/as-espadas.png",
        match: false,
        position: 0,
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCards),
      } as Response)
    );

    const { result } = renderHook(() => useFetchDeckCards());

  
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockCards);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver error cuando fetch responde con ok=false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve([]),
      } as Response)
    );

    const { result } = renderHook(() => useFetchDeckCards());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Error al obtener cartas");
  });

  it("debería manejar excepciones en fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const { result } = renderHook(() => useFetchDeckCards());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network error");
  });
});
