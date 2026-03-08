import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-base">LearnAI</span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
          <Link href="/courses" className="hover:text-[var(--foreground)] transition-colors">Kursy</Link>
          <Link href="/simulator" className="hover:text-[var(--foreground)] transition-colors">Simulator</Link>
          <Link href="#" className="hover:text-[var(--foreground)] transition-colors">Prywatność</Link>
          <Link href="#" className="hover:text-[var(--foreground)] transition-colors">Kontakt</Link>
        </div>
        <p className="text-xs text-[var(--muted-foreground)]">© 2026 LearnAI. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
