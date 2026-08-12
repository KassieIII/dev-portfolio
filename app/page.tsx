import MacDesktop from "@/components/MacDesktop";

export default function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kassym Yermakhanbet",
    jobTitle: "Full-Stack and AI Product Engineer",
    url: "https://dev-portfolio-sigma-sepia.vercel.app/",
    email: "mailto:honormorethangold@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Astana", addressCountry: "KZ" },
    sameAs: [
      "https://github.com/KassieIII",
      "https://www.linkedin.com/in/kassym-yermakhanbet-635163235/",
      "https://www.upwork.com/freelancers/~01f07d973e8bc9cf88",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h1 className="sr-only">Kassym Yermakhanbet — Full-Stack and AI Product Engineer</h1>
      <MacDesktop />
    </>
  );
}
