import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSubject, getMCQs } from "@/lib/mockData";
import { ArrowLeft, ArrowRight, FileQuestion } from "lucide-react";

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
  const data = Route.useLoaderData() as ReturnType<typeof getSubject> extends infer S ? { subject: NonNullable<ReturnType<typeof getSubject>> } : never;
  const { subject } = data;

  return (
    <div className="space-y-8 max-w-5xl">
      <Link to="/app/subjects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" /> All subjects</Link>
      <div className="flex items-start gap-5">
        <div className="text-5xl">{subject.icon}</div>
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold">{subject.name}</h1>
          <p className="text-muted-foreground mt-1">{subject.topics.length} topics · pick one to start practicing.</p>
        </div>
      </div>

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
                <Link to="/app/subjects/$subject/$topic" params={{ subject: subject.slug, topic: t.slug }} className="ml-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-gradient text-primary-foreground text-sm font-semibold shadow-sm hover:shadow-soft transition">
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
    </div>
  );
}
