# Plenara — Premium Wellness & Healthcare Platform

A pixel-faithful, conversion-focused wellness landing experience inspired by
[plenara.webflow.io](https://plenara.webflow.io). Built with a luxury editorial
aesthetic: Playfair Display serif headings on Inter Tight body, a warm ivory
palette with deep-navy sections and lime accents, generous spacing rhythm, and a
buttery smooth-scroll motion system.

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** design-token system (fluid `clamp()` typography & spacing)
- **Framer Motion** — nav, hover states, mobile overlay, card reveals, accordions
- **GSAP + ScrollTrigger** — hero timeline, parallax, counters, scroll reveals
- **SplitType** — cinematic word-by-word blur-to-focus heading reveals
- **Lenis** — synchronized smooth scrolling
- **React Icons** — iconography
- Optimized image delivery via `next/image`

## Sections

Navbar (sticky glass + fullscreen mobile menu) · Hero (parallax + Play Now card) ·
Trust bar · About (animated counters) · Programs (sticky stacking cards) ·
Benefits (radial orbit) · How We Work (sticky steps) · Pricing · Testimonials
(auto-marquee) · Facilities · Marquee · Team · Blog · CTA · App Download · FAQ
(2-col accordion) · Footer.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Design Tokens

| Token        | Value     |
| ------------ | --------- |
| Ivory bg     | `#FFFBF3` |
| Light beige  | `#F3F0EB` |
| Sand border  | `#E9E4DB` |
| Navy primary | `#043460` |
| Muted navy   | `#3D6081` |
| Lime accent  | `#E1FCAD` |
| Lime button  | `#D9F58C` |

Accessibility: all motion respects `prefers-reduced-motion`.
