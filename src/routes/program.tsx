import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { subjects } from "@/lib/mockData";

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
      <SiteHeader />
      <section className="bg-soft border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-14">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Stage 1 Program</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold max-w-3xl text-balance">Crack MDCAT, ECAT & every major Pakistani entry test.</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
            One adaptive platform — calibrated to your weak topics, your pace, and your target university.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold">Subjects covered</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((s) => (
            <div key={s.slug} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 font-display text-xl font-bold">{s.name}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {s.topics.slice(0, 4).map((t) => (
                  <li key={t.slug} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />{t.name}</li>
                ))}
                {s.topics.length > 4 && <li className="text-xs">+ {s.topics.length - 4} more topics</li>}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold">Everything you need, in one platform.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-x-12 gap-y-2">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 py-3 border-b border-border">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <Link to="/signup" className="mt-12 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-gradient text-primary-foreground font-semibold shadow-soft">
            Start free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
