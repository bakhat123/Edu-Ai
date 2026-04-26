import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { studentStats, subjects, dailyReview } from "@/lib/mockData";
import { Flame, Target, Clock, TrendingUp, ArrowRight, Trophy, Brain, X, Info, Play } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EduAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const user = useAuth();
  const trend = studentStats.scoreTrend;
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const [scoreOpen, setScoreOpen] = useState(false);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Salam, {user?.name?.split(" ")[0] || "Student"} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's where you stand today.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button onClick={() => setScoreOpen(true)} className="text-left rounded-2xl p-5 border border-transparent shadow-sm bg-primary-gradient text-primary-foreground hover:shadow-elevated transition group">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-lg bg-background/20 flex items-center justify-center"><Target className="w-4 h-4" /></div>
            <Info className="w-4 h-4 opacity-70 group-hover:opacity-100" />
          </div>
          <div className="mt-3 text-xs uppercase tracking-wide opacity-80">Predicted score</div>
          <div className="mt-1 font-display text-2xl font-bold">{studentStats.predictedScore}</div>
          <div className="text-xs opacity-80 mt-0.5">Tap for breakdown · Target {studentStats.targetScore}</div>
        </button>
        <StatCard icon={Flame} label="Streak" value={`${studentStats.streak} days`} sub="Keep it going!" />
        <StatCard icon={Clock} label="Today" value={`${studentStats.studyMinutesToday}m`} sub="Goal: 90m" />
        <StatCard icon={Trophy} label="Rank" value={`#${studentStats.rank}`} sub={`of ${studentStats.totalStudents.toLocaleString()}`} />
      </div>

      {/* Daily Review — spaced repetition */}
      <div className="rounded-2xl bg-card border border-border p-6 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/10 -mr-20 -mt-20" />
        <div className="relative flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-gradient text-primary-foreground flex items-center justify-center"><Brain className="w-6 h-6" /></div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold">Daily Review</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning/15 text-warning font-bold uppercase">Due today</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">~{dailyReview.totalMinutes} mins · spaced repetition prevents knowledge decay.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {dailyReview.items.slice(0, 3).map((it) => (
                  <span key={it.topicSlug} className="text-xs px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{it.topicName}</span>
                ))}
                {dailyReview.items.length > 3 && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground">+{dailyReview.items.length - 3} more</span>
                )}
              </div>
            </div>
          </div>
          <Link to="/app/subjects/$subject/$topic" params={{ subject: "biology", topic: "cell-biology" }} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-gradient text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition">
            <Play className="w-4 h-4" /> Start review
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Predicted MDCAT score</h2>
              <p className="text-xs text-muted-foreground mt-1">Last 8 weeks</p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm text-success font-semibold"><TrendingUp className="w-4 h-4" />+18</span>
          </div>
          <div className="mt-6 h-48 flex items-end gap-2">
            {trend.map((v, i) => {
              const h = ((v - min + 20) / (max - min + 20)) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full rounded-t-lg bg-primary-gradient transition-all hover:opacity-80" style={{ height: `${h}%` }} title={String(v)} />
                  <span className="text-[10px] text-muted-foreground">W{i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
          <h2 className="font-semibold">Recent activity</h2>
          <div className="mt-4 space-y-3">
            {studentStats.recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{a.topic}</div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
                <div className="px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-xs font-bold">{a.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Continue learning</h2>
          <Link to="/app/subjects" className="text-sm text-primary font-medium inline-flex items-center gap-1">All subjects <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {subjects.slice(0, 3).map((s) => {
            const avgMastery = Math.round(s.topics.reduce((a, t) => a + t.mastery, 0) / s.topics.length);
            return (
              <Link key={s.slug} to="/app/subjects/$subject" params={{ subject: s.slug }} className="group rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-soft hover:border-primary/40 transition">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-xs text-muted-foreground">{s.topics.length} topics</span>
                </div>
                <h3 className="mt-3 font-semibold">{s.name}</h3>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Mastery</span><span>{avgMastery}%</span></div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${avgMastery}%`, background: s.color }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {scoreOpen && <ScoreBreakdownModal onClose={() => setScoreOpen(false)} />}
    </div>
  );
}

function ScoreBreakdownModal({ onClose }: { onClose: () => void }) {
  const b = studentStats.breakdown;
  const total = b.subjectScores.reduce((a, s) => a + s.contribution, 0) + b.bonus;
  return (
    <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="bg-card rounded-2xl shadow-elevated border border-border max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 h-14 border-b border-border bg-primary-gradient text-primary-foreground">
          <div className="flex items-center gap-2"><Target className="w-5 h-5" /><h3 className="font-semibold">Predicted Score Breakdown</h3></div>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Tile label="Predicted" value={String(studentStats.predictedScore)} accent />
            <Tile label="Target" value={String(studentStats.targetScore)} />
            <Tile label="Confidence" value={`${Math.round(b.confidence * 100)}%`} />
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">How we calculate it</h4>
            <p className="text-sm text-muted-foreground bg-surface p-3 rounded-lg border border-border">{b.formula}</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Subject contribution</h4>
            <div className="space-y-3">
              {b.subjectScores.map((s) => (
                <div key={s.subject}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{s.subject} <span className="text-xs text-muted-foreground">({s.weight}% weight · {s.accuracy}% acc.)</span></span>
                    <span className="font-bold">+{s.contribution}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary-gradient" style={{ width: `${(s.contribution / 350) * 100}%` }} />
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-border text-sm">
                <span>Consistency bonus</span><span className="font-bold text-success">+{b.bonus}</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Total</span><span className="text-primary">{total}</span>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-success/30 bg-success/5 p-4">
              <h4 className="font-semibold text-sm text-success mb-2">💪 Strengths</h4>
              <ul className="space-y-1 text-sm">{b.strengths.map((s) => <li key={s}>• {s}</li>)}</ul>
            </div>
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
              <h4 className="font-semibold text-sm text-destructive mb-2">⚠️ Needs work</h4>
              <ul className="space-y-1 text-sm">{b.weaknesses.map((s) => <li key={s}>• {s}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-4 text-center ${accent ? "bg-primary-gradient text-primary-foreground" : "bg-surface border border-border"}`}>
      <div className="text-xs uppercase tracking-wide opacity-80">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl p-5 border shadow-sm bg-card border-border">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent text-primary">
        <Icon className="w-4 h-4" />
      </div>
      <div className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs mt-0.5 text-muted-foreground">{sub}</div>
    </div>
  );
}
