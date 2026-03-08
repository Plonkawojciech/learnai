"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Copy, Check, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { stagger, fadeUp, fadeScale } from "@/lib/animations";

interface SimulatorResult {
  score_before: number;
  score_after: number;
  improved_prompt: string;
  improvements: Array<{ category: string; description: string }>;
  explanation: string;
  example_result_before: string;
  example_result_after: string;
}

const EXAMPLES = [
  "napisz mi email do klienta że zamówienie jest opóźnione",
  "wytłumacz mi jak działa blockchain",
  "zrób mi plan diety",
  "napisz kod do sortowania listy w Pythonie",
  "pomóż mi napisać CV na stanowisko frontend developera",
];

function ScoreRing({ score, color }: { score: number; color: string }) {
  const r = 20, c = 2 * Math.PI * r;
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(15,23,42,0.08)" strokeWidth="4" />
        <motion.circle cx="25" cy="25" r={r} fill="none"
          stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (score / 100) * c }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-black" style={{ color }}>{score}%</span>
      </div>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <button onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-all">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Skopiowano" : "Kopiuj"}
    </button>
  );
}

export function SimulatorClient() {
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const [result,  setResult]  = useState<SimulatorResult | null>(null);
  const [error,   setError]   = useState<string | null>(null);

  const analyze = async () => {
    if (!input.trim() || loading) return;
    setLoading(true); setError(null); setResult(null);
    try {
      const res  = await fetch("/api/prompt-simulator", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt: input }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd serwera");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Coś poszło nie tak");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setInput(""); setResult(null); setError(null); };

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <motion.div variants={stagger(0.07)} initial="hidden" animate="visible"
        className="text-center mb-12">
        <motion.div variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-sm text-[var(--fg-muted)] mb-6">
          Prompt Engineering Simulator
        </motion.div>
        <motion.h1 variants={fadeUp}
          className="text-5xl sm:text-6xl font-black tracking-[-0.04em] leading-tight mb-4 text-[var(--fg)]">
          Jak dobry jest
          <br />
          <span className="text-gradient">Twój prompt?</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-[var(--fg-muted)] max-w-lg mx-auto">
          Wpisz prompt jak to robisz normalnie. AI go oceni, poprawi i pokaże konkretną różnicę.
        </motion.p>
      </motion.div>

      {/* Input card */}
      <motion.div variants={fadeScale} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
        className="card overflow-hidden mb-4">
        <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--fg)]">Twój prompt</span>
          <span className="text-xs text-[var(--fg-subtle)] tabular-nums">{input.length}/2000</span>
        </div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) analyze(); }}
          placeholder="Wpisz prompt tak jak normalnie byś go napisał/a..."
          className="w-full px-5 py-4 bg-transparent text-[var(--fg)] placeholder:text-[var(--fg-subtle)] text-sm resize-none outline-none leading-relaxed"
          rows={5} maxLength={2000} />

        {/* Bottom bar */}
        <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between gap-4 bg-[var(--bg-subtle)]">
          <div className="flex flex-wrap gap-2 min-w-0">
            {EXAMPLES.map((ex) => (
              <button key={ex} onClick={() => setInput(ex)}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:border-[var(--border-md)] transition-all truncate max-w-[180px]">
                {ex}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {result && (
              <button onClick={reset} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-all">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={analyze} disabled={!input.trim() || loading}
              className="btn-primary flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none">
              {loading ? (
                <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Analizuję...</>
              ) : (
                <>Analizuj<ArrowRight className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <p className="text-center text-xs text-[var(--fg-subtle)] mb-8">
        ⌘+Enter żeby wysłać
      </p>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-red-500/15 bg-red-500/[0.05] text-red-500 text-sm mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

            {/* Score comparison */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-red-500/12 bg-red-500/[0.04]">
                <ScoreRing score={result.score_before} color="#ef4444" />
                <div>
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-1">Oryginalny</p>
                  <p className="text-xs text-[var(--fg-subtle)] italic line-clamp-2">"{input.slice(0, 60)}{input.length > 60 ? "..." : ""}"</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 rounded-2xl border border-green-500/12 bg-green-500/[0.04]">
                <ScoreRing score={result.score_after} color="#059669" />
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-bold text-green-600 uppercase tracking-wide">Zoptymalizowany</p>
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-black text-green-600">+{result.score_after - result.score_before}%</span>
                  </div>
                  <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">{result.explanation}</p>
                </div>
              </div>
            </div>

            {/* Improved prompt */}
            <div className="card overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-semibold text-[var(--fg)]">Zoptymalizowany prompt</span>
                </div>
                <CopyBtn text={result.improved_prompt} />
              </div>
              <div className="p-5 bg-[var(--bg-subtle)]">
                <p className="text-sm text-[var(--fg)] leading-relaxed whitespace-pre-line font-mono text-xs">{result.improved_prompt}</p>
              </div>
            </div>

            {/* Improvements */}
            <div className="card overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[var(--border)]">
                <span className="text-sm font-semibold text-[var(--fg)]">Co zostało poprawione</span>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4">
                {result.improvements.map((imp, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center shrink-0 text-xs text-[var(--primary)] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[var(--fg)] mb-0.5">{imp.category}</p>
                      <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">{imp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Before / After examples */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]">
                <p className="text-xs font-bold text-[var(--fg-subtle)] uppercase tracking-wide mb-3">Wynik — przed</p>
                <p className="text-sm text-[var(--fg-subtle)] leading-relaxed italic">"{result.example_result_before}"</p>
              </div>
              <div className="p-5 rounded-2xl border border-green-500/15 bg-green-500/[0.04]">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-3">Wynik — po</p>
                <p className="text-sm text-[var(--fg)] leading-relaxed">"{result.example_result_after}"</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button onClick={reset}
                className="px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-all">
                Spróbuj z innym promptem
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
