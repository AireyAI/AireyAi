# AireyAI Website — Animation & Video Upgrade

**Date:** 2026-04-12
**Scope:** Visual polish pass on `index.html` — add GSAP animation toolkit + 2 generated videos. No layout, content, or structural changes.

## What Changes

### 1. Animation System Swap

**Remove:** All CSS `.fade-up` classes, `.visible` state, the `IntersectionObserver` JS block at the bottom of `index.html`, and associated CSS (`.fade-up`, `.fade-up.visible`, `.d1`–`.d4` delay classes).

**Add:**
- GSAP 3.12.5 CDN (`gsap.min.js` + `ScrollTrigger.min.js`)
- `animations.js` copied from `~/AireyAi_projects/new_client_template/animations.js`
- `data-*` attributes on HTML elements (see per-section mapping below)

### 2. Per-Section Animation Mapping

| Section | Element | Attribute |
|---|---|---|
| **Hero** | Heading ("Tell us about...") | `data-split="chars"` |
| **Hero** | Badge ("AI-Powered Websites") | `data-appear` `data-appear-delay="0.1"` |
| **Hero** | Paragraph | `data-appear` `data-appear-delay="0.3"` |
| **Hero** | CTA buttons | `data-appear` `data-appear-delay="0.5"` + `data-magnetic` |
| **Hero** | Floating UI cards (3x) | `data-appear` with delays `0.4`, `0.6`, `0.8` |
| **How It Works** | Section label + title | `data-reveal="fade-up"` |
| **How It Works** | Steps container | `data-stagger-parent` |
| **How It Works** | Each step | `data-stagger-child` |
| **How It Works** | Visual mockup panel | `data-reveal="fade-left"` |
| **What's Included** | Section header | `data-reveal="fade-up"` |
| **What's Included** | Cards container | `data-stagger-parent` |
| **What's Included** | Each card (6x) | `data-stagger-child` + `data-tilt` |
| **Portfolio** | Section header | `data-reveal="fade-up"` |
| **Portfolio** | Each project card (3x) | `data-reveal="zoom"` with delays `0`, `0.15`, `0.3` |
| **Pricing** | Section header | `data-reveal="fade-up"` |
| **Pricing** | Cards container | `data-stagger-parent` |
| **Pricing** | Each pricing card (3x) | `data-stagger-child` |
| **Pricing** | Price amounts (£299, £599, £999) | `data-counter` + `data-counter-suffix=""` |
| **Pricing** | CTA buttons | `data-magnetic` |
| **Testimonials** | Cards container | `data-stagger-parent` |
| **Testimonials** | Each card | `data-stagger-child` |
| **CTA** | Heading | `data-split="words"` |
| **CTA** | Paragraph | `data-reveal="fade-up"` |
| **CTA** | Button | `data-reveal="fade-up"` + `data-magnetic` |
| **Nav** | "Get Started" button | `data-magnetic` |
| **Splash** | No change — CSS keyframes stay |

### 3. Generated Videos (Nano Banana 2)

**Video 1 — Hero Background**
- **Prompt:** "Abstract flowing digital particles and light trails in dark space, mint green (#00e5a0) and deep purple accents, slow cinematic movement, futuristic AI technology feel, very dark background, seamless loop"
- **Placement:** `<video>` element inside `.hero`, positioned absolute behind the hero grid
- **Styling:** `opacity: 0.15–0.25`, `object-fit: cover`, `width: 100%`, `height: 100%`, `autoplay`, `muted`, `loop`, `playsinline`
- **Mobile:** Hidden below 768px (`display: none`) to save bandwidth

**Video 2 — CTA Accent**
- **Prompt:** "Subtle glowing particles converging to a central point, mint green light on pure black background, slow ethereal movement, abstract energy gathering, minimalist, seamless loop"
- **Placement:** `<video>` element inside `.cta-section`, replaces or layers behind the existing `.cta-glow` gradient
- **Styling:** Same as hero — low opacity, absolute positioned, cover, looping
- **Mobile:** Hidden below 768px

### 4. What Stays the Same

- Dark theme, all CSS custom properties (mint, bg, surface, etc.)
- Syne + DM Sans font pairing
- Layout structure — all sections, grids, responsive breakpoints
- All content/copy
- Splash screen (CSS keyframes)
- Background orbs (CSS animations)
- Noise texture overlay
- `brief.html` and `portfolio/` — untouched
- Nav scroll behavior
- WhatsApp button, scroll-to-top button

## Files

| File | Action |
|---|---|
| `index.html` | Edit — add script tags, data attributes, video elements, remove old fade-up system |
| `animations.js` | Copy from `~/AireyAi_projects/new_client_template/animations.js` |
| `generated-videos/hero-bg.mp4` | New — generated via Nano Banana 2 |
| `generated-videos/cta-accent.mp4` | New — generated via Nano Banana 2 |

## Out of Scope

- No new sections or pages
- No content changes
- No color/font changes
- No layout restructuring
- No changes to `brief.html` or `portfolio/`
- No dark mode toggle (already dark-only)
