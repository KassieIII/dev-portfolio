# 🌐 Developer Portfolio

A clean, fast personal portfolio website built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and SEO optimization.

[![Live demo](https://img.shields.io/badge/demo-vercel-black?logo=vercel)](https://dev-portfolio-sigma-sepia.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **App Router** — Latest Next.js 14 with React Server Components
- **Dark Mode** — System preference + manual toggle
- **Responsive** — Mobile, tablet, desktop
- **SEO** — Metadata, Open Graph, sitemap
- **Projects Showcase** — MDX-friendly project cards
- **Contact Form** — Server actions with validation
- **Type-safe** — Strict TypeScript throughout

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Lucide Icons
- Vercel-ready

## Quick Start

```bash
git clone https://github.com/KassieIII/dev-portfolio.git
cd dev-portfolio
npm install
npm run dev
```

Open `http://localhost:3000`

## Project Structure

```
dev-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with theme
│   ├── page.tsx            # Home page
│   ├── projects/
│   │   └── page.tsx        # Projects listing
│   ├── about/
│   │   └── page.tsx        # About page
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ProjectCard.tsx
│   ├── SkillBadge.tsx
│   └── ThemeToggle.tsx
├── lib/
│   ├── projects.ts         # Project data
│   └── skills.ts           # Skills data
├── public/
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Deploy

Deploy instantly on [Vercel](https://vercel.com/new):

```bash
npm i -g vercel
vercel
```

## License

MIT
