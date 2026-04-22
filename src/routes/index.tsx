import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero-student.jpg";
import { Brain, Target, Zap, TrendingUp, BookOpen, Users, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduAI Pakistan — AI Tutor for MDCAT & ECAT Prep" },
      { name: "description", content: "Pakistan's first adaptive AI tutor. Personalized MDCAT, ECAT and university entry test prep — from PKR 499/month. Launching July 2026." },
      { property: "og:title", content: "EduAI Pakistan — AI Tutor for MDCAT & ECAT Prep" },
      { property: "og:description", content: "Pakistan's first adaptive AI tutor. Personalized MDCAT, ECAT and university entry test prep." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Stage 1 — Launching July 2026
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05]">
              A personal <span className="text-gradient">AI tutor</span> for every Pakistani student.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              EduAI adapts to how <em>you</em> learn — adjusting pace, difficulty and explanations in real time. Crack MDCAT, ECAT and university entry tests with a tutor that never sleeps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/waitlist" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-gradient text-emerald-foreground font-semibold shadow-glow hover:opacity-90 transition">
                Join the waitlist <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card/40 hover:bg-card transition font-semibold">
                See how it works
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div><div className="text-2xl font-display font-bold text-foreground">PKR 499</div>starting price/month</div>
              <div className="h-10 w-px bg-border" />
              <div><div className="text-2xl font-display font-bold text-foreground">5</div>boards covered</div>
              <div className="h-10 w-px bg-border" />
              <div><div className="text-2xl font-display font-bold text-foreground">24/7</div>AI availability</div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-emerald/20 blur-3xl rounded-full" />
            <img src={heroImg} alt="Student learning with EduAI" className="relative rounded-2xl shadow-card border border-border" />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <p className="text-emerald text-sm font-semibold tracking-wider uppercase">The Problem</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">One teacher cannot teach forty students differently.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Pakistan's classrooms force every student into the same pace, the same explanation, the same example. Bright students get bored. Struggling students fall behind. Academies cost a fortune. EduAI fixes the root cause — not the symptoms.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Adaptive AI", desc: "The platform learns your strengths, gaps and preferred explanation style — and rewires every lesson around them." },
            { icon: Target, title: "Built for Pakistan", desc: "Full MDCAT, ECAT and university entry test syllabus. Punjab, Federal, Sindh, KPK and Balochistan boards." },
            { icon: Zap, title: "Offline-first", desc: "Designed for 2G/3G areas. Download lesson packs, study anywhere, sync when you're back online." },
            { icon: TrendingUp, title: "Predicted score", desc: "Live prediction of your MDCAT/ECAT result based on real performance — updated after every quiz." },
            { icon: BookOpen, title: "Spaced repetition", desc: "Weak topics resurface automatically until they become your strengths. No flashcards required." },
            { icon: Users, title: "Scholarship system", desc: "Top performers earn fully funded access — talent matters more than your family's income." },
          ].map((f) => (
            <div key={f.title} className="group relative p-6 rounded-2xl bg-card border border-border hover:border-emerald/40 transition shadow-card">
              <div className="w-11 h-11 rounded-xl bg-emerald/15 text-emerald flex items-center justify-center mb-4 group-hover:bg-emerald-gradient group-hover:text-emerald-foreground transition">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stages */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-card">
          <p className="text-emerald text-sm font-semibold tracking-wider uppercase">Roadmap</p>
          <h2 className="mt-2 text-4xl font-bold">Three stages. One mission.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "MDCAT / ECAT Prep", d: "Entry test mastery for every aspiring doctor and engineer.", date: "July 2026", active: true },
              { n: "02", t: "Playgroup → Class 8", d: "Adaptive primary education with AI avatar teachers.", date: "Late 2026" },
              { n: "03", t: "Matric, FSC, O/A-Levels", d: "Full secondary schooling on track for HEC recognition.", date: "Early 2027" },
            ].map((s) => (
              <div key={s.n} className={`p-6 rounded-2xl border ${s.active ? "border-emerald/50 bg-emerald/5" : "border-border bg-background/40"}`}>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-3xl font-bold text-emerald">{s.n}</span>
                  <span className="text-xs text-muted-foreground">{s.date}</span>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                {s.active && <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" /> Building now</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl bg-emerald-gradient p-12 md:p-16 text-emerald-foreground overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold">Be among our first 1,000 students.</h2>
            <p className="mt-4 text-lg opacity-90">Waitlist members get a 50% discount for the first three months and early access to the Stage 1 beta.</p>
            <Link to="/waitlist" className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-background text-foreground font-semibold hover:opacity-90 transition">
              Reserve my spot <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
