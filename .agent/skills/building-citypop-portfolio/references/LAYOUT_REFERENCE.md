# LAYOUT_REFERENCE.md — Patterns from Reference Portfolios

> Blended with our Japan City Pop Retro aesthetic.
> Agent: Read this file when building any section.

---

## Source Analysis

### Angelin Wilson (angelinwilson.framer.website)
- **Hero**: Large name typography with emoji wave, role badge ("2+ Years / Product Designer"), profile photo
- **Layout**: Bento grid cards — "About me", "Resume", "Projects" as clickable tiles
- **Projects**: Numbered project cards (01, 02, 03...) with large thumbnail, project name, category tag, "Check out / See" CTA
- **Scrolling marquee**: Tool icons (Figma, Photoshop, etc.) looping horizontally
- **Footer**: Social icons (Behance, Email, LinkedIn) + personality tagline
- **Interaction**: Hover reveals on project cards, infinite scroll image carousel

### Deepti Sharma (deeptisharma.co)
- **Hero**: Split layout — large kinetic typography left ("Crafting Contemporary & Innovative Digital Experiences") + profile photo right
- **Nav**: Clean horizontal — Home, Projects, Resume, About Me, Contact Me
- **Projects**: Full-width case study cards — brand name, bold title, description paragraph, category tags, animated preview (GIF/video)
- **Bio section**: Short paragraph intro with "View Resume" CTA
- **Footer**: Contact section with social links
- **Typography**: Mixed sizes — huge display text with smaller body text creating visual hierarchy

---

## Patterns to Adopt (Adapted to City Pop Style)

### Hero Section
Combine both approaches:
- **Kinetic typography** from Deepti — but with Righteous font and gradient text effect
- **Role badge** from Angelin — pill-shaped "X Years / UX Designer & CI Artist"
- **Profile illustration** instead of photo — city pop character art style
- Layout: text-heavy left side + floating illustration right side
- Staggered entrance animation: title words appear one by one

### Navigation
Follow Deepti's clean horizontal pattern:
- Fixed top with glassmorphism (our city pop version)
- Links: Home, About, Works, Projects, Contact
- Logo: custom hand-drawn logotype or initials in Righteous font
- Mobile: slide-in panel with pastel gradient background

### Bento Grid (About Section)
Adopt Angelin's bento card approach:
- Grid of cards with different sizes (2×1, 1×1, 1×2)
- Cards: "About Me" (large, with bio), "Skills" (with tool marquee), "Experience" (years + role), "Fun Fact" (personality card)
- Each card: rounded corners 20px, glassmorphism, unique pastel bg color
- Hover: slight float + neon glow

### Skill Marquee
From Angelin — horizontal infinite scroll:
- Tool icons: Figma, Photoshop, Procreate, VS Code, React, TypeScript, etc.
- Style: rounded pill for each, pastel bg, icon + name
- Speed: slow and smooth, pause on hover
- Implementation: CSS animation with duplicated items for seamless loop

### Project Cards (Works Section)
Blend both approaches:
- **Numbered** like Angelin (01, 02, 03...)
- **Full description** like Deepti (brand name, title, summary, category tags)
- **Large thumbnail** with animated preview on hover (scale + subtle movement)
- Layout: alternating — odd projects image-left/text-right, even projects reversed
- Category tags as colored pills (our existing tag system)
- CTA: "View Case Study" button with neon glow

### Project Detail Page
Follow Deepti's case study depth:
- Hero: full-width project banner with gradient overlay
- Sections: Overview → Problem → Process → Solution → Results
- Image gallery: full-bleed screenshots between text sections
- Tech stack: pill tags at top
- Prev/Next navigation at bottom

### Contact Section
Blend both:
- Personality-driven tagline like Angelin ("Let's create something amazing together!")
- Clean form like Deepti but styled as retro postcard
- Social links as illustrated circular icons with hover glow
- Background: sunset gradient

### Footer
- Minimal like Deepti: social icons + copyright
- Add Angelin's personality touch: "Built with pixels, patience, and city pop playlists on repeat"
- Marquee-style scrolling tagline (optional)

---

## Component Additions for Agent

### Bento Grid Card
```tsx
// Example bento grid item
<motion.div
  className="bg-soft-white/70 backdrop-blur-md rounded-2xl border border-lavender/30
             p-6 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(192,128,232,0.2)]
             transition-all duration-300"
  whileHover={{ scale: 1.02 }}
>
  {children}
</motion.div>
```

### Skill Marquee
```tsx
// Infinite horizontal scroll
<div className="overflow-hidden">
  <div className="flex gap-4 animate-marquee">
    {[...skills, ...skills].map((skill, i) => (
      <div key={i} className="flex items-center gap-2 px-4 py-2
                               bg-lavender/20 rounded-full whitespace-nowrap">
        <Image src={skill.icon} alt="" width={20} height={20} />
        <span className="font-body text-sm text-dark-navy">{skill.name}</span>
      </div>
    ))}
  </div>
</div>

// In tailwind.config.ts add:
// animation: { marquee: 'marquee 30s linear infinite' }
// keyframes: { marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } } }
```

### Numbered Project Card
```tsx
<div className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
  {/* Number */}
  <span className="absolute -left-4 top-0 font-display text-8xl
                   text-lavender/30 select-none">
    {String(index + 1).padStart(2, '0')}
  </span>

  {/* Image */}
  <div className="overflow-hidden rounded-2xl">
    <Image
      src={project.thumbnail}
      alt={project.title}
      className="group-hover:scale-105 transition-transform duration-500"
    />
  </div>

  {/* Content */}
  <div className="space-y-4">
    <span className="text-sm font-body font-medium text-muted-lilac uppercase tracking-wider">
      {project.category}
    </span>
    <h3 className="font-display text-3xl text-deep-purple">
      {project.title}
    </h3>
    <p className="font-body text-dark-navy/70 leading-relaxed">
      {project.summary}
    </p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map(tag => (
        <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-sky-cyan/30 text-dark-navy">
          {tag}
        </span>
      ))}
    </div>
    <NeonButton href={`/projects/${project.slug}`}>
      View Case Study
    </NeonButton>
  </div>
</div>
```
