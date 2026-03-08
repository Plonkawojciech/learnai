"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const STEPS = [
  "Analizuję Twoje odpowiedzi...",
  "Oceniam poziom wiedzy...",
  "Identyfikuję luki i mocne strony...",
  "Przygotowuję spersonalizowany plan nauki...",
  "Prawie gotowe...",
];

export function StepAnalyzing({ name }: { name: string }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timers = STEPS.map((_, i) =>
      setTimeout(() => setCurrentStep(i), i * 1800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="text-center py-8">
      {/* Animated icon */}
      <div className="relative w-20 h-20 mx-auto mb-10">
        <motion.div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center shadow-xl shadow-blue-100"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-8 h-8 text-white" />
        </motion.div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl border-2 border-blue-400/20"
            animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
          />
        ))}
      </div>

      <h2 className="font-display text-2xl font-bold mb-2 text-[var(--fg)]">
        Analizuję Cię, {name}...
      </h2>
      <p className="text-[var(--fg-muted)] text-sm mb-10">AI oblicza Twój profil i tworzy spersonalizowany plan</p>

      <div className="max-w-sm mx-auto space-y-3">
        {STEPS.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: currentStep >= i ? 1 : 0.25, x: 0 }}
            className="flex items-center gap-3 text-sm"
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              currentStep > i
                ? "bg-green-500"
                : currentStep === i
                ? "bg-[var(--primary)]"
                : "bg-[var(--border)]"
            }`}>
              {currentStep > i ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : currentStep === i ? (
                <motion.div
                  className="w-2 h-2 rounded-full bg-white"
                  animate={{ scale: [1, 0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              ) : null}
            </div>
            <span className={`text-left ${currentStep >= i ? "text-[var(--fg)]" : "text-[var(--fg-subtle)]"}`}>
              {step}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
