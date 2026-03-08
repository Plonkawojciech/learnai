"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, RotateCcw, Copy, Check, Sparkles, TrendingUp, AlertCircle } from "lucide-react";

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
  "pomóż mi napisać CV",
  "napisz kod do sortowania listy",
];

function ScoreBar({ score, color }: { score: number; color: "red" | "green" }) {
  const colorMap = {
    red: { bar: "bg-red-500", text: "text-red-500", track: "bg-red-100 dark:bg-red-950" },
    green: { bar: "bg-green-500", text: "text-green-500", track: "bg-green-100 dark:bg-green-950" },
  };
  const c = colorMap[color];

  return (
    <div className="flex items-center gap-3">
      <div className={`flex-1 h-2.5 rounded-full ${c.track} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${c.bar}`}
        />
      </div>
      <span className={`text-sm font-bold tabular-nums w-8 ${c.text}`}>{score}%</span>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Skopiowano!" : "Kopiuj"}
    </button>
  );
}

export function SimulatorClient() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/prompt-simulator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Błąd serwera");
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Coś poszło nie tak");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)] text-sm text-[var(--muted-foreground)] mb-5">
          <Zap className="w-3.5 h-3.5 text-blue-500" />
          Prompt Engineering Simulator
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
          Jak dobry jest
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Twój prompt?
          </span>
        </h1>
        <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
          Wpisz prompt jak to robisz normalnie. AI oceni go, poprawi i pokaże konkretną różnicę w wynikach.
        </p>
      </motion.div>

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden mb-6 shadow-sm"
      >
        <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--foreground)]">Twój prompt</span>
          <span className="text-xs text-[var(--muted-foreground)]">{input.length}/2000</span>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) analyze();
          }}
          placeholder="Wpisz prompt tak jak normalnie byś go napisał/a..."
          className="w-full px-5 py-4 bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm resize-none outline-none leading-relaxed"
          rows={5}
          maxLength={2000}
        />
        <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between bg-[var(--muted)]/30">
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="text-xs px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all truncate max-w-[160px]"
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            {result && (
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
            <button
              onClick={analyze}
              disabled={!input.trim() || loading}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:scale-105 transition-all shadow-sm"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analizuję...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analizuj
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Hint */}
      {!result && !loading && (
        <p className="text-center text-xs text-[var(--muted-foreground)] mb-8">
          Ctrl+Enter żeby wysłać · Możesz kliknąć przykłady wyżej
        </p>
      )}

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm mb-6"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            {/* Score overview */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-3">Oryginalny prompt</p>
                <ScoreBar score={result.score_before} color="red" />
                <p className="text-xs text-[var(--muted-foreground)] mt-2 italic">"{input.slice(0, 80)}{input.length > 80 ? "..." : ""}"</p>
              </div>
              <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-green-500 uppercase tracking-wide">Po optymalizacji</p>
                  <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    +{result.score_after - result.score_before}%
                  </div>
                </div>
                <ScoreBar score={result.score_after} color="green" />
                <p className="text-xs text-[var(--muted-foreground)] mt-2">{result.explanation}</p>
              </div>
            </div>

            {/* Improved prompt */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <span className="text-sm font-semibold">Zoptymalizowany prompt</span>
                </div>
                <CopyButton text={result.improved_prompt} />
              </div>
              <div className="p-5">
                <p className="text-sm text-[var(--foreground)] leading-relaxed whitespace-pre-line font-mono">
                  {result.improved_prompt}
                </p>
              </div>
            </div>

            {/* Improvements */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="px-5 py-3 border-b border-[var(--border)]">
                <span className="text-sm font-semibold">Co zostało poprawione</span>
              </div>
              <div className="p-5 grid sm:grid-cols-2 gap-4">
                {result.improvements.map((imp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-[var(--foreground)] mb-0.5">{imp.category}</p>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{imp.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Before / After example results */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                <p className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wide mb-3">Przykładowy wynik — przed</p>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed italic">"{result.example_result_before}"</p>
              </div>
              <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
                <p className="text-xs font-semibold text-green-500 uppercase tracking-wide mb-3">Przykładowy wynik — po</p>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">"{result.example_result_after}"</p>
              </div>
            </div>

            {/* Try again CTA */}
            <div className="text-center pt-4">
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl border border-[var(--border)] text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
              >
                Spróbuj z innym promptem
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
