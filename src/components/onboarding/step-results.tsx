"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Target, Zap, Calendar } from "lucide-react";
import type { AssessResult } from "./wizard";

const LEVEL_CONFIG = {
  beginner: { color: "from-green-500 to-emerald-600", bg: "bg-green-500/10", border: "border-green-500/20", text: "text-green-500", emoji: "🌱" },
  intermediate: { color: "from-blue-500 to-cyan-600", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-500", emoji: "⚡" },
  advanced: { color: "from-violet-500 to-purple-600", bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-500", emoji: "🚀" },
};

export function StepResults({
  result,
  name,
  onStart,
}: {
  result: AssessResult;
  name: string;
  onStart: () => void;
}) {
  const config = LEVEL_CONFIG[result.level];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="text-5xl mb-4">{config.emoji}</div>
        <h2 className="text-3xl font-black tracking-tight mb-2">
          {name}, jesteś <span className={`bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>{result.levelLabel}</span>
        </h2>
        <p className="text-[var(--muted-foreground)] max-w-lg mx-auto">{result.summary}</p>
      </motion.div>

      {/* Score */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`p-5 rounded-2xl border ${config.border} ${config.bg} mb-5`}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold">Poziom wiedzy AI</span>
          <span className={`text-2xl font-black ${config.text}`}>{result.score}%</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--border)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className={`h-full rounded-full bg-gradient-to-r ${config.color}`}
          />
        </div>
      </motion.div>

      {/* Strengths & Gaps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 gap-4 mb-5"
      >
        <div className="p-5 rounded-2xl border border-green-500/20 bg-green-500/5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-500">Mocne strony</span>
          </div>
          <ul className="space-y-1.5">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-2xl border border-orange-500/20 bg-orange-500/5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">Do nauczenia</span>
          </div>
          <ul className="space-y-1.5">
            {result.gaps.map((g, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Weekly plan */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[var(--primary)]" />
          <span className="text-sm font-semibold">Twój plan nauki</span>
        </div>
        <div className="space-y-4">
          {result.weeklyPlan.slice(0, 3).map((week) => (
            <div key={week.week} className="flex gap-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {week.week}
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">{week.focus}</p>
                <ul className="space-y-0.5">
                  {week.tasks.map((task, i) => (
                    <li key={i} className="text-xs text-[var(--muted-foreground)] flex items-start gap-1.5">
                      <span className="mt-1 w-1 h-1 rounded-full bg-[var(--muted-foreground)] shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* First step */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 mb-6"
      >
        <div className="flex items-start gap-3">
          <Zap className="w-4 h-4 text-[var(--primary)] mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-[var(--primary)] mb-0.5">Zrób to dziś</p>
            <p className="text-sm text-[var(--foreground)]">{result.firstStep}</p>
          </div>
        </div>
      </motion.div>

      {/* Motivational message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-[var(--muted-foreground)] italic mb-6"
      >
        "{result.motivationalMessage}"
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={onStart}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-base hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg"
      >
        Przejdź do swojego dashboardu
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
