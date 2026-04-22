import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/waitlist")({
  head: () => ({
    meta: [
      { title: "Join the Waitlist — EduAI Pakistan" },
      { name: "description", content: "Be one of the first 1,000 students. Waitlist members get 50% off for three months and early Stage 1 beta access." },
      { property: "og:title", content: "Join the Waitlist — EduAI Pakistan" },
      { property: "og:description", content: "Be one of the first 1,000 students on EduAI Pakistan." },
    ],
  }),
  component: Waitlist,
});

function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero min-h-[80vh] flex items-center">
        <div className="max-w-2xl mx-auto px-6 py-20 w-full">
          {!submitted ? (
            <>
              <p className="text-emerald text-sm font-semibold tracking-wider uppercase text-center">Early Access</p>
              <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold text-center">Reserve your spot.</h1>
              <p className="mt-5 text-lg text-muted-foreground text-center">
                Waitlist members get 50% off the first three months and early access to the Stage 1 beta in July 2026.
              </p>
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="mt-10 p-8 rounded-2xl bg-card border border-border shadow-card space-y-5"
              >
                <div>
                  <label className="text-sm font-medium">Full name</label>
                  <input required className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-emerald focus:outline-none" placeholder="Ahmad Khan" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email or WhatsApp</label>
                  <input required className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-emerald focus:outline-none" placeholder="you@example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <input required className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-emerald focus:outline-none" placeholder="Lahore" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Target test</label>
                    <select className="mt-2 w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-emerald focus:outline-none">
                      <option>MDCAT</option>
                      <option>ECAT</option>
                      <option>NUST NET</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full px-6 py-3.5 rounded-xl bg-emerald-gradient text-emerald-foreground font-semibold shadow-glow hover:opacity-90 transition">
                  Join the waitlist
                </button>
                <p className="text-xs text-muted-foreground text-center">We'll never spam you. One email when Stage 1 opens.</p>
              </form>
            </>
          ) : (
            <div className="text-center p-12 rounded-2xl bg-card border border-emerald/40 shadow-glow">
              <CheckCircle2 className="w-16 h-16 text-emerald mx-auto" />
              <h1 className="mt-6 font-display text-4xl font-bold">You're on the list.</h1>
              <p className="mt-4 text-muted-foreground">We'll be in touch as soon as Stage 1 opens. <em>Pakistan's smartest students start here.</em></p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
