import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur z-50">
      <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-sm tracking-tight">
          KY<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-accent transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="text-zinc-600 dark:text-zinc-400 hover:text-accent transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="text-zinc-600 dark:text-zinc-400 hover:text-accent transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
