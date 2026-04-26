import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { setUser } from "@/lib/auth";
import { useState } from "react";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — EduAI Pakistan" }] }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const safeEmail = email || "demo@eduai.pk";
    const name = safeEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Student";
    setUser({ name, email: safeEmail, target: "MDCAT" });
    // Hard redirect ensures fresh auth state when /app guard runs
    window.location.href = "/app/dashboard";
  };

  return (
    <div className="min-h-screen bg-soft">
      <SiteHeader />
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-gradient text-primary-foreground inline-flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="font-display text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-muted-foreground text-sm">Log in to continue your prep.</p>
        </div>
        <form onSubmit={submit} className="mt-8 p-6 rounded-2xl bg-card border border-border shadow-soft space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input required type="password" value={pw} onChange={(e) => setPw(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none" placeholder="••••••••" />
          </div>
          <button className="w-full px-5 py-3 rounded-lg bg-primary-gradient text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition">
            Log in
          </button>
          <p className="text-xs text-center text-muted-foreground">
            No account? <Link to="/signup" className="text-primary font-semibold">Sign up free</Link>
          </p>
          <p className="text-[11px] text-center text-muted-foreground italic">Demo mode — any email works.</p>
        </form>
      </div>
    </div>
  );
}
