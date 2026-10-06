import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-line/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-semibold tracking-tight">
          조성빈
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted">
          <Link href="/#projects" className="hover:text-fg">
            Projects
          </Link>
          <Link href="/#stack" className="hover:text-fg">
            Stack
          </Link>
          <a href="https://github.com/ricky00-dev" className="hover:text-fg">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
