import { render, screen, fireEvent } from "@testing-library/react";
import { CardProps } from "../interfaces/cards.interface";
import PlayPage from "../page";

// Mock hooks
jest.mock("../hooks/useDeckCards", () => ({
  useDeckCards: jest.fn(),
}));
jest.mock("../hooks/useSeedCard", () => ({
  useSeedCards: jest.fn(),
}));
jest.mock("../hooks/useMemoryGame", () => ({
  useMemoryGame: jest.fn(),
}));
jest.mock("../hooks/useGameResult", () => ({
  useGameResult: jest.fn(),
}));
jest.mock("../../../hook/audio", () => ({
  useAudio: jest.fn(),
}));

type MemoryCard = CardProps & {
  gameId: string;
  pairId: string;
  match: boolean;
  flipped?: boolean;
};

jest.mock("../components/Cards", () => ({
  Cards: (props: MemoryCard & { onClick: () => void }) => (
    <div onClick={props.onClick}>{props.title}</div>
  ),
}));

import { useDeckCards } from "../hooks/useDeckCards";
import { useSeedCards } from "../hooks/useSeedCard";
import { useMemoryGame } from "../hooks/useMemoryGame";
import { useGameResult } from "../hooks/useGameResult";
import { useAudio } from "../../../hook/audio";

describe("PlayPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería mostrar mensaje de carga cuando loading está activo", () => {
    (useSeedCards as jest.Mock).mockReturnValue({ loading: true, error: null });
    (useDeckCards as jest.Mock).mockReturnValue({ cards: [], loading: true, error: null, codeDeck: "ABC" });
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: [],
      hits: 0,
      errors: 0,
      handleCardClick: jest.fn(),
    });
    (useGameResult as jest.Mock).mockReturnValue({ surrender: jest.fn() });
    (useAudio as jest.Mock).mockReturnValue({ play: jest.fn(), pause: jest.fn() });

    render(<PlayPage />);
    expect(screen.getByText("Cargando cartas...")).toBeInTheDocument();
  });

  it("debería mostrar mensaje de error cuando hay error", () => {
    (useSeedCards as jest.Mock).mockReturnValue({ loading: false, error: "Error seed" });
    (useDeckCards as jest.Mock).mockReturnValue({ cards: [], loading: false, error: null, codeDeck: "ABC" });
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: [],
      hits: 0,
      errors: 0,
      handleCardClick: jest.fn(),
    });
    (useGameResult as jest.Mock).mockReturnValue({ surrender: jest.fn() });
    (useAudio as jest.Mock).mockReturnValue({ play: jest.fn(), pause: jest.fn() });

    render(<PlayPage />);
    expect(screen.getByText("Error seed")).toBeInTheDocument();
  });

  it("debería renderizar correctamente la página con cartas", () => {
    const mockCards: MemoryCard[] = [
      {
        id: "A",
        title: "Carta A",
        url_img: "/a.png",
        position: 0,
        gameId: "A-0",
        pairId: "A",
        match: false,
        flipped: false,
      },
    ];

    (useSeedCards as jest.Mock).mockReturnValue({ loading: false, error: null });
    (useDeckCards as jest.Mock).mockReturnValue({ cards: mockCards, loading: false, error: null, codeDeck: "ABC" });
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: mockCards,
      hits: 2,
      errors: 1,
      handleCardClick: jest.fn(),
    });
    (useGameResult as jest.Mock).mockReturnValue({ surrender: jest.fn() });
    (useAudio as jest.Mock).mockReturnValue({ play: jest.fn(), pause: jest.fn() });

    render(<PlayPage />);

    expect(screen.getByText("Juego de Cartas")).toBeInTheDocument();
    expect(screen.getByText("Aciertos: 2")).toBeInTheDocument();
    expect(screen.getByText("Errores: 1")).toBeInTheDocument();
    expect(screen.getByText("Surrender")).toBeInTheDocument();
    expect(screen.getByText("Carta A")).toBeInTheDocument();
  });

  it("debería mostrar mensaje final al hacer surrender", () => {
    const mockSurrender = jest.fn();
    const mockCards: MemoryCard[] = [];

    (useSeedCards as jest.Mock).mockReturnValue({ loading: false, error: null });
    (useDeckCards as jest.Mock).mockReturnValue({ cards: mockCards, loading: false, error: null, codeDeck: "ABC" });
    (useMemoryGame as jest.Mock).mockReturnValue({
      cards: mockCards,
      hits: 40, // fuerza condición de victoria
      errors: 0,
      handleCardClick: jest.fn(),
    });
    (useGameResult as jest.Mock).mockReturnValue({ surrender: mockSurrender });
    (useAudio as jest.Mock).mockReturnValue({ play: jest.fn(), pause: jest.fn() });

    render(<PlayPage />);

    fireEvent.click(screen.getByText("Surrender"));

    expect(mockSurrender).toHaveBeenCalled();
    // ahora verificamos el mensaje final que realmente renderiza el componente
    expect(screen.getByText(/wins 🎉/i)).toBeInTheDocument();
  });
});
