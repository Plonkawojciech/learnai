"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const GOALS = [
  { value: "understand", emoji: "🧠", label: "Zrozumieć czym jest AI i jak działa", desc: "Techniczne podstawy, żeby wiedzieć z czym mam do czynienia" },
  { value: "work", emoji: "💼", label: "Używać AI w codziennej pracy", desc: "Maile, dokumenty, analizy — oszczędzać czas" },
  { value: "prompts", emoji: "✍️", label: "Pisać lepsze prompty", desc: "Wyciągać 10x lepsze wyniki z tych samych narzędzi" },
  { value: "automate", emoji: "⚡", label: "Automatyzować procesy", desc: "Zapier, Make, N8n — bez kodowania" },
  { value: "build", emoji: "🚀", label: "Budować produkty z AI", desc: "API, agenci, własne aplikacje z AI" },
  { value: "rag", emoji: "🗂️", label: "Wdrożyć AI w firmie/projekcie", desc: "RAG, własna baza wiedzy, chatbot na dokumentach" },
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
        <p className="text-sm font-semibold text-[var(--primary)] mb-1">Krok 2 z 3</p>
        <h2 className="text-3xl font-black tracking-tight mb-2 text-[var(--fg)]">Co chcesz osiągnąć?</h2>
        <p className="text-[var(--fg-muted)]">Zaznacz wszystkie które Cię dotyczą — od tego zależy Twój plan nauki.</p>
      </div>

      <div className="grid gap-3 mb-8">
        {GOALS.map((goal) => (
          <button
            key={goal.value}
            onClick={() => toggle(goal.value)}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
              goals.includes(goal.value)
                ? "border-[var(--primary)] bg-[var(--primary)]/8"
                : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--primary)]/40"
            }`}
          >
            <span className="text-2xl shrink-0 mt-0.5">{goal.emoji}</span>
            <div>
              <p className="font-semibold text-[var(--fg)] text-sm">{goal.label}</p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">{goal.desc}</p>
            </div>
            {goals.includes(goal.value) && (
              <div className="ml-auto shrink-0 w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
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
          className="flex-1 btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Dalej
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
