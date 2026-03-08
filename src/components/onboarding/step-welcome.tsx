"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function StepWelcome({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-[var(--fg)]"
      >
        Witaj w LearnAI.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[var(--fg-muted)] text-base mb-10 max-w-md mx-auto leading-relaxed"
      >
        Zanim zaczniesz, chcemy poznać Ciebie i Twój poziom — żebyś nie tracił czasu na rzeczy które już umiesz.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-sm mx-auto"
      >
        <label className="block text-sm font-medium text-[var(--fg)] text-left mb-2">
          Jak mamy się do Ciebie zwracać?
        </label>
        <input
          type="text"
          placeholder="Twoje imię..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext(name.trim())}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] outline-none focus:border-[var(--primary)] transition-colors text-base"
          autoFocus
        />
        <button
          onClick={() => name.trim() && onNext(name.trim())}
          disabled={!name.trim()}
          className="mt-4 w-full btn-primary flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          Zaczynamy
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-[var(--fg-subtle)] mt-3">Zajmie to ok. 3 minuty.</p>
      </motion.div>
    </div>
  );
}
