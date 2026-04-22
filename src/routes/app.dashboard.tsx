import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { studentStats, subjects } from "@/lib/mockData";
import { Flame, Target, Clock, TrendingUp, ArrowRight, Trophy } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — EduAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const user = useAuth();
  const trend = studentStats.scoreTrend;
  const max = Math.max(...trend);
  const min = Math.min(...trend);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Salam, {user?.name?.split(" ")[0] || "Student"} 👋</h1>
        <p className="text-muted-foreground mt-1">Here's where you stand today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Predicted score" value={`${studentStats.predictedScore}`} sub={`Target ${studentStats.targetScore}`} accent />
        <StatCard icon={Flame} label="Streak" value={`${studentStats.streak} days`} sub="Keep it going!" />
        <StatCard icon={Clock} label="Today" value={`${studentStats.studyMinutesToday}m`} sub="Goal: 90m" />
        <StatCard icon={Trophy} label="Rank" value={`#${studentStats.rank}`} sub={`of ${studentStats.totalStudents.toLocaleString()}`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score trend */}
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

        {/* Recent activity */}
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

      {/* Continue learning */}
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
                    <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${avgMastery}%` }} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }: { icon: any; label: string; value: string; sub: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-5 border shadow-sm ${accent ? "bg-primary-gradient text-primary-foreground border-transparent" : "bg-card border-border"}`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent ? "bg-background/20" : "bg-accent text-primary"}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="mt-3 text-xs uppercase tracking-wide opacity-80">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">{value}</div>
      <div className={`text-xs mt-0.5 ${accent ? "opacity-80" : "text-muted-foreground"}`}>{sub}</div>
    </div>
  );
}
