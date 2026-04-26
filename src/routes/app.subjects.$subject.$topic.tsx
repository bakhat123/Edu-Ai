import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSubject, getTopic, getMCQs } from "@/lib/mockData";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, Sparkles } from "lucide-react";
import { QuizReviewModal, type QuizReviewItem } from "@/components/AiTutor";

export const Route = createFileRoute("/app/subjects/$subject/$topic")({
  head: ({ params }) => ({ meta: [{ title: `${params.topic} practice — EduAI` }] }),
  loader: ({ params }) => {
    const subject = getSubject(params.subject);
    const topic = getTopic(params.subject, params.topic);
    if (!subject || !topic) throw notFound();
    const mcqs = getMCQs(params.topic);
    return { subject, topic, mcqs };
  },
  notFoundComponent: () => (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Topic not found</h1>
      <Link to="/app/subjects" className="text-primary mt-4 inline-block">Back to subjects</Link>
    </div>
  ),
  component: PracticePage,
});

function PracticePage() {
  const data = Route.useLoaderData() as { subject: NonNullable<ReturnType<typeof getSubject>>; topic: NonNullable<ReturnType<typeof getTopic>>; mcqs: ReturnType<typeof getMCQs> };
  const { subject, topic, mcqs } = data;
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [showReview, setShowReview] = useState(false);
  const total = mcqs.length;
  const q = mcqs[idx];

  const submit = () => {
    if (picked === null) return;
    setRevealed(true);
    setPicks((p) => { const n = [...p]; n[idx] = picked; return n; });
    if (picked === q.answer) setCorrect((c) => c + 1);
  };
  const next = () => {
    if (idx + 1 >= total) { setDone(true); setShowReview(true); return; }
    setIdx(idx + 1);
    setPicked(null);
    setRevealed(false);
  };
  const restart = () => { setIdx(0); setPicked(null); setRevealed(false); setCorrect(0); setDone(false); setPicks([]); setShowReview(false); };
  const reviewItems: QuizReviewItem[] = mcqs.map((m, i) => ({ question: m.question, options: m.options, correct: m.answer, picked: picks[i] ?? null, explanation: m.explanation }));

  const progress = useMemo(() => ((idx + (revealed ? 1 : 0)) / total) * 100, [idx, revealed, total]);

  if (done) {
    const pct = Math.round((correct / total) * 100);
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Quiz complete!</h1>
        <p className="mt-2 text-muted-foreground">{topic.name} · {subject.name}</p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <Stat label="Score" value={`${correct}/${total}`} />
          <Stat label="Accuracy" value={`${pct}%`} />
          <Stat label="Mastery +" value={`+${Math.round(pct / 10)}%`} />
        </div>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <button onClick={() => setShowReview(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-gradient text-primary-foreground font-semibold shadow-soft">
            <Sparkles className="w-4 h-4" /> Open AI review
          </button>
          <button onClick={restart} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-card border border-border font-semibold hover:bg-muted transition">
            <RotateCcw className="w-4 h-4" /> Try again
          </button>
          <Link to="/app/subjects/$subject" params={{ subject: subject.slug }} className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-card border border-border font-semibold hover:bg-muted transition">
            Next topic <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {showReview && <QuizReviewModal items={reviewItems} onClose={() => setShowReview(false)} />}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/app/subjects/$subject" params={{ subject: subject.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" /> {subject.name}
        </Link>
        <div className="text-sm text-muted-foreground">Question {idx + 1} of {total}</div>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary-gradient transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="rounded-2xl bg-card border border-border p-7 shadow-sm">
        <div className="text-xs font-semibold text-primary uppercase tracking-wide">{topic.name}</div>
        <h2 className="mt-3 text-xl md:text-2xl font-semibold leading-snug">{q.question}</h2>

        <div className="mt-6 space-y-2.5">
          {q.options.map((opt, i) => {
            const isPicked = picked === i;
            const isAns = q.answer === i;
            let cls = "border-border bg-background hover:border-primary/40 hover:bg-accent/40";
            if (revealed && isAns) cls = "border-success bg-success/10 text-foreground";
            else if (revealed && isPicked && !isAns) cls = "border-destructive bg-destructive/10 text-foreground";
            else if (isPicked && !revealed) cls = "border-primary bg-accent text-foreground";

            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setPicked(i)}
                className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-3 ${cls}`}
              >
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isPicked || (revealed && isAns) ? "border-current" : "border-border"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {revealed && isAns && <CheckCircle2 className="w-5 h-5 text-success" />}
                {revealed && isPicked && !isAns && <XCircle className="w-5 h-5 text-destructive" />}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-6 p-4 rounded-xl bg-accent/40 border border-accent">
            <div className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">Explanation</div>
            <p className="text-sm">{q.explanation}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          {!revealed ? (
            <button onClick={submit} disabled={picked === null} className="px-6 py-3 rounded-lg bg-primary-gradient text-primary-foreground font-semibold shadow-soft disabled:opacity-40 disabled:cursor-not-allowed transition">
              Check answer
            </button>
          ) : (
            <button onClick={next} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-gradient text-primary-foreground font-semibold shadow-soft">
              {idx + 1 >= total ? "Finish" : "Next question"} <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Score so far: <span className="font-semibold text-foreground">{correct}/{idx + (revealed ? 1 : 0)}</span>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card border border-border p-4">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
