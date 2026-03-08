import Link from "next/link";
import { Zap } from "lucide-react";

const links = [
  { label: "Kursy",     href: "/courses/ai-basics/what-is-ai" },
  { label: "Simulator", href: "/simulator" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Onboarding",href: "/onboarding" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center
            group-hover:shadow-[0_0_12px_rgba(139,92,246,0.4)] transition-shadow duration-300">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-black text-sm text-[var(--fg)]">LearnAI</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-[var(--fg-subtle)]">© 2026 LearnAI</p>
      </div>
    </footer>
  );
}
