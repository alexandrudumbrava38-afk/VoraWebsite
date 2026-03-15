import { Cpu, Wallet, ArrowRight, Wand2, Layers, Rocket } from "lucide-react";

const TRACKS = [
  {
    id: "fornitore",
    badge: "💻  Fornitore di Potenza",
    title: "Monetizza il tuo hardware inattivo",
    subtitle:
      "Hai un PC potente o uno smartphone di ultima generazione? Mettilo al lavoro quando non lo usi e guadagna crediti o denaro reale — senza fare nulla.",
    accentColor: "#F4F482",
    steps: [
      {
        number: "01",
        icon: Cpu,
  title: "Installa il nodo Vora",
        description:
          "Scarica l'app in 2 minuti. Il client si installa silenziosamente e riconosce automaticamente CPU, GPU e RAM disponibili.",
        tag: "Windows · macOS · Linux · Android",
      },
      {
        number: "02",
        icon: Wallet,
        title: "Imposta la tua disponibilità",
        description:
          "Scegli quante risorse condividere e quando. Vora usa solo la potenza in eccesso — il tuo PC rimane sempre veloce per te e riceverai $VORA Token per le risorse fornite.",
        tag: "Controllo granulare al 100%",
      },
      {
        number: "03",
        icon: Rocket,
        title: "Inizia a guadagnare",
        description:
          "Ogni job completato genera crediti convertibili in cash o sconti sulla piattaforma. Dashboard in tempo reale con i tuoi guadagni.",
        tag: "Pagamenti ogni settimana",
      },
    ],
  },
  {
    id: "richiedente",
    badge: "🎨  Richiedente",
    title: "Affitta potenza per i tuoi progetti",
    subtitle:
      "Sei un creator, un designer 3D o un team AI? Accedi a cluster di calcolo distribuito in secondi — senza server, senza contratti, senza sorprese in fattura.",
    accentColor: "#a78bfa",
    steps: [
      {
        number: "01",
        icon: Layers,
        title: "Carica il tuo job",
        description:
          "Trascina il job (render, training o batch). Vora analizza il carico, spezza il lavoro e lo distribuisce sui nodi più adatti, ricompensando i provider in $VORA Token.",
        tag: "Blender · Cinema 4D · PyTorch · Stable Diffusion",
      },
      {
        number: "02",
        icon: Wand2,
        title: "Distribuisci in un click",
        description:
          "Il rendering o il training viene spezzato in task paralleli e distribuito su decine di nodi contemporaneamente. Nessuna configurazione.",
        tag: "Auto-scaling · Zero DevOps",
      },
      {
        number: "03",
        icon: ArrowRight,
        title: "Scarica il risultato",
        description:
          "In minuti ricevi notifica di completamento. Scarica l'output direttamente dalla dashboard o via API. Paga solo per i secondi utilizzati.",
        tag: "Pay-per-second · Nessun minimo",
      },
    ],
  },
];

export default function HowItWorks() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#091540" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245, 240, 246, 0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 240, 246, 0.022) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(244,244,130,0.05), transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-bold uppercase tracking-widest mb-4 text-white/25">
            Come funziona
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-space-grotesk leading-tight">
            Due percorsi,
            <br />
            <span style={{ color: "#F4F482" }}>un'unica rete.</span>
          </h2>
          <p className="mt-5 text-white/40 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Vora connette chi ha potenza di calcolo da offrire con chi ne ha bisogno —
            creando un mercato distribuito efficiente e accessibile a tutti.
          </p>
        </div>

        {/* Two tracks */}
        <div className="space-y-16">
          {TRACKS.map((track) => (
            <div key={track.id}>
              {/* Track header */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-8">
                <div>
                  <span
                    className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3"
                    style={{
                      backgroundColor: `${track.accentColor}14`,
                      color: track.accentColor,
                      border: `1px solid ${track.accentColor}28`,
                    }}
                  >
                    {track.badge}
                  </span>
                  <h3
                    className="text-2xl md:text-3xl font-black font-space-grotesk text-white leading-tight"
                  >
                    {track.title}
                  </h3>
                  <p className="mt-2 text-white/40 text-sm leading-relaxed max-w-xl">
                    {track.subtitle}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {track.steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.number}
                      className="relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Big number */}
                      <div
                        className="text-7xl font-black font-space-grotesk absolute top-5 right-5 leading-none select-none"
                        style={{ color: `${track.accentColor}0d` }}
                      >
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                        style={{
                          background: `${track.accentColor}12`,
                          border: `1px solid ${track.accentColor}22`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: track.accentColor }}
                          strokeWidth={2}
                        />
                      </div>

                      {/* Connector */}
                      {idx < track.steps.length - 1 && (
                        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-white/15 text-xl">
                          →
                        </div>
                      )}

                      <h4 className="text-lg font-bold text-white mb-2 font-space-grotesk leading-snug">
                        {step.title}
                      </h4>
                      <p className="text-white/45 text-sm leading-relaxed mb-4">
                        {step.description}
                      </p>
                      <p
                        className="text-xs font-medium"
                        style={{ color: track.accentColor, opacity: 0.6 }}
                      >
                        {step.tag}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}