import { GitBranch, Zap, Globe, Activity, Shield, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: GitBranch,
    title: "Instant Deploys",
    description:
      "Push to your repo and get a live URL in seconds. Git-native workflows with preview environments for every pull request.",
  },
  {
    icon: Zap,
    title: "Auto-scaling",
    description:
      "Scales from zero to millions without configuration. Pay only for what you use, billed down to the millisecond.",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description:
      "Deploy to 150+ Points of Presence worldwide. Sub-50ms latency delivered anywhere on the planet.",
  },
  {
    icon: Activity,
    title: "Full Observability",
    description:
      "Logs, metrics, distributed traces, and intelligent alerts — unified in a single, beautiful dashboard.",
  },
  {
    icon: Shield,
    title: "Zero-trust Security",
    description:
      "DDoS protection, WAF, mTLS mutual authentication, and SOC 2 Type II compliance — all out of the box.",
  },
  {
    icon: Layers,
    title: "Edge Functions",
    description:
      "Run serverless compute at the network edge with near-instant cold starts and global distribution.",
  },
];

export default function Features() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F0F6" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#091540", opacity: 0.35 }}
          >
            Platform
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight font-space-grotesk"
            style={{ color: "#091540" }}
          >
            Everything you need to ship.
          </h2>
          <p
            className="mt-5 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "#091540", opacity: 0.5 }}
          >
            Stop thinking about infrastructure. Vora coordinates compute resources so
            your team stays focused on what matters — building great products.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white rounded-3xl p-8 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/8 transition-all duration-300"
                style={{ border: "1px solid rgba(9,21,64,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: "#F4F482" }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: "#091540" }}
                    strokeWidth={2}
                  />
                </div>
                <h3
                  className="text-lg font-bold mb-3 font-space-grotesk"
                  style={{ color: "#091540" }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#091540", opacity: 0.5 }}
                >
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}