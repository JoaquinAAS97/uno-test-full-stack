import { renderHook } from "@testing-library/react";
import { useDeckCards } from "../useDeckCards";


jest.mock("../useFetchDeckCards", () => ({
  useFetchDeckCards: jest.fn(),
}));

jest.mock("../useDeckCode", () => ({
  useDeckCode: jest.fn(),
}));

import { useFetchDeckCards } from "../useFetchDeckCards";
import { useDeckCode } from "../useDeckCode";

describe("useDeckCards", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver cards vacías y codeDeck null si no hay data", () => {
    (useFetchDeckCards as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });
    (useDeckCode as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useDeckCards());

    expect(result.current.cards).toEqual([]);
    expect(result.current.codeDeck).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver cards y codeDeck cuando hay data", () => {
    const mockData = [
      { id: 1, value: "A♠" },
      { id: 2, value: "K♦" },
    ];

    (useFetchDeckCards as jest.Mock).mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
    (useDeckCode as jest.Mock).mockReturnValue("ABC123");

    const { result } = renderHook(() => useDeckCards());

    expect(result.current.cards).toEqual(mockData);
    expect(result.current.codeDeck).toBe("ABC123");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver error cuando useFetchDeckCards falla", () => {
    (useFetchDeckCards as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Error al obtener cartas",
    });
    (useDeckCode as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() => useDeckCards());

    expect(result.current.cards).toEqual([]);
    expect(result.current.codeDeck).toBeNull();
    expect(result.current.error).toBe("Error al obtener cartas");
  });
});
