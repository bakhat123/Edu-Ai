// Mock auth — stores user in localStorage. Demo only.
import { useEffect, useState } from "react";

export type User = { name: string; email: string; city?: string; target?: string };
const KEY = "eduai.user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
}
export function setUser(u: User | null) {
  if (typeof window === "undefined") return;
  if (u) localStorage.setItem(KEY, JSON.stringify(u));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("eduai-auth"));
}

export function useAuth() {
  const [user, setU] = useState<User | null>(null);
  useEffect(() => {
    setU(getUser());
    const h = () => setU(getUser());
    window.addEventListener("eduai-auth", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("eduai-auth", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}
