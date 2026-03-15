import { Monitor, Apple, Terminal, ChevronRight, ArrowDownToLine, Cpu, MemoryStick, Gauge } from "lucide-react";

const DOWNLOADS = [
  {
    os: "Windows",
    version: "v2.4.1",
    subtitle: "Windows 10 / 11 · x64",
    icon: Monitor,
    primary: true,
    ext: ".exe",
  },
  {
    os: "macOS",
    version: "v2.4.1",
    subtitle: "macOS 13+ · Apple Silicon & Intel",
    icon: Apple,
    primary: false,
    ext: ".dmg",
  },
  {
    os: "Linux",
    version: "v2.4.1",
    subtitle: "Ubuntu, Debian, Arch · AppImage",
    icon: Terminal,
    primary: false,
    ext: ".AppImage",
  },
];

const MICRO_STATS = [
  { icon: Cpu, label: "Risparmio medio CPU", value: "68%" },
  { icon: MemoryStick, label: "RAM liberata", value: "12 GB" },
  { icon: Gauge, label: "Rendering 3x più veloce", value: "3×" },
];

export default function HeroDownload() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{
        backgroundColor: "#091540",
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, rgba(244,244,130,0.12), transparent),
          radial-gradient(ellipse 40% 40% at 80% 60%, rgba(80,60,200,0.08), transparent),
          linear-gradient(rgba(245,240,246,0.022) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,240,246,0.022) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 60px 60px, 60px 60px",
      }}
    >
      {/* Badge */}
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
        <span className="text-white/55 text-sm">v2.4.1 — ora disponibile</span>
        <a href="#" className="text-xs flex items-center gap-0.5" style={{ color: "#F4F482", opacity: 0.75 }}>
          Note di rilascio <ChevronRight size={12} />
        </a>
      </div>

      {/* Headline */}
      <div className="text-center max-w-4xl mx-auto px-6 animate-fade-up-delay-1">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight font-space-grotesk">
          Libera la potenza
          <br />
          <span style={{ color: "#F4F482" }}>del tuo hardware.</span>
        </h1>
        <p className="mt-6 text-base md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          Vora è il primo supercomputer distribuito. Installa il nodo, metti in
          condivisione la tua potenza di calcolo inattiva e inizia a guadagnare
          $VORA Token fin dal primo giorno.
          così paghi solo per ciò che usi davvero, e non un centesimo di più.
        </p>
      </div>

      {/* Download cards */}
      <div className="mt-12 w-full max-w-4xl mx-auto px-6 animate-fade-up-delay-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DOWNLOADS.map((dl) => {
            const Icon = dl.icon;
            return (
              <a
                key={dl.os}
                href={
                  dl.os === "macOS"
                    ? "https://github.com/alexandrudumbrava38-afk/Vora_Server/releases/download/v1.0.0-beta/Vora.Node-1.0.0-arm64.dmg"
                    : "#"
                }
                target={dl.os === "macOS" ? "_blank" : undefined}
                rel={dl.os === "macOS" ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col items-center gap-4 rounded-2xl px-6 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
                style={
                  dl.primary
                    ? {
                        backgroundColor: "#F4F482",
                        boxShadow: "0 20px 50px rgba(244,244,130,0.25)",
                      }
                    : {
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.09)",
                      }
                }
              >
                {dl.primary && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#091540", color: "#F4F482" }}
                  >
                    Consigliato
                  </span>
                )}

                {/* Icon box */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={
                    dl.primary
                      ? { backgroundColor: "rgba(9,21,64,0.12)" }
                      : { backgroundColor: "rgba(244,244,130,0.08)", border: "1px solid rgba(244,244,130,0.15)" }
                  }
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: dl.primary ? "#091540" : "#F4F482" }}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Labels */}
                <div className="text-center">
                  <p
                    className="text-xl font-black font-space-grotesk tracking-tight"
                    style={{ color: dl.primary ? "#091540" : "#fff" }}
                  >
                    {dl.os}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: dl.primary ? "rgba(9,21,64,0.55)" : "rgba(255,255,255,0.35)" }}
                  >
                    {dl.subtitle}
                  </p>
                </div>

                {/* Download button */}
                <div
                  className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 group-hover:gap-3"
                  style={
                    dl.primary
                      ? { backgroundColor: "#091540", color: "#F4F482" }
                      : { backgroundColor: "rgba(244,244,130,0.1)", color: "#F4F482", border: "1px solid rgba(244,244,130,0.2)" }
                  }
                >
                  <ArrowDownToLine size={15} strokeWidth={2} />
                  Scarica {dl.ext}
                </div>

                {/* Version */}
                <p
                  className="text-xs"
                  style={{ color: dl.primary ? "rgba(9,21,64,0.4)" : "rgba(255,255,255,0.2)" }}
                >
                  {dl.version}
                </p>
              </a>
            );
          })}
        </div>

        {/* Other options link */}
        <p className="text-center mt-5 text-sm text-white/25">
          Altre piattaforme (Docker, Homebrew, npm){" "}
          <a href="#" className="underline underline-offset-2 hover:text-white/55 transition-colors" style={{ color: "#F4F482", opacity: 0.6 }}>
            → Tutte le versioni
          </a>
        </p>
      </div>

      {/* Micro-stats */}
      <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 animate-fade-up-delay-3">
        {MICRO_STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="flex flex-col items-center gap-1.5 text-center">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-1"
                style={{ background: "rgba(244,244,130,0.08)", border: "1px solid rgba(244,244,130,0.12)" }}
              >
                <Icon className="w-4 h-4" style={{ color: "#F4F482" }} strokeWidth={1.8} />
              </div>
              <span className="text-2xl font-black font-space-grotesk" style={{ color: "#F4F482" }}>
                {stat.value}
              </span>
              <span className="text-xs text-white/35 max-w-[100px] leading-tight">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(9,21,64,0.7))" }}
      />
    </section>
  );
}
