"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const models = ["Claude", "ChatGPT", "Gemini", "Mistral", "LangChain", "RAG", "Agents", "GPT-4o"];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--muted)] text-sm text-[var(--muted-foreground)] mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          AI & Prompt Engineering Academy
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          Naucz się AI.
          <br />
          <span className="bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent">
            Naprawdę.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-[var(--muted-foreground)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Od „co to jest AI?" do budowania własnych produktów z AI.
          Kursy, symulatory promptów, narzędzia — dla każdego.
          Bez ściemy.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
        >
          <Link
            href="/simulator"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all duration-200"
          >
            <Zap className="w-4 h-4" />
            Wypróbuj Prompt Simulator
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/courses"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-base hover:bg-[var(--muted)] transition-all duration-200"
          >
            Zobacz kursy
          </Link>
        </motion.div>

        {/* Models scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-[var(--muted-foreground)] mr-2">Nauczysz się:</span>
          {models.map((model, i) => (
            <motion.span
              key={model}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="px-3 py-1 rounded-full border border-[var(--border)] text-xs font-medium text-[var(--muted-foreground)] bg-[var(--muted)]"
            >
              {model}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-[var(--border)]" />
        <div className="w-1 h-1 rounded-full bg-[var(--muted-foreground)]" />
      </motion.div>
    </section>
  );
}
