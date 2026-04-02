import { useState, useEffect, useRef } from "react";
import { Menu, X, Zap, Sparkles, ChevronDown, Sparkle, TrendingUp, BarChart3, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const SOLUTIONS_ITEMS = [
  {
    icon: Sparkle,
    title: "For Creators",
    desc: "Upload, render, and export your 3D projects faster than ever.",
    to: "/start-render",
  },
  {
    icon: TrendingUp,
    title: "For Providers",
    desc: "Monetize your idle GPU power. Earn passive income securely.",
    to: "/share-pc",
  },
];

const COMPANY_ITEMS = [
  {
    icon: BarChart3,
    title: "About Us",
    desc: "Our mission to reduce hardware waste and energy consumption.",
    to: "/about",
  },
  {
    icon: TrendingUp,
    title: "Investors",
    desc: "Key metrics, vision, and seed round information.",
    to: "/investors",
  },
  {
    icon: FileText,
    title: "Blog & Docs",
    desc: "Technical guides and company updates.",
    to: "/blog",
  },
];

/* Rich card dropdown (used by Solutions) */
function SolutionsDropdown() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        className={`text-sm font-medium transition-all duration-150 flex items-center gap-1 px-4 py-1.5 rounded-full ${open ? 'bg-blue-600 text-white' : 'text-white/55 hover:text-white'}`}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Solutions
        <ChevronDown size={14} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute left-0 mt-0 pt-2 w-80 z-50 transition-all duration-150 transform origin-top ${open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}
      >
        <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-4 space-y-2">
          {SOLUTIONS_ITEMS.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg p-4 hover:bg-slate-800/70 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: 'rgba(244,244,130,0.12)' }}
              >
                <item.icon size={20} style={{ color: '#F4F482' }} strokeWidth={1.8} />
              </div>
              <div className="font-semibold text-sm text-white mb-1">{item.title}</div>
              <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Rich card dropdown for Company */
function CompanyDropdown() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        className={`text-sm font-medium transition-all duration-150 flex items-center gap-1 px-4 py-1.5 rounded-full ${open ? 'bg-blue-600 text-white' : 'text-white/55 hover:text-white'}`}
        onClick={() => setOpen((s) => !s)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Company
        <ChevronDown size={14} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`absolute right-0 mt-0 pt-2 w-80 z-50 transition-all duration-150 transform origin-top ${open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-2'}`}
      >
        <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-4 space-y-2">
          {COMPANY_ITEMS.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg p-4 hover:bg-slate-800/70 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: 'rgba(244,244,130,0.12)' }}
              >
                <item.icon size={20} style={{ color: '#F4F482' }} strokeWidth={1.8} />
              </div>
              <div className="font-semibold text-sm text-white mb-1">{item.title}</div>
              <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
            style={{ backgroundColor: "#F4F482" }}
          >
            <Zap className="w-4 h-4" style={{ color: "#091540" }} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-xl text-white font-space-grotesk tracking-tight">
            Vora
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <SolutionsDropdown />
          <Link to="/pricing" className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-150">
            Pricing
          </Link>
          <Link to="/showcase" className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-150">
            Showcase
          </Link>
          <CompanyDropdown />
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
            {/* Solutions */}
            <div className="py-2 border-b border-white/5">
              <div className="text-white/60 text-sm font-medium mb-1">Solutions</div>
              <div className="pl-2">
                {SOLUTIONS_ITEMS.map((item) => (
                  <Link key={item.title} to={item.to} onClick={() => setMenuOpen(false)} className="block text-white/50 hover:text-white text-sm py-2">{item.title}</Link>
                ))}
              </div>
            </div>
            <Link to="/pricing" onClick={() => setMenuOpen(false)} className="block text-white/60 hover:text-white text-sm font-medium py-3 border-b border-white/5 transition-colors">Pricing</Link>
            <Link to="/showcase" onClick={() => setMenuOpen(false)} className="block text-white/60 hover:text-white text-sm font-medium py-3 border-b border-white/5 transition-colors">Showcase</Link>
            {/* Company */}
            <div className="py-2">
              <div className="text-white/60 text-sm font-medium mb-1">Company</div>
              <div className="pl-2">
                {COMPANY_ITEMS.map((item) => (
                  <Link key={item.title} to={item.to} onClick={() => setMenuOpen(false)} className="block text-white/50 hover:text-white text-sm py-2">{item.title}</Link>
                ))}
              </div>
            </div>
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