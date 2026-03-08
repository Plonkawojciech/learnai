"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const AI_USAGE_OPTIONS = [
  { value: "never", label: "Nigdy nie używałem/am AI" },
  { value: "rarely", label: "Rzadko, z ciekawości" },
  { value: "weekly", label: "Kilka razy w tygodniu" },
  { value: "daily", label: "Codziennie, do pracy/nauki" },
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

  const canNext = aiUsage !== "";

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-[var(--primary)] mb-1">Krok 1 z 3</p>
        <h2 className="text-3xl font-black tracking-tight mb-2">
          Hej {name}! Jak dobrze znasz AI?
        </h2>
        <p className="text-[var(--muted-foreground)]">
          Bądź szczery — nie ma złych odpowiedzi. To tylko po to żebyś nie tracił czasu.
        </p>
      </div>

      {/* Self score slider */}
      <div className="mb-8 p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
        <label className="block text-sm font-semibold mb-4">
          Oceń swoją wiedzę o AI (0 = zero, 10 = ekspert):
          <span className="ml-2 text-[var(--primary)] font-bold">{selfScore}/10 — {SCORE_LABELS[selfScore]}</span>
        </label>
        <input
          type="range"
          min={0}
          max={10}
          value={selfScore}
          onChange={(e) => setSelfScore(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-[var(--muted-foreground)] mt-1">
          <span>0 — Zero</span>
          <span>5 — Używam</span>
          <span>10 — Ekspert</span>
        </div>
      </div>

      {/* Usage frequency */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3">Jak często używasz narzędzi AI?</label>
        <div className="grid gap-2">
          {AI_USAGE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAiUsage(opt.value)}
              className={`px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${
                aiUsage === opt.value
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                  : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools used */}
      <div className="mb-8">
        <label className="block text-sm font-semibold mb-3">
          Które narzędzia/modele znasz lub używałeś? <span className="text-[var(--muted-foreground)] font-normal">(zaznacz wszystkie)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TOOLS_OPTIONS.map((tool) => (
            <button
              key={tool}
              onClick={() => toggleTool(tool)}
              className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                usedTools.includes(tool)
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]"
                  : "border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/50"
              }`}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNext({ selfScore, aiUsage, usedTools })}
          disabled={!canNext}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
        >
          Dalej
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
