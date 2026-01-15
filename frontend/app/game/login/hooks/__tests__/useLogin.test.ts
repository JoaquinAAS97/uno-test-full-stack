import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../useLogin";

// Mock de router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock de fetch
global.fetch = jest.fn();

describe("useLogin hook", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    mockPush.mockClear();
    localStorage.clear();
  });

  it("debería inicializar con loading en false", () => {
    const { result } = renderHook(() => useLogin());
    expect(result.current.loading).toBe(false);
  });

  it("debería manejar login exitoso", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "123", name: "Joaquín" }),
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      const data = await result.current.login("13449791-k");
      expect(data).toEqual({ id: "123", name: "Joaquín" });
    });

    const stored = JSON.parse(localStorage.getItem("user")!);
    expect(stored).toEqual({ id: "123", rut: "13449791-k", name: "Joaquín" });
    expect(mockPush).toHaveBeenCalledWith("/game/menu/profile");
    expect(result.current.loading).toBe(false);
  });

  it("debería manejar error en login", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ statusCode: 404, message: "Not found" }),
    });

    const { result } = renderHook(() => useLogin());

    await expect(
      act(async () => {
        await result.current.login("13449791-k");
      })
    ).rejects.toEqual({ statusCode: 404, message: "Not found" });

    expect(localStorage.getItem("user")).toBeNull();
    expect(mockPush).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
  });
});
