import { createFileRoute } from "@tanstack/react-router";
import { subjects, studentStats } from "@/lib/mockData";
import { TrendingUp, Target } from "lucide-react";

export const Route = createFileRoute("/app/progress")({
  head: () => ({ meta: [{ title: "Progress — EduAI" }] }),
  component: ProgressPage,
});

function masteryColor(m: number) {
  if (m >= 75) return "oklch(0.62 0.16 155)";
  if (m >= 50) return "oklch(0.78 0.15 75)";
  return "oklch(0.6 0.21 25)";
}

function ProgressPage() {
  const allTopics = subjects.flatMap((s) => s.topics.map((t) => ({ ...t, subject: s.name })));
  const overallMastery = Math.round(allTopics.reduce((a, t) => a + t.mastery, 0) / allTopics.length);
  const strong = allTopics.filter((t) => t.mastery >= 75).length;
  const weak = allTopics.filter((t) => t.mastery < 50).length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Your progress</h1>
        <p className="text-muted-foreground mt-1">Topic-level mastery across all your subjects.</p>
      </div>

      {/* Top stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-primary-gradient text-primary-foreground p-5 shadow-soft">
          <Target className="w-5 h-5 opacity-80" />
          <div className="mt-3 text-xs uppercase opacity-80 tracking-wide">Predicted MDCAT</div>
          <div className="font-display text-3xl font-bold mt-1">{studentStats.predictedScore}</div>
          <div className="text-xs opacity-80 mt-1">Target {studentStats.targetScore}</div>
        </div>
        <Card label="Overall mastery" value={`${overallMastery}%`} sub="across all topics" />
        <Card label="Strong topics" value={`${strong}`} sub="≥ 75% mastery" valueColor="oklch(0.62 0.16 155)" />
        <Card label="Need work" value={`${weak}`} sub="< 50% mastery" valueColor="oklch(0.6 0.21 25)" />
      </div>

      {/* Trend */}
      <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Predicted score trajectory</h2>
            <p className="text-xs text-muted-foreground mt-1">8-week trend</p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-success font-semibold"><TrendingUp className="w-4 h-4" /> +{studentStats.scoreTrend.at(-1)! - studentStats.scoreTrend[0]} pts</span>
        </div>
        <div className="mt-6 h-44 flex items-end gap-2">
          {studentStats.scoreTrend.map((v, i) => {
            const max = Math.max(...studentStats.scoreTrend);
            const min = Math.min(...studentStats.scoreTrend);
            const h = ((v - min + 20) / (max - min + 20)) * 100;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-medium">{v}</span>
                <div className="w-full rounded-t-lg bg-primary-gradient" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Heatmap */}
      <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
        <h2 className="font-semibold">Mastery heatmap</h2>
        <p className="text-xs text-muted-foreground mt-1">Green = mastered · Yellow = in progress · Red = needs work</p>
        <div className="mt-6 space-y-6">
          {subjects.map((s) => (
            <div key={s.slug}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{s.icon}</span>
                <h3 className="font-semibold">{s.name}</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {s.topics.map((t) => (
                  <div key={t.slug} className="p-3 rounded-lg border border-border bg-background">
                    <div className="text-sm font-medium truncate">{t.name}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${t.mastery}%`, background: masteryColor(t.mastery) }} />
                      </div>
                      <span className="text-xs font-bold" style={{ color: masteryColor(t.mastery) }}>{t.mastery}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, sub, valueColor }: { label: string; value: string; sub: string; valueColor?: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="font-display text-3xl font-bold mt-2" style={valueColor ? { color: valueColor } : undefined}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}
