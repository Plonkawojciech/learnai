"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Zap, ArrowRight, Lock, CheckCircle2, Clock, Trophy, ChevronRight } from "lucide-react";
import { MODULES, getModulesForLevel } from "@/lib/curriculum";
import type { AssessResult } from "@/components/onboarding/wizard";
import type { Level } from "@/lib/curriculum";

export function DashboardClient() {
  const router = useRouter();
  const [assessment, setAssessment] = useState<{ result: AssessResult } | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem("learnai_assessment");
    if (!saved) {
      router.push("/onboarding");
      return;
    }
    setAssessment(JSON.parse(saved));

    const prog = localStorage.getItem("learnai_progress");
    if (prog) setProgress(JSON.parse(prog));
  }, [router]);

  if (!assessment) return null;

  const { result } = assessment;
  const level = result.level as Level;
  const modules = getModulesForLevel(level);
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

  const LEVEL_CONFIG = {
    beginner: { color: "from-green-500 to-emerald-600", label: "Laik", emoji: "🌱" },
    intermediate: { color: "from-blue-500 to-cyan-600", label: "Power User", emoji: "⚡" },
    advanced: { color: "from-violet-500 to-purple-600", label: "Builder", emoji: "🚀" },
  };
  const lc = LEVEL_CONFIG[level];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-[var(--fg-muted)] mb-1">Twój dashboard</p>
            <h1 className="text-3xl font-black tracking-tight text-[var(--fg)]">
              Witaj z powrotem 👋
            </h1>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${lc.color} text-white text-sm font-bold shadow-md`}>
            <span>{lc.emoji}</span>
            Poziom: {lc.label}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Ukończone lekcje", value: completedLessons, icon: CheckCircle2, color: "text-green-500" },
            { label: "Całkowite lekcje", value: totalLessons, icon: BookOpen, color: "text-blue-500" },
            { label: "Moduły", value: modules.length, icon: Trophy, color: "text-[var(--primary)]" },
            { label: "Postęp", value: `${totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%`, icon: Clock, color: "text-orange-500" },
          ].map((stat) => (
            <div key={stat.label} className="card p-4">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-2xl font-black text-[var(--fg)]">{stat.value}</p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* First step highlight */}
      {result.firstStep && completedLessons === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl border border-[var(--primary)]/25 bg-[var(--primary)]/5 mb-8"
        >
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-[var(--primary)] mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-bold text-[var(--primary)] mb-1">Twój pierwszy krok</p>
              <p className="text-sm text-[var(--fg)]">{result.firstStep}</p>
            </div>
            <Link
              href={`/courses/${modules[0]?.id}/${modules[0]?.lessons[0]?.id}`}
              className="shrink-0 flex items-center gap-1 text-xs font-bold text-[var(--primary)] hover:underline"
            >
              Zacznij <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      )}

      {/* Modules */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xl font-black mb-5 text-[var(--fg)]">Twój plan nauki</h2>
        <div className="space-y-4">
          {modules.map((mod, mi) => {
            const moduleLessons = mod.lessons;
            const completedInModule = moduleLessons.filter((l) => progress[`${mod.id}/${l.id}`]).length;
            const isLocked = mi > 0 && completedInModule === 0 && modules[mi - 1].lessons.some((l) => !progress[`${modules[mi - 1].id}/${l.id}`]);
            const progressPct = moduleLessons.length > 0 ? (completedInModule / moduleLessons.length) * 100 : 0;

            return (
              <div
                key={mod.id}
                className={`card overflow-hidden transition-all ${
                  isLocked ? "opacity-60" : "hover:border-[var(--primary)]/25"
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-2xl shadow-md shrink-0`}>
                      {isLocked ? <Lock className="w-5 h-5 text-white/70" /> : mod.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-[var(--fg)]">{mod.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--fg-muted)] border border-[var(--border)]">
                          {mod.duration}
                        </span>
                        {completedInModule === moduleLessons.length && moduleLessons.length > 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 font-bold border border-green-500/20">
                            ✓ Ukończony
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--fg-muted)] mt-0.5">{mod.subtitle}</p>
                      {!isLocked && moduleLessons.length > 0 && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs text-[var(--fg-muted)] mb-1">
                            <span>{completedInModule}/{moduleLessons.length} lekcji</span>
                            <span>{Math.round(progressPct)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${mod.color} transition-all`}
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {!isLocked && (
                      <Link
                        href={`/courses/${mod.id}/${mod.lessons[0]?.id}`}
                        className="shrink-0 w-9 h-9 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle)] transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Lessons list */}
                {!isLocked && (
                  <div className="border-t border-[var(--border)] divide-y divide-[var(--border)]">
                    {moduleLessons.map((lesson) => {
                      const done = progress[`${mod.id}/${lesson.id}`];
                      const typeIcons: Record<string, string> = { article: "📄", video: "🎥", exercise: "💪", quiz: "🧩" };
                      return (
                        <Link
                          key={lesson.id}
                          href={`/courses/${mod.id}/${lesson.id}`}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-subtle)] transition-colors"
                        >
                          <span className="text-sm">{typeIcons[lesson.type]}</span>
                          <span className="flex-1 text-sm text-[var(--fg)]">{lesson.title}</span>
                          <span className="text-xs text-[var(--fg-muted)]">{lesson.duration}</span>
                          {done ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-[var(--border)]" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Prompt Simulator CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-5 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-500/5 to-violet-500/5"
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-[var(--primary)]" />
              <span className="font-bold text-sm text-[var(--fg)]">Prompt Simulator</span>
            </div>
            <p className="text-sm text-[var(--fg-muted)]">Ćwicz pisanie promptów i natychmiast otrzymuj feedback AI</p>
          </div>
          <Link
            href="/simulator"
            className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            Otwórz Simulator
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
