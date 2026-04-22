import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-9 h-9 rounded-lg bg-emerald-gradient flex items-center justify-center shadow-glow">
            <GraduationCap className="w-5 h-5 text-emerald-foreground" />
          </span>
          <span>EduAI <span className="text-emerald">Pakistan</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Home</Link>
          <Link to="/program" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">MDCAT / ECAT</Link>
          <Link to="/how-it-works" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">How it works</Link>
          <Link to="/pricing" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">Pricing</Link>
          <Link to="/about" activeProps={{ className: "text-foreground" }} className="hover:text-foreground transition">About</Link>
        </nav>
        <Link
          to="/waitlist"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-gradient text-emerald-foreground text-sm font-semibold hover:opacity-90 transition shadow-glow"
        >
          Join waitlist
        </Link>
      </div>
    </header>
  );
}
