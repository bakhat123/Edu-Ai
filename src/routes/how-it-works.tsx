import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      <Navbar />
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <p className="text-emerald text-sm font-semibold tracking-wider uppercase">The Engine</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold max-w-3xl">How EduAI personalizes every minute of study.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            Behind every screen is an adaptive learning engine running diagnostics, recommendations and forecasts in real time.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="relative p-8 rounded-2xl bg-card border border-border shadow-card">
              <div className="font-display text-5xl font-bold text-emerald/30">{s.n}</div>
              <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
