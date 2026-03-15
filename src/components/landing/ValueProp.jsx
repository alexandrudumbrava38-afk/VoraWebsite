import { PiggyBank, Trash2, Zap, Sliders } from "lucide-react";

const PROPS = [
  {
    icon: PiggyBank,
    title: "Risparmia fino al 70% sui costi",
    description:
  "Smetti di pagare per risorse che non usi. Vora analizza il tuo carico di lavoro e riduce automaticamente i costi di cloud e rendering.",
    tag: "Risparmio economico",
    accent: true,
  },
  {
    icon: Trash2,
    title: "Zero spreco di risorse",
    description:
  "Le CPU e le GPU del tuo team rimangono inattive per ore. Vora le raccoglie, le coordina e le trasforma in potenza utile — nulla va sprecato. Guadagna $VORA Token condividendo la tua potenza.",
    tag: "Efficienza hardware",
    accent: false,
  },
  {
    icon: Zap,
    title: "Rendering istantaneo",
    description:
      "Job distribuiti su decine di macchine in parallelo. Ciò che prima richiedeva ore, ora si completa in minuti — senza configurazioni complesse.",
    tag: "Velocità 3×",
    accent: false,
  },
  {
    icon: Sliders,
    title: "Controllo totale, zero DevOps",
    description:
      "Dashboard intuitiva per monitorare job, nodi e costi in tempo reale. Nessun server da gestire, nessun esperto da assumere.",
    tag: "Semplicità",
    accent: false,
  },
];

export default function ValueProp() {
  return (
    <section className="py-24 md:py-32 relative" style={{ backgroundColor: "#F5F0F6" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#091540", opacity: 0.35 }}
          >
            Perché Vora?
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight font-space-grotesk leading-tight"
            style={{ color: "#091540" }}
          >
            Il tuo hardware vale di più.
            <br />
            <span style={{ color: "#091540", opacity: 0.45 }}>Smetti di sprecarlo.</span>
          </h2>
          <p
            className="mt-5 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#091540", opacity: 0.5 }}
          >
            Vora è la piattaforma di compute distribuito pensata per creator, studi
            e team che vogliono massimizzare le risorse senza aumentare la spesa.
          </p>
        </div>

        {/* Grid: 1 large accent card + 3 standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROPS.map((prop, i) => {
            const Icon = prop.icon;
            const isAccent = i === 0;
            return (
              <div
                key={prop.title}
                className={`relative rounded-3xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1.5 ${
                  isAccent ? "lg:col-span-1" : ""
                }`}
                style={
                  isAccent
                    ? {
                        backgroundColor: "#091540",
                        boxShadow: "0 20px 50px rgba(9,21,64,0.18)",
                      }
                    : {
                        backgroundColor: "#fff",
                        border: "1px solid rgba(9,21,64,0.06)",
                        boxShadow: "0 2px 16px rgba(9,21,64,0.04)",
                      }
                }
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={
                    isAccent
                      ? { backgroundColor: "rgba(244,244,130,0.12)", border: "1px solid rgba(244,244,130,0.2)" }
                      : { backgroundColor: "#F4F482" }
                  }
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isAccent ? "#F4F482" : "#091540" }}
                    strokeWidth={2}
                  />
                </div>

                {/* Tag */}
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: isAccent ? "rgba(244,244,130,0.5)" : "rgba(9,21,64,0.3)" }}
                >
                  {prop.tag}
                </span>

                {/* Title */}
                <h3
                  className="text-lg font-bold leading-snug font-space-grotesk"
                  style={{ color: isAccent ? "#fff" : "#091540" }}
                >
                  {prop.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: isAccent ? "rgba(255,255,255,0.5)" : "rgba(9,21,64,0.5)" }}
                >
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
