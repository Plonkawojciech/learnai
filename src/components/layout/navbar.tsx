"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Kursy",      href: "/courses/ai-basics/what-is-ai" },
  { label: "Simulator",  href: "/simulator" },
  { label: "Dashboard",  href: "/dashboard" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobile,   setMobile]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setMobile(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-black/[0.06] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md shadow-violet-200
              group-hover:shadow-violet-300 group-hover:scale-105 transition-all duration-300">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-base text-[var(--fg)] tracking-tight">LearnAI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname.startsWith("/" + link.href.split("/")[1]);
              return (
                <Link key={link.href} href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-[var(--fg)] bg-[var(--bg-subtle)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-black/[0.04]"
                  }`}>
                  {active && (
                    <motion.span layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-[var(--bg-subtle)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link href="/onboarding"
              className="hidden md:flex btn-primary items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl">
              <Zap className="w-3.5 h-3.5" />
              Zacznij za darmo
            </Link>
            <button onClick={() => setMobile(!mobile)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-black/[0.05] transition-all">
              {mobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-black/[0.06] shadow-lg md:hidden"
          >
            <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-black/[0.04] transition-all">
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-black/[0.06] mt-1">
                <Link href="/onboarding"
                  className="btn-primary flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl w-full">
                  <Zap className="w-3.5 h-3.5" />
                  Zacznij za darmo
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
