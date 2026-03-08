"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, TrendingUp } from "lucide-react";

const before = `napisz mi email do klienta że zamówienie jest opóźnione`;
const after = `Wciel się w rolę customer success managera w firmie e-commerce. Napisz profesjonalny, empatyczny email do klienta informujący o 3-dniowym opóźnieniu zamówienia #12345.

Email powinien:
- zaczynać się od przeprosin i uznania frustracji klienta
- wyjaśnić przyczynę opóźnienia (problemy logistyczne u dostawcy)
- podać nową przewidywaną datę dostawy
- zaproponować rekompensatę (10% zniżka na kolejne zamówienie)
- zakończyć się pozytywną nutą i danymi kontaktowymi

Ton: profesjonalny ale ludzki. Długość: 150-200 słów.`;

export function SimulatorPreview() {
  return (
    <section className="py-24 px-4 bg-[var(--muted)]/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest mb-3">Prompt Simulator</p>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Widzisz różnicę?
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
            Wpisujesz prompt jak to robisz teraz. AI pokazuje Ci lepszą wersję — i wyjaśnia dlaczego działa 10x lepiej.
          </p>
        </motion.div>

        {/* Side by side comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-red-500/20 flex items-center justify-between">
              <span className="text-sm font-semibold text-red-500">Twój prompt</span>
              <div className="flex items-center gap-1.5">
                <div className="h-2 rounded-full bg-red-200 dark:bg-red-900 overflow-hidden" style={{ width: 80 }}>
                  <div className="h-full bg-red-500 rounded-full" style={{ width: "25%" }} />
                </div>
                <span className="text-xs text-red-500 font-bold">25%</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-[var(--foreground)] font-mono leading-relaxed">{before}</p>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-green-500/20 bg-green-500/5 overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-green-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-green-500" />
                <span className="text-sm font-semibold text-green-500">Prompt po optymalizacji</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 rounded-full bg-green-200 dark:bg-green-900 overflow-hidden" style={{ width: 80 }}>
                  <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }} />
                </div>
                <span className="text-xs text-green-500 font-bold">92%</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm text-[var(--foreground)] font-mono leading-relaxed whitespace-pre-line">{after}</p>
            </div>
          </motion.div>
        </div>

        {/* Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-semibold">Co zostało poprawione</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { tag: "Rola/persona", desc: "AI wie kim jest i jak ma pisać" },
              { tag: "Kontekst", desc: "Numer zamówienia, przyczyna, czas" },
              { tag: "Format wyjścia", desc: "Długość, ton, struktura maila" },
              { tag: "Ograniczenia", desc: "Co ma zawierać, co zaproponować" },
            ].map((item) => (
              <div key={item.tag} className="flex items-start gap-2">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-[var(--foreground)]">{item.tag}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/simulator"
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold shadow-lg hover:shadow-blue-500/25 hover:scale-105 transition-all"
          >
            <Zap className="w-4 h-4" />
            Spróbuj na swoim prompcie
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
