// Mock auth — stores user in localStorage. Demo only.
import { useEffect, useState } from "react";
import type { ModuleKey } from "@/lib/mockData";

export type User = { name: string; email: string; city?: string; target?: string };
const KEY = "eduai.user";
const MOD_KEY = "eduai.module";

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

// ---- Active module (drives per-module color theming across the app) ----
export function getModule(): ModuleKey {
  if (typeof window === "undefined") return "mdcat";
  return (localStorage.getItem(MOD_KEY) as ModuleKey) || "mdcat";
}
export function setModule(m: ModuleKey) {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOD_KEY, m);
  window.dispatchEvent(new Event("eduai-module"));
}
export function useModule(): [ModuleKey, (m: ModuleKey) => void] {
  const [mod, setM] = useState<ModuleKey>("mdcat");
  useEffect(() => {
    setM(getModule());
    const h = () => setM(getModule());
    window.addEventListener("eduai-module", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("eduai-module", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return [mod, setModule];
}
