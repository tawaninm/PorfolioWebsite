# DESIGN_SPEC.md — Portfolio Website

> **READ THIS FILE FIRST before writing any code.**
> This is the single source of truth for all design decisions.

---

## 1. Project Overview

- **Type**: Personal portfolio website
- **Role**: UX/UI Designer, Programmer, CI (Corporate Identity) Artist
- **Language**: English
- **Style**: Japan City Pop Retro — pastel neon, bubbly, dreamy, comic-inspired
- **Mood**: Fun, creative, professional but playful — like a retro Japanese magazine cover meets modern web
- **Framework**: Next.js 14+ (App Router) + Tailwind CSS + Framer Motion
- **Deployment**: Vercel

---

## 2. Color Palette

### Primary Backgrounds (pastel, dreamy)
```
--lavender:      #C8A8E8    /* main background, hero gradient start */
--sakura-pink:   #F0B0D0    /* gradient mid, card backgrounds */
--sky-cyan:      #88D8E8    /* gradient end, cool accent */
--mint:          #A8E8D0    /* secondary accent, tags */
--sunset-gold:   #F8E0A0    /* warm highlight */
--peach:         #F8A078    /* warm accent, sunset vibe */
```

### Accent / Neon Pop (buttons, hover, highlights, CTA)
```
--hot-pink:      #FF6090    /* primary CTA, hover glow */
--electric-blue: #5080F0    /* links, interactive elements */
--neon-teal:     #40C8A0    /* success, active states */
--coral-red:     #F06848    /* badges, alerts */
--retro-yellow:  #F0D040    /* sparkle, star effects */
```

### Neutral / Text
```
--dark-navy:     #1A1A2E    /* primary text on light bg */
--deep-purple:   #2D1B4E    /* headings on light bg */
--soft-white:    #FFF8F0    /* text on dark sections */
--muted-lilac:   #B0A0C8    /* secondary text, captions */
```

### Gradient Presets
```css
/* Hero background — diagonal sweep */
.gradient-hero {
  background: linear-gradient(135deg, #C8A8E8 0%, #F0B0D0 40%, #88D8E8 100%);
}

/* Sunset mood — for alternate sections */
.gradient-sunset {
  background: linear-gradient(135deg, #F8A078 0%, #F0B0D0 50%, #C8A8E8 100%);
}

/* Card hover glow */
.glow-pink {
  box-shadow: 0 0 30px rgba(255, 96, 144, 0.4);
}

/* Neon border on hover */
.neon-border {
  border: 2px solid transparent;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.neon-border:hover {
  border-color: #FF6090;
  box-shadow: 0 0 20px rgba(255, 96, 144, 0.3), 0 0 40px rgba(255, 96, 144, 0.1);
}
```

---

## 3. Typography

### Fonts (Google Fonts)
```css
/* Display / Headings — bubbly, retro feel */
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

/* Body / UI text — clean, modern, readable */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');

/* Mono / Code snippets */
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');
```

### Usage
| Element | Font | Weight | Size (desktop) | Size (mobile) |
|---------|------|--------|----------------|---------------|
| Hero title | Righteous | 400 | 72-96px | 36-48px |
| Section headings | Righteous | 400 | 40-48px | 28-32px |
| Subheadings | DM Sans | 700 | 24-28px | 18-22px |
| Body text | DM Sans | 400 | 16-18px | 14-16px |
| Captions / tags | DM Sans | 500 | 12-14px | 12px |
| Code blocks | JetBrains Mono | 400 | 14px | 13px |

### Text Styling
- Headings can use gradient text effect:
  ```css
  .gradient-text {
    background: linear-gradient(90deg, #FF6090, #5080F0, #40C8A0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ```
- Add subtle text-shadow on hero text for depth:
  ```css
  text-shadow: 2px 4px 12px rgba(192, 128, 255, 0.3);
  ```

---

## 4. Sections & Layout

### 4.1 Navigation
- Fixed top nav, glassmorphism style:
  ```css
  backdrop-filter: blur(12px);
  background: rgba(200, 168, 232, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  ```
- Logo left (can be a small illustration or text logo in Righteous font)
- Nav links right: Home, About, Works, Projects, Contact
- Mobile: hamburger menu with slide-in panel

### 4.2 Hero / Landing
- Full viewport height (100vh)
- Diagonal gradient background (gradient-hero)
- **Particle / sparkle effect**: floating stars, bubbles, or sparkles using canvas or CSS
  - Small circles (2-6px) in retro-yellow (#F0D040) and soft-white
  - Slow float upward, random drift, subtle opacity pulse
  - 30-50 particles, very lightweight
- Large hero title in Righteous font, animated letter-by-letter or word-by-word entrance
- Subtitle: role description in DM Sans
- CTA button with neon glow hover effect
- Optional: hero illustration (user's CI art) floating with parallax

### 4.3 About Me
- Two-column layout (image left, text right) on desktop; stacked on mobile
- Profile illustration or avatar in city pop style
- Brief bio paragraphs
- Skill tags as rounded pills with pastel backgrounds:
  ```
  UX/UI → sakura-pink bg
  Programming → sky-cyan bg  
  CI Art → mint bg
  ```
- **Fade-in on scroll**: each element animates in as it enters viewport
- Decorative floating shapes (circles, stars) in background with parallax

### 4.4 Works / Portfolio
- Filter tabs at top: All | UX/UI | Programming | CI Art
- Grid layout: 2 columns desktop, 1 column mobile
- Each card:
  - Thumbnail image with rounded corners (16px radius)
  - Project title (DM Sans 700)
  - Category tag (pill shape)
  - Hover: scale(1.03), neon glow shadow, slight rotate(1deg) for playful feel
  - **Comic animation on hover**: speech bubble or star burst effect using CSS pseudo-elements
- Click → opens project detail page or modal

### 4.5 Projects (Detail Page)
- Individual project page with:
  - Hero banner image
  - Project title + date + category
  - Problem → Process → Result sections
  - Image gallery with lightbox
  - Tech stack tags
  - Navigation to prev/next project
- **Parallax**: background elements (decorative shapes) move at different scroll speeds

### 4.6 Contact
- Fun, themed contact section
- Contact form styled like a retro postcard or cassette tape label:
  - Name, Email, Message fields
  - Submit button with hot-pink glow
- Social links as illustrated icons (GitHub, LinkedIn, Dribbble, etc.)
- Decorative elements: stars, music notes, retro TV shape
- Background: gradient-sunset

### 4.7 Footer
- Simple footer with:
  - Copyright text
  - Social icon links
  - "Made with ♥ and city pop vibes" tagline
  - Subtle gradient border-top

---

## 5. Animation Specifications

### 5.1 Particle / Sparkle Background (Hero)
```
- Library: lightweight custom canvas OR CSS-only with @keyframes
- Particle count: 30-50
- Shapes: circles (70%), 4-point stars (30%)
- Colors: #F0D040 (retro-yellow), #FFF8F0 (soft-white), #FF6090 (hot-pink, rare)
- Size: 2-8px
- Movement: float upward slowly (0.2-0.8px/frame), gentle horizontal drift
- Opacity: pulse between 0.3-1.0
- Respect prefers-reduced-motion: disable if user prefers
```

### 5.2 Fade-in on Scroll
```
- Use Framer Motion <motion.div> with whileInView
- Default: opacity 0→1, translateY 40px→0
- Duration: 0.6-0.8s
- Stagger children: 0.1-0.15s delay between siblings
- Trigger: when 20% of element is visible (viewport: { once: true, amount: 0.2 })
```

### 5.3 Parallax Scroll
```
- Use Framer Motion useScroll + useTransform
- Background decorative elements: move at 0.3-0.5x scroll speed
- Foreground content: normal scroll (1x)
- Hero illustration: slight float effect (0.8x)
- Keep it subtle — city pop is chill, not chaotic
```

### 5.4 Comic Animation
```
- On hover over portfolio cards:
  - CSS pseudo-element speech bubble appears (scale 0→1, ease-out)
  - Or: starburst shape behind card (rotate + scale animation)
  - Small "POW!", "NEW!", or "✦" text inside burst
- On page transitions:
  - Comic panel wipe effect (diagonal or circular reveal)
  - Duration: 0.4-0.6s
```

### 5.5 General Motion Rules
```
- Easing: cubic-bezier(0.16, 1, 0.3, 1) — smooth, bouncy exit
- Never animate layout properties (width, height, top, left) — use transform only
- All animations respect prefers-reduced-motion
- Page load: stagger hero elements (title → subtitle → CTA) with 0.2s delays
- Hover transitions: 0.3s ease
- Scroll animations: 0.6-0.8s
```

---

## 6. Component Patterns

### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: #FF6090;
  color: #FFF8F0;
  padding: 14px 32px;
  border-radius: 50px;          /* pill shape */
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  font-size: 16px;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}
.btn-primary:hover {
  background: #E84878;
  box-shadow: 0 0 30px rgba(255, 96, 144, 0.5);
  transform: translateY(-2px);
}

/* Secondary / outline */
.btn-secondary {
  background: transparent;
  color: #5080F0;
  padding: 12px 28px;
  border-radius: 50px;
  border: 2px solid #5080F0;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  background: rgba(80, 128, 240, 0.1);
  box-shadow: 0 0 20px rgba(80, 128, 240, 0.3);
}
```

### Cards
```css
.card {
  background: rgba(255, 248, 240, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 20px;
  border: 1px solid rgba(200, 168, 232, 0.3);
  overflow: hidden;
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-8px) rotate(1deg);
  box-shadow: 0 20px 60px rgba(192, 128, 232, 0.2), 0 0 30px rgba(255, 96, 144, 0.15);
}
```

### Tags / Pills
```css
.tag {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  font-family: 'DM Sans', sans-serif;
}
.tag-uxui     { background: #F0B0D0; color: #4A1528; }
.tag-code     { background: #88D8E8; color: #04342C; }
.tag-ci-art   { background: #A8E8D0; color: #085041; }
```

---

## 7. Responsive Breakpoints

```
- Mobile:   < 640px   (1 column, stacked layout)
- Tablet:   640-1024px (2 columns where applicable)
- Desktop:  > 1024px   (full layout, max-width 1280px centered)
```

---

## 8. Image & Asset Guidelines

### Folder Structure
```
public/
├── images/
│   ├── hero/
│   │   └── hero-illustration.png    ← main hero art (city pop style)
│   ├── about/
│   │   └── avatar.png               ← profile illustration
│   ├── works/
│   │   ├── project-01-thumb.png     ← portfolio thumbnails (800x600)
│   │   ├── project-01-hero.png      ← project detail hero (1920x1080)
│   │   ├── project-01-gallery-01.png
│   │   └── ...
│   ├── decorative/
│   │   ├── star-sparkle.svg         ← sparkle decoration
│   │   ├── cloud-pastel.svg         ← floating cloud
│   │   ├── circle-gradient.svg      ← background circle
│   │   └── comic-burst.svg          ← comic starburst shape
│   └── icons/
│       ├── github.svg
│       ├── linkedin.svg
│       ├── dribbble.svg
│       └── email.svg
├── fonts/                           ← if self-hosting fonts
└── favicon.ico                      ← city pop style favicon
```

### Image Rules
- All portfolio thumbnails: 800×600px, WebP preferred, < 200KB
- Hero images: 1920×1080px max, compressed
- Use `next/image` with proper width/height for all images
- SVG for all decorative elements and icons
- Lazy load everything below the fold

---

## 9. Dark Mode (Optional Enhancement)

If implementing dark mode:
```
--dark-bg:       #0D0D1A    /* deep space navy */
--dark-surface:  #1A1A2E    /* card backgrounds */
--dark-text:     #FFF8F0    /* primary text */
--dark-muted:    #B0A0C8    /* secondary text */
```
- Keep the same accent colors — neon pops even more on dark
- Gradient backgrounds become deeper/richer versions
- Cards use glassmorphism with darker tint

---

## 10. Performance Targets

- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Use `next/font` for font loading
- Lazy load Framer Motion animations (dynamic import)
- Minimize particle effect on mobile (reduce to 15-20 particles)
- Use CSS animations where possible, JS only when needed

---

## 11. Reference Style Keywords

When prompting for visual decisions, use these keywords:
- **Japan city pop** — 80s Japanese pop culture aesthetic
- **Pastel neon** — soft base colors with bright accent pops
- **Retro bubbly** — rounded corners, pill shapes, soft shadows
- **Comic manga** — speech bubbles, starbursts, halftone dots, action lines
- **Dreamy gradient** — smooth multi-color gradients, atmospheric
- **Kawaii minimal** — cute but not cluttered, generous whitespace

---

## 12. Prompt Templates for Claude Code

### Starting the project:
```
Read DESIGN_SPEC.md first. Initialize a Next.js 14 project with App Router,
Tailwind CSS, and Framer Motion. Set up the color palette as Tailwind config
custom colors and import the Google Fonts specified in the spec.
```

### Building a section:
```
Read DESIGN_SPEC.md. Build the [SECTION NAME] section following the spec exactly.
Use the colors, fonts, animations, and component patterns defined there.
Make it responsive for mobile/tablet/desktop.
```

### Adding images:
```
I'm adding images to public/images/[folder]. Update the [SECTION] to use these
images. Follow the image rules in DESIGN_SPEC.md (next/image, lazy loading, proper sizing).
```

### Refining style:
```
The [SECTION] looks too plain. Reference DESIGN_SPEC.md section 11 (style keywords)
and add more city pop personality: floating decorative shapes with parallax,
comic-style hover effects, and sparkle particles.
```
