import { createFileRoute } from "@tanstack/react-router";
import { allMCQs, subjects } from "@/lib/mockData";
import { useEffect, useMemo, useState } from "react";
import { Trophy, Clock, ArrowRight, Play, RotateCcw, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/app/mock-test")({
  head: () => ({ meta: [{ title: "Mock Test — EduAI" }] }),
  component: MockTest,
});

const TEST_LENGTH = 15;
const DURATION = 10 * 60; // 10 minutes for demo

function MockTest() {
  const [stage, setStage] = useState<"intro" | "running" | "done">("intro");
  const questions = useMemo(() => {
    const all = allMCQs();
    return [...all].sort(() => Math.random() - 0.5).slice(0, TEST_LENGTH);
  }, [stage === "running"]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [idx, setIdx] = useState(0);
  const [seconds, setSeconds] = useState(DURATION);

  useEffect(() => {
    if (stage !== "running") return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [stage]);

  useEffect(() => {
    if (stage === "running" && seconds === 0) setStage("done");
  }, [seconds, stage]);

  const start = () => { setStage("running"); setAnswers({}); setIdx(0); setSeconds(DURATION); };
  const finish = () => setStage("done");

  if (stage === "intro") {
    return (
      <div className="max-w-2xl mx-auto text-center py-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Mock MDCAT Test</h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">A timed, full-length mock built from all subjects. Real test conditions — no going back to change answers after time runs out.</p>
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
          <Stat label="Questions" value={String(TEST_LENGTH)} />
          <Stat label="Time" value="10 min" />
          <Stat label="Subjects" value={String(subjects.length)} />
        </div>
        <button onClick={start} className="mt-10 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-gradient text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition">
          <Play className="w-4 h-4" /> Start mock test
        </button>
      </div>
    );
  }

  if (stage === "running") {
    const q = questions[idx];
    const picked = answers[q.id];
    const answeredCount = Object.keys(answers).length;
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Question {idx + 1} of {TEST_LENGTH}</div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border font-mono font-semibold">
            <Clock className="w-4 h-4 text-primary" /> {mm}:{ss}
          </div>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary-gradient" style={{ width: `${((idx + 1) / TEST_LENGTH) * 100}%` }} />
        </div>

        <div className="rounded-2xl bg-card border border-border p-7 shadow-sm">
          <h2 className="text-xl font-semibold leading-snug">{q.question}</h2>
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers({ ...answers, [q.id]: i })}
                className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-3 ${picked === i ? "border-primary bg-accent" : "border-border bg-background hover:border-primary/40"}`}
              >
                <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${picked === i ? "border-primary text-primary" : "border-border"}`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0} className="px-5 py-2.5 rounded-lg bg-card border border-border font-medium disabled:opacity-40">Previous</button>
          <div className="text-xs text-muted-foreground">{answeredCount}/{TEST_LENGTH} answered</div>
          {idx + 1 < TEST_LENGTH ? (
            <button onClick={() => setIdx(idx + 1)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-gradient text-primary-foreground font-semibold">Next <ArrowRight className="w-4 h-4" /></button>
          ) : (
            <button onClick={finish} className="px-5 py-2.5 rounded-lg bg-primary-gradient text-primary-foreground font-semibold">Submit</button>
          )}
        </div>
      </div>
    );
  }

  // Done
  const correctList = questions.map((q) => ({ q, correct: answers[q.id] === q.answer, picked: answers[q.id] }));
  const correct = correctList.filter((r) => r.correct).length;
  const pct = Math.round((correct / TEST_LENGTH) * 100);
  const predicted = 600 + Math.round(pct * 4.5);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary-gradient text-primary-foreground flex items-center justify-center">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Mock test complete!</h1>
        <p className="text-muted-foreground mt-2">Here's how you did.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Score" value={`${correct}/${TEST_LENGTH}`} />
        <Stat label="Accuracy" value={`${pct}%`} />
        <Stat label="Predicted MDCAT" value={String(predicted)} />
        <Stat label="Time used" value={`${Math.floor((DURATION - seconds) / 60)}m`} />
      </div>

      <div className="rounded-2xl bg-card border border-border p-6 shadow-sm">
        <h2 className="font-semibold mb-4">Question review</h2>
        <div className="space-y-3">
          {correctList.map(({ q, correct, picked }, i) => (
            <div key={q.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
              {correct ? <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">Q{i + 1}. {q.question}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {picked !== undefined ? <>Your answer: <strong>{q.options[picked]}</strong> · </> : <>Not answered · </>}
                  Correct: <strong className="text-success">{q.options[q.answer]}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button onClick={start} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-primary-foreground font-semibold shadow-soft">
          <RotateCcw className="w-4 h-4" /> Take another mock
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card border border-border p-4 text-center">
      <div className="text-xs text-muted-foreground uppercase tracking-wide">{label}</div>
      <div className="font-display text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
