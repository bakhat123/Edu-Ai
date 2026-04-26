import { createFileRoute } from "@tanstack/react-router";
import { leaderboard } from "@/lib/mockData";
import { Trophy, Flame, MapPin, Crown, Medal, Award } from "lucide-react";

export const Route = createFileRoute("/app/leaderboard")({
  head: () => ({ meta: [{ title: "Leaderboard — EduAI" }] }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const top = leaderboard.filter((e) => !e.isYou).slice(0, 7);
  const you = leaderboard.find((e) => e.isYou)!;

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground mt-1">Compete with the brightest aspirants across Pakistan.</p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 items-end">
        {[top[1], top[0], top[2]].map((e, i) => {
          const placement = i === 1 ? 1 : i === 0 ? 2 : 3;
          const Icon = placement === 1 ? Crown : placement === 2 ? Medal : Award;
          const heights = ["h-32", "h-44", "h-24"];
          return (
            <div key={e.rank} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center font-display text-lg font-bold shadow-elevated mb-2">
                {e.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="font-semibold text-sm text-center">{e.name}</div>
              <div className="text-xs text-muted-foreground">{e.score}</div>
              <div className={`mt-3 w-full rounded-t-xl bg-primary-gradient text-primary-foreground flex flex-col items-center justify-end pb-3 ${heights[i]}`}>
                <Icon className="w-6 h-6 mb-1" />
                <div className="font-display text-2xl font-bold">#{placement}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full table */}
      <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-sm">
        <div className="grid grid-cols-[60px_1fr_120px_100px_80px] px-5 py-3 bg-muted/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <div>Rank</div><div>Student</div><div>City</div><div className="text-right">Score</div><div className="text-right">Streak</div>
        </div>
        {leaderboard.map((e) => (
          <div key={e.rank} className={`grid grid-cols-[60px_1fr_120px_100px_80px] items-center px-5 py-3.5 border-t border-border text-sm ${e.isYou ? "bg-primary/8 font-semibold" : ""}`}>
            <div className="flex items-center gap-2">
              {e.rank <= 3 ? <Trophy className="w-4 h-4 text-warning" /> : null}
              <span>#{e.rank}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent text-primary text-xs font-bold flex items-center justify-center">
                {e.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              {e.name} {e.isYou && <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">YOU</span>}
            </div>
            <div className="text-muted-foreground inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.city}</div>
            <div className="text-right font-bold">{e.score}</div>
            <div className="text-right inline-flex items-center justify-end gap-1 text-warning"><Flame className="w-3.5 h-3.5" /> {e.streak}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        You're <span className="font-bold text-foreground">#{you.rank}</span> — climb {you.rank - 7} spots to reach the top 10!
      </div>
    </div>
  );
}
