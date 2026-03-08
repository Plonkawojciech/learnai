"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";

export function StepWelcome({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mx-auto mb-8 shadow-xl"
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl sm:text-5xl font-black tracking-tight mb-3"
      >
        Witaj w LearnAI.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[var(--muted-foreground)] text-lg mb-10 max-w-md mx-auto"
      >
        Zanim zaczniesz, chcemy poznać Ciebie i Twój poziom — żebyś nie tracił czasu na rzeczy które już umiesz.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-sm mx-auto"
      >
        <label className="block text-sm font-medium text-[var(--foreground)] text-left mb-2">
          Jak mamy się do Ciebie zwracać?
        </label>
        <input
          type="text"
          placeholder="Twoje imię..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext(name.trim())}
          className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--primary)] transition-colors text-base"
          autoFocus
        />
        <button
          onClick={() => name.trim() && onNext(name.trim())}
          disabled={!name.trim()}
          className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg"
        >
          Zaczynamy
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-[var(--muted-foreground)] mt-3">
          Zajmie to ok. 3 minuty. Bez rejestracji.
        </p>
      </motion.div>
    </div>
  );
}
