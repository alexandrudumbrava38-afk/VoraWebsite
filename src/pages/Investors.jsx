import { TrendingUp, BarChart3, Users, Globe, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const METRICS = [
  { label: "GPU Nodes in Network", value: "120+", icon: BarChart3 },
  { label: "Render Jobs Completed", value: "4,200+", icon: TrendingUp },
  { label: "Active Users", value: "850+", icon: Users },
  { label: "Countries Reached", value: "12", icon: Globe },
];

const HIGHLIGHTS = [
  "Distributed rendering reduces costs up to 80% vs traditional cloud",
  "Sustainable model: idle hardware repurposed, zero new data-centers",
  "Revenue from platform fees + premium tier subscriptions",
  "Strong early traction with 3D artists and small studios",
  "Scalable architecture — onboard new GPUs with zero downtime",
  "Pre-seed round closed; seed round opening Q3 2025",
];

export default function Investors() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#091540" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6"
            style={{ backgroundColor: "rgba(244,244,130,0.10)", color: "#F4F482" }}
          >
            <TrendingUp size={14} />
            Investor Relations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            <span style={{ color: "#F4F482" }}>Build the future</span>{" "}
            <span className="text-white">of distributed rendering with us.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Vora transforms idle consumer GPUs into a global rendering cloud.
            We are looking for strategic partners who share our vision of
            sustainable, affordable creative infrastructure.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-6 text-center border border-white/8"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <m.icon size={22} className="mx-auto mb-3 text-blue-400" strokeWidth={1.6} />
              <div className="text-3xl font-bold text-white mb-1">{m.value}</div>
              <div className="text-xs text-white/45">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Investment Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg p-5 border border-white/8"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: "#F4F482" }} />
                <p className="text-sm text-white/70 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div
          className="max-w-3xl mx-auto rounded-2xl p-10 text-center border border-white/8"
          style={{ backgroundColor: "rgba(244,244,130,0.04)" }}
        >
          <h3 className="text-2xl font-bold text-white mb-3">Interested in our seed round?</h3>
          <p className="text-white/50 text-sm mb-6 max-w-lg mx-auto">
            We'd love to share our pitch deck, financial projections, and product roadmap.
            Reach out and let's start a conversation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#F4F482", color: "#091540" }}
          >
            Request Pitch Deck
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
