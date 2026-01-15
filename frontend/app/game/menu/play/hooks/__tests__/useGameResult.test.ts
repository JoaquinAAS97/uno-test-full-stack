import { renderHook, waitFor } from "@testing-library/react";
import { useGameResult } from "../useGameResult";
import { sendGameResult } from "../useSendGameResult";
import { useUserId } from "../useUserId";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock("../useUserId", () => ({
  useUserId: jest.fn(),
}));

jest.mock("../useSendGameResult", () => ({
  sendGameResult: jest.fn(),
}));

describe("useGameResult", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("no debería enviar resultado si no hay idUser", async () => {
    (useUserId as jest.Mock).mockReturnValue(null);

    const { result } = renderHook(() =>
      useGameResult({ hits: 10, errors: 5, codeDeck: "ABC123" })
    );

    await result.current.surrender();
    expect(sendGameResult).not.toHaveBeenCalled();
  });

  it("no debería enviar resultado si no hay codeDeck", async () => {
    (useUserId as jest.Mock).mockReturnValue("user-1");

    const { result } = renderHook(() =>
      useGameResult({ hits: 10, errors: 5, codeDeck: null })
    );

    await result.current.surrender();
    expect(sendGameResult).not.toHaveBeenCalled();
  });

  it("debería enviar resultado 'win' si hits >= 40", async () => {
    (useUserId as jest.Mock).mockReturnValue("user-1");
    (sendGameResult as jest.Mock).mockResolvedValue({ ok: true });

    renderHook(() =>
      useGameResult({ hits: 45, errors: 5, codeDeck: "ABC123" })
    );

    await waitFor(() =>
      expect(sendGameResult).toHaveBeenCalledWith({
        idUser: "user-1",
        resultGame: "win",
        hits: 45,
        errors: 5,
        codeDeck: "ABC123",
      })
    );
  });

  it("debería enviar resultado 'lose' si errors >= 20", async () => {
    (useUserId as jest.Mock).mockReturnValue("user-1");
    (sendGameResult as jest.Mock).mockResolvedValue({ ok: true });

    renderHook(() =>
      useGameResult({ hits: 10, errors: 25, codeDeck: "ABC123" })
    );

    await waitFor(() =>
      expect(sendGameResult).toHaveBeenCalledWith({
        idUser: "user-1",
        resultGame: "lose",
        hits: 10,
        errors: 25,
        codeDeck: "ABC123",
      })
    );
  });

  it("debería ejecutar surrender y redirigir", async () => {
    (useUserId as jest.Mock).mockReturnValue("user-1");
    (sendGameResult as jest.Mock).mockResolvedValue({ ok: true });

    const { result } = renderHook(() =>
      useGameResult({ hits: 10, errors: 5, codeDeck: "ABC123" })
    );

    await result.current.surrender();

    expect(sendGameResult).toHaveBeenCalledWith({
      idUser: "user-1",
      resultGame: "surrender",
      hits: 10,
      errors: 5,
      codeDeck: "ABC123",
    });

    jest.advanceTimersByTime(2000);

    expect(pushMock).toHaveBeenCalledWith("/game/menu/profile");
  });
});
