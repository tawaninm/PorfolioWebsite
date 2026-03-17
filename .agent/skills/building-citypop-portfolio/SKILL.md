---
name: building-citypop-portfolio
description: Builds a Japan City Pop Retro portfolio website for a UX/UI designer, programmer, and CI artist. Trigger on requests to create portfolio sections, style components, add animations, or implement the city pop aesthetic. Use when the user mentions hero section, about page, works grid, project detail, contact form, parallax, sparkle particles, comic animation, neon glow, pastel gradient, or retro Japanese style.
---

# City Pop Retro Portfolio Builder

## When to use this skill

- User asks to build any section of the portfolio website (Hero, About, Works, Projects, Contact)
- User asks to style components in city pop / retro Japanese aesthetic
- User asks to add animations (particles, parallax, fade-in, comic effects)
- User asks to create or modify portfolio cards, navigation, or layout
- User mentions "city pop", "retro", "pastel neon", "comic manga", or "kawaii"
- User asks to set up the project foundation (Next.js + Tailwind + Framer Motion)

## Project Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS with custom color config
- **Animation**: Framer Motion
- **Fonts**: Google Fonts — Righteous (display), DM Sans (body), JetBrains Mono (code)
- **Deployment**: Vercel

## Workflow

### Step 1: Read Design References

Before writing any code, read these files for complete specifications:

- `references/DESIGN_SPEC.md` — Full color palette, typography, section layouts, animation specs, component patterns
- `references/VIBE_CODE_GUIDE.md` — Step-by-step build order and prompt templates

### Step 2: Follow Build Order

Build sections in this exact order. Complete and test each before moving on:

1. **Foundation** — Tailwind config with custom colors, font imports, base layout, glassmorphism navbar
2. **Hero Section** — Full viewport gradient, sparkle particles, animated title, CTA button
3. **About Me** — Two-column layout, avatar, bio, skill tags, fade-in scroll
4. **Works / Portfolio** — Filter tabs, card grid, hover effects, comic animations
5. **Projects Detail** — Dynamic route `/projects/[slug]`, hero banner, gallery, tech stack
6. **Contact** — Retro-styled form, social links, sunset gradient background
7. **Polish** — Page transitions, consistent animations, responsive check, performance

### Step 3: Apply Design System

Always use these values from the design spec:

#### Color Palette (Tailwind Config)
```
lavender:      '#C8A8E8'
sakura-pink:   '#F0B0D0'
sky-cyan:      '#88D8E8'
mint:          '#A8E8D0'
sunset-gold:   '#F8E0A0'
peach:         '#F8A078'
hot-pink:      '#FF6090'
electric-blue: '#5080F0'
neon-teal:     '#40C8A0'
coral-red:     '#F06848'
retro-yellow:  '#F0D040'
dark-navy:     '#1A1A2E'
deep-purple:   '#2D1B4E'
soft-white:    '#FFF8F0'
muted-lilac:   '#B0A0C8'
```

#### Typography
| Element | Font | Size (desktop) |
|---------|------|----------------|
| Hero title | Righteous | 72-96px |
| Section headings | Righteous | 40-48px |
| Subheadings | DM Sans 700 | 24-28px |
| Body text | DM Sans 400 | 16-18px |
| Captions / tags | DM Sans 500 | 12-14px |

#### Gradients
```css
/* Hero */ linear-gradient(135deg, #C8A8E8 0%, #F0B0D0 40%, #88D8E8 100%)
/* Sunset */ linear-gradient(135deg, #F8A078 0%, #F0B0D0 50%, #C8A8E8 100%)
```

### Step 4: Animation Rules

#### Particles (Hero only)
- 30-50 particles (reduce to 15-20 on mobile)
- Shapes: circles (70%), 4-point stars (30%)
- Colors: retro-yellow, soft-white, hot-pink (rare)
- Slow upward float with gentle horizontal drift
- Respect `prefers-reduced-motion`

#### Fade-in on Scroll
- Framer Motion `whileInView`: opacity 0→1, translateY 40px→0
- Duration 0.6-0.8s, stagger children 0.1-0.15s
- Trigger at 20% visible, `once: true`

#### Parallax
- Background decorative elements at 0.3-0.5x scroll speed
- Use Framer Motion `useScroll` + `useTransform`
- Keep subtle — city pop is chill

#### Comic Effects (Portfolio cards)
- Hover: speech bubble or starburst CSS pseudo-element
- Scale 0→1 with ease-out
- Small text like "POW!", "NEW!", "✦" inside burst

#### General
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Only animate `transform` and `opacity`
- All animations support `prefers-reduced-motion`

### Step 5: Component Patterns

#### Buttons
- Primary: pill shape (border-radius 50px), hot-pink bg, neon glow on hover
- Secondary: transparent + electric-blue border, glow on hover
- Hover: translateY(-2px) + box-shadow glow

#### Cards
- Glassmorphism: rgba bg + backdrop-filter blur(8px)
- Border-radius 20px
- Hover: translateY(-8px) rotate(1deg) + pink glow shadow

#### Tags
- Pill shape, category-colored: UX/UI → sakura-pink, Programming → sky-cyan, CI Art → mint

### Step 6: Responsive

- Mobile: < 640px (1 column)
- Tablet: 640-1024px (2 columns)
- Desktop: > 1024px (max-width 1280px centered)

## Constraints

- Do NOT use generic fonts (Inter, Roboto, Arial)
- Do NOT use purple-gradient-on-white cliché
- Do NOT create all sections at once — build one at a time
- Do NOT skip `prefers-reduced-motion` support
- Do NOT use heavy animation libraries — keep particles lightweight
- Always use `next/image` with proper width/height
- Always lazy load below-the-fold content

## Examples

### Example: Setting up Tailwind config
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lavender: '#C8A8E8',
        'sakura-pink': '#F0B0D0',
        'sky-cyan': '#88D8E8',
        mint: '#A8E8D0',
        'sunset-gold': '#F8E0A0',
        peach: '#F8A078',
        'hot-pink': '#FF6090',
        'electric-blue': '#5080F0',
        'neon-teal': '#40C8A0',
        'coral-red': '#F06848',
        'retro-yellow': '#F0D040',
        'dark-navy': '#1A1A2E',
        'deep-purple': '#2D1B4E',
        'soft-white': '#FFF8F0',
        'muted-lilac': '#B0A0C8',
      },
      fontFamily: {
        display: ['Righteous', 'cursive'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
```

### Example: Fade-in scroll component
```tsx
"use client";
import { motion } from "framer-motion";

export function FadeInOnScroll({ children, delay = 0 }: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
```

### Example: Neon glow button
```tsx
export function NeonButton({ children, href }: {
  children: React.ReactNode;
  href?: string;
}) {
  return (
    <a
      href={href}
      className="inline-block px-8 py-3.5 bg-hot-pink text-soft-white
                 font-body font-bold rounded-full text-base
                 transition-all duration-300
                 hover:-translate-y-0.5
                 hover:shadow-[0_0_30px_rgba(255,96,144,0.5)]"
    >
      {children}
    </a>
  );
}
```
