import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How EduAI Works — Adaptive Learning Engine" },
      { name: "description", content: "Inside the adaptive AI engine: diagnostic, personalization, recommendation pipeline and predicted scores." },
      { property: "og:title", content: "How EduAI Works — Adaptive Learning Engine" },
      { property: "og:description", content: "Inside the adaptive AI engine that powers EduAI Pakistan." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  { n: "01", t: "Diagnostic", d: "A 30-minute placement test maps your current mastery across every syllabus topic." },
  { n: "02", t: "Personal model", d: "We build a learner profile — pace, error patterns, preferred explanation style, ideal study time." },
  { n: "03", t: "Adaptive lessons", d: "Every lesson is sequenced just for you. Concepts you've mastered are skipped. Weak ones repeat." },
  { n: "04", t: "Smart practice", d: "MCQs are chosen by difficulty and topic to maximize learning per minute spent." },
  { n: "05", t: "Spaced repetition", d: "Forgotten concepts resurface at scientifically optimal intervals." },
  { n: "06", t: "Predicted score", d: "After every quiz we recompute your projected MDCAT/ECAT result so you always know where you stand." },
];

function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-14">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">The Engine</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold max-w-3xl text-balance">How EduAI personalizes every minute of study.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Behind every screen is an adaptive learning engine running diagnostics, recommendations and forecasts in real time.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="p-8 rounded-2xl bg-card border border-border shadow-sm">
              <div className="font-display text-5xl font-bold text-primary/30">{s.n}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
