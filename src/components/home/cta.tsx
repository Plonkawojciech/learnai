"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 p-12 text-center text-white overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 -z-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Zacznij za darmo — bez karty kredytowej
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Czas przestać oglądać
              <br />
              jak AI się dzieje.
            </h2>
            <p className="text-white/70 text-lg max-w-lg mx-auto mb-10">
              Dołącz do tych którzy już budują z AI — produkty, procesy, biznesy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sign-up"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-600 font-bold text-base hover:scale-105 transition-all shadow-lg"
              >
                Zacznij teraz za darmo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/simulator"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
              >
                Wypróbuj Prompt Simulator
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
