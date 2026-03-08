"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";

const BACKGROUNDS = [
  { value: "none",   label: "Brak technicznego tła",       desc: "Nie programuję, nie znam się na IT" },
  { value: "basic",  label: "Podstawy techniki",            desc: "Znam Excel, używam komputera sprawnie, może trochę HTML/CSS" },
  { value: "semi",   label: "Analityk / power user",        desc: "Znam SQL, trochę Pythona lub narzędzia no-code" },
  { value: "dev",    label: "Developer",                    desc: "Programuję — JS, Python lub inny język" },
  { value: "senior", label: "Doświadczony developer",       desc: "5+ lat, buduję systemy produkcyjne" },
];

export function StepBackground({
  onNext,
  onBack,
  error,
}: {
  onNext: (data: { background: string; specificInterest: string }) => void;
  onBack: () => void;
  error: string | null;
}) {
  const [background, setBackground] = useState("");
  const [specificInterest, setSpecificInterest] = useState("");

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-bold tracking-[0.15em] uppercase text-[var(--primary)] mb-2">Krok 3 z 3</p>
        <h2 className="font-display text-3xl font-bold tracking-tight mb-2 text-[var(--fg)]">Twoje tło techniczne</h2>
        <p className="text-[var(--fg-muted)] text-sm">Żebyśmy dopasowali język i podejście — nie oceniamy, tylko dostosowujemy.</p>
      </div>

      <div className="grid gap-2 mb-6">
        {BACKGROUNDS.map((bg) => (
          <button
            key={bg.value}
            onClick={() => setBackground(bg.value)}
            className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
              background === bg.value
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-md)]"
            }`}
          >
            <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
              background === bg.value ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border-md)]"
            }`}>
              {background === bg.value && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>
            <div>
              <p className="font-semibold text-[var(--fg)] text-sm leading-tight">{bg.label}</p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">{bg.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold mb-2 text-[var(--fg)]">
          Coś konkretnego co Cię interesuje?{" "}
          <span className="text-[var(--fg-muted)] font-normal">(opcjonalnie)</span>
        </label>
        <textarea
          value={specificInterest}
          onChange={(e) => setSpecificInterest(e.target.value)}
          placeholder="np. 'Chcę zautomatyzować wysyłkę raportów' albo 'Interesuję się AI w medycynie'..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none focus:border-[var(--primary)] transition-colors text-sm resize-none"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm mb-4">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error} — spróbuj ponownie
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => onNext({ background, specificInterest })}
          disabled={!background}
          className="flex-1 btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Analizuj mój poziom
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
