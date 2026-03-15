import { Check, Zap } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "For side projects and personal apps. No credit card needed.",
    features: [
      "3 projects",
      "100 GB bandwidth / month",
      "Auto-scaling (up to 3 replicas)",
      "Shared edge network",
      "Community support",
      "1 team member",
    ],
    cta: "Start building",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For teams that need more power, speed, and collaboration.",
    features: [
      "Unlimited projects",
      "1 TB bandwidth / month",
      "Auto-scaling (unlimited replicas)",
      "Global edge network (150+ PoPs)",
      "Custom domains & SSL",
      "Advanced analytics",
      "Priority support (< 4h)",
      "Up to 10 team members",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with strict security and compliance needs.",
    features: [
      "Everything in Pro",
      "99.99% uptime SLA",
      "Dedicated support engineer",
      "SSO / SAML authentication",
      "Custom contracts & invoicing",
      "Isolated infrastructure",
      "Full audit logs",
      "Unlimited team members",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: "#F5F0F6" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#091540", opacity: 0.35 }}
          >
            Pricing
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight font-space-grotesk"
            style={{ color: "#091540" }}
          >
            Simple, transparent pricing.
          </h2>
          <p
            className="mt-4 text-base md:text-lg max-w-md mx-auto"
            style={{ color: "#091540", opacity: 0.5 }}
          >
            Start free. Scale as you grow. No surprise bills.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1"
              style={
                plan.highlighted
                  ? {
                      backgroundColor: "#091540",
                      border: "1.5px solid #F4F482",
                      boxShadow: "0 25px 60px rgba(9,21,64,0.3), 0 0 40px rgba(244,244,130,0.1)",
                    }
                  : {
                      backgroundColor: "white",
                      border: "1px solid rgba(9,21,64,0.07)",
                    }
              }
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: "#F4F482", color: "#091540" }}
                >
                  <Zap size={11} strokeWidth={2.5} /> Most Popular
                </div>
              )}

              {/* Plan name & price */}
              <div className="mb-6">
                <h3
                  className="text-base font-semibold mb-3 font-space-grotesk"
                  style={plan.highlighted ? { color: "rgba(245,240,246,0.6)" } : { color: "#091540", opacity: 0.5 }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span
                    className="text-4xl font-black font-space-grotesk"
                    style={plan.highlighted ? { color: "#F4F482" } : { color: "#091540" }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className="text-sm"
                      style={plan.highlighted ? { color: "rgba(244,244,130,0.5)" } : { color: "#091540", opacity: 0.35 }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={plan.highlighted ? { color: "rgba(255,255,255,0.5)" } : { color: "#091540", opacity: 0.5 }}
                >
                  {plan.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className="block w-full text-center font-semibold py-3 rounded-full text-sm transition-all duration-200 hover:scale-105 active:scale-95 mb-8"
                style={
                  plan.highlighted
                    ? { backgroundColor: "#F4F482", color: "#091540" }
                    : { border: "1.5px solid rgba(9,21,64,0.2)", color: "#091540" }
                }
              >
                {plan.cta}
              </a>

              {/* Divider */}
              <div
                className="mb-6"
                style={{
                  borderTop: plan.highlighted
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid rgba(9,21,64,0.07)",
                }}
              />

              {/* Feature list */}
              <ul className="space-y-3">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                      style={
                        plan.highlighted
                          ? { background: "rgba(244,244,130,0.15)" }
                          : { background: "rgba(34,197,94,0.12)" }
                      }
                    >
                      <Check
                        size={10}
                        strokeWidth={3}
                        style={plan.highlighted ? { color: "#F4F482" } : { color: "#16a34a" }}
                      />
                    </div>
                    <span
                      className="text-sm"
                      style={
                        plan.highlighted
                          ? { color: "rgba(255,255,255,0.75)" }
                          : { color: "#091540", opacity: 0.65 }
                      }
                    >
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}