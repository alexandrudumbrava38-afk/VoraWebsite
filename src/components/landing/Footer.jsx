import { Zap } from "lucide-react";

const LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
  Developers: ["Documentation", "API Reference", "CLI", "Integrations", "Open Source"],
  Company: ["About", "Blog", "Careers", "Press", "Legal"],
  Support: ["Help Center", "Community", "Contact", "Security", "SLA"],
};

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ backgroundColor: "#091540", borderColor: "rgba(245,240,246,0.06)" }}
    >
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#F4F482" }}
              >
                <Zap className="w-4 h-4" style={{ color: "#091540" }} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl text-white font-space-grotesk">Vora</span>
            </div>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Cloud infrastructure for the modern web. Deploy globally in seconds.
            </p>
            {/* Status pill */}
            <div
              className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/35 text-xs">All systems operational</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white/70 font-semibold text-sm mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/30 hover:text-white/65 text-sm transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-white/25 text-sm">
            © 2026 Vora, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/25 hover:text-white/55 text-sm transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}