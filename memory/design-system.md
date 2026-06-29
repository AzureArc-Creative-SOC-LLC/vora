---
name: design-system
description: Plenara wellness site clone — exact design tokens (colors, fonts) extracted from plenara.webflow.io
metadata:
  type: project
---

VORA = pixel clone of https://plenara.webflow.io (premium wellness platform). Built Next.js 15 + TS + Tailwind + Framer Motion + GSAP/ScrollTrigger + Lenis + SplitType.

**Colors (extracted from live site):**
- ivory/cream bg `#FFFBF3`
- light beige section `#F3F0EB`
- beige border/inner box `#E9E4DB`
- navy primary (text + dark sections) `#043460`
- muted navy `#3D6081`
- lime title accent (on dark) `#E1FCAD`
- lime button `#D9F58C`
- card white `#FFFFFF`

**Fonts:** headings = Playfair Display (serif, weight 400, NOT bold); body = Inter Tight. H1 hero ~116px white on image. Section titles ~80px Playfair, lime on navy / navy on cream.

Sections order: Nav → Hero → Clients → About → Programs(sticky stack, navy) → Benefits(radial circles) → HowWeWork(sticky stack, beige) → Pricing(3 cards, middle popular navy) → Testimonials(horizontal carousel) → Facilities → Marquee → Blog → CTA → AppDownload → FAQ(2-col accordion) → Footer(navy).
