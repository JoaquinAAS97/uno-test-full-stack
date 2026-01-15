import { renderHook } from "@testing-library/react";
import { useDeckCode } from "../useDeckCode";
import { DeckCard } from "../../interfaces/deck-cards.interface";

describe("useDeckCode", () => {
  it("debería devolver null si el array está vacío", () => {
    const { result } = renderHook(() => useDeckCode([]));
    expect(result.current).toBeNull();
  });

  it("debería devolver el code_Deck de la primera carta", () => {
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
      {
        id: "2",
        code_Deck: "XYZ789",
        created_at: "2026-01-14T18:05:00Z",
        title: "Rey de Diamantes",
        url_img: "/images/rey-diamantes.png",
        match: true,
        position: 1,
      },
    ];

    const { result } = renderHook(() => useDeckCode(mockCards));
    expect(result.current).toBe("ABC123");
  });

  it("debería actualizar el codeDeck cuando cambia el array", () => {
    const initialCards: DeckCard[] = [
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

    const updatedCards: DeckCard[] = [
      {
        id: "2",
        code_Deck: "XYZ789",
        created_at: "2026-01-14T18:05:00Z",
        title: "Rey de Diamantes",
        url_img: "/images/rey-diamantes.png",
        match: true,
        position: 1,
      },
    ];

    const { result, rerender } = renderHook(
      ({ cards }) => useDeckCode(cards),
      { initialProps: { cards: initialCards } }
    );

    expect(result.current).toBe("ABC123");

 
    rerender({ cards: updatedCards });
    expect(result.current).toBe("XYZ789");
  });
});
