"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, Zap, Clock, ChevronRight } from "lucide-react";
import type { Module, Lesson } from "@/lib/curriculum";

export function LessonClient({ module, lesson }: { module: Module; lesson: Lesson }) {
  const [completed, setCompleted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = module.lessons[lessonIndex + 1];
  const prevLesson = module.lessons[lessonIndex - 1];

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
      <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6">
        <Link href="/dashboard" className="hover:text-[var(--foreground)] transition-colors flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>{module.title}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--foreground)] font-medium truncate">{lesson.title}</span>
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
                <span className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium">
                  {lesson.type === "article" ? "📄 Artykuł" : lesson.type === "exercise" ? "💪 Ćwiczenie" : lesson.type === "quiz" ? "🧩 Quiz" : "🎥 Video"}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                  <Clock className="w-3 h-3" />
                  {lesson.duration}
                </span>
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tight">{lesson.title}</h1>
          </div>

          {/* Key points */}
          <div className="p-4 rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 mb-8">
            <p className="text-xs font-bold text-[var(--primary)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Kluczowe punkty
            </p>
            <ul className="space-y-1.5">
              {lesson.keyPoints.map((kp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--primary)] shrink-0" />
                  {kp}
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div className="prose prose-sm max-w-none mb-8 text-[var(--foreground)]
            [&_h1]:text-2xl [&_h1]:font-black [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-[var(--foreground)]
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-[var(--foreground)]
            [&_h3]:text-base [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-[var(--foreground)]
            [&_p]:text-[var(--foreground)] [&_p]:leading-relaxed [&_p]:mb-4
            [&_ul]:space-y-1 [&_ul]:mb-4
            [&_li]:text-[var(--foreground)] [&_li]:leading-relaxed
            [&_code]:bg-[var(--muted)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_code]:text-[var(--foreground)]
            [&_pre]:bg-[var(--muted)] [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:mb-4 [&_pre]:border [&_pre]:border-[var(--border)]
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm
            [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--primary)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--muted-foreground)] [&_blockquote]:my-4
            [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4
            [&_th]:border [&_th]:border-[var(--border)] [&_th]:px-3 [&_th]:py-2 [&_th]:bg-[var(--muted)] [&_th]:text-left [&_th]:text-sm [&_th]:font-bold
            [&_td]:border [&_td]:border-[var(--border)] [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm
            [&_strong]:font-bold [&_strong]:text-[var(--foreground)]
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Quiz */}
          {lesson.quiz && lesson.quiz.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span>🧩</span> Sprawdź wiedzę
              </h3>
              <div className="space-y-5">
                {lesson.quiz.map((q, qi) => (
                  <div key={qi} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
                    <p className="font-semibold text-sm mb-3">{q.question}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const selected = quizAnswers[qi] === oi;
                        const correct = q.correct === oi;
                        let cls = "border-[var(--border)] bg-[var(--muted)]/50 text-[var(--foreground)]";
                        if (quizSubmitted) {
                          if (correct) cls = "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400";
                          else if (selected && !correct) cls = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400";
                        } else if (selected) {
                          cls = "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)]";
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
                          className="mt-3 p-3 rounded-lg bg-[var(--muted)] text-xs text-[var(--muted-foreground)]"
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
                  className="mt-4 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                >
                  Sprawdź odpowiedzi
                </button>
              ) : (
                <div className={`mt-4 p-4 rounded-xl border text-sm font-semibold ${
                  quizScore === quizTotal ? "border-green-500/20 bg-green-500/5 text-green-500" : "border-orange-500/20 bg-orange-500/5 text-orange-500"
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
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Oznacz jako ukończoną
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                Lekcja ukończona!
              </div>
            )}
            {nextLesson && (
              <Link
                href={`/courses/${module.id}/${nextLesson.id}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:bg-[var(--muted)] transition-all"
              >
                Następna lekcja
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar — module navigation */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <p className="text-xs font-bold text-[var(--muted-foreground)] uppercase tracking-wide mb-1">Moduł</p>
              <p className="font-bold text-sm">{module.title}</p>
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
                      isCurrent ? "bg-[var(--primary)]/10 text-[var(--foreground)] font-semibold" : "text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs">
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
