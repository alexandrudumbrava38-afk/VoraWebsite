import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../lib/supabase';
import {
  Zap, LayoutDashboard, Cpu, Wallet, Sparkles, Settings,
  Menu, Send, Bot, TrendingUp, Activity, Server, ChevronRight, LogOut,
  RefreshCw, Power,
} from "lucide-react";
import RichiedenteView from "../components/RichiedenteView";
import HardwareStats from "../components/HardwareStats";
import WalletView from "../components/WalletView";
import AIHelp from "../components/AIHelp";
import SettingsView from "../components/SettingsView";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

/* ─── Mock data ──────────────────────────────────────────── */
const generateWave = () =>
  Array.from({ length: 20 }, (_, i) => ({
    t: i,
    load: Math.round(30 + Math.random() * 55),
  }));

const POWER_DATA = [
  { day: "Lun", tf: 2.1 },
  { day: "Mar", tf: 3.4 },
  { day: "Mer", tf: 2.8 },
  { day: "Gio", tf: 4.2 },
  { day: "Ven", tf: 3.9 },
  { day: "Sab", tf: 5.1 },
  { day: "Dom", tf: 4.6 },
];

const EXPERT_PROMPTS = [
  "Come configuro il sandboxing del nodo?",
  "Perché il mio nodo va offline?",
  "Come aumentare i TFLOPS disponibili?",
  "Il wallet non si sincronizza, aiuto!",
];

const BOT_ANSWERS = {
  "come configuro il sandboxing del nodo?":
  "Il sandboxing Vora usa un layer di isolamento basato su container. Vai in **Settings → Nodo → Sandbox** e abilita la modalità 'Strict'. Ogni job girerà in un ambiente isolato con accesso limitato al filesystem.",
  "perché il mio nodo va offline?":
  "Le cause più comuni sono: (1) la tua connessione ha perso il keep-alive, (2) il firewall blocca la porta 3847. Prova a riaprire il client Vora e verifica che la porta sia aperta nel pannello del router.",
  "come aumentare i tflops disponibili?":
    "Puoi aumentare i TFLOPS andando in **Settings → Risorse** e alzando la percentuale di GPU condivisa. Assicurati di avere driver CUDA 12+ o ROCm 5+ installati per sfruttare l'accelerazione hardware.",
  "il wallet non si sincronizza, aiuto!":
  "Prova queste soluzioni: (1) Verifica la connessione internet, (2) Riavvia il client Vora, (3) Se il problema persiste, vai in **Wallet → Forza sincronizzazione**. Se hai perso la chiave privata, purtroppo non è recuperabile.",
};

/* ─── Sidebar items ─────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "hardware", label: "Hardware Stats", icon: Cpu },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "help", label: "AI Help", icon: Sparkles },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ─── Helper Iniziali ───────────────────────────────────── */
const getInitials = (name) => {
  if (!name) return "VN";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

/* ─── Custom Tooltip ────────────────────────────────────── */
function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded-xl text-xs font-semibold"
      style={{ backgroundColor: "#091540", color: "#F4F482", border: "1px solid rgba(244,244,130,0.2)" }}
    >
      {payload[0].value}
      {payload[0].name === "load" ? "%" : " TFLOPS"}
    </div>
  );
}

/* ─── Node Card ─────────────────────────────────────────── */
function NodeCard({ online, onToggle }) {
  const [wave, setWave] = useState(generateWave);

  useEffect(() => {
    if (!online) return;
    const id = setInterval(() => {
      setWave((prev) => [...prev.slice(1), { t: prev.at(-1).t + 1, load: Math.round(30 + Math.random() * 55) }]);
    }, 1500);
    return () => clearInterval(id);
  }, [online]);

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{ backgroundColor: "#0c1a4a", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Stato Nodo</p>
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${online ? "bg-green-400" : "bg-red-400"} ${online ? "animate-pulse" : ""}`}
            />
            <span className="text-white font-black text-xl font-space-grotesk">
              {online ? "Online" : "Offline"}
            </span>
          </div>
          <p className="text-white/30 text-xs mt-1">
            {online ? "Connesso alla rete Vora · 3 job attivi" : "Nodo disconnesso · 0 job attivi"}
          </p>
        </div>
        <button
          onClick={onToggle}
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
          style={
            online
              ? { backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)" }
              : { backgroundColor: "rgba(34,197,94,0.1)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }
          }
        >
          <Power size={12} strokeWidth={2.5} />
          {online ? "Spegni" : "Avvia"}
        </button>
      </div>

      {/* Wave chart */}
      <div className="h-24 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={wave} margin={{ top: 4, right: 4, left: -30, bottom: 0 }}>
            <defs>
              <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={online ? "#4ade80" : "#6b7280"} stopOpacity={0.3} />
                <stop offset="95%" stopColor={online ? "#4ade80" : "#6b7280"} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="load"
              stroke={online ? "#4ade80" : "#6b7280"}
              strokeWidth={2}
              fill="url(#waveGrad)"
              dot={false}
              isAnimationActive={false}
            />
            <XAxis dataKey="t" hide />
            <YAxis domain={[0, 100]} hide />
            <Tooltip content={<CustomTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 text-xs">
        {[
          { label: "CPU", val: online ? "68%" : "—" },
          { label: "RAM", val: online ? "12.4 GB" : "—" },
          { label: "GPU", val: online ? "84%" : "—" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-white/30">{s.label}</p>
            <p className="text-white font-bold font-space-grotesk">{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tokens Card (Sincronizzata) ───────────────────────── */
function TokensCard({ balance }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (balance === 0 || !balance) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = balance / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= balance) { setCount(balance); clearInterval(id); }
      else setCount(parseFloat(start.toFixed(2)));
    }, 16);
    return () => clearInterval(id);
  }, [balance]);

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{ backgroundColor: "#F4F482" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(9,21,64,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(9,21,64,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative">
        <p className="text-navy/50 text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(9,21,64,0.5)" }}>Token Guadagnati</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black font-space-grotesk text-navy" style={{ color: "#091540" }}>
            {count.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="font-bold text-lg" style={{ color: "rgba(9,21,64,0.6)" }}>VORA</span>
        </div>
        <p className="text-xs mt-1" style={{ color: "rgba(9,21,64,0.45)" }}>≈ €{(count * 0.05).toFixed(2)} · Sincronizzato Live</p>
      </div>

      <div className="relative flex items-center justify-between">
        <div
          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{ backgroundColor: "rgba(9,21,64,0.1)", color: "#091540" }}
        >
          <TrendingUp size={12} strokeWidth={2.5} />
          Sincronizzato DB
        </div>
        <button
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: "rgba(9,21,64,0.5)" }}
        >
          Preleva <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ─── Power Card ────────────────────────────────────────── */
function PowerCard() {
  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4"
      style={{ backgroundColor: "#0c1a4a", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Potenza Fornita</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-space-grotesk text-white">4.6</span>
            <span className="font-bold text-lg" style={{ color: "#F4F482" }}>TFLOPS</span>
          </div>
          <p className="text-white/30 text-xs mt-0.5">Media settimanale · picco 5.1 TFLOPS</p>
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "rgba(244,244,130,0.1)", border: "1px solid rgba(244,244,130,0.15)" }}
        >
          <Activity className="w-5 h-5" style={{ color: "#F4F482" }} strokeWidth={2} />
        </div>
      </div>

      <div className="h-28 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={POWER_DATA} margin={{ top: 4, right: 4, left: -30, bottom: 0 }} barSize={14}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[0, 6]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(244,244,130,0.04)" }} />
            <Bar dataKey="tf" fill="#F4F482" radius={[4, 4, 0, 0]} fillOpacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-4 text-xs">
        {[
          { label: "Job completati", val: "143" },
          { label: "Uptime", val: "97.2%" },
          { label: "Guadagno/ora", val: "0.8 VORA" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-white/30">{s.label}</p>
            <p className="text-white font-bold font-space-grotesk">{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Quick Stats Row ───────────────────────────────────── */
function QuickStats() {
  const stats = [
    { label: "Sessioni totali", value: "1,204", delta: "+18 oggi", icon: Server },
    { label: "Ore online", value: "312 h", delta: "questo mese", icon: Activity },
    { label: "Posizione in rete", value: "#847", delta: "su 12.450 nodi", icon: TrendingUp },
    { label: "Prossimo pagamento", value: "€14.20", delta: "tra 3 giorni", icon: Wallet },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{ backgroundColor: "#0c1a4a", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-white/35 text-xs font-bold uppercase tracking-widest">{s.label}</p>
              <Icon size={15} className="text-white/20" />
            </div>
            <p className="text-2xl font-black font-space-grotesk text-white">{s.value}</p>
            <p className="text-white/30 text-xs">{s.delta}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Expert AI Widget ──────────────────────────────────── */
function ExpertWidget() {
  const [messages, setMessages] = useState([
    {
      id: 1, from: "bot",
  text: "Ciao! Sono l'esperto tecnico Vora. Posso aiutarti con configurazione del nodo, sandboxing, wallet e ottimizzazione delle performance. Come posso aiutarti?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text) => {
    const t = (text || input).trim();
    if (!t) return;
    setInput("");
    setMessages((p) => [...p, { id: Date.now(), from: "user", text: t }]);
    setTyping(true);
    setTimeout(() => {
      const key = t.toLowerCase();
      const reply =
        BOT_ANSWERS[key] ||
        "Capito! Per questa domanda specifica ti consiglio di aprire un ticket con il nostro supporto tecnico — di solito rispondiamo in meno di 2 ore. Puoi anche consultare la nostra documentazione in **Docs → Troubleshooting**.";
      setTyping(false);
      setMessages((p) => [...p, { id: Date.now() + 1, from: "bot", text: reply }]);
    }, 1000 + Math.random() * 700);
  };

  return (
    <div
      className="rounded-2xl flex flex-col overflow-hidden"
      style={{
        backgroundColor: "#0c1a4a",
        border: "1px solid rgba(255,255,255,0.07)",
        minHeight: "420px",
        maxHeight: "520px",
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F4F482" }}
        >
          <Sparkles size={16} style={{ color: "#091540" }} strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="text-white font-bold text-sm font-space-grotesk leading-tight">Chiedi all'esperto</p>
          <p className="text-white/30 text-xs flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
            Esperto tecnico Vora · Online
          </p>
        </div>
        <div
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ backgroundColor: "rgba(244,244,130,0.1)", color: "#F4F482", border: "1px solid rgba(244,244,130,0.15)" }}
        >
          AI
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.from === "bot" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(244,244,130,0.12)" }}
              >
                <Bot size={13} style={{ color: "#F4F482" }} />
              </div>
            )}
            <div
              className="max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
              style={
                msg.from === "bot"
                  ? {
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.8)",
                      borderBottomLeftRadius: 4,
                    }
                  : {
                      backgroundColor: "#F4F482",
                      color: "#091540",
                      fontWeight: 500,
                      borderBottomRightRadius: 4,
                    }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex items-end gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "rgba(244,244,130,0.12)" }}
            >
              <Bot size={13} style={{ color: "#F4F482" }} />
            </div>
            <div
              className="px-4 py-3 rounded-2xl flex gap-1"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderBottomLeftRadius: 4 }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {EXPERT_PROMPTS.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-xs px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{
                border: "1px solid rgba(244,244,130,0.2)",
                color: "#F4F482",
                background: "rgba(244,244,130,0.06)",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div
        className="flex items-center gap-2 px-5 py-3 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send())}
          placeholder="Chiedi un dubbio tecnico..."
          className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim()}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 disabled:opacity-30"
          style={{ backgroundColor: "#F4F482" }}
        >
          <Send size={14} style={{ color: "#091540" }} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ─── Sidebar ───────────────────────────────────────────── */
function Sidebar({ activePage, setActivePage, collapsed, setCollapsed, userProfile, onLogout }) {
  return (
    <aside
      className="flex flex-col transition-all duration-300 flex-shrink-0"
      style={{
        width: collapsed ? "68px" : "220px",
        backgroundColor: "#060f2e",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        minHeight: "100vh",
      }}
    >
      <div className="flex items-center gap-2.5 px-4 h-16 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#F4F482" }}
        >
          <Zap className="w-4 h-4" style={{ color: "#091540" }} strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg text-white font-space-grotesk tracking-tight">Vora</span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto text-white/25 hover:text-white/60 transition-colors"
        >
          <Menu size={16} />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left group"
              style={
                isActive
                  ? { backgroundColor: "rgba(244,244,130,0.1)", color: "#F4F482" }
                  : { color: "rgba(255,255,255,0.35)" }
              }
              title={collapsed ? item.label : ""}
            >
              <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} className="flex-shrink-0" />
              {!collapsed && (
                <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
              )}
              {!collapsed && isActive && (
                <ChevronRight size={14} className="ml-auto opacity-60" />
              )}
            </button>
          );
        })}
      </nav>

      <div
        className="px-3 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3 px-3 py-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black font-space-grotesk"
            style={{ backgroundColor: "rgba(244,244,130,0.15)", color: "#F4F482" }}
          >
            {getInitials(userProfile?.name)}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">{userProfile?.name || 'Caricamento...'}</p>
              <p className="text-white/30 text-xs truncate capitalize">{userProfile?.role || 'Fornitore'}</p>
            </div>
          )}
          {!collapsed && (
            <button onClick={onLogout} className="text-white/25 hover:text-red-400 transition-colors" title="Esci">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

/* ─── Main Dashboard (COLLEGATA A SUPABASE) ─────────────── */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [nodeOnline, setNodeOnline] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Stato Utente DB
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Recupero Utente
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/'); // Se non sei loggato vai via
        return;
      }

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data) {
        setUserProfile({
          name: session.user.user_metadata?.full_name || 'Miner',
          email: session.user.email,
          role: data.role,
          balance: data.vora_balance
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen bg-[#091540] text-white flex items-center justify-center">Caricamento rete Vora...</div>;

  return (
  <div className="flex min-h-screen h-screen" style={{ backgroundColor: "#091540" }}>

      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-50 md:fixed md:flex md:flex-shrink-0
          transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(id) => { setActivePage(id); setMobileSidebarOpen(false); }}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userProfile={userProfile}
          onLogout={handleLogout}
        />
      </div>

  <div className={`flex-1 flex flex-col min-w-0 ${collapsed ? 'md:pl-[68px]' : 'md:pl-[220px]'}`}>
        <header
          className="flex items-center gap-4 px-6 h-16 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#060f2e" }}
        >
          <button
            className="md:hidden text-white/40 hover:text-white transition-colors"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-white font-bold font-space-grotesk text-base leading-tight capitalize">
              {NAV_ITEMS.find((n) => n.id === activePage)?.label ?? "Overview"}
            </h1>
            <p className="text-white/25 text-xs">Vora Dashboard · {new Date().toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ backgroundColor: "rgba(244,244,130,0.08)", color: "#F4F482", border: "1px solid rgba(244,244,130,0.15)" }}
            >
              <RefreshCw size={12} strokeWidth={2.5} />
              Aggiorna
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black font-space-grotesk"
              style={{ backgroundColor: "rgba(244,244,130,0.15)", color: "#F4F482" }}
            >
              {getInitials(userProfile?.name)}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Render content based on activePage */}
          {activePage === 'overview' && (
            <div className="mb-6">
              <RichiedenteView userProfile={userProfile} />
            </div>
          )}

          {activePage === 'hardware' && (
            <div className="mb-6">
              <HardwareStats />
            </div>
          )}

          {activePage === 'wallet' && (
            <div className="mb-6">
              <WalletView balance={userProfile?.balance ?? 0} />
            </div>
          )}

          {activePage === 'help' && (
            <div className="mb-6">
              <AIHelp />
            </div>
          )}

          {activePage === 'settings' && (
            <div className="mb-6">
              <SettingsView initial={{ name: userProfile?.name, email: userProfile?.email, apiKey: '' }} />
            </div>
          )}

          {/* Default provider dashboard widgets (overview + stats) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
            <NodeCard online={nodeOnline} onToggle={() => setNodeOnline((v) => !v)} />
            <TokensCard balance={userProfile?.balance} />
            <PowerCard />
          </div>

          <div className="mb-5">
            <QuickStats />
          </div>

          <ExpertWidget />
        </main>
      </div>
    </div>
  );
}
