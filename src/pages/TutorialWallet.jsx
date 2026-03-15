import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  PlayCircle,
  Wallet,
  KeyRound,
  ServerCog,
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";

const STEPS = [
  {
    id: "wallet",
    icon: Wallet,
    title: "Crea il tuo Wallet",
    description:
  "Il wallet Vora è il tuo indirizzo sulla rete. Viene generato localmente — Vora non ha mai accesso alla tua chiave privata.",
    cta: "Genera wallet",
    detail:
      "Il tuo wallet è stato creato con successo. Indirizzo: 0x3f…a9e2",
  },
  {
    id: "chiave",
    icon: KeyRound,
    title: "Copia la chiave privata",
    description:
      "La chiave privata ti permette di recuperare il wallet in qualsiasi momento. Conservala in un posto sicuro — non potrai recuperarla se la perdi.",
    cta: "Copia e salva",
    detail:
      "Chiave copiata negli appunti. Incollala in un password manager o salvala offline.",
  },
  {
    id: "nodo",
    icon: ServerCog,
    title: "Verifica nodo",
    description:
  "Collega il client Vora al tuo wallet per iniziare a condividere o richiedere potenza di calcolo. Il nodo si avvia automaticamente in background.",
    cta: "Verifica connessione",
    detail:
  "Nodo verificato e connesso alla rete Vora. Sei pronto!",
  },
];

function StepRow({ step, index, completed, active, onComplete }) {
  const Icon = step.icon;
  const [copied, setCopied] = useState(false);

  const handleCta = () => {
    if (step.id === "chiave") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    onComplete(step.id);
  };

  return (
    <div
      className="relative flex gap-5 transition-all duration-300"
    >
      {/* Vertical connector line */}
      {index < STEPS.length - 1 && (
        <div
          className="absolute left-5 top-14 w-px bottom-0 -mb-6 transition-all duration-500"
          style={{
            backgroundColor: completed ? "rgba(34,197,94,0.3)" : "rgba(9,21,64,0.1)",
          }}
        />
      )}

      {/* Status icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 transition-all duration-300">
        {completed ? (
          <CheckCircle2
            size={40}
            className="transition-all duration-300"
            style={{ color: "#22c55e" }}
            strokeWidth={1.8}
          />
        ) : active ? (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#091540" }}
          >
            <Icon size={18} style={{ color: "#F4F482" }} strokeWidth={2} />
          </div>
        ) : (
          <Circle
            size={40}
            style={{ color: "rgba(9,21,64,0.2)" }}
            strokeWidth={1.5}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="flex items-center gap-3 mb-1">
          <h3
            className="text-base font-bold font-space-grotesk"
            style={{
              color: completed
                ? "rgba(9,21,64,0.4)"
                : active
                ? "#091540"
                : "rgba(9,21,64,0.3)",
            }}
          >
            {step.title}
          </h3>
          {completed && (
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              Completato
            </span>
          )}
        </div>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: active ? "rgba(9,21,64,0.55)" : "rgba(9,21,64,0.3)" }}
        >
          {step.description}
        </p>

        {/* Action area — only shown when active */}
        {active && !completed && (
          <button
            onClick={handleCta}
            className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#091540", color: "#F4F482" }}
          >
            {step.id === "chiave" ? (
              copied ? (
                <><Check size={15} /> Copiata!</>
              ) : (
                <><Copy size={15} /> {step.cta}</>
              )
            ) : (
              <>{step.cta} <ChevronRight size={15} /></>
            )}
          </button>
        )}

        {/* Success detail — shown when completed */}
        {completed && (
          <div
            className="inline-flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-xl"
            style={{
              backgroundColor: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.15)",
              color: "#16a34a",
            }}
          >
            <ShieldCheck size={13} strokeWidth={2} />
            {step.detail}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TutorialWallet() {
  const [completedIds, setCompletedIds] = useState([]);

  const completeStep = (id) => {
    setCompletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const activeIndex = completedIds.length; // next step to complete
  const allDone = completedIds.length === STEPS.length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F0F6" }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ backgroundColor: "#091540" }}
          >
            <Zap className="w-4 h-4" style={{ color: "#F4F482" }} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg font-space-grotesk" style={{ color: "#091540" }}>
            Vora
          </span>
        </Link>
        {/* Progress pill */}
        <div
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{
            backgroundColor: allDone ? "rgba(34,197,94,0.1)" : "rgba(9,21,64,0.06)",
            color: allDone ? "#16a34a" : "rgba(9,21,64,0.5)",
            border: allDone ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(9,21,64,0.08)",
          }}
        >
          {allDone ? (
            <><CheckCircle2 size={15} /> Setup completato!</>
          ) : (
            <>{completedIds.length}/{STEPS.length} step completati</>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 space-y-8">
        {/* Page title */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "rgba(9,21,64,0.35)" }}
          >
            Onboarding · Passo 2 di 2
          </p>
          <h1
            className="text-3xl sm:text-4xl font-black tracking-tight font-space-grotesk leading-tight"
            style={{ color: "#091540" }}
          >
            Configura il tuo
            <br />
            <span style={{ color: "#091540", opacity: 0.4 }}>nodo e wallet.</span>
          </h1>
        </div>

        {/* Video placeholder */}
        <div
          className="w-full rounded-2xl overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-navy/15"
          style={{
            border: "2px solid #091540",
            aspectRatio: "16 / 9",
            backgroundColor: "#091540",
          }}
        >
          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(244,244,130,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(244,244,130,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(244,244,130,0.07), transparent)",
            }}
          />
          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
              style={{
                backgroundColor: "#F4F482",
                boxShadow: "0 0 0 12px rgba(244,244,130,0.15)",
              }}
            >
              <PlayCircle size={32} style={{ color: "#091540" }} strokeWidth={2} />
            </div>
            <div className="text-center">
              <p className="text-white font-bold font-space-grotesk text-lg leading-tight">
                Guarda il tutorial completo
              </p>
              <p className="text-white/40 text-sm mt-1">
                3 min · Configurazione wallet e primo nodo
              </p>
            </div>
          </div>
          {/* Duration badge */}
          <div
            className="absolute bottom-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "rgba(255,255,255,0.7)" }}
          >
            3:12
          </div>
        </div>

        {/* Checklist */}
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(9,21,64,0.07)",
            boxShadow: "0 4px 24px rgba(9,21,64,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-lg font-bold font-space-grotesk"
              style={{ color: "#091540" }}
            >
              Setup Checklist
            </h2>
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div
                className="w-24 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(9,21,64,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedIds.length / STEPS.length) * 100}%`,
                    backgroundColor: "#22c55e",
                  }}
                />
              </div>
              <span className="text-xs font-semibold" style={{ color: "rgba(9,21,64,0.4)" }}>
                {Math.round((completedIds.length / STEPS.length) * 100)}%
              </span>
            </div>
          </div>

          <div>
            {STEPS.map((step, i) => (
              <StepRow
                key={step.id}
                step={step}
                index={i}
                completed={completedIds.includes(step.id)}
                active={i === activeIndex}
                onComplete={completeStep}
              />
            ))}
          </div>
        </div>

        {/* CTA finale */}
        {allDone && (
          <div
            className="rounded-2xl p-7 flex flex-col sm:flex-row items-center gap-5 animate-fade-up"
            style={{
              backgroundColor: "#091540",
              boxShadow: "0 16px 48px rgba(9,21,64,0.2)",
            }}
          >
            <div className="flex-1 text-center sm:text-left">
              <p className="text-white font-black text-xl font-space-grotesk leading-tight">
                🎉 Sei pronto a partire!
              </p>
              <p className="text-white/45 text-sm mt-1">
                Il tuo nodo è configurato. Vai alla dashboard per gestire i tuoi job.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
              style={{ backgroundColor: "#F4F482", color: "#091540" }}
            >
              Vai alla Dashboard <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
