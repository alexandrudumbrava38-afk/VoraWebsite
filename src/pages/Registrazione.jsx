import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Zap, Eye, EyeOff, Cpu, Wand2, ChevronLeft, Check } from "lucide-react";
import { supabase } from "../lib/supabase";

const FEATURES = [
  "Access to distributed GPU rendering network",
  "Pay only for what you use with credits",
  "Support for Blender, Cinema 4D, and more",
  "24/7 priority support on Pro plans",
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
    if (!form.nome.trim()) e.nome = "Full name is required";
    if (!form.email.includes("@")) e.email = "Invalid email";
    if (form.password.length < 8) e.password = "Must be at least 8 characters";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.nome },
        },
      });

      if (authError) {
        setErrors({ form: authError.message });
        setLoading(false);
        return;
      }

      if (authData.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              role: accountType,
              vora_balance: 0,
            },
          ]);

        if (profileError) {
          console.error("Profile error:", profileError);
          setErrors({ form: "Account created but profile save failed." });
          setLoading(false);
          return;
        }

        setLoading(false);
        navigate("/tutorial-wallet");
      }
    } catch (err) {
      setErrors({ form: "Connection error." });
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/dashboard" },
    });
    if (error) setErrors({ form: error.message });
  };

  const field = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#091540" }}>
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,130,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,130,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 xl:p-16">
        <div className="relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm mb-16 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            <ChevronLeft size={16} />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-10">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#F4F482" }}
            >
              <Zap className="w-5 h-5" style={{ color: "#091540" }} strokeWidth={2.5} />
            </div>
            <span
              className="text-xl font-bold font-space-grotesk"
              style={{ color: "#fff" }}
            >
              Vora Network
            </span>
          </div>

          <h2
            className="text-4xl xl:text-5xl font-black font-space-grotesk leading-[1.1] tracking-tight mb-5"
            style={{ color: "#fff" }}
          >
            Start rendering
            <br />
            in minutes
          </h2>
          <p
            className="text-base leading-relaxed max-w-md"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Join thousands of 3D creators who use Vora Network to render their
            projects faster and more affordably.
          </p>

          <div className="mt-12 space-y-4">
            {FEATURES.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(244,244,130,0.15)" }}
                >
                  <Check size={12} style={{ color: "#F4F482" }} strokeWidth={3} />
                </div>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {f}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Trusted by 12,000+ creators worldwide
        </p>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile back link */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 text-sm mb-8 transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ChevronLeft size={16} />
            Back to home
          </Link>

          <h1
            className="text-2xl sm:text-3xl font-black font-space-grotesk tracking-tight mb-2"
            style={{ color: "#fff" }}
          >
            Create an account
          </h1>
          <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
            Get started with 100 free credits
          </p>

          {/* Google sign-up */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg text-sm font-semibold transition-all duration-150 hover:brightness-110"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Or continue with email
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(255,255,255,0.1)" }} />
          </div>

          {errors.form && (
            <div className="mb-4 p-3 rounded-lg text-sm" style={{ backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fca5a5" }}>
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Account type toggle */}
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Account type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "fornitore", label: "Provider", icon: Cpu, desc: "Share your hardware and earn credits" },
                  { id: "richiedente", label: "Creator", icon: Wand2, desc: "Rent GPU power for rendering and AI" },
                ].map((type) => {
                  const Icon = type.icon;
                  const active = accountType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setAccountType(type.id)}
                      className="relative flex flex-col gap-2 p-4 rounded-xl text-left transition-all duration-200"
                      style={
                        active
                          ? {
                              backgroundColor: "rgba(244,244,130,0.1)",
                              border: "1px solid rgba(244,244,130,0.4)",
                            }
                          : {
                              backgroundColor: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
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
                      <Icon
                        size={20}
                        style={{ color: active ? "#F4F482" : "rgba(255,255,255,0.5)" }}
                        strokeWidth={2}
                      />
                      <div>
                        <p
                          className="text-sm font-bold font-space-grotesk"
                          style={{ color: active ? "#F4F482" : "#fff" }}
                        >
                          {type.label}
                        </p>
                        <p
                          className="text-xs mt-0.5 leading-snug"
                          style={{ color: active ? "rgba(244,244,130,0.6)" : "rgba(255,255,255,0.35)" }}
                        >
                          {type.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "#fff" }}
              >
                Full Name
              </label>
              <input
                id="nome"
                type="text"
                autoComplete="name"
                value={form.nome}
                onChange={(e) => field("nome", e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-white/30"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: errors.nome
                    ? "1px solid #ef4444"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
              {errors.nome && (
                <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors.nome}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "#fff" }}
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
                className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all placeholder:text-white/30"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: errors.email
                    ? "1px solid #ef4444"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                }}
              />
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-1.5"
                style={{ color: "#fff" }}
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
                  placeholder="Create a strong password"
                  className="w-full rounded-lg px-4 py-3 pr-12 text-sm outline-none transition-all placeholder:text-white/30"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: errors.password
                      ? "1px solid #ef4444"
                      : "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  tabIndex={-1}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Must be at least 8 characters
              </p>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: "#fca5a5" }}>{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 rounded-lg transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#F4F482", color: "#091540" }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm mt-6" style={{ color: "rgba(255,255,255,0.45)" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold transition-colors"
              style={{ color: "#F4F482" }}
            >
              Sign in
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-xs mt-8" style={{ color: "rgba(255,255,255,0.25)" }}>
            By continuing, you agree to our{" "}
            <a href="#" className="underline underline-offset-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
