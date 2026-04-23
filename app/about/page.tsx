export const metadata = {
  title: "About — Kassym Yermakhanbet",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-6">
      <h1 className="text-3xl font-bold">About</h1>

      <div className="prose dark:prose-invert max-w-none space-y-4 text-zinc-700 dark:text-zinc-300">
        <p>
          I'm a full-stack developer based in Astana, Kazakhstan with 4+ years
          of commercial experience. My work spans government internal platforms,
          intelligence tools, and AI-integrated products.
        </p>

        <p>
          I like solving real problems with clean, maintainable code. My
          favorite stack right now is FastAPI + Next.js + PostgreSQL, but I
          adapt to whatever the project needs.
        </p>

        <h2 className="text-xl font-semibold pt-4">Background</h2>
        <p>
          I started in nuclear physics at ENU, then transferred into computer
          engineering at IITU. Later I added a law degree from TarGU — a
          combination that turned out useful for working with regulated systems.
        </p>

        <h2 className="text-xl font-semibold pt-4">Languages</h2>
        <p>English (C1), Russian (native), Kazakh (native), German (basic).</p>

        <h2 className="text-xl font-semibold pt-4">Currently</h2>
        <p>
          Building real-time geolocation and AI tools at Seven Hills LLP. Open
          to remote part-time and contract opportunities.
        </p>
      </div>
    </div>
  );
}
