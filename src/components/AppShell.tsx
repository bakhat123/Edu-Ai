import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { GraduationCap, LayoutDashboard, BookOpen, BarChart3, Trophy, LogOut, Menu, X } from "lucide-react";
import { useAuth, setUser } from "@/lib/auth";
import { useState } from "react";

const nav = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/subjects", label: "Subjects", icon: BookOpen },
  { to: "/app/progress", label: "Progress", icon: BarChart3 },
  { to: "/app/mock-test", label: "Mock Test", icon: Trophy },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const user = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const initials = (user?.name || "Student").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky lg:top-0 z-40 h-screen w-64 bg-card border-r border-border flex-shrink-0 flex flex-col transition-transform ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg px-6 h-16 border-b border-border">
          <span className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center text-primary-foreground">
            <GraduationCap className="w-4 h-4" />
          </span>
          EduAI
        </Link>
        <nav className="flex-1 p-4 space-y-1">
          {nav.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active ? "bg-primary-gradient text-primary-foreground shadow-soft" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-9 h-9 rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center font-semibold text-sm">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user?.name || "Student"}</div>
              <div className="text-xs text-muted-foreground truncate">{user?.target || "MDCAT"} aspirant</div>
            </div>
          </div>
          <button onClick={() => { setUser(null); navigate({ to: "/" }); }} className="mt-2 w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 h-14 bg-card border-b border-border flex items-center justify-between px-4">
          <button onClick={() => setOpen(!open)} className="p-2 rounded-lg hover:bg-muted">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-display font-bold">EduAI</span>
          <div className="w-9 h-9 rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center text-xs font-semibold">{initials}</div>
        </header>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
