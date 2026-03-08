"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, CheckCircle2, Zap, Clock, ChevronRight } from "lucide-react";
import type { Module, Lesson } from "@/lib/curriculum";

export function LessonClient({ module, lesson }: { module: Module; lesson: Lesson }) {
  const [completed, setCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = module.lessons[lessonIndex + 1];

  const markComplete = () => {
    setCompleted(true);
    const stored = JSON.parse(localStorage.getItem("learnai_progress") || "{}");
    stored[`${module.id}/${lesson.id}`] = true;
    localStorage.setItem("learnai_progress", JSON.stringify(stored));
  };

  const quizScore = lesson.quiz
    ? lesson.quiz.filter((q, i) => quizAnswers[i] === q.correct).length
    : 0;
  const quizTotal = lesson.quiz?.length ?? 0;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[var(--fg-muted)] mb-6">
        <Link href="/dashboard" className="hover:text-[var(--fg)] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{module.title}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--fg)] font-medium truncate">{lesson.title}</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6">
        {/* Main content */}
        <div>
          {/* Lesson header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-xl shadow-md`}>
                {module.icon}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-subtle)] text-[var(--fg-muted)] font-medium border border-[var(--border)]">
                  {lesson.type === "article" ? "Artykuł" : lesson.type === "exercise" ? "Ćwiczenie" : lesson.type === "quiz" ? "Quiz" : "Video"}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--fg-muted)]">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-[var(--fg)]">{lesson.title}</h1>
          </div>

          {/* Key points */}
          <div className="p-4 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 mb-8">
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Kluczowe punkty
            </p>
            <ul className="space-y-1.5">
              {lesson.keyPoints.map((kp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--fg-muted)]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  {kp}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="lesson-prose mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Quiz */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-black mb-4 text-[var(--fg)]">Sprawdź wiedzę</h3>
              <div className="space-y-5">
                {lesson.quiz.map((q, qi) => (
                  <div key={qi} className="card p-5">
                    <p className="font-semibold text-sm mb-3 text-[var(--fg)]">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const correct = q.correct === oi;
                        let cls = "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--fg-muted)]";
                        if (quizSubmitted) {
                          if (correct) cls = "border-green-500/30 bg-green-500/10 text-green-600";
                          else if (selected && !correct) cls = "border-red-500/30 bg-red-500/10 text-red-500";
                        } else if (selected) {
                          cls = "border-[var(--primary)] bg-[var(--primary)]/8 text-[var(--fg)]";
                        }
                        return (
                          <button
                            key={oi}
                            disabled={quizSubmitted}
                            onClick={() => setQuizAnswers((prev) => ({ ...prev, [qi]: oi }))}
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-medium transition-all ${cls} disabled:cursor-default`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <AnimatePresence>
                      {quizSubmitted && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-xs text-[var(--fg-muted)]"
                        >
                          💡 {q.explanation}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              {!quizSubmitted ? (
                <button
                  disabled={Object.keys(quizAnswers).length < quizTotal}
                  onClick={() => setQuizSubmitted(true)}
                  className="mt-4 btn-primary px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                >
                  Sprawdź odpowiedzi
                </button>
              ) : (
                <div className={`mt-4 p-4 rounded-xl border text-sm font-semibold ${
                  quizScore === quizTotal ? "border-green-500/20 bg-green-500/5 text-green-600" : "border-orange-500/20 bg-orange-500/5 text-orange-500"
                }`}>
                  {quizScore === quizTotal ? "🎉 Perfekcyjny wynik!" : `${quizScore}/${quizTotal} — Nieźle, powtórz zaznaczone tematy.`}
                </div>
              )}
            </div>
          )}

          {/* Complete & Next */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[var(--border)]">
            {!completed ? (
              <button
                onClick={markComplete}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Oznacz jako ukończoną
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Lekcja ukończona!
              </div>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${module.id}/${nextLesson.id}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--fg)] font-semibold text-sm hover:bg-[var(--bg-subtle)] transition-all"
              >
                Następna lekcja
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar — module navigation */}
        <div className="hidden lg:block">
          <div className="sticky top-24 card overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <p className="text-xs font-bold text-[var(--fg-subtle)] uppercase tracking-wide mb-1">Moduł</p>
              <p className="font-bold text-sm text-[var(--fg)]">{module.title}</p>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {module.lessons.map((l, i) => {
                const isCurrent = l.id === lesson.id;
                const done = typeof window !== "undefined" && JSON.parse(localStorage.getItem("learnai_progress") || "{}")[`${module.id}/${l.id}`];
                return (
                  <Link
                    key={l.id}
                    href={`/courses/${module.id}/${l.id}`}
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isCurrent
                        ? "bg-[var(--primary)]/8 text-[var(--fg)] font-semibold"
                        : "text-[var(--fg-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--fg)]"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs ${
                      done ? "border-green-500 bg-green-500/10 text-green-600" : isCurrent ? "border-[var(--primary)]" : "border-[var(--border)]"
                    }`}>
                      {done ? "✓" : i + 1}
                    </span>
                    <span className="truncate">{l.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
