# VIBE CODE GUIDE — How to Use This With Claude Code

## Quick Start (5 minutes)

### Step 1: Create Project
Open your terminal and run:
```bash
npx create-next-app@latest my-portfolio --typescript --tailwind --app --use-npm
cd my-portfolio
npm install framer-motion
```

### Step 2: Drop the Files
Copy these into your project root:
```
my-portfolio/
├── DESIGN_SPEC.md          ← this file (design bible)
├── public/
│   └── images/             ← your artwork & photos go here
│       ├── hero/
│       ├── about/
│       ├── works/
│       ├── decorative/
│       └── icons/
└── ... (Next.js files)
```

### Step 3: Prepare Your Images
Before you start vibe coding, drop your images into the right folders:

| What | Where | Size | Format |
|------|-------|------|--------|
| Hero illustration (city pop art) | `public/images/hero/` | 1920×1080 | PNG/WebP |
| Your avatar / profile pic | `public/images/about/` | 800×800 | PNG |
| Project thumbnails | `public/images/works/` | 800×600 | WebP |
| Project detail images | `public/images/works/` | 1920×1080 | WebP |
| Decorative SVGs (optional) | `public/images/decorative/` | any | SVG |

**No images yet?** That's fine — Claude Code will use placeholder colors and shapes. Add images later.

### Step 4: Open Claude Code & Start Vibing

```bash
claude
```

---

## Prompt Flow (Copy-Paste Ready)

### Prompt 1 — Setup
```
Read DESIGN_SPEC.md in this project. Set up the Tailwind config with all
custom colors from the palette, import the Google Fonts (Righteous, DM Sans,
JetBrains Mono), and create the base layout with the glassmorphism navbar.
Don't build any sections yet — just the foundation.
```

### Prompt 2 — Hero Section
```
Read DESIGN_SPEC.md section 4.2. Build the Hero section with:
- Full viewport gradient background
- Sparkle/particle effect (CSS or lightweight canvas)
- Animated title entrance (letter by letter with Framer Motion)
- Subtitle and CTA button with neon glow hover
- If there's an image in public/images/hero/, use it with parallax float
```

### Prompt 3 — About Me
```
Read DESIGN_SPEC.md section 4.3. Build the About section with:
- Two column layout (avatar + bio text)
- Skill tags as colored pills (UX/UI pink, Programming cyan, CI Art mint)
- Fade-in on scroll for each element
- Floating decorative shapes in background with subtle parallax
```

### Prompt 4 — Works / Portfolio
```
Read DESIGN_SPEC.md section 4.4. Build the Works grid with:
- Filter tabs (All, UX/UI, Programming, CI Art)
- Card grid with hover effects (scale, glow, slight rotation)
- Comic-style hover animation (starburst or speech bubble)
- Use images from public/images/works/ or placeholder cards
- Fade-in stagger animation on scroll
```

### Prompt 5 — Projects Detail
```
Read DESIGN_SPEC.md section 4.5. Create a dynamic project detail page
at /projects/[slug]. Include:
- Hero banner, title, date, category
- Problem → Process → Result content sections
- Image gallery
- Tech stack tags
- Prev/next project navigation
- Parallax background decorations
```

### Prompt 6 — Contact
```
Read DESIGN_SPEC.md section 4.6. Build the Contact section with:
- Retro-styled contact form (postcard or cassette tape theme)
- Name, Email, Message fields with city pop styling
- Submit button with hot-pink neon glow
- Social links as icons
- Sunset gradient background
```

### Prompt 7 — Polish & Effects
```
Read DESIGN_SPEC.md sections 5 and 11. Review the entire site and add:
- Smooth page transitions (comic panel wipe)
- Consistent scroll animations across all sections
- prefers-reduced-motion support
- Mobile responsive check (test all breakpoints)
- Reduce particles on mobile for performance
```

### Prompt 8 — Dark Mode (Optional)
```
Read DESIGN_SPEC.md section 9. Add dark mode toggle with:
- Deep navy backgrounds
- Same neon accent colors (they pop more on dark)
- Glassmorphism cards with dark tint
- Smooth transition between modes
```

---

## Tips for Best Results

1. **One section at a time** — don't ask for the whole site at once
2. **Always start with "Read DESIGN_SPEC.md"** — this keeps Claude Code consistent
3. **Drop images first, then prompt** — Claude Code will detect and use them
4. **Be specific about what you don't like** — "the cards feel flat, add more depth" works better than "make it better"
5. **Reference the style keywords** — say "more city pop" or "add comic manga flair" and Claude Code knows what you mean from the spec
6. **Test mobile after each section** — easier to fix one section than the whole site

---

## Sample Project Data Structure

When you're ready to add real content, create this file:

### `data/projects.ts`
```typescript
export interface Project {
  slug: string;
  title: string;
  category: 'uxui' | 'programming' | 'ci-art';
  thumbnail: string;     // path in public/images/works/
  heroImage: string;
  date: string;
  tags: string[];
  summary: string;
  problem: string;
  process: string;
  result: string;
  gallery: string[];     // array of image paths
}

export const projects: Project[] = [
  {
    slug: 'project-name',
    title: 'Project Name',
    category: 'uxui',
    thumbnail: '/images/works/project-01-thumb.webp',
    heroImage: '/images/works/project-01-hero.webp',
    date: '2026',
    tags: ['Figma', 'React', 'Tailwind'],
    summary: 'Brief one-liner about the project.',
    problem: 'What problem did this solve?',
    process: 'How did you approach it?',
    result: 'What was the outcome?',
    gallery: [
      '/images/works/project-01-gallery-01.webp',
      '/images/works/project-01-gallery-02.webp',
    ],
  },
  // ... add more projects
];
```

---

## Deployment

When your site is ready:
```bash
# Push to GitHub
git add .
git commit -m "city pop portfolio complete"
git push

# Deploy on Vercel (automatic if connected to GitHub)
# Or manual:
npx vercel
```

Done! Your city pop portfolio is live. 🎵
