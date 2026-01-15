export interface AuthMessageProps {
  message: { type: "success" | "error"; text: string } | null;
}
