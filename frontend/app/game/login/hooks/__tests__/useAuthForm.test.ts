import { renderHook, act } from "@testing-library/react";
import { useAuthForm } from "../useAuthForm";


const mockLogin = jest.fn();
const mockRegister = jest.fn();


jest.mock("../useLogin", () => ({
  useLogin: () => ({
    login: mockLogin,
    loading: false,
  }),
}));

jest.mock("../useRegisterUser", () => ({
  useRegister: () => ({
    register: mockRegister,
    loading: false,
  }),
}));

describe("useAuthForm hook", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockRegister.mockReset();
  });

  it("debería inicializar con valores por defecto", () => {
    const { result } = renderHook(() => useAuthForm());
    expect(result.current.rut).toBe("");
    expect(result.current.name).toBe("");
    expect(result.current.isLogin).toBe(true);
    expect(result.current.message).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("debería manejar login exitoso", async () => {
    mockLogin.mockResolvedValueOnce({ id: "123", name: "Joaquín" });

    const { result } = renderHook(() => useAuthForm());
    act(() => result.current.setRut("13449791-k"));

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockLogin).toHaveBeenCalledWith("13449791-k");
    expect(result.current.message).toEqual({ type: "success", text: "Login exitoso ✅" });
  });

  it("debería manejar error en login con statusCode 404", async () => {
    mockLogin.mockRejectedValueOnce({ statusCode: 404 });

    const { result } = renderHook(() => useAuthForm());
    act(() => result.current.setRut("13449791-k"));

    await act(async () => {
      await result.current.handleLogin({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.message).toEqual({ type: "error", text: "El rut no está registrado ❌" });
  });

  it("debería manejar registro exitoso", async () => {
    mockRegister.mockResolvedValueOnce({ id: "456", name: "Bernardo" });

    const { result } = renderHook(() => useAuthForm());
    act(() => {
      result.current.setRut("13449791-k");
      result.current.setName("Bernardo");
      result.current.setIsLogin(false);
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(mockRegister).toHaveBeenCalledWith("13449791-k", "Bernardo");
    expect(result.current.message).toEqual({ type: "success", text: "Registro exitoso ✅" });
  });

  it("debería manejar error en registro con statusCode 400", async () => {
    mockRegister.mockRejectedValueOnce({ statusCode: 400 });

    const { result } = renderHook(() => useAuthForm());
    act(() => {
      result.current.setRut("13449791-k");
      result.current.setName("Bernardo");
      result.current.setIsLogin(false);
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault: () => {} } as React.FormEvent);
    });

    expect(result.current.message).toEqual({
      type: "error",
      text: "El rut ya está registrado o tus datos son inválidos ❌",
    });
  });
});
