# AireyAI Animation & Visual Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the AireyAI agency site with GSAP animations (via `animations.js` toolkit) and generated atmospheric images for the hero and CTA sections. No layout, content, or structural changes.

**Architecture:** In-place upgrade of `index.html`. Remove the existing CSS fade-up animation system (classes + IntersectionObserver JS). Replace with GSAP + ScrollTrigger + the AireyAI `animations.js` toolkit using `data-*` attributes. Generate 2 atmospheric background images via Nano Banana 2 MCP and place them behind the hero and CTA sections.

**Tech Stack:** GSAP 3.12.5, ScrollTrigger, `animations.js` (existing toolkit), Nano Banana 2 (image generation)

---

### Task 1: Copy animations.js into the project

**Files:**
- Copy: `~/AireyAi_projects/new_client_template/animations.js` → `~/AireyAI/animations.js`

- [ ] **Step 1: Copy the file**

```bash
cp ~/AireyAi_projects/new_client_template/animations.js ~/AireyAI/animations.js
```

- [ ] **Step 2: Verify the copy**

```bash
head -5 ~/AireyAI/animations.js
```

Expected: First 5 lines showing the `AireyAI Animation Toolkit` header comment.

- [ ] **Step 3: Commit**

```bash
cd ~/AireyAI
git add animations.js
git commit -m "Add AireyAI animation toolkit (animations.js)"
```

---

### Task 2: Generate hero background image via Nano Banana 2

**Files:**
- Create: `~/AireyAI/generated-images/hero-bg.png`

- [ ] **Step 1: Ensure output directory exists**

```bash
mkdir -p ~/AireyAI/generated-images
```

- [ ] **Step 2: Generate the hero background image**

Use the `mcp__nano-banana-2__generate_image` tool:
- **prompt:** `"Abstract flowing digital particles and soft light trails in very dark space. Mint green (#00e5a0) and deep purple (#503cff) glowing accents. Slow ethereal movement feel, futuristic AI technology atmosphere. Very dark near-black (#070710) background. Cinematic, minimal, wide composition. No text, no UI elements."`
- **aspectRatio:** `"16:9"`
- **resolution:** `"2K"`
- **returnInlineImage:** `false`
- **thinking:** `"high"`

- [ ] **Step 3: Move the generated image to the project**

```bash
# Replace SOURCE_PATH with the actual path returned by Nano Banana 2
cp SOURCE_PATH ~/AireyAI/generated-images/hero-bg.png
```

- [ ] **Step 4: Commit**

```bash
cd ~/AireyAI
git add generated-images/hero-bg.png
git commit -m "Add generated hero background image"
```

---

### Task 3: Generate CTA accent image via Nano Banana 2

**Files:**
- Create: `~/AireyAI/generated-images/cta-accent.png`

- [ ] **Step 1: Generate the CTA accent image**

Use the `mcp__nano-banana-2__generate_image` tool:
- **prompt:** `"Subtle glowing particles converging toward a central point of light. Mint green (#00e5a0) glow on pure black background. Ethereal, abstract energy gathering. Minimalist, soft radial composition. No text, no UI elements."`
- **aspectRatio:** `"16:9"`
- **resolution:** `"2K"`
- **returnInlineImage:** `false`
- **thinking:** `"high"`

- [ ] **Step 2: Move the generated image to the project**

```bash
cp SOURCE_PATH ~/AireyAI/generated-images/cta-accent.png
```

- [ ] **Step 3: Commit**

```bash
cd ~/AireyAI
git add generated-images/cta-accent.png
git commit -m "Add generated CTA accent background image"
```

---

### Task 4: Add GSAP + ScrollTrigger + animations.js script tags to index.html

**Files:**
- Modify: `~/AireyAI/index.html` (just before `</body>`, after the existing `<script>` block)

- [ ] **Step 1: Add the three script tags**

Find the closing `</script>` tag at line ~1507 (the last line of the inline script block). Immediately after it, before `</body>`, add:

```html
<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<!-- AireyAI Animation Toolkit -->
<script src="animations.js"></script>
```

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP + ScrollTrigger + animations.js script tags"
```

---

### Task 5: Remove the old CSS fade-up animation system

**Files:**
- Modify: `~/AireyAI/index.html`

This task removes the old animation system in three parts: CSS classes, HTML class attributes, and the IntersectionObserver JS.

- [ ] **Step 1: Remove the CSS rules for `.fade-up`**

Delete these CSS rules (around lines 700–709):

```css
  .fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
  .fade-up.d1 { transition-delay: 0.1s; }
  .fade-up.d2 { transition-delay: 0.2s; }
  .fade-up.d3 { transition-delay: 0.3s; }
  .fade-up.d4 { transition-delay: 0.4s; }
```

- [ ] **Step 2: Remove the IntersectionObserver JS**

Delete these lines from the bottom `<script>` block (around lines 1500–1506):

```javascript
  // Scroll-driven entrance animations
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

- [ ] **Step 3: Strip all `fade-up`, `d1`, `d2`, `d3`, `d4` classes from HTML elements**

Search the HTML body for every instance of `class="...fade-up..."` and remove the `fade-up`, `d1`, `d2`, `d3`, `d4` class names. If the element has no other classes, remove the `class` attribute entirely. If it has other classes (e.g., `class="section-label fade-up"` → `class="section-label"`), keep the other classes.

Elements to clean (every one in the file):
- `.hero-badge.fade-up` → `.hero-badge`
- `h1.fade-up.d1` → `h1`
- `.hero p.fade-up.d2` → `.hero p`
- `.hero-actions.fade-up.d3` → `.hero-actions`
- `.hero-visual.fade-up.d2` → `.hero-visual`
- `.section-label.fade-up` (×5 — How, Cards, Portfolio, Pricing, Testimonials, FAQ) → `.section-label`
- `.section-title.fade-up.d1` (×5) → `.section-title`
- `.section-sub.fade-up.d2` (×5) → `.section-sub`
- `.steps-list.fade-up.d1` → `.steps-list`
- `.how-visual.fade-up.d2` → `.how-visual`
- Each `.card.fade-up.d1/d2/d3` (×6) → `.card`
- Each `.portfolio-card.fade-up.d1/d2/d3` (×3) → `.portfolio-card`
- Each `.pricing-card.fade-up.d1/d2/d3` (×3) → `.pricing-card` (keep `featured` class on the middle one)
- Each `.testimonial-card.fade-up.d1/d2/d3` (×3) → `.testimonial-card`
- `.faq-list.fade-up.d1` → `.faq-list`
- CTA `h2.fade-up` → `h2`
- CTA `p.fade-up.d1` → `p`
- CTA `.btn-primary.fade-up.d2` → `.btn-primary`

- [ ] **Step 4: Verify no `fade-up` references remain**

```bash
grep -n "fade-up" ~/AireyAI/index.html
```

Expected: No output (zero matches).

- [ ] **Step 5: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Remove old CSS fade-up animation system and IntersectionObserver"
```

---

### Task 6: Add data-* animation attributes to Hero section

**Files:**
- Modify: `~/AireyAI/index.html` (Hero section, around lines 994–1071)

- [ ] **Step 1: Add hero background image element**

Inside the `<section class="hero">`, right after the opening tag and before `<div class="container">`, add:

```html
  <img src="generated-images/hero-bg.png" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.18;pointer-events:none;z-index:0;mix-blend-mode:screen;" class="hero-bg-img">
```

Add this CSS rule inside the `<style>` block, in the responsive section (`@media (max-width: 768px)`):

```css
    .hero-bg-img { display: none; }
```

- [ ] **Step 2: Add animation attributes to hero elements**

Apply these attributes to the hero HTML elements:

1. Hero badge (`<div class="hero-badge">`) — add: `data-appear data-appear-delay="0.1"`
2. Hero h1 — add: `data-split="chars"`
3. Hero paragraph — add: `data-appear data-appear-delay="0.3"`
4. Hero actions div (`<div class="hero-actions">`) — add: `data-appear data-appear-delay="0.5"`
5. "Start your brief" button (`<a href="brief.html" class="btn-primary">`) — add: `data-magnetic`
6. Each of the 3 `.hv-card` elements — add `data-appear` with delays `0.4`, `0.6`, `0.8` respectively

- [ ] **Step 3: Add data-magnetic to nav CTA**

The nav "Get Started" button (`<a href="brief.html" class="nav-cta">`) — add: `data-magnetic`

- [ ] **Step 4: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to hero section + hero background image"
```

---

### Task 7: Add data-* animation attributes to How It Works section

**Files:**
- Modify: `~/AireyAI/index.html` (How It Works section, around lines 1076–1137)

- [ ] **Step 1: Add animation attributes**

1. Section label (`<div class="section-label">How it works</div>`) — add: `data-reveal="fade-up"`
2. Section title (`<h2 class="section-title">`) — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Section sub paragraph — add: `data-reveal="fade-up" data-reveal-delay="0.2"`
4. Steps list container (`<div class="steps-list">`) — add: `data-stagger-parent`
5. Each `.step-item` (×3) — add: `data-stagger-child`
6. Visual mockup panel (`<div class="how-visual">`) — add: `data-reveal="fade-left"`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to How It Works section"
```

---

### Task 8: Add data-* animation attributes to What's Included section

**Files:**
- Modify: `~/AireyAI/index.html` (What's Included / cards section, around lines 1142–1192)

- [ ] **Step 1: Add animation attributes**

1. Section label — add: `data-reveal="fade-up"`
2. Section title — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Cards grid container (`<div class="cards-grid">`) — add: `data-stagger-parent`
4. Each `.card` (×6) — add: `data-stagger-child data-tilt`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to What's Included section"
```

---

### Task 9: Add data-* animation attributes to Portfolio section

**Files:**
- Modify: `~/AireyAI/index.html` (Portfolio section, around lines 1196–1235)

- [ ] **Step 1: Add animation attributes**

1. Section label — add: `data-reveal="fade-up"`
2. Section title — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Section sub — add: `data-reveal="fade-up" data-reveal-delay="0.2"`
4. First portfolio card (Wheelie Clean) — add: `data-reveal="zoom"`
5. Second portfolio card (Dolled by Louise) — add: `data-reveal="zoom" data-reveal-delay="0.15"`
6. Third portfolio card (Charm) — add: `data-reveal="zoom" data-reveal-delay="0.3"`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to Portfolio section"
```

---

### Task 10: Add data-* animation attributes to Pricing section

**Files:**
- Modify: `~/AireyAI/index.html` (Pricing section, around lines 1239–1290)

- [ ] **Step 1: Add animation attributes**

1. Section label — add: `data-reveal="fade-up"`
2. Section title — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Section sub — add: `data-reveal="fade-up" data-reveal-delay="0.2"`
4. Pricing grid container (`<div class="pricing-grid">`) — add: `data-stagger-parent`
5. Each `.pricing-card` (×3) — add: `data-stagger-child`
6. Each `.pricing-price` (×3) — modify the text content and add counter attributes:
   - Starter: change `<div class="pricing-price"><span>£</span>299</div>` to `<div class="pricing-price"><span>£</span><span data-counter="299" data-counter-prefix="">0</span></div>`
   - Growth: change to `<div class="pricing-price"><span>£</span><span data-counter="599" data-counter-prefix="">0</span></div>`
   - Pro: change to `<div class="pricing-price"><span>£</span><span data-counter="999" data-counter-prefix="">0</span></div>`
7. Each `.btn-pricing` (×3) — add: `data-magnetic`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to Pricing section"
```

---

### Task 11: Add data-* animation attributes to Testimonials section

**Files:**
- Modify: `~/AireyAI/index.html` (Testimonials section, around lines 1294–1336)

- [ ] **Step 1: Add animation attributes**

1. Section label — add: `data-reveal="fade-up"`
2. Section title — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Section sub — add: `data-reveal="fade-up" data-reveal-delay="0.2"`
4. Testimonials grid container (`<div class="testimonials-grid">`) — add: `data-stagger-parent`
5. Each `.testimonial-card` (×3) — add: `data-stagger-child`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to Testimonials section"
```

---

### Task 12: Add data-* animation attributes to FAQ section

**Files:**
- Modify: `~/AireyAI/index.html` (FAQ section, around lines 1340–1398)

- [ ] **Step 1: Add animation attributes**

1. Section label — add: `data-reveal="fade-up"`
2. Section title — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. Section sub paragraph (with email link) — add: `data-reveal="fade-up" data-reveal-delay="0.2"`
4. FAQ list container (`<div class="faq-list">`) — add: `data-reveal="fade-up" data-reveal-delay="0.1"`

- [ ] **Step 2: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add GSAP animation attributes to FAQ section"
```

---

### Task 13: Add CTA accent image and animation attributes to CTA section

**Files:**
- Modify: `~/AireyAI/index.html` (CTA section, around lines 1402–1418)

- [ ] **Step 1: Add CTA accent background image**

Inside `<section class="cta-section">`, right after the existing `<div class="cta-glow"></div>`, add:

```html
  <img src="generated-images/cta-accent.png" alt="" aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.12;pointer-events:none;z-index:1;mix-blend-mode:screen;" class="cta-bg-img">
```

Add to the responsive CSS (`@media (max-width: 768px)`):

```css
    .cta-bg-img { display: none; }
```

- [ ] **Step 2: Add animation attributes to CTA elements**

1. CTA heading (`<h2>`) — add: `data-split="words"`
2. CTA paragraph — add: `data-reveal="fade-up" data-reveal-delay="0.1"`
3. CTA button (`<a href="brief.html" class="btn-primary" ...>`) — add: `data-reveal="fade-up" data-reveal-delay="0.2" data-magnetic`

- [ ] **Step 3: Add data-magnetic to WhatsApp floating button**

The WhatsApp button (`<a href="https://wa.me/..." class="whatsapp-btn">`) — add: `data-magnetic`

- [ ] **Step 4: Commit**

```bash
cd ~/AireyAI
git add index.html
git commit -m "Add CTA accent image and animation attributes to CTA + footer"
```

---

### Task 14: Serve locally and verify in browser

**Files:**
- No file changes — verification only

- [ ] **Step 1: Start a local server**

```bash
cd ~/AireyAI && python3 -m http.server 3005 &
```

(AireyAI uses port 3005 to avoid conflicts with client project servers on 3000.)

- [ ] **Step 2: Open in Playwright and take a screenshot**

Use `mcp__playwright__browser_navigate` to open `http://localhost:3005` and take a screenshot. Verify:
- Splash screen plays, then fades
- Hero heading animates in character by character
- Hero badge, paragraph, and CTA buttons appear in sequence
- Hero background image is visible at low opacity behind the hero
- Scrolling triggers section reveals (How It Works steps stagger in, cards stagger + tilt on hover, portfolio zooms in, pricing counters animate, testimonials stagger)
- CTA accent image visible behind the CTA section
- All `data-magnetic` buttons respond to mouse movement
- Mobile: hero and CTA background images are hidden

- [ ] **Step 3: Fix any issues found**

If anything is broken (missing animations, overlapping elements, broken layout), fix the specific issue and re-verify.

- [ ] **Step 4: Stop the server when done**

```bash
kill %1
```
