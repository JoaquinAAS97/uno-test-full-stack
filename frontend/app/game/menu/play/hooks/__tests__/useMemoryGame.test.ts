import { renderHook, act, waitFor } from "@testing-library/react";
import { useMemoryGame } from "../useMemoryGame";
import { CardProps } from "../../interfaces/cards.interface";

describe("useMemoryGame", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const initialCards: CardProps[] = [
    { id: "A", title: "Carta A", url_img: "/images/a.png", position: 0 },
    { id: "A", title: "Carta A", url_img: "/images/a.png", position: 1 },
    { id: "B", title: "Carta B", url_img: "/images/b.png", position: 2 },
    { id: "B", title: "Carta B", url_img: "/images/b.png", position: 3 },
  ];

  it("debería marcar un par como match y aumentar hits", async () => {
    const { result } = renderHook(() => useMemoryGame(initialCards));

    // Esperamos a que el useEffect inicial cree las cartas con gameId/pairId
    await waitFor(() => expect(result.current.cards).toHaveLength(4));

    act(() => {
      result.current.handleCardClick(result.current.cards[0]);
    });
    act(() => {
      result.current.handleCardClick(result.current.cards[1]);
    });

    await waitFor(() => {
      expect(result.current.hits).toBe(1);
      expect(result.current.cards[0].match).toBe(true);
      expect(result.current.cards[1].match).toBe(true);
      expect(result.current.flippedCards).toEqual([]);
    });
  });

  it("debería aumentar errors y ocultar cartas distintas después de 1s", async () => {
    const { result } = renderHook(() => useMemoryGame(initialCards));
    await waitFor(() => expect(result.current.cards).toHaveLength(4));

    act(() => {
      result.current.handleCardClick(result.current.cards[0]); // A
    });
    act(() => {
      result.current.handleCardClick(result.current.cards[2]); // B
    });

    await waitFor(() => expect(result.current.errors).toBe(1));
    await waitFor(() => expect(result.current.flippedCards).toHaveLength(2));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.flippedCards).toEqual([]);
      expect(result.current.cards[0].flipped).toBe(false);
      expect(result.current.cards[2].flipped).toBe(false);
    });
  });

  it("no debería permitir click en carta ya volteada o en match", async () => {
    const { result } = renderHook(() => useMemoryGame(initialCards));
    await waitFor(() => expect(result.current.cards).toHaveLength(4));

    act(() => {
      result.current.handleCardClick(result.current.cards[0]);
    });
    act(() => {
      result.current.handleCardClick(result.current.cards[1]); // match
    });

    await waitFor(() => expect(result.current.hits).toBe(1));

    act(() => {
      result.current.handleCardClick(result.current.cards[0]); // ya en match
    });

    await waitFor(() => expect(result.current.hits).toBe(1));
  });
});
