import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { supabase } from "../lib/supabase";

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

      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Errore di connessione");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) setError(error.message);
  };

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#091540" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,240,246,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,240,246,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Back to home */}
      <header className="relative z-10 px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 hover:text-white/60"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ChevronLeft size={16} />
          Back to home
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md">
          {/* Avatar */}
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "#F4F482" }}
            >
              <Zap className="w-6 h-6" style={{ color: "#091540" }} strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white font-space-grotesk tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Sign in to your Vora account
            </p>
          </div>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold transition-all duration-150 hover:brightness-110 mb-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
              Or continue with email
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.08)" }} />
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 p-3 text-sm rounded-xl"
              style={{
                backgroundColor: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
              }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => field("email", e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-150 placeholder:text-white/20 focus:ring-2 focus:ring-[#F4F482]/30"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold transition-colors hover:brightness-125"
                  style={{ color: "#F4F482" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => field("password", e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl px-4 py-3 pr-12 text-sm outline-none transition-all duration-150 placeholder:text-white/20 focus:ring-2 focus:ring-[#F4F482]/30"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#F4F482", color: "#091540" }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm mt-6" style={{ color: "rgba(255,255,255,0.4)" }}>
            Don't have an account?{" "}
            <Link
              to="/registrazione"
              className="font-semibold transition-colors hover:brightness-125"
              style={{ color: "#F4F482" }}
            >
              Sign up
            </Link>
          </p>

          {/* Legal */}
          <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:brightness-150" style={{ color: "rgba(255,255,255,0.35)" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:brightness-150" style={{ color: "rgba(255,255,255,0.35)" }}>
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
