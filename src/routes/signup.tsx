import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { setUser } from "@/lib/auth";
import { useState } from "react";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — EduAI Pakistan" }] }),
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Lahore");
  const [target, setTarget] = useState("MDCAT");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ name: name || email.split("@")[0], email, city, target });
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-screen bg-soft">
      <SiteHeader />
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-gradient text-primary-foreground inline-flex items-center justify-center mb-4">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="font-display text-3xl font-bold">Start your prep — free</h1>
          <p className="mt-2 text-muted-foreground text-sm">No credit card needed. Cancel anytime.</p>
        </div>
        <form onSubmit={submit} className="mt-8 p-6 rounded-2xl bg-card border border-border shadow-soft space-y-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none" placeholder="Ahmad Khan" />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none" placeholder="you@example.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none" />
            </div>
            <div>
              <label className="text-sm font-medium">Target</label>
              <select value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1.5 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-2 focus:ring-ring/20 focus:outline-none">
                <option>MDCAT</option><option>ECAT</option><option>NUST NET</option><option>Other</option>
              </select>
            </div>
          </div>
          <button className="w-full px-5 py-3 rounded-lg bg-primary-gradient text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition">
            Create my account
          </button>
          <p className="text-xs text-center text-muted-foreground">
            Have an account? <Link to="/login" className="text-primary font-semibold">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
