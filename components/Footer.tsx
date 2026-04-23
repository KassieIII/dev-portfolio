export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 mt-12">
      <div className="max-w-4xl mx-auto px-6 text-sm text-zinc-500 flex justify-between">
        <span>© {new Date().getFullYear()} Kassym Yermakhanbet</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
