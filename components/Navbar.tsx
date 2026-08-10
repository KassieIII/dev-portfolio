import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Kassym Yermakhanbet — home">
        <span className="brand-mark">K/Y</span>
        <span className="brand-copy">
          <strong>Kassym Yermakhanbet</strong>
          <small>Product systems engineer</small>
        </span>
      </Link>

      <nav className="main-nav" aria-label="Primary navigation">
        <Link href="/#work"><span>01</span> Work</Link>
        <Link href="/#capabilities"><span>02</span> Capabilities</Link>
        <Link href="/about"><span>03</span> About</Link>
      </nav>

      <a className="header-cta" aria-label="Start a project with Kassym" href="mailto:honormorethangold@gmail.com?subject=Let%27s%20build%20a%20product">
        Start a project <span>↗</span>
      </a>
    </header>
  );
}
