import { createFileRoute, Link } from "@tanstack/react-router";
import { pastPapers, modules } from "@/lib/mockData";
import { FileText, Users, ArrowRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/past-papers")({
  head: () => ({ meta: [{ title: "Past Papers — EduAI" }] }),
  component: PastPapersPage,
});

function PastPapersPage() {
  const byYear = [...pastPapers].sort((a, b) => b.year - a.year);
  const years = Array.from(new Set(byYear.map((p) => p.year)));

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Past Papers</h1>
        <p className="text-muted-foreground mt-1">Real questions from previous years — solve, review, and master patterns.</p>
      </div>

      {years.map((year) => (
        <section key={year} className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <h2 className="text-xl font-bold">{year}</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {byYear.filter((p) => p.year === year).map((p) => {
              const m = modules[p.module];
              return (
                <div key={`${p.year}-${p.module}`} className={`group rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-soft transition ${m.accentClass}`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold" style={{ background: "var(--m-soft)", color: "var(--m)" }}>
                      {m.name} · {p.year}
                    </span>
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{m.name} {p.year} Paper</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{p.questions} questions · timed</div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.topQuestions.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground"><Users className="w-3 h-3" /> {p.attempts.toLocaleString()} attempts</span>
                    <Link to="/app/mock-test" className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--m)" }}>
                      Solve <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
