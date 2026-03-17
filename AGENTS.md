# Project Rules — City Pop Portfolio

## Always Follow

- This is a **Next.js 14+ App Router** project with **TypeScript**
- Use **Tailwind CSS** for all styling — no plain CSS files
- Use **Framer Motion** for all animations
- Use the custom color palette defined in `tailwind.config.ts` — never hardcode hex values in components
- Use `font-display` for headings and `font-body` for text (defined in Tailwind config)
- All images must use `next/image` with explicit `width` and `height`
- All components should be in `src/components/` organized by section
- Pages go in `src/app/` following App Router conventions
- Project data lives in `src/data/projects.ts`
- Every animation must support `prefers-reduced-motion`
- Mobile-first responsive design: test at 375px, 768px, and 1280px

## Style Guide

- The aesthetic is **Japan City Pop Retro** — pastel neon, bubbly, dreamy, comic-inspired
- Rounded corners everywhere (16-20px for cards, 50px/pill for buttons and tags)
- Glassmorphism for nav and card overlays
- Neon glow effects on hover (box-shadow with accent color at ~0.4 opacity)
- Never use generic AI aesthetics (Inter font, purple-on-white gradients)

## File Naming

- Components: PascalCase (e.g., `HeroSection.tsx`, `ProjectCard.tsx`)
- Utilities: camelCase (e.g., `fadeInVariants.ts`)
- Pages: lowercase directory names (e.g., `app/projects/[slug]/page.tsx`)
