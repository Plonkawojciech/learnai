"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const GOALS = [
  { value: "understand", label: "Zrozumieć czym jest AI i jak działa", desc: "Techniczne podstawy, żeby wiedzieć z czym mam do czynienia" },
  { value: "work",       label: "Używać AI w codziennej pracy", desc: "Maile, dokumenty, analizy — oszczędzać czas" },
  { value: "prompts",    label: "Pisać lepsze prompty", desc: "Wyciągać 10x lepsze wyniki z tych samych narzędzi" },
  { value: "automate",   label: "Automatyzować procesy", desc: "Zapier, Make, N8n — bez kodowania" },
  { value: "build",      label: "Budować produkty z AI", desc: "API, agenci, własne aplikacje z AI" },
  { value: "rag",        label: "Wdrożyć AI w firmie lub projekcie", desc: "RAG, własna baza wiedzy, chatbot na dokumentach" },
];

export function StepGoals({
  onNext,
  onBack,
}: {
  onNext: (data: { goals: string[] }) => void;
  onBack: () => void;
}) {
  const [goals, setGoals] = useState<string[]>([]);

  const toggle = (val: string) => {
    setGoals((prev) => prev.includes(val) ? prev.filter((g) => g !== val) : [...prev, val]);
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--primary)] mb-2">Krok 2 z 3</p>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-2 text-[var(--fg)]">Co chcesz osiągnąć?</h2>
        <p className="text-[var(--fg-muted)] text-sm">Zaznacz wszystkie które Cię dotyczą — od tego zależy Twój plan nauki.</p>
      </div>

      <div className="grid gap-2 mb-8">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            onClick={() => toggle(goal.value)}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
              goals.includes(goal.value)
                ? "border-[var(--primary)] bg-[var(--primary)]/5 text-[var(--fg)]"
                : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg-muted)] hover:border-[var(--border-md)]"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
              goals.includes(goal.value) ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border-md)]"
            }`}>
              {goals.includes(goal.value) && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <div>
              <p className="font-semibold text-[var(--fg)] text-sm leading-tight">{goal.label}</p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">{goal.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNext({ goals })}
          disabled={goals.length === 0}
          className="flex-1 btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Dalej
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
