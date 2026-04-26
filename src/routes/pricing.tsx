import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check, AlertCircle } from "lucide-react";
import { modules, type ModuleKey } from "@/lib/mockData";
import { useState } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — EduAI Pakistan" },
      { name: "description", content: "Modular plans. Pay only for the test module you're sitting — MDCAT, ECAT, NTS, NUST NET parts, or CSS." },
      { property: "og:title", content: "Pricing — EduAI Pakistan" },
      { property: "og:description", content: "Modular pricing — pay only for what you need." },
    ],
  }),
  component: Pricing,
});

type Plan = { name: string; price: number; period: string; desc: string; features: string[]; featured?: boolean };

const modulePlans: Record<ModuleKey, Plan[]> = {
  mdcat: [
    { name: "Single Subject", price: 499, period: "/month", desc: "One MDCAT subject (e.g. Biology only).", features: ["Pick 1: Bio / Chem / Phy / Eng", "5,000+ MCQs in chosen subject", "Past papers — that subject only", "AI tutor for that subject", "Predicted subject score"] },
    { name: "Full MDCAT", price: 999, period: "/month", desc: "All four MDCAT subjects + boards.", features: ["Biology + Chemistry + Physics + English + Logic", "20,000+ MCQs", "All Punjab/Federal/Sindh/KPK/AKU papers", "Daily spaced-repetition reviews", "Full predicted MDCAT score", "Weekly mock tests"], featured: true },
    { name: "MDCAT Elite", price: 1499, period: "/month", desc: "1-on-1 mentor + everything in Full.", features: ["Everything in Full MDCAT", "Weekly mentor video call", "Personalised study plan reviews", "Priority AI tutor", "Score guarantee*"] },
  ],
  ecat: [
    { name: "Single Subject", price: 499, period: "/month", desc: "One ECAT subject (e.g. Maths only).", features: ["Pick 1: Maths / Phy / Chem / Eng", "Subject-only MCQs and papers", "AI tutor for that subject"] },
    { name: "Full ECAT", price: 899, period: "/month", desc: "Complete ECAT prep package.", features: ["All ECAT subjects", "15,000+ MCQs", "ECAT past papers 2015–2024", "Weekly mocks", "Predicted score"], featured: true },
  ],
  nts: [
    { name: "Single Section", price: 399, period: "/month", desc: "One NTS section only.", features: ["Pick 1 section: Verbal / Quant / Analytical", "Section-specific drills", "AI tutor scoped to section"] },
    { name: "Full NTS", price: 799, period: "/month", desc: "All NTS sections.", features: ["All sections covered", "10,000+ MCQs", "Past papers archive", "Mock tests"], featured: true },
  ],
  net: [
    { name: "NUST NET — Part I (Maths)", price: 449, period: "/month", desc: "Maths section only.", features: ["Maths-only material", "Maths past papers", "AI tutor restricted to Maths"] },
    { name: "NUST NET — Part II (Physics)", price: 449, period: "/month", desc: "Physics section only.", features: ["Physics-only material", "Physics past papers", "AI tutor restricted to Physics"] },
    { name: "NUST NET — Full (All Parts)", price: 999, period: "/month", desc: "Maths + Physics + English + IQ.", features: ["All NET parts", "Combined mocks", "Predicted aggregate", "Daily reviews"], featured: true },
  ],
  css: [
    { name: "CSS — One Optional", price: 599, period: "/month", desc: "Pick a single optional subject (e.g. Business).", features: ["Material for ONLY your chosen optional", "No cross-subject content delivered", "AI tutor scoped to that optional"] },
    { name: "CSS — Compulsory Pack", price: 999, period: "/month", desc: "All compulsory subjects.", features: ["English Essay, Précis, GK, Pak Affairs, Islamiat, Current Affairs", "Past papers 2015–2024", "Weekly mock essays + AI feedback"], featured: true },
    { name: "CSS — Full (Comp. + Optionals)", price: 1799, period: "/month", desc: "Compulsory + up to 3 optionals.", features: ["Everything in Compulsory pack", "Choose any 3 optionals", "Mentor sessions"] },
  ],
};

function Pricing() {
  const [active, setActive] = useState<ModuleKey>("mdcat");
  const m = modules[active];
  const plans = modulePlans[active];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-hero border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Modular Pricing</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold text-balance">Pay only for what you study.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sitting only one part of NUST NET? Or just CSS Business? You won't be charged for — or distracted by — material outside your chosen module.
          </p>
        </div>
      </section>

      {/* Module switcher */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(modules) as ModuleKey[]).map((k) => {
            const mod = modules[k];
            const isActive = active === k;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`px-4 py-2.5 rounded-full text-sm font-semibold border-2 transition ${mod.accentClass}`}
                style={isActive ? { background: "var(--m)", color: "white", borderColor: "var(--m)" } : { borderColor: "var(--border)", background: "var(--card)" }}
              >
                {mod.name}
              </button>
            );
          })}
        </div>

        <div className={`mt-6 max-w-2xl mx-auto rounded-2xl p-5 border border-border text-center ${m.accentClass}`} style={{ background: "var(--m-soft)" }}>
          <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--m)" }}>{m.tone}</div>
          <h2 className="font-display text-2xl font-bold mt-1">{m.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
        </div>
      </section>

      <section className={`max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${m.accentClass}`}>
        {plans.map((t) => (
          <div key={t.name} className={`relative p-7 rounded-2xl border shadow-sm flex flex-col ${t.featured ? "border-2 shadow-elevated" : "border-border bg-card"}`} style={t.featured ? { borderColor: "var(--m)", background: "var(--m-soft)" } : undefined}>
            {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-xs font-bold" style={{ background: "var(--m)" }}>MOST POPULAR</div>}
            <h3 className="font-display text-xl font-bold">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground min-h-[2.5rem]">{t.desc}</p>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-sm text-muted-foreground">PKR</span>
              <span className="font-display text-4xl font-bold">{t.price}</span>
              <span className="text-muted-foreground">{t.period}</span>
            </div>
            <ul className="mt-5 space-y-2.5 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--m)" }} /> {f}
                </li>
              ))}
            </ul>
            <Link to="/signup" className={`mt-7 block text-center px-5 py-3 rounded-xl font-semibold transition text-white`} style={{ background: t.featured ? "var(--m)" : "var(--foreground)" }}>
              Get started
            </Link>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-warning/30 bg-warning/5 p-6 flex gap-4">
          <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
          <div className="text-sm">
            <strong>Module isolation guarantee:</strong> If you subscribe to a single subject or part, your dashboard, AI tutor, MCQ pool, mocks and past papers are <em>scoped only to that selection</em>. No upsell pop-ups, no off-topic content. Upgrade anytime to unlock more.
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
