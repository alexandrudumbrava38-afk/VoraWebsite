import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, ArrowRight } from "lucide-react";
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const field = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError("");

    if (!form.email.includes("@")) {
      setError("Email non valida");
      return;
    }
    if (form.password.length < 6) {
      setError("Password troppo corta");
      return;
    }

    setLoading(true);
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setError(authError.message || "Errore di autenticazione");
        setLoading(false);
        return;
      }

      // Success
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError("Errore di connessione");
      setLoading(false);
    }
  };

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
          Non hai un account?{" "}
          <Link to="/registrazione" className="font-semibold underline underline-offset-2" style={{ color: "#091540" }}>
            Registrati
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
                Accedi
              </h1>
              <p className="mt-2 text-sm" style={{ color: "rgba(9,21,64,0.45)" }}>
                Inserisci le tue credenziali per accedere alla dashboard.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 text-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                    border: "1.5px solid rgba(9,21,64,0.1)",
                    color: "#091540",
                  }}
                />
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
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => field("password", e.target.value)}
                    placeholder="La tua password"
                    className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all duration-150"
                    style={{
                      backgroundColor: "#F5F0F6",
                      border: "1.5px solid rgba(9,21,64,0.1)",
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
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#091540", color: "#F4F482" }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Accesso in corso…
                  </>
                ) : (
                  <>
                    Accedi <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "rgba(9,21,64,0.3)" }}>
            Benvenuto nella rete Vora · Proteggiamo le tue credenziali
          </p>
        </div>
      </main>
    </div>
  );
}
