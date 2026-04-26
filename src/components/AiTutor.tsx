import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send, Move } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const STARTER: Msg[] = [
  { role: "ai", text: "Salam! I'm your AI tutor 🤖. Ask me anything — concepts, MCQs, mistakes, or just say 'quiz me'." },
];

export function AiTutor() {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 24, y: 24 }); // distance from bottom-right
  const [drag, setDrag] = useState<{ sx: number; sy: number; px: number; py: number } | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>(STARTER);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: 9e9, behavior: "smooth" }); }, [msgs, open]);

  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => {
      const dx = drag.sx - e.clientX;
      const dy = drag.sy - e.clientY;
      setPos({
        x: Math.max(8, Math.min(window.innerWidth - 80, drag.px + dx)),
        y: Math.max(8, Math.min(window.innerHeight - 80, drag.py + dy)),
      });
    };
    const up = () => setDrag(null);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
  }, [drag]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const reply = mockReply(text);
    setMsgs((m) => [...m, { role: "user", text }, { role: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed z-50" style={{ right: pos.x, bottom: pos.y }}>
      {open && (
        <div className="mb-3 w-[340px] sm:w-[380px] h-[480px] rounded-2xl bg-card border border-border shadow-elevated flex flex-col animate-float-up overflow-hidden">
          <div
            className="flex items-center justify-between px-4 h-12 border-b border-border bg-primary-gradient text-primary-foreground cursor-move select-none"
            onPointerDown={(e) => setDrag({ sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y })}
          >
            <div className="flex items-center gap-2">
              <Move className="w-3.5 h-3.5 opacity-70" />
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold text-sm">AI Tutor</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:opacity-80"><X className="w-4 h-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask anything…"
              className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button onClick={send} className="px-3 rounded-lg bg-primary-gradient text-primary-foreground"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      )}

      <button
        onPointerDown={(e) => setDrag({ sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y })}
        onClick={(e) => { if (!drag) setOpen((o) => !o); e.stopPropagation(); }}
        className="w-14 h-14 rounded-full bg-primary-gradient text-primary-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition relative"
        aria-label="AI tutor"
      >
        <Sparkles className="w-6 h-6" />
        {!open && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-card animate-pulse" />}
      </button>
    </div>
  );
}

function mockReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("quiz")) return "Great! Head to Subjects → pick a topic → I'll break down each MCQ as you go.";
  if (lower.includes("photosynthesis")) return "Photosynthesis converts light energy into chemical energy (glucose). Equation: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Happens in chloroplasts (light + dark reactions).";
  if (lower.includes("ohm")) return "Ohm's Law: V = IR. Voltage equals current times resistance, when temperature stays constant.";
  if (lower.includes("mcq") || lower.includes("explain")) return "Sure — finish a quiz and I'll auto-pop with detailed explanations of every right and wrong answer.";
  return "Good question! In the full release I'll generate a tailored explanation, examples and a mini-quiz right here. (Demo response)";
}

// Programmatic post-quiz review pop-up
export type QuizReviewItem = { question: string; options: string[]; correct: number; picked: number | null; explanation: string };
export function QuizReviewModal({ items, onClose }: { items: QuizReviewItem[]; onClose: () => void }) {
  const wrongs = items.filter((i) => i.picked !== i.correct).length;
  const corrects = items.length - wrongs;
  return (
    <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 animate-float-up">
      <div className="bg-card rounded-2xl shadow-elevated border border-border max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 h-14 border-b border-border bg-primary-gradient text-primary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-semibold">AI Tutor — Quiz review</h3>
          </div>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="px-6 py-4 border-b border-border bg-surface flex gap-3 text-sm">
          <span className="px-3 py-1 rounded-full bg-success/15 text-success font-semibold">{corrects} correct</span>
          <span className="px-3 py-1 rounded-full bg-destructive/15 text-destructive font-semibold">{wrongs} wrong</span>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.map((q, i) => {
            const correct = q.picked === q.correct;
            return (
              <div key={i} className={`rounded-xl border p-4 ${correct ? "border-success/40 bg-success/5" : "border-destructive/40 bg-destructive/5"}`}>
                <div className="text-xs font-bold uppercase tracking-wide" style={{ color: correct ? "var(--success)" : "var(--destructive)" }}>
                  Q{i + 1} — {correct ? "Correct" : "Incorrect"}
                </div>
                <div className="mt-1.5 font-medium">{q.question}</div>
                <div className="mt-2 text-sm">
                  {q.picked !== null && <div>Your answer: <strong>{q.options[q.picked]}</strong></div>}
                  <div>Correct answer: <strong className="text-success">{q.options[q.correct]}</strong></div>
                </div>
                <div className="mt-3 p-3 rounded-lg bg-card border border-border text-sm">
                  <span className="font-semibold text-primary">Tutor:</span> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
