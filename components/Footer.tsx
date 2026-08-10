import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-callout">
        <p>Have a complex workflow?</p>
        <a href="mailto:honormorethangold@gmail.com?subject=Product%20inquiry">
          Let&apos;s turn it into a product <span>↗</span>
        </a>
      </div>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} Kassym Yermakhanbet</span>
        <div>
          <a href="https://github.com/KassieIII" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/kassym-yermakhanbet-635163235/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://www.upwork.com/freelancers/~01f07d973e8bc9cf88" target="_blank" rel="noreferrer">Upwork</a>
          <Link href="/Kassym_Yermakhanbet_CV.pdf" target="_blank">Résumé</Link>
        </div>
        <span>Astana · Available worldwide</span>
      </div>
    </footer>
  );
}
