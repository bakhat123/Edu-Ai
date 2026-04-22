import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { useAuth, setUser } from "@/lib/auth";

export function SiteHeader() {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground">
            <GraduationCap className="w-5 h-5" />
          </span>
          <span>EduAI <span className="text-primary">Pakistan</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition">Home</Link>
          <Link to="/program" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition">Program</Link>
          <Link to="/how-it-works" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition">How it works</Link>
          <Link to="/pricing" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition">Pricing</Link>
          <Link to="/about" activeProps={{ className: "text-foreground font-medium" }} className="hover:text-foreground transition">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/app/dashboard" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground">My dashboard</Link>
              <button onClick={() => { setUser(null); navigate({ to: "/" }); }} className="text-sm text-muted-foreground hover:text-foreground">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground">Log in</Link>
              <Link to="/signup" className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-gradient text-primary-foreground text-sm font-semibold hover:opacity-90 transition shadow-soft">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
