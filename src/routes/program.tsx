import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/program")({
  head: () => ({
    meta: [
      { title: "MDCAT & ECAT Program — EduAI Pakistan" },
      { name: "description", content: "Complete adaptive prep for MDCAT, ECAT and Pakistani university entry tests. Topic mastery, predicted scores and personalized study plans." },
      { property: "og:title", content: "MDCAT & ECAT Program — EduAI Pakistan" },
      { property: "og:description", content: "Complete adaptive prep for MDCAT, ECAT and Pakistani university entry tests." },
    ],
  }),
  component: Program,
});

const subjects = {
  MDCAT: ["Biology", "Chemistry", "Physics", "English", "Logical Reasoning"],
  ECAT: ["Mathematics", "Physics", "Chemistry / Computer Science", "English"],
  "University Entry": ["NUST NET", "GIKI Test", "FAST NU", "PIEAS", "IBA Karachi"],
};

const features = [
  "Topic-level mastery heatmap — green to red",
  "AI-generated MCQs from a 50,000+ question bank",
  "Past paper archive with step-by-step solutions",
  "Live predicted score updated after every quiz",
  "Spaced repetition for weak concepts",
  "Conceptual lecture notes for every chapter",
  "Daily streak tracker and study analytics",
  "Anonymized peer percentile comparison",
];

function Program() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
          <p className="text-emerald text-sm font-semibold tracking-wider uppercase">Stage 1 Program</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold max-w-3xl">Crack MDCAT, ECAT & every major Pakistani entry test.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            A complete, adaptive prep environment — calibrated to your weak topics, your pace, and your target university.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {Object.entries(subjects).map(([track, list]) => (
          <div key={track} className="p-6 rounded-2xl bg-card border border-border shadow-card">
            <h3 className="font-display text-2xl font-bold text-emerald">{track}</h3>
            <ul className="mt-5 space-y-3">
              {list.map((s) => (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" /> {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-bold">Everything you need, in one platform.</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-4">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-3 py-3 border-b border-border">
              <CheckCircle2 className="w-5 h-5 text-emerald mt-0.5 shrink-0" />
              <span>{f}</span>
            </div>
          ))}
        </div>
        <Link to="/waitlist" className="mt-12 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-gradient text-emerald-foreground font-semibold shadow-glow">
          Get early access <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
