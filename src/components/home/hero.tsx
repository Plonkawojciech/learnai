"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { stagger, fadeUp, fadeIn, viewport } from "@/lib/animations";

const MODELS = ["Claude", "GPT-4o", "Gemini", "Mistral", "LangChain", "RAG", "Agents"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y  = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const op = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 40%, var(--bg) 90%)" }} />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% -5%, transparent 60%, var(--bg) 95%)" }} />

        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] rounded-full animate-float"
            style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 70%)" }} />
          <div className="absolute top-[15%] right-[15%] w-[400px] h-[400px] rounded-full animate-float2"
            style={{ background: "radial-gradient(ellipse, rgba(8,145,178,0.07) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[10%] left-[40%] w-[300px] h-[300px] rounded-full animate-float"
            style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.05) 0%, transparent 70%)", animationDelay: "3s" }} />
        </motion.div>
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity: op }} className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-28 text-center">

        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-10
            bg-[var(--bg-card)] border border-[var(--border)] shadow-sm
            text-sm font-medium text-[var(--fg-muted)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          AI & Prompt Engineering Academy
        </motion.div>

        {/* Headline */}
        <motion.div variants={stagger(0.06, 0.1)} initial="hidden" animate="visible">
          <motion.h1 variants={fadeUp}
            className="font-display text-6xl sm:text-7xl md:text-[90px] font-bold tracking-[-0.02em] leading-[0.95] mb-8">
            <span className="text-[var(--fg)]">Naucz się AI.</span>
            <br />
            <span className="text-gradient italic">Naprawdę.</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="text-xl sm:text-2xl text-[var(--fg-muted)] max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            Od{" "}
            <span className="text-[var(--fg)] font-medium">"co to jest AI?"</span>
            {" "}do budowania własnych produktów.
            <br />
            Kursy, symulatory, narzędzia — dla każdego.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/onboarding"
              className="btn-primary group flex items-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl">
              Sprawdź swój poziom
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="/simulator"
              className="group flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-xl
                bg-[var(--bg-card)] border border-[var(--border)] text-[var(--fg-muted)]
                hover:text-[var(--fg)] hover:border-[var(--border-md)] hover:shadow-md
                shadow-sm transition-all duration-300">
              Prompt Simulator
            </Link>
          </motion.div>

          {/* Model pills */}
          <motion.div variants={stagger(0.04, 0.6)} initial="hidden" animate="visible"
            className="flex flex-wrap items-center justify-center gap-2">
            <motion.span variants={fadeIn}
              className="text-xs text-[var(--fg-subtle)] font-medium uppercase tracking-[0.15em] mr-1">
              Nauczysz się
            </motion.span>
            {MODELS.map((m) => (
              <motion.span key={m} variants={fadeUp}
                className="tag hover:border-[var(--border-md)] hover:text-[var(--fg)] transition-all cursor-default">
                {m}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--border-md)] to-transparent" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[var(--fg-subtle)]">scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
