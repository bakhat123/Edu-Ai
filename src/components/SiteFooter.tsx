import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-9 h-9 rounded-xl bg-primary-gradient flex items-center justify-center text-primary-foreground">
              <GraduationCap className="w-5 h-5" />
            </span>
            EduAI <span className="text-primary">Pakistan</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            A personal AI tutor for every student in Pakistan — adaptive, affordable, available everywhere.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/program" className="hover:text-foreground">MDCAT Prep</Link></li>
            <li><Link to="/program" className="hover:text-foreground">ECAT Prep</Link></li>
            <li><Link to="/how-it-works" className="hover:text-foreground">How it works</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/login" className="hover:text-foreground">Log in</Link></li>
            <li><a href="mailto:hello@eduai.pk" className="hover:text-foreground">hello@eduai.pk</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 EduAI Pakistan (Private) Limited. Stage 1 launching July 2026.
      </div>
    </footer>
  );
}
