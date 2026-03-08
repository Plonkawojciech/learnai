import Link from "next/link";

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

        <Link href="/" className="group">
          <span className="font-display font-bold text-base text-[var(--fg)] group-hover:text-[var(--primary)] transition-colors">LearnAI</span>
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
