import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#F4F482" }}>
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(9,21,64,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(9,21,64,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-space-grotesk leading-tight"
          style={{ color: "#091540" }}
        >
          Your infrastructure,
          <br />
          running at full speed.
        </h2>
        <p
          className="mt-6 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: "#091540", opacity: 0.6 }}
        >
          Join thousands of engineering teams already deploying on Vora.
          Start free — no credit card required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-base px-8 py-4 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#091540", color: "#F4F482" }}
          >
            Get started for free <ArrowRight size={18} />
          </a>
          <a
            href="#"
            className="font-semibold text-base transition-colors hover:opacity-80"
            style={{ color: "#091540", opacity: 0.55 }}
          >
            Talk to our team →
          </a>
        </div>

        {/* Micro trust signals */}
        <div
          className="mt-10 flex flex-wrap justify-center items-center gap-6 text-sm font-medium"
          style={{ color: "#091540", opacity: 0.45 }}
        >
          {["No credit card required", "Free plan forever", "Deploy in 60 seconds"].map((text) => (
            <span key={text} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#091540", opacity: 0.4 }} />
              {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}