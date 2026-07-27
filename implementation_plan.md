# KÉLYS — Award-Winning 3D Luxury Perfume Website

## Overview
The project already has a solid foundation in React + Vite + Three.js R3F + Framer Motion. The goal is a **complete visual and interaction overhaul** to match the Dribbble reference quality: immersive GPU particle physics, cinematic animations, premium editorial design, and a custom cursor — while keeping the KÉLYS brand identity (ivory/champagne/gold, no dark backgrounds).

---

## Key Gaps vs. Brief
| Feature | Current State | Target |
|---|---|---|
| Particle system | 65 simple floating points (teal) | 280 physics-driven particles (4 types, gold/warm palette, mouse swirl) |
| Hero layout | Split (text left, bottle right) | Centered fullscreen — bottle dominant |
| Custom cursor | Basic radial glow div | Gold ring + dot with lag, hover ripple |
| Color palette | Teal accent (#9ECAD6) | Ivory / Champagne / Luxury Gold only |
| Bottle materials | Basic cylinder, decent glass | Attenuation glass (gold tint), upgraded lighting, no OrbitControls |
| Footer | Dark charcoal background | Light champagne editorial |
| Typography sizes | Standard | Large editorial / `8vw` hero brand name |
| GSAP | Not installed | Install, use for hero letter-by-letter reveal |

---

## Proposed Changes

### Design System (`src/index.css`)
#### [MODIFY] [index.css](file:///c:/Users/INSPIRE/KELYS/client/src/index.css)
- Update brand color tokens: `--color-brand-morning-glory: #D4B483` (warm champagne-gold, replaces teal — automatically fixes hover states across ALL components)
- Update `brand-gold` → `#C8A34A`, `brand-charcoal` → `#2D2B29`
- Add `brand-champagne`, `brand-pearl`, `brand-gold-deep`, `brand-bronze`, `brand-warmgray`
- Add `cursor: none !important` globally (custom cursor takes over)
- Add `.cursor-outer` and `.cursor-dot` CSS
- Add premium utility classes: `btn-luxury`, `divider-gold`, `editorial-display`
- New keyframes: `drift`, updated `float-slow`, `glow`

---

### New Components

#### [NEW] `src/components/LuxuryParticleCanvas.jsx`
The **crown jewel** of the upgrade. A fullscreen HTML Canvas 2D particle system:
- **280 particles**, 4 types:
  - `mist` — large soft radial-gradient blobs (barely visible at rest, glows on attraction)
  - `flake` — small diamond-shaped gold flakes with rotation
  - `petal` — elongated ellipse, warm champagne
  - `shimmer` — tiny cross/star with bloom glow
- **Mouse physics**: attraction force + **perpendicular swirl** (the key to recreating the Dribbble spiral quality) + near-field repulsion (< 55px)
- **Natural drift**: upward float + sine-wave lateral sway
- **Opacity boost** when near mouse (particles glow brighter when attracted)
- **IntersectionObserver**: pauses RAF when hero not visible (performance)
- **ResizeObserver**: handles canvas resize gracefully
- Pointer-events: none — lets all clicks pass through

#### [NEW] `src/components/LuxuryCursor.jsx`
- **Inner dot** (6px, gold fill, immediate follow, `box-shadow` gold glow)
- **Outer ring** (40px, gold border, lagged follow via `requestAnimationFrame` lerp at 0.12)
- Hover state: ring expands to 60px + soft gold fill
- Click state: transforms to 0.75 scale
- Works globally via `document.addEventListener('mouseover')`

---

### Component Rewrites

#### [MODIFY] [Hero.jsx](file:///c:/Users/INSPIRE/KELYS/client/src/components/Hero.jsx)
**Fullscreen centered layout:**
```
MAISON DE PARFUM · PARIS  (gold badge, spaced)

    [3D Perfume Bottle — dominant, centered]
       (w-[420px] h-[560px] on desktop)

K  É  L  Y  S  (large editorial serif, 8vw)
Luxury in every breath (italic Playfair)

[EXPLORE COLLECTION]  [OUR STORY]

─────────────────────────────────
100% Rare Elixirs | Paris | Bespoke

↓ (scroll indicator with animated line)
```
- `<LuxuryParticleCanvas />` covers full section as absolute background (z-1)
- Staggered framer-motion entrance with `[0.16, 1, 0.3, 1]` ease
- Bottle has 6 ambient glow rings (pulsing, soft gold)
- Scroll indicator animates in at delay 2.5s

#### [MODIFY] [PerfumeBottle3D.jsx](file:///c:/Users/INSPIRE/KELYS/client/src/components/PerfumeBottle3D.jsx)
- **Glass material upgrade**: add `attenuationColor: "#C8A34A"` + `attenuationDistance: 0.6` → beautiful warm gold tint visible through the glass (the "bottle of golden liquid" effect)
- **Remove `<OrbitControls>`** — replace with purely mouse-driven rotation
- **Smoother lerp** on rotation: `0.03` (was `0.05`) — more cinematic
- **Auto-rotation** very slow: `elapsed * 0.035` (was `0.1`)
- **Better lighting**: add warm rim light behind bottle (`spotLight` with gold color), tune ambient to `0.5`
- **3D particles**: color changed from teal `#9ECAD6` → gold `#C8A34A` with size `0.022`
- **Camera**: move to `z: 3.8, fov: 42` — bottle appears larger
- **Label texture**: update KÉLYS text with correct accent, add thinner borders, champagne background
- **WebGL renderer**: add `ACESFilmicToneMapping` + exposure `1.2` for cinematic look

#### [MODIFY] [App.jsx](file:///c:/Users/INSPIRE/KELYS/client/src/App.jsx)
- Import and render `<LuxuryCursor />`
- Remove old `cursor-glow` div and `mousePos` state (cursor now self-managed)
- Keep `noise-overlay`

#### [MODIFY] [Footer.jsx](file:///c:/Users/INSPIRE/KELYS/client/src/components/Footer.jsx)
- Change from dark `bg-brand-charcoal` → light `bg-brand-champagne` theme
- Update all text colors to charcoal/warmgray
- Add gold accent dividers

#### [MODIFY] [Home.jsx](file:///c:/Users/INSPIRE/KELYS/client/src/pages/Home.jsx)
- Update loading screen to use new brand palette (no morning-glory teal)
- Improve loading animation timing

#### Minor Updates (auto-fixed by color variable change):
- `Navbar.jsx` — hover links will auto-update from teal → warm gold via CSS variable
- `Collection.jsx`, `About.jsx`, `Ingredients.jsx`, `Experience.jsx`, `Reviews.jsx`, `Contact.jsx` — all hover/glow effects auto-update

---

## Installation
```bash
npm install gsap  # in client/ directory
```
GSAP will be used in `Hero.jsx` for the letter-by-letter stagger reveal of "KÉLYS".

## Verification Plan
1. `npm run dev` — confirm dev server starts without errors
2. Open browser — verify:
   - Custom gold cursor visible, system cursor hidden
   - Hero particle field: particles float gently, swirl elegantly on mouse move
   - Bottle centered, floating, glass with warm gold tint
   - All sections load correctly with updated gold/champagne palette (no teal anywhere)
   - Footer is light champagne (not dark)
   - Loading screen shows KÉLYS logo correctly
3. Test responsive: resize to mobile, check bottle/text stack correctly
