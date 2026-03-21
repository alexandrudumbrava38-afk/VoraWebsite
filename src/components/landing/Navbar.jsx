import { useState, useEffect } from "react";
import { Menu, X, Zap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const NAV_LINKS = ["Products", "Pricing", "Docs"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: "#F4F482" }}
          >
            <Zap className="w-4 h-4" style={{ color: "#091540" }} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-white font-space-grotesk tracking-tight">
            Vora
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* AI Assistant pill */}
          <a
            href="#"
            className="flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105 border"
            style={{
              borderColor: "rgba(244,244,130,0.35)",
              color: "#F4F482",
              background: "rgba(244,244,130,0.07)",
            }}
          >
            <Sparkles size={13} strokeWidth={2} />
            AI Assistant
          </a>
          <div className="w-px h-5 bg-white/10" />
          <Link to="/login" className="text-white/55 hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 border border-white/12">
            Accedi
          </Link>
          <Link
            to="/registrazione"
            className="font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#F4F482", color: "#091540" }}
          >
            Registrati
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy/98 backdrop-blur-xl border-b border-white/10 px-6 py-5">
          <div className="space-y-1 mb-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-white/60 hover:text-white text-sm font-medium py-3 border-b border-white/5 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-1">
            <a
              href="#"
              className="flex items-center justify-center gap-1.5 font-semibold text-sm px-5 py-3 rounded-full border text-center transition-all"
              style={{ borderColor: "rgba(244,244,130,0.35)", color: "#F4F482", background: "rgba(244,244,130,0.07)" }}
            >
              <Sparkles size={13} strokeWidth={2} />
              AI Assistant
            </a>
            <Link
              to="/login"
              className="block font-semibold text-sm px-5 py-3 rounded-full text-center border border-white/15 text-white/70 transition-all hover:bg-white/5"
            >
              Accedi
            </Link>
            <Link
              to="/registrazione"
              className="block font-semibold text-sm px-5 py-3 rounded-full text-center transition-all"
              style={{ backgroundColor: "#F4F482", color: "#091540" }}
            >
              Registrati
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}