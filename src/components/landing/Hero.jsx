import { ArrowRight, ChevronRight } from "lucide-react";

const STATS = [
  { value: "10M+", label: "Deployments / month" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "150+", label: "Edge locations" },
  { value: "<50ms", label: "Avg. cold start" },
];

function TerminalWindow() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 animate-float"
      style={{ border: "1px solid rgba(245, 240, 246, 0.08)" }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "rgba(244,244,130,0.7)" }} />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
  <span className="ml-3 text-white/25 text-xs font-mono">~ vora deploy --env production</span>
      </div>
      {/* Content */}
      <div className="p-6 font-mono text-sm" style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}>
        <div className="space-y-2">
          <p>
            <span className="text-white/35">$</span>{" "}
            <span className="text-white/75">vora deploy --env production</span>
          </p>
          <p className="text-white/35 mt-3 pl-2">Connecting to registry...</p>
          <p className="pl-2">
            <span className="text-green-400">✓</span>{" "}
            <span className="text-white/65">Image built</span>{" "}
            <span className="text-white/25 ml-2">2.3s</span>
          </p>
          <p className="pl-2">
            <span className="text-green-400">✓</span>{" "}
            <span className="text-white/65">Pushed to registry</span>{" "}
            <span className="text-white/25 ml-2">1.1s</span>
          </p>
          <p className="pl-2">
            <span className="text-green-400">✓</span>{" "}
            <span className="text-white/65">Deployed to 3 regions</span>{" "}
            <span className="text-white/25 ml-2">0.8s</span>
          </p>
          <p className="pl-2">
            <span className="text-green-400">✓</span>{" "}
            <span className="text-white/65">Health checks passed</span>
          </p>
          <div
            className="mt-4 pt-4 pl-2 space-y-1.5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p>
              <span style={{ color: "#F4F482" }}>🚀</span>{" "}
              <span className="text-white/90 font-medium">Live → https://myapp.vora.io</span>
            </p>
            <p className="text-white/35">
              ⚡ 48ms latency &nbsp;·&nbsp; 99.99% uptime &nbsp;·&nbsp; 3 replicas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden"
      style={{
        backgroundColor: "#091540",
        backgroundImage: `
          radial-gradient(ellipse 90% 55% at 50% -5%, rgba(244, 244, 130, 0.13), transparent),
          radial-gradient(ellipse 55% 45% at 85% 55%, rgba(100, 70, 220, 0.09), transparent),
          radial-gradient(ellipse 40% 35% at 10% 70%, rgba(30, 60, 200, 0.06), transparent),
          linear-gradient(rgba(245, 240, 246, 0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245, 240, 246, 0.025) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, auto, 60px 60px, 60px 60px",
      }}
    >
      {/* Pill badge */}
      <div
        className="mb-8 flex items-center gap-2 rounded-full px-4 py-1.5 animate-fade-up"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ backgroundColor: "#F4F482" }}
        />
        <span className="text-white/60 text-sm">Version 2.0 now in GA</span>
        <span className="text-sm flex items-center gap-0.5" style={{ color: "#F4F482", opacity: 0.8 }}>
          Read changelog <ChevronRight size={13} />
        </span>
      </div>

      {/* Headline */}
      <div className="text-center max-w-5xl mx-auto px-6 animate-fade-up-delay-1">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight font-space-grotesk">
          Deploy smarter.
          <br />
          <span style={{ color: "#F4F482" }}>Scale fearlessly.</span>
        </h1>
        <p className="mt-6 text-base md:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed">
          The cloud infrastructure platform built for modern engineering teams.
          Instant deployments, intelligent auto-scaling, and zero-downtime releases — by default.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-fade-up-delay-2">
        <a
          href="#"
          className="flex items-center gap-2 font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 text-base"
          style={{ backgroundColor: "#F4F482", color: "#091540" }}
        >
          Start for free <ArrowRight size={18} />
        </a>
        <a
          href="#"
          className="flex items-center gap-2 font-semibold text-white text-base px-8 py-3.5 rounded-full transition-all duration-200 hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          View documentation
        </a>
      </div>

      {/* Stats */}
      <div className="mt-16 flex flex-wrap justify-center items-center gap-8 md:gap-16 animate-fade-up-delay-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className="text-3xl font-black font-space-grotesk"
              style={{ color: "#F4F482" }}
            >
              {stat.value}
            </div>
            <div className="text-sm text-white/35 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Terminal mockup */}
      <div className="mt-20 w-full max-w-2xl mx-auto px-6">
        <TerminalWindow />
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(9,21,64,0.6))" }}
      />
    </section>
  );
}