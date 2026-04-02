import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Marco Ferretti",
    role: "Motion Designer · Freelance",
    avatar: "MF",
    category: "Digital Creator",
    stars: 5,
    quote:
  "Prima impiegavo 4 ore per renderizzare una scena complessa. Con Vora lo stesso job gira in meno di 40 minuti. È letteralmente un cambio di vita per chi lavora da solo.",
    highlight: "Da 4 ore a 40 minuti",
  },
  {
    name: "Sofia Ricci",
    role: "Videomaker · YouTube & Brand",
    avatar: "SR",
    category: "Digital Creator",
    stars: 5,
    quote:
  "Ho provato soluzioni cloud costose e configurazioni DIY impossibili. Vora è la prima cosa che funziona davvero senza un manuale di 200 pagine. E costa una frazione.",
    highlight: "Setup in 5 minuti",
  },
  {
    name: "Luca Marchetti",
    role: "CTO · Pixel Storm Studio",
    avatar: "LM",
    category: "Small Studio",
    stars: 5,
    quote:
  "Il nostro studio ha 8 workstation. Prima la metà erano in standby di notte. Ora Vora le usa per smaltire la coda di rendering del giorno dopo. Abbiamo dimezzato i tempi di consegna.",
    highlight: "Coda azzerata ogni mattina",
  },
  {
    name: "Chiara Bianchi",
    role: "Art Director · Nova VFX",
    avatar: "CB",
    category: "Small Studio",
    stars: 5,
    quote:
  "Stavamo per comprare una render farm da €40k. Il nostro investitore ci ha suggerito Vora. Abbiamo risparmiato quei soldi e ora usiamo il budget per assumere talenti.",
    highlight: "€40k risparmiati",
  },
  {
    name: "Andrea Conti",
    role: "3D Artist · Generative AI",
    avatar: "AC",
    category: "Digital Creator",
    stars: 5,
    quote:
  "Genero centinaia di immagini ad alta risoluzione al giorno per i miei clienti. Vora gestisce tutto il batch processing in background mentre io lavoro su altri progetti.",
    highlight: "100+ job/giorno automatizzati",
  },
  {
    name: "Giulia Esposito",
    role: "Founder · Lunara Studio",
    avatar: "GE",
    category: "Small Studio",
    stars: 5,
    quote:
  "La fattura cloud del mese scorso era €1.200. Con Vora che distribuisce il carico sulle nostre macchine interne, questo mese abbiamo speso €180. I numeri parlano da soli.",
    highlight: "Da €1.200 a €180/mese",
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-current" style={{ color: "#F4F482" }} />
      ))}
    </div>
  );
}

function CategoryBadge({ label }) {
  const isCreator = label === "Digital Creator";
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap"
      style={
        isCreator
          ? { backgroundColor: "rgba(244,244,130,0.12)", color: "#F4F482" }
          : { backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }
      }
    >
      {label}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ backgroundColor: "#0c1d4d" }}
    >
      {/* Subtle top/bottom gradient borders for depth */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,244,130,0.15), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(244,244,130,0.08), transparent)" }} />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(244,244,130,0.04), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(244,244,130,0.45)" }}>
            Social Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight font-space-grotesk leading-tight">
            Chi lavora con Vora
            <br />
            <span style={{ color: "#F4F482" }}>non torna indietro.</span>
          </h2>
          <p className="mt-5 text-white/40 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Creator indipendenti e studi professionali condividono i risultati
            reali ottenuti con la piattaforma.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="flex flex-col gap-5 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
              style={{
                background: "linear-gradient(135deg, rgba(244,244,130,0.04), rgba(255,255,255,0.025))",
                border: "1px solid rgba(244,244,130,0.08)",
              }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black font-space-grotesk"
                    style={{ backgroundColor: "rgba(244,244,130,0.10)", color: "#F4F482" }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm leading-tight">{r.name}</p>
                    <p className="text-white/30 text-xs mt-0.5">{r.role}</p>
                  </div>
                </div>
                <CategoryBadge label={r.category} />
              </div>

              {/* Stars */}
              <Stars count={r.stars} />

              {/* Quote */}
              <blockquote className="text-white/55 text-sm leading-relaxed flex-1">
                "{r.quote}"
              </blockquote>

              {/* Highlight pill */}
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ backgroundColor: "rgba(244,244,130,0.08)", color: "#F4F482", border: "1px solid rgba(244,244,130,0.15)" }}
              >
                ✦ {r.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom aggregate rating */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
          <div>
            <span className="text-5xl font-black font-space-grotesk" style={{ color: "#F4F482" }}>4.9</span>
            <span className="text-white/25 text-lg ml-1">/5</span>
          </div>
          <div className="w-px h-12 hidden sm:block" style={{ backgroundColor: "rgba(244,244,130,0.12)" }} />
          <div>
            <Stars count={5} />
            <p className="text-white/30 text-sm mt-1.5">Basato su oltre 1.200 recensioni verificate</p>
          </div>
          <div className="w-px h-12 hidden sm:block" style={{ backgroundColor: "rgba(244,244,130,0.12)" }} />
          <div className="flex flex-col gap-1">
            <span className="text-white/45 text-sm font-medium">Disponibile su</span>
            <div className="flex gap-3 text-white/25 text-xs font-semibold">
              <span className="hover:text-white/50 cursor-pointer transition-colors">Product Hunt</span>
              <span>·</span>
              <span className="hover:text-white/50 cursor-pointer transition-colors">G2</span>
              <span>·</span>
              <span className="hover:text-white/50 cursor-pointer transition-colors">Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
