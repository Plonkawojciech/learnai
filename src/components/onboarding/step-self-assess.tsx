"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const AI_USAGE_OPTIONS = [
  { value: "never",    label: "Nigdy nie używałem/am AI" },
  { value: "rarely",   label: "Rzadko, z ciekawości" },
  { value: "weekly",   label: "Kilka razy w tygodniu" },
  { value: "daily",    label: "Codziennie, do pracy lub nauki" },
  { value: "building", label: "Buduję produkty z AI" },
];

const TOOLS_OPTIONS = [
  "ChatGPT", "Claude", "Gemini", "Copilot (GitHub)", "Midjourney/DALL-E",
  "Zapier/Make z AI", "OpenAI API", "LangChain", "Cursor/Windsurf", "Żadnego z powyższych",
];

const SCORE_LABELS = [
  "Absolutne zero", "Słyszałem/am o AI", "Używam okazjonalnie",
  "Znam podstawy", "Regularny użytkownik", "Power user",
  "Znam technikalia", "Integruję AI", "Buduję z API", "Ekspert", "Tworzę modele",
];

export function StepSelfAssess({
  name,
  onNext,
  onBack,
}: {
  name: string;
  onNext: (data: { selfScore: number; aiUsage: string; usedTools: string[] }) => void;
  onBack: () => void;
}) {
  const [selfScore, setSelfScore] = useState(3);
  const [aiUsage, setAiUsage] = useState("");
  const [usedTools, setUsedTools] = useState<string[]>([]);

  const toggleTool = (tool: string) => {
    setUsedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--primary)] mb-2">Krok 1 z 3</p>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-2 text-[var(--fg)]">
          Hej {name}! Jak dobrze znasz AI?
        </h2>
        <p className="text-[var(--fg-muted)] text-sm">
          Bądź szczery — nie ma złych odpowiedzi.
        </p>
      </div>

      {/* Self score slider */}
      <div className="mb-8 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-semibold text-[var(--fg)]">
            Oceń swoją wiedzę o AI
          </label>
          <span className="text-sm font-bold text-[var(--primary)]">
            {selfScore}/10 — {SCORE_LABELS[selfScore]}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={10}
          value={selfScore}
          onChange={(e) => setSelfScore(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-[var(--fg-subtle)] mt-2">
          <span>0 — Zero</span>
          <span>5 — Używam</span>
          <span>10 — Ekspert</span>
        </div>
      </div>

      {/* Usage frequency */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3 text-[var(--fg)]">Jak często używasz narzędzi AI?</label>
        <div className="grid gap-2">
          {AI_USAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAiUsage(opt.value)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                aiUsage === opt.value
                  ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--fg)]"
                  : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg-muted)] hover:border-[var(--border-md)]"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                aiUsage === opt.value ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border-md)]"
              }`}>
                {aiUsage === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools used */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3 text-[var(--fg)]">
          Które narzędzia znasz lub używałeś?{" "}
          <span className="text-[var(--fg-muted)] font-normal">(zaznacz wszystkie)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TOOLS_OPTIONS.map((tool) => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                usedTools.includes(tool)
                  ? "border-[var(--primary)] bg-[var(--primary)]/8 text-[var(--primary)]"
                  : "border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--border-md)] bg-[var(--bg-card)]"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNext({ selfScore, aiUsage, usedTools })}
          disabled={!aiUsage}
          className="flex-1 btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Dalej
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
