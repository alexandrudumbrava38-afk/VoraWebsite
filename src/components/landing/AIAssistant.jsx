import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot } from "lucide-react";

const WELCOME_MESSAGES = [
  {
    id: 1,
    from: "bot",
  text: "Ciao! 👋 Sono l'assistente Vora.",
  },
  {
    id: 2,
    from: "bot",
    text: "Come posso aiutarti con il tuo nodo di calcolo? Posso guidarti nell'installazione, nella configurazione dei job di rendering o nella monetizzazione del tuo hardware.",
  },
];

const QUICK_REPLIES = [
  "Come installo il nodo?",
  "Quanto posso guadagnare?",
  "Supportate Blender?",
  "Come funziona il pricing?",
];

const BOT_RESPONSES = {
  "come installo il nodo?":
  "Per installare il nodo Vora basta scaricare il client dalla sezione hero della pagina, scegliere il tuo sistema operativo e seguire il wizard di installazione — ci vogliono meno di 5 minuti! 🚀",
  "quanto posso guadagnare?":
    "Dipende dalle specifiche del tuo hardware e dal tempo di disponibilità. Un PC mid-range può generare tra €30 e €120/mese. Con una GPU dedicata i guadagni possono essere molto più alti! 💰",
  "supportate blender?":
  "Sì! Vora supporta nativamente Blender (Cycles & EEVEE), Cinema 4D, Houdini, e molti altri. Il job viene spezzato in frame e distribuito in parallelo sui nodi. 🎨",
  "come funziona il pricing?":
    "Il modello è pay-per-second: paghi solo per il tempo di calcolo effettivo consumato. Non ci sono costi fissi o abbonamenti obbligatori. Il piano Starter è gratuito per iniziare! 📊",
};

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "rgba(244,244,130,0.15)" }}
      >
        <Bot size={13} style={{ color: "#F4F482" }} />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full animate-bounce"
            style={{
              backgroundColor: "rgba(255,255,255,0.4)",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(WELCOME_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pulsing, setPulsing] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // stop the attention pulse after first open
  useEffect(() => {
    if (open) setPulsing(false);
  }, [open]);

  // scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), from: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const key = trimmed.toLowerCase();
      const reply =
        BOT_RESPONSES[key] ||
        "Ottima domanda! 🤔 Per una risposta precisa ti consiglio di aprire una chat con il nostro team di supporto — risponderemo entro pochi minuti.";
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: reply },
      ]);
    }, 1200 + Math.random() * 600);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat panel */}
      <div
        className="fixed bottom-24 right-5 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-all duration-300"
        style={{
          backgroundColor: "#0c1a4a",
          border: "1px solid rgba(244,244,130,0.18)",
          maxHeight: "520px",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          transformOrigin: "bottom right",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
          style={{
            background: "rgba(0,0,0,0.25)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#F4F482" }}
          >
            <Sparkles size={15} style={{ color: "#091540" }} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-bold leading-tight font-space-grotesk">
              Vora AI
            </p>
            <p className="text-white/35 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online · Risponde in italiano
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/30 hover:text-white/70 transition-colors p-1 rounded-lg hover:bg-white/5"
            aria-label="Chiudi chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: 0 }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.from === "bot" && (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(244,244,130,0.15)" }}
                >
                  <Bot size={13} style={{ color: "#F4F482" }} />
                </div>
              )}
              <div
                className="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={
                  msg.from === "bot"
                    ? {
                        background: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.85)",
                        borderBottomLeftRadius: "4px",
                      }
                    : {
                        backgroundColor: "#F4F482",
                        color: "#091540",
                        fontWeight: 500,
                        borderBottomRightRadius: "4px",
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 2 && !typing && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full transition-all duration-150 hover:scale-105"
                style={{
                  border: "1px solid rgba(244,244,130,0.25)",
                  color: "#F4F482",
                  background: "rgba(244,244,130,0.07)",
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          className="flex items-center gap-2 px-4 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Scrivi un messaggio..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-30 hover:scale-110 active:scale-95"
            style={{ backgroundColor: "#F4F482" }}
            aria-label="Invia"
          >
            <Send size={14} style={{ color: "#091540" }} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Apri assistente AI"
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-black/40 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none"
        style={{
          backgroundColor: "#F4F482",
          boxShadow: open
            ? "0 0 0 0 transparent"
            : "0 8px 30px rgba(244,244,130,0.35)",
        }}
      >
        {/* Outer ring pulse — visible only when chat is closed */}
        {!open && pulsing && (
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ backgroundColor: "rgba(244,244,130,0.35)" }}
          />
        )}
        <span
          className="transition-transform duration-300"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {open ? (
            <X size={22} style={{ color: "#091540" }} strokeWidth={2.5} />
          ) : (
            <Sparkles size={22} style={{ color: "#091540" }} strokeWidth={2.5} />
          )}
        </span>
      </button>
    </>
  );
}
