import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — EduAI Pakistan" },
      { name: "description", content: "Affordable AI tutoring from PKR 499/month. JazzCash, Easypaisa and bank transfer supported. Scholarships available." },
      { property: "og:title", content: "Pricing — EduAI Pakistan" },
      { property: "og:description", content: "Affordable AI tutoring from PKR 499/month." },
    ],
  }),
  component: Pricing,
});

const tiers = [
  {
    name: "Starter",
    price: "499",
    period: "/month",
    desc: "Single subject prep with adaptive lessons.",
    features: ["1 subject of choice", "Adaptive lessons", "1,000 practice MCQs/month", "Predicted score", "Mobile + offline access"],
  },
  {
    name: "Pro",
    price: "999",
    period: "/month",
    desc: "Full MDCAT or ECAT preparation.",
    features: ["All subjects in your track", "Unlimited MCQs", "Past paper archive", "Spaced repetition", "Weekly mock tests", "Priority AI tutor"],
    featured: true,
  },
  {
    name: "Scholarship",
    price: "Free",
    period: "",
    desc: "For top performers from any background.",
    features: ["Awarded by merit", "Full Pro access", "Mentor sessions", "Recognition certificate"],
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Pricing</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold text-balance">A fraction of academy fees.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl mx-auto">
            Transparent pricing. No long contracts. JazzCash, Easypaisa and bank transfer supported.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.name} className={`relative p-8 rounded-2xl border shadow-sm ${t.featured ? "border-2 border-primary bg-accent/30 shadow-elevated" : "border-border bg-card"}`}>
            {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary-gradient text-primary-foreground text-xs font-bold">MOST POPULAR</div>}
            <h3 className="font-display text-2xl font-bold">{t.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground min-h-[2.5rem]">{t.desc}</p>
            <div className="mt-6 flex items-baseline gap-1">
              {t.price !== "Free" && <span className="text-sm text-muted-foreground">PKR</span>}
              <span className="font-display text-5xl font-bold">{t.price}</span>
              <span className="text-muted-foreground">{t.period}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/signup" className={`mt-8 block text-center px-5 py-3 rounded-xl font-semibold transition ${t.featured ? "bg-primary-gradient text-primary-foreground" : "border border-border hover:bg-muted"}`}>
              Get started
            </Link>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
