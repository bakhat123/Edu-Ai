import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSubject, getMCQs, modules } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, FileQuestion, Trophy, BookOpen, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/subjects/$subject")({
  head: ({ params }) => ({ meta: [{ title: `${params.subject} — EduAI` }] }),
  loader: ({ params }) => {
    const subject = getSubject(params.subject);
    if (!subject) throw notFound();
    return { subject };
  },
  notFoundComponent: () => (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Subject not found</h1>
      <Link to="/app/subjects" className="text-primary mt-4 inline-block">Back to subjects</Link>
    </div>
  ),
  component: SubjectPage,
});

function masteryColor(m: number) {
  if (m >= 75) return "oklch(0.62 0.16 155)";
  if (m >= 50) return "oklch(0.78 0.15 75)";
  return "oklch(0.6 0.21 25)";
}

function SubjectPage() {
  const data = Route.useLoaderData() as { subject: NonNullable<ReturnType<typeof getSubject>> };
  const { subject } = data;
  const [tab, setTab] = useState<"unit" | "mock">("unit");
  const m = modules[subject.module];

  return (
    <div className={`space-y-8 max-w-5xl ${m.accentClass}`}>
      <Link to="/app/subjects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /> All subjects</Link>

      <div className="rounded-2xl p-6 border border-border" style={{ background: "var(--m-soft)" }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-5">
            <div className="text-5xl">{subject.icon}</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: "var(--m)" }}>{m.name} module</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">{subject.name}</h1>
              <p className="text-muted-foreground mt-1">{subject.topics.length} topics · {subject.topics.reduce((a, t) => a + t.questions, 0).toLocaleString()} questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <TabButton active={tab === "unit"} onClick={() => setTab("unit")} icon={BookOpen} label="Unit-wise tests" />
        <TabButton active={tab === "mock"} onClick={() => setTab("mock")} icon={Trophy} label="Subject mock test" />
      </div>

      {tab === "unit" ? (
        <div className="space-y-3">
          {subject.topics.map((t) => {
            const available = getMCQs(t.slug).length;
            return (
              <div key={t.slug} className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{t.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t.questions} Qs</span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 max-w-xs h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${t.mastery}%`, background: masteryColor(t.mastery) }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: masteryColor(t.mastery) }}>{t.mastery}% mastery</span>
                  </div>
                </div>
                {available > 0 ? (
                  <Link to="/app/subjects/$subject/$topic" params={{ subject: subject.slug, topic: t.slug }} className="ml-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:shadow-soft transition text-white" style={{ background: "var(--m)" }}>
                    Practice <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <div className="ml-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium">
                    <FileQuestion className="w-4 h-4" /> Coming soon
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl bg-card border border-border p-8 shadow-sm text-center max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full text-white flex items-center justify-center" style={{ background: "var(--m)" }}>
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold">{subject.name} Mock Test</h2>
          <p className="mt-2 text-sm text-muted-foreground">A full-length, timed simulation covering all {subject.topics.length} topics — exam conditions, real difficulty mix.</p>
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <MiniStat icon={FileQuestion} label="Questions" value="60" />
            <MiniStat icon={Clock} label="Duration" value="45 min" />
            <MiniStat icon={Trophy} label="Pass mark" value="70%" />
          </div>
          <Link to="/app/mock-test" className="mt-7 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-soft" style={{ background: "var(--m)" }}>
            Start mock test <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground border-transparent"}`} style={active ? { borderColor: "var(--m)", color: "var(--m)" } : undefined}>
      <Icon className="w-4 h-4" /> {label}
    </button>
  );
}

function MiniStat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-3">
      <Icon className="w-4 h-4 text-muted-foreground mx-auto" />
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
      <div className="font-bold text-sm mt-0.5">{value}</div>
    </div>
  );
}
