"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Kursy", href: "/courses" },
  { label: "Simulator", href: "/simulator" },
  { label: "Spec Engineer", href: "/spec-engineer" },
  { label: "Narzędzia", href: "/tools" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-[var(--foreground)] tracking-tight">LearnAI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/sign-in"
              className="hidden md:block px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Zaloguj
            </Link>
            <Link
              href="/sign-up"
              className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--primary)] text-white hover:opacity-90 transition-all shadow-sm"
            >
              Zacznij za darmo
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--muted)] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[var(--background)] border-b border-[var(--border)] shadow-lg md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[var(--border)] mt-2 flex flex-col gap-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="px-4 py-3 text-sm font-medium text-center text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
                  Zaloguj
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-semibold text-center bg-[var(--primary)] text-white">
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
