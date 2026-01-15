import { renderHook } from "@testing-library/react";
import { useGameHistory } from "../useGameHistory";


jest.mock("../useUserRut", () => ({
  useUserRut: jest.fn(),
}));

jest.mock("../useFetchGameHistory", () => ({
  useFetchGameHistory: jest.fn(),
}));

import { useUserRut } from "../useUserRut";
import { useFetchGameHistory } from "../useFetchGameHistory";

describe("useGameHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver sesiones vacías si rut es null", () => {
    (useUserRut as jest.Mock).mockReturnValue(null);
    (useFetchGameHistory as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useGameHistory());

    expect(result.current.sessions).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver sesiones cuando rut existe y fetch es exitoso", () => {
    (useUserRut as jest.Mock).mockReturnValue("13449791-k");
    (useFetchGameHistory as jest.Mock).mockReturnValue({
      data: [
        {
          id: 1,
          finishedAt: "2026-01-14T18:00:00Z",
          resultGame: "win",
          errors: 2,
          hits: 5,
          codeDeck: "ABC123",
        },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useGameHistory());

    expect(result.current.sessions).toHaveLength(1);
    expect(result.current.sessions[0].resultGame).toBe("win");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debería devolver error cuando useFetchGameHistory falla", () => {
    (useUserRut as jest.Mock).mockReturnValue("13449791-k");
    (useFetchGameHistory as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Error al obtener historial",
    });

    const { result } = renderHook(() => useGameHistory());

    expect(result.current.sessions).toEqual([]);
    expect(result.current.error).toBe("Error al obtener historial");
  });
});
