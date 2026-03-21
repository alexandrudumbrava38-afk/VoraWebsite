import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, Cpu, Wand2, ArrowRight, Check } from "lucide-react";
import { supabase } from '../lib/supabase'; // <-- INIETTATO SUPABASE

const ACCOUNT_TYPES = [
  {
    id: "fornitore",
    label: "Fornitore di Potenza",
    icon: Cpu,
    description: "Metti il tuo hardware al lavoro e guadagna crediti.",
  },
  {
    id: "richiedente",
    label: "Richiedente",
    icon: Wand2,
    description: "Affitta potenza di calcolo per rendering e training IA.",
  },
];

export default function Registrazione() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("fornitore");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", nome: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Il nome è obbligatorio";
    if (!form.email.includes("@")) e.email = "Email non valida";
    if (form.password.length < 6) e.password = "Almeno 6 caratteri per Supabase";
    return e;
  };

  // --- ECCO LA VERA LOGICA INIETTATA ---
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    
    setLoading(true);

    try {
      // 1. Crea l'utente in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.nome, // Salviamo anche il nome nel profilo nascosto di Supabase
          }
        }
      });

      if (authError) {
        setErrors({ form: authError.message });
        setLoading(false);
        return;
      }

      // 2. Crea il profilo pubblico nella nostra tabella
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              role: accountType, // Usa fornitore o richiedente
              vora_balance: 0
            }
          ]);

        if (profileError) {
          console.error("Errore profilo:", profileError);
          setErrors({ form: "Account creato ma errore nel salvataggio profilo." });
          setLoading(false);
          return;
        }

        // 3. Tutto andato a buon fine, naviga alla pagina successiva!
        setLoading(false);
        navigate("/tutorial-wallet"); 
      }
    } catch (err) {
      setErrors({ form: "Errore di connessione." });
      setLoading(false);
    }
  };
  // ------------------------------------

  const field = (name, value) =>
    setForm((p) => ({ ...p, [name]: value }));

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F0F6" }}
    >
      <header className="flex items-center justify-between px-8 py-5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ backgroundColor: "#091540" }}
          >
            <Zap className="w-4 h-4" style={{ color: "#F4F482" }} strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg font-space-grotesk" style={{ color: "#091540" }}>
            Vora
          </span>
        </Link>
        <p className="text-sm" style={{ color: "rgba(9,21,64,0.4)" }}>
          Hai già un account?{" "}
          <Link to="/login" className="font-semibold underline underline-offset-2" style={{ color: "#091540" }}>
            Accedi
          </Link>
        </p>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(9,21,64,0.07)",
              boxShadow: "0 16px 48px rgba(9,21,64,0.08)",
            }}
          >
            <div className="mb-8">
              <h1
                className="text-3xl font-black tracking-tight font-space-grotesk leading-tight"
                style={{ color: "#091540" }}
              >
                Crea il tuo account
              </h1>
              <p className="mt-2 text-sm" style={{ color: "rgba(9,21,64,0.45)" }}>
                Unisciti alla rete di calcolo distribuito più veloce d'Europa.
              </p>
            </div>

            {/* Mostriamo eventuali errori generali (es. email già usata) */}
            {errors.form && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-widest mb-3"
                  style={{ color: "rgba(9,21,64,0.4)" }}
                >
                  Tipo di account
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {ACCOUNT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const active = accountType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setAccountType(type.id)}
                        className="relative flex flex-col gap-2 p-4 rounded-2xl text-left transition-all duration-200 hover:scale-[1.02]"
                        style={
                          active
                            ? {
                                backgroundColor: "#091540",
                                boxShadow: "0 8px 24px rgba(9,21,64,0.2)",
                              }
                            : {
                                backgroundColor: "#F5F0F6",
                                border: "1px solid rgba(9,21,64,0.08)",
                              }
                        }
                      >
                        {active && (
                          <span
                            className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#F4F482" }}
                          >
                            <Check size={11} style={{ color: "#091540" }} strokeWidth={3} />
                          </span>
                        )}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center"
                          style={
                            active
                              ? { backgroundColor: "rgba(244,244,130,0.12)" }
                              : { backgroundColor: "#fff" }
                          }
                        >
                          <Icon
                            size={18}
                            style={{ color: active ? "#F4F482" : "#091540" }}
                            strokeWidth={2}
                          />
                        </div>
                        <div>
                          <p
                            className="text-sm font-bold font-space-grotesk leading-tight"
                            style={{ color: active ? "#fff" : "#091540" }}
                          >
                            {type.label}
                          </p>
                          <p
                            className="text-xs mt-0.5 leading-snug"
                            style={{ color: active ? "rgba(255,255,255,0.45)" : "rgba(9,21,64,0.45)" }}
                          >
                            {type.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="nome"
                  className="block text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "rgba(9,21,64,0.4)" }}
                >
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  value={form.nome}
                  onChange={(e) => field("nome", e.target.value)}
                  placeholder="Mario Rossi"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150"
                  style={{
                    backgroundColor: "#F5F0F6",
                    border: errors.nome
                      ? "1.5px solid #ef4444"
                      : "1.5px solid rgba(9,21,64,0.1)",
                    color: "#091540",
                  }}
                />
                {errors.nome && (
                  <p className="text-xs text-red-500 mt-1">{errors.nome}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "rgba(9,21,64,0.4)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => field("email", e.target.value)}
                  placeholder="mario@esempio.it"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150"
                  style={{
                    backgroundColor: "#F5F0F6",
                    border: errors.email
                      ? "1.5px solid #ef4444"
                      : "1.5px solid rgba(9,21,64,0.1)",
                    color: "#091540",
                  }}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-bold uppercase tracking-widest mb-1.5"
                  style={{ color: "rgba(9,21,64,0.4)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={(e) => field("password", e.target.value)}
                    placeholder="Almeno 6 caratteri"
                    className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all duration-150"
                    style={{
                      backgroundColor: "#F5F0F6",
                      border: errors.password
                        ? "1.5px solid #ef4444"
                        : "1.5px solid rgba(9,21,64,0.1)",
                      color: "#091540",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                    style={{ color: "rgba(9,21,64,0.35)" }}
                    tabIndex={-1}
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                )}
                {form.password.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            form.password.length >= i * 2 + 4
                              ? i <= 2
                                ? "#f97316"
                                : "#22c55e"
                              : "rgba(9,21,64,0.1)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs" style={{ color: "rgba(9,21,64,0.4)" }}>
                Registrandoti accetti i nostri{" "}
                <a href="#" className="underline underline-offset-2 font-medium" style={{ color: "#091540" }}>
                  Termini di Servizio
                </a>{" "}
                e la{" "}
                <a href="#" className="underline underline-offset-2 font-medium" style={{ color: "#091540" }}>
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#091540", color: "#F4F482" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Creazione in corso…
                  </>
                ) : (
                  <>
                    Crea account <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "rgba(9,21,64,0.3)" }}>
            Oltre 12.000 utenti già sulla rete · Nessuna carta di credito richiesta
          </p>
        </div>
      </main>
    </div>
  );
}
