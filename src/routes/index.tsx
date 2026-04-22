import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import studentsImg from "@/assets/students.jpg";
import { Brain, Target, BookOpen, TrendingUp, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduAI Pakistan — A Personal AI Tutor for MDCAT & ECAT" },
      { name: "description", content: "Pakistan's adaptive AI tutor for MDCAT, ECAT and university entry tests. Personalized lessons, practice MCQs and predicted scores from PKR 499/month." },
      { property: "og:title", content: "EduAI Pakistan — A Personal AI Tutor for MDCAT & ECAT" },
      { property: "og:description", content: "Pakistan's adaptive AI tutor for MDCAT and ECAT prep." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative bg-soft overflow-hidden">
        <div className="absolute inset-0 dotted-bg opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> Stage 1 — MDCAT & ECAT prep · Launching July 2026
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              Your personal tutor for <span className="text-primary">MDCAT & ECAT.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Stop wasting months on generic academy lectures. EduAI builds a study plan around <em>your</em> weak topics, your pace, and your target score — and updates it every day.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary-gradient text-primary-foreground font-semibold shadow-soft hover:shadow-elevated transition">
                Start free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/how-it-works" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-card border border-border hover:bg-muted transition font-semibold">
                See how it works
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-primary-gradient text-primary-foreground flex items-center justify-center text-[10px] font-bold">{["AK","FA","SH","ZN"][i-1]}</div>)}
              </div>
              <div>
                <div className="flex items-center gap-1 text-warning">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <div className="text-xs mt-0.5">Trusted by 1,200+ early access students</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <img src={studentsImg} alt="Pakistani students learning together" className="rounded-3xl shadow-elevated border border-border" width={1536} height={1152} />
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-elevated border border-border p-4 max-w-[200px] hidden md:block">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1"><TrendingUp className="w-3.5 h-3.5 text-success" /> Predicted score</div>
              <div className="font-display text-3xl font-bold">742<span className="text-base text-muted-foreground">/1100</span></div>
              <div className="text-xs text-success mt-1">+18 this week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / boards */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Covers all boards:</span>
          {["Punjab", "Federal", "Sindh", "KPK", "Balochistan", "Aga Khan"].map((b) => <span key={b}>{b}</span>)}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase">Why EduAI</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-balance">Built around how you actually learn.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Six things that make EduAI different from any academy or YouTube playlist.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "Adaptive lessons", desc: "We learn your strengths, gaps and preferred explanation style — and rewire every lesson around them." },
            { icon: Target, title: "Built for Pakistan", desc: "Full MDCAT, ECAT, NUST NET, GIKI and FAST coverage. All five major boards." },
            { icon: BookOpen, title: "50,000+ MCQs", desc: "AI-curated practice with detailed explanations for every question. Past papers included." },
            { icon: TrendingUp, title: "Live predicted score", desc: "After every quiz we recompute your projected MDCAT/ECAT score — so you always know where you stand." },
            { icon: ShieldCheck, title: "Offline-first", desc: "Works on 2G/3G. Download topic packs, study anywhere, sync when you're back." },
            { icon: Sparkles, title: "Scholarship system", desc: "Top performers get fully funded access. Talent matters more than your family's income." },
          ].map((f) => (
            <div key={f.title} className="p-7 rounded-2xl bg-card border border-border shadow-sm hover:shadow-soft hover:border-primary/30 transition">
              <div className="w-11 h-11 rounded-xl bg-accent text-primary flex items-center justify-center mb-5">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <p className="text-primary text-sm font-semibold tracking-wide uppercase text-center">How it works</p>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-center text-balance">From diagnostic to acceptance letter.</h2>
          <div className="mt-14 grid md:grid-cols-4 gap-6">
            {[
              { n: "1", t: "Take a diagnostic", d: "30-min placement maps every topic of your syllabus." },
              { n: "2", t: "Get your plan", d: "AI builds a study schedule around your weak topics." },
              { n: "3", t: "Practice & learn", d: "Adaptive lessons + MCQs with instant feedback." },
              { n: "4", t: "Track your score", d: "Live predicted MDCAT/ECAT score updated daily." },
            ].map((s, i) => (
              <div key={s.n} className="relative">
                <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-bold">{s.n}</div>
                  <h3 className="mt-4 font-semibold text-lg">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
                {i < 3 && <ArrowRight className="hidden md:block absolute top-1/2 -right-5 w-5 h-5 text-muted-foreground/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-balance">EduAI vs traditional academies</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-bold text-muted-foreground">Traditional academy</h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {["PKR 25,000–60,000 per month", "Same lecture for 40 students at once", "Travel time + fixed schedule", "No personal weak-topic tracking", "Limited past paper access"].map((p) => (
                <li key={p} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2" />{p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-primary bg-accent/30 p-8 shadow-elevated">
            <h3 className="font-display text-xl font-bold text-primary">EduAI Pakistan</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {["From PKR 499 per month", "Lessons personalized to YOU", "Study anywhere, anytime, offline", "Live mastery heatmap & predicted score", "50,000+ MCQs with explanations"].map((p) => (
                <li key={p} className="flex items-start gap-3"><CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl bg-primary-gradient p-12 md:p-16 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 dotted-bg opacity-20" />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Be among our first 1,000 students.</h2>
            <p className="mt-4 text-lg opacity-90">Free to start. 50% off the first three months for early access members.</p>
            <Link to="/signup" className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-background text-foreground font-semibold hover:opacity-90 transition shadow-soft">
              Create my account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
