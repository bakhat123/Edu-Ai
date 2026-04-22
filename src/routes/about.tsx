import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — EduAI Pakistan" },
      { name: "description", content: "Our mission: give every student in Pakistan access to a personal AI tutor — regardless of city, income or learning speed." },
      { property: "og:title", content: "About — EduAI Pakistan" },
      { property: "og:description", content: "Our mission to democratize quality education across Pakistan." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <p className="text-emerald text-sm font-semibold tracking-wider uppercase">Our Mission</p>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold leading-[1.05]">
            Every child in Pakistan deserves a tutor that <span className="text-gradient">teaches them, not the class.</span>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
            EduAI Pakistan was built around a single conviction: the failure of our classrooms isn't the teachers — it's that one teacher cannot give personal attention to forty different students at once. AI can. That is the entire reason this company exists.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            We start with MDCAT and ECAT — the highest-stakes tests in a young Pakistani's life. Then we expand to primary education. Then matric, FSC, O- and A-Levels. The long-term goal is HEC recognition as a fully validated educational institution.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          { k: "5", v: "Boards covered across Pakistan" },
          { k: "PKR 499", v: "Starting price per month" },
          { k: "2026 → 2027", v: "Three-stage rollout" },
        ].map((s) => (
          <div key={s.k} className="p-6 rounded-2xl bg-card border border-border text-center shadow-card">
            <div className="font-display text-4xl font-bold text-emerald">{s.k}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
