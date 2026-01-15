import { sendGameResult } from "../useSendGameResult";

describe("sendGameResult", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("debería enviar resultado y devolver texto cuando fetch es exitoso", async () => {
    const mockResponseText = "Resultado guardado correctamente";

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockResponseText),
      } as Response)
    );

    const result = await sendGameResult({
      idUser: "user-1",
      resultGame: "win",
      hits: 10,
      errors: 2,
      codeDeck: "ABC123",
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/desafio-uno/game-session", expect.objectContaining({
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }));

    expect(result).toBe(mockResponseText);
  });

  it("debería lanzar error cuando fetch responde con ok=false", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        text: () => Promise.resolve("Internal Server Error"),
      } as Response)
    );

    await expect(
      sendGameResult({
        idUser: "user-1",
        resultGame: "lose",
        hits: 5,
        errors: 20,
        codeDeck: "XYZ789",
      })
    ).rejects.toThrow("Error enviando resultado: 500");
  });

  it("debería manejar excepciones en fetch", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    await expect(
      sendGameResult({
        idUser: "user-1",
        resultGame: "surrender",
        hits: 0,
        errors: 0,
        codeDeck: "ABC123",
      })
    ).rejects.toThrow("Network error");
  });
});
