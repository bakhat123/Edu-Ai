import { createFileRoute, Link } from "@tanstack/react-router";
import { subjects } from "@/lib/mockData";

export const Route = createFileRoute("/app/subjects")({
  head: () => ({ meta: [{ title: "Subjects — EduAI" }] }),
  component: SubjectsPage,
});

function SubjectsPage() {
  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">Subjects</h1>
        <p className="text-muted-foreground mt-1">Pick a subject to start practicing.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((s) => {
          const total = s.topics.reduce((a, t) => a + t.questions, 0);
          const avg = Math.round(s.topics.reduce((a, t) => a + t.mastery, 0) / s.topics.length);
          return (
            <Link key={s.slug} to="/app/subjects/$subject" params={{ subject: s.slug }} className="group rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-soft hover:border-primary/40 transition">
              <div className="text-4xl">{s.icon}</div>
              <h3 className="mt-4 font-display text-xl font-bold">{s.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{s.topics.length} topics · {total.toLocaleString()} questions</div>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5"><span>Mastery</span><span>{avg}%</span></div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${avg}%` }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
