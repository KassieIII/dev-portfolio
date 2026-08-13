import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Kassym Yermakhanbet — home">
        <span className="brand-mark">K/Y</span>
        <span className="brand-copy">
          <strong>Kassym Yermakhanbet</strong>
          <small>Full-stack &amp; AI software engineer</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/#work" data-cursor="WORK"><span>01</span> Work</Link>
        <Link href="/#capabilities" data-cursor="SKILLS"><span>02</span> Capabilities</Link>
        <Link href="/about" data-cursor="PROFILE"><span>03</span> About</Link>
      </nav>

      <a className="header-cta" data-cursor="EMAIL" aria-label="Start a project with Kassym" href="mailto:honormorethangold@gmail.com?subject=Let%27s%20build%20a%20product">
        Start a project <span>↗</span>
      </a>
    </header>
  );
}
