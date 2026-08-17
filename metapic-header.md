# Metapic — Header & Hero Section: Design System / Reverse-Engineering Spec

> **Methodology note:** This spec is built from (1) pixel-level visual inspection of the supplied screenshot and (2) a live fetch of `metapic.com`'s rendered markup, which confirmed the site is built on **Webflow** (assets are served from `cdn.prod.website-files.com`, a Webflow-only CDN). Exact hex values, spacing, and font-family names below are estimated from the visual reference to sub-pixel confidence where possible, but should be verified against DevTools computed styles before being treated as ground truth — a static screenshot cannot expose real class names, exact `rem` values, or JS-driven behavior (scroll listeners, IX2 triggers, etc.). Items I could confirm structurally from the fetched DOM (e.g., dropdown content, link targets) are flagged accordingly.

---

## 1. NAVIGATION / MENU BAR ANALYSIS

### 1.1 Layout & Structure
| Property | Spec |
|---|---|
| Position | `position: fixed` (or `sticky`, `top: 0`) — top bar persists across hero, standard for Webflow marketing sites with a dark hero |
| Display | `display: flex; align-items: center; justify-content: space-between;` |
| Container | Max-width wrapper, likely `max-width: 1280px–1440px`, `margin: 0 auto`, horizontal `padding: 0 40px–64px` (desktop) |
| Height | ~72–80px |
| Z-index | High stacking context, e.g. `z-index: 999` (above hero background layers & video) |
| Grid split | 3-zone flex layout: **Left** (logo) / **Center** (nav links, absolutely centered or flex `gap`) / **Right** (locale switch + auth CTAs) |
| Vertical alignment | All children `align-items: center` |

### 1.2 Styling & CSS (Background/Border/Shadow)
- **Background:** Fully transparent over the hero at top-of-page (`background: transparent`), sitting directly on the black hero backdrop — no visible seam or divider line in the screenshot.
- **Backdrop-filter:** Not visibly active in this state (no blur artifact behind the bar); likely activates `backdrop-filter: blur(12px)` + a translucent black fill (`rgba(0,0,0,0.6–0.8)`) **on scroll** (common Webflow pattern), not on initial load.
- **Border:** None visible at top of page.
- **Box-shadow:** None at rest; a soft `box-shadow: 0 4px 20px rgba(0,0,0,0.25)` would typically appear once the scrolled/pinned state background fills in.

### 1.3 Branding & Logo
- **Mark:** Abstract 4-petal "pinwheel/flower" glyph, white fill, likely SVG (`<svg>` inline or referenced), roughly **24×24px**.
- **Wordmark:** "metapic" in lowercase, medium weight, letter-spacing near `0`, immediately right of the mark with an **8px gap**.
- **Combined lockup height:** ~24px, positioned flush-left with container padding.
- **Hover:** No visible affordance in the still frame; standard practice would be `opacity: 0.85` transition or none (logo usually just links home, `cursor: pointer`).

### 1.4 Links & Items (Typography)
| Attribute | Value |
|---|---|
| Font-family | Rounded/geometric sans (see §4.1) |
| Font-weight | 500–600 (Medium/SemiBold) |
| Font-size | 15–16px (`0.9375rem`–`1rem`) |
| Line-height | ~1.4 (`22px`) |
| Letter-spacing | `-0.01em` to `0` |
| Text color (inactive) | `#FFFFFF` at ~90% opacity, e.g. `rgba(255,255,255,0.9)` |
| Gap between nav items | ~8–12px between pill/text elements, ~32–40px from center group to right group |

### 1.5 States & Interactions
- **Active item ("For Creators"):** Wrapped in a **pill container** — `background: #F2A9C9`-ish soft pink (`border-radius: 999px`, full pill), with a small solid **dot indicator** (~6px circle, darker pink/magenta) preceding the label, `padding: 8px 16px` roughly. This is the current-page/tab indicator pattern.
- **Inactive items ("For Brands", "About"):** Plain text, no background, sitting in the same flex row — confirmed by DOM fetch that **"For Brands" is a dropdown/mega-menu trigger** with two sub-options:
  - *Managed in-house agency* — "From matching to results"
  - *Self-service* — "Launch and manage campaigns fast"
  
  Each sub-item in the fetched markup pairs an icon/illustration asset with a title + descriptor line — i.e., a **2-column mega-dropdown card layout**, not a simple `<ul>` list.
- **Hover (inferred):** Text items likely transition to full white / add an underline or a subtle pill-background fade-in: `transition: background-color 0.2s ease, color 0.2s ease`.
- **Dropdown trigger behavior:** Likely `on-hover` reveal (desktop) with a fade + slight `translateY(-4px → 0)` entrance, consistent with Webflow's native "Dropdown" or IX2 interaction pattern.

### 1.6 Language Switcher
- Icon: globe/network glyph (16px) + `"En"` label + chevron-down (`▾`), all white, grouped with `gap: 4–6px`.
- Confirmed via DOM: this is a **full locale switcher** exposing 8 languages (EN, DE, ES, PL, SV, IT, FR, NL) — implies a dropdown menu on click, each item routing to a localized subpath (`/de`, `/es`, etc.).

### 1.7 Auth Links
- **"Log in"**: plain white text link, font-weight ~500, no background. DOM confirms this itself expands into a **2-option sub-menu**: "Log in as a Creator" vs. "Log in as Brand" — i.e., it is also a dropdown, not a direct link.
- **"Sign up" CTA button:**
  | Property | Value |
  |---|---|
  | Shape | Full pill, `border-radius: 999px` |
  | Background | Dark slate/navy-purple, ~`#3A3F52`–`#42465A` (muted charcoal-indigo, contrasts against pure-black page bg) |
  | Text | White, weight 600, ~15px |
  | Padding | `~10px 24px` |
  | Border | None or 1px hairline `rgba(255,255,255,0.1)` |
  | Hover (inferred) | Lighten background ~10%, or `transform: translateY(-1px)` lift + soft shadow |
  | Shadow | None at rest; subtle ambient shadow likely on hover |

### 1.8 Mobile Responsive Menu (Inferred — not visible in desktop screenshot)
- Standard Webflow pattern for this layout: nav center-links + language + auth collapse behind a **hamburger icon** (3 horizontal bars, white, top-right, replacing the desktop link cluster below a ~991px breakpoint).
- Expected behavior: tap opens a **full-screen or right-drawer overlay** on the same black background, links stacked vertically, large touch targets (~48px height), close via "✕" icon morph from hamburger (`transition: transform 0.3s ease`).
- CTA buttons ("Log in" / "Sign up") typically pinned to bottom of the drawer as full-width pills.
- Timing: drawer slide/fade typically `250–400ms ease-in-out`.

---

## 2. HERO SECTION ANALYSIS

### 2.1 Layout & Grid Structure
- **Structure:** Single-column, fully **center-aligned** stack (not a 50/50 split) — `display: flex; flex-direction: column; align-items: center; text-align: center;`
- **Stacking order (top → bottom):** Nav → Eyebrow/spacer → H1 (2 lines) → Subheading (2 lines) → CTA button row (2 buttons, horizontal) → Product/phone visual → Social row + scroll-down affordance.
- **Section padding:** Generous vertical breathing room — top padding under nav ~ `120–160px`, section likely `min-height: 100vh` or close to it given the phone mockup bleeds toward the fold.
- **Content max-width:** Headline/subhead constrained to a narrower column than full viewport, roughly `max-width: 780–860px`, centered — this is why the two-line headline wraps exactly at "Grow Together."
- **Mobile:** Same vertical stack, just tighter horizontal padding (~20–24px) and reduced font sizes; phone mockup likely scales down proportionally and stays centered.

### 2.2 Background & Visual Canvas
- **Base color:** Near-true black, `#0A0A0C`–`#000000`.
- **Overlay geometry:** Multiple large **dark charcoal/graphite rounded-corner rectangles** (`#1A1A1E`-ish), rotated at varying angles (~15–30°), scattered behind the phone mockup — functioning as a subtle textured backdrop, low-contrast against the black base (`opacity` likely 30–50%, or a slightly lighter fill than pure black).
- **Vignette:** A soft **radial gradient/vignette** darkens the outer edges and brightens subtly behind the phone (spotlighting the product shot) — approx `radial-gradient(ellipse at 50% 70%, rgba(40,40,45,0.6) 0%, rgba(0,0,0,1) 70%)`.
- **No visible noise/grain texture, no mesh-gradient color wash** — palette stays strictly monochrome/grayscale in this section (color is reserved for CTA pills and the phone-screen UI).
- Live-site confirms an additional layered **decorative SVG ("elements.svg" / "rotate-lg.svg")** rotating/parallax-driven behind the product imagery — supports the rotated-rectangle reading above.

### 2.3 Assets & Graphics
- **Primary asset:** A high-fidelity **iPhone mockup (device frame)** rendered as an image/PNG-PSD composite, held by a real human hand (photographic, not illustrated) — cropped at the bottom edge of the viewport (continues below the fold).
- **Phone screen content (in-mockup UI):**
  - Status bar: `9:41`, signal/wifi/battery icons — classic Apple marketing-screenshot convention.
  - Pink-to-orange **linear/diagonal gradient** as the in-app background (`linear-gradient(135deg, #F5B8D0 0%, #F7C9A0 100%)` approx.).
  - Header row: "Create your link!" (bold, dark navy/black text) + bell icon + profile icon (top-right, outlined circles).
  - **URL input field**: white/light rounded rectangle, link icon (left), placeholder `https://www.newbalance.com`, circular pink **submit/arrow button** (right, `→`).
  - "Discover all brands" row + search icon.
  - **Filter pill row:** "All" (active, pink pill fill) / "Electronics" / "Sports & Outdoors" / "Food" (inactive, plain text/light pills).
  - **Brand card:** New Balance logo/wordmark in red, on white rounded card, with a small "NEW" badge (pink, top-right corner of the card).
- **Masking:** Device frame masks the screenshot content to its rounded-corner silhouette (`border-radius` matching real device ~ `48–55px`, plus a physical bezel illustration).
- **Layering (z-index, back → front):** black bg → rotated dark rectangles → radial vignette/glow → hand+phone photographic asset → (foreground) nav bar.

### 2.4 Typography Breakdown

**H1 — Main Headline** ("Where Creators and Brands / Grow Together")
| Attribute | Desktop | Mobile (inferred) |
|---|---|---|
| Font-family | Rounded geometric sans-serif (thick, friendly, low-contrast strokes — candidates: *General Sans*, *Aeonik*, *Poppins*, or a custom-licensed rounded grotesk) | Same family |
| Font-weight | 700 (Bold) | 700 |
| Font-size | ~64–72px | ~32–40px |
| Line-height | ~1.15–1.2 (tight, ~78px measured leading) | ~1.2 |
| Color | Solid `#FFFFFF` — **no gradient text fill**, no text-shadow visible | Same |
| Line breaks | Manual/forced break after "Brands" — 2 lines: "Where Creators and Brands" / "Grow Together" | Likely re-wraps naturally at narrower width, may need 3 lines |
| Letter-spacing | Slightly tight, `-0.01em to -0.02em` | Same |

**Subheading**
| Attribute | Value |
|---|---|
| Font-size | ~18–20px |
| Color | Light gray, ~`#B8B8BE`–`#C4C4CA` (reduced opacity white, ~`rgba(255,255,255,0.65-0.75)`) |
| Line-height | ~1.5 |
| Max-width | ~520–560px (forces the 2-line wrap: "Join 100,000+ creators and trusted brands boosting their reach through" / "performance-driven collaboration") |
| Margin-bottom | ~32–40px before CTA row |
| Text-align | Center |

### 2.5 CTA Buttons & Interactive Elements

**Primary CTA — "Sign up as a Creator"**
| Property | Value |
|---|---|
| Background | Soft pink/rose, ~`#F0A8C4`–`#EDA0C0` |
| Text color | White or near-black — appears white/very-light in screenshot, weight 600 |
| Shape | Full pill, `border-radius: 999px` |
| Padding | `~14px 28px` |
| Border | None |
| Hover (inferred) | Slight darken/lighten of fill + `transform: translateY(-2px)` lift + soft `box-shadow: 0 8px 20px rgba(240,168,196,0.35)` glow-shadow matching the pink hue |

**Secondary CTA — "Metapic for Brands"**
| Property | Value |
|---|---|
| Background | Same muted navy/charcoal-indigo as header "Sign up" button, ~`#3A3F52` |
| Text color | White, weight 600 |
| Shape | Full pill, matched height to primary CTA |
| Padding | `~14px 28px` |
| Hover (inferred) | Lighten fill slightly, same lift-on-hover pattern for visual parity with primary |
| Icon placement | None visible — text-only buttons |

**Gap between CTAs:** ~16px, `display: flex; gap: 16px;` horizontally centered.

**Social Proof / Trust Row (bottom-left, below the fold edge):**
- Text-only, two items: "Instagram" and "LinkedIn" separated by a **middle-dot `•`**, white text ~14px, weight 500, likely `opacity: 0.9`, `gap: 8–12px` — functions as footer-of-hero social links rather than an avatar/rating trust badge.
- **No avatar stack or star-rating widget** present in this hero (the "100,000+ creators" claim is delivered via copy, not a visual badge).

**Utility elements (bottom corners):**
- **Bottom-left:** Circular white button, dark gear/settings icon centered — likely a cookie-preferences or accessibility/settings trigger, ~40px diameter, fixed position.
- **Bottom-right:** Circular white button with a downward arrow (`↓`) — a **"scroll to next section" affordance**, confirmed in DOM as an anchor link to `#product`. ~48px diameter, likely `position: fixed` or `absolute` within the hero, `box-shadow: 0 4px 12px rgba(0,0,0,0.3)` for lift off the dark bg.

---

## 3. ANIMATIONS, TRANSITIONS & SCROLL MECHANICS

> These behaviors are **not observable from a single static screenshot**; the following is inferred from (a) Webflow's default interaction toolkit (this site's rendering platform, confirmed via CDN asset paths), and (b) conventional patterns for this exact visual composition. Treat as a best-practice implementation plan rather than a confirmed spec — verify against the live site's Interactions panel / injected `<script>` for exact easing curves and timings.

### 3.1 Page Load Animations
- Likely a **staggered entrance**: Nav fades in first (`opacity 0→1`, ~400ms) → H1 slides up + fades (`translateY(20px)→0`, ~600ms, `ease-out`) → Subheading follows with ~100ms delay → CTA row with ~150–200ms delay → Phone/hand image scales/fades in last (`scale(0.96)→1`, ~700ms), consistent with Webflow's native **IX2 "Page Load"** trigger chaining individual element animations with incremental delays.
- Library: Given the Webflow CDN footprint, this is almost certainly **Webflow native Interactions (IX2)** rather than GSAP/Framer Motion — though Webflow sites frequently layer custom GSAP via embedded `<script>` for the rotating decorative SVG (`rotate-lg.svg` — the filename itself suggests a CSS/JS-driven continuous rotation keyframe, e.g. `@keyframes rotate { to { transform: rotate(360deg); } }` on an infinite loop, slow duration ~20–40s linear).

### 3.2 Hover & Micro-interactions
- CTA buttons: lift + shadow bloom on hover (see §2.5).
- Nav links/dropdowns: fade + slight vertical offset on the "For Brands" and "Log in" mega-menus.
- No evidence of cursor-following or magnetic-button effects in the static frame; the flat, corporate-B2B tone of the design (SaaS/marketplace positioning) makes aggressive cursor effects unlikely — most Webflow marketing builds of this style stick to simple opacity/transform transitions.

### 3.3 Scroll Mechanics
- **Header on scroll:** Most probable pattern given the transparent-over-hero start state — background fades in (`rgba(0,0,0,0)` → `rgba(0,0,0,0.8)` + `backdrop-filter: blur()`) once scroll position exceeds hero height, keeping it `sticky`/`fixed` throughout. A hide-on-scroll-down/show-on-scroll-up pattern is also plausible but less certain without live testing.
- **Parallax:** The layered rotated-rectangle background shapes and the decorative SVG are strong candidates for a subtle parallax offset (background moving slower than foreground phone image) as the user scrolls past the hero — common in Webflow "scroll-triggered movement" IX2 setups.
- **Pinning:** No strong visual evidence of a pinned/sticky hero (e.g., no visible mask-reveal of the next section) — behaves as a standard scroll-through hero into `#product` section (confirmed anchor ID from DOM).

---

## 4. TECHNICAL SPECIFICATION SUMMARY

### 4.1 Typography
- **Family:** A rounded/geometric sans-serif with soft terminals throughout headline, body, and UI chrome — one consistent type family across nav, H1, subhead, and buttons (no serif or secondary display face detected).
- **Weights in use:** ~500 (nav/body), 600 (buttons/subhead emphasis), 700 (H1).
- **Scale (desktop):** H1 ~64–72px / Subhead ~18–20px / Nav & buttons ~15–16px.

### 4.2 Color Palette
| Role | Approx. Hex | Usage |
|---|---|---|
| Background / Base | `#000000`–`#0A0A0C` | Page/hero base |
| Surface (decorative) | `#1A1A1E`–`#232328` | Rotated rectangle shapes |
| Primary text | `#FFFFFF` | H1, nav, button labels |
| Secondary text | `#B8B8BE` (~70–75% white) | Subheading, muted copy |
| Accent — Pink/Rose | `#EDA0C0`–`#F0A8C4` | Active nav pill, primary CTA, app-UI accents |
| Accent — Navy/Charcoal-Indigo | `#3A3F52`–`#42465A` | Secondary CTA, "Sign up" nav button |
| In-app gradient (phone screen) | `#F5B8D0 → #F7C9A0` | Product mockup only, not site chrome |

### 4.3 Breakpoints (industry-standard Webflow defaults — likely in use)
| Breakpoint | Range |
|---|---|
| Mobile portrait | `< 479px` |
| Mobile landscape | `480px – 767px` |
| Tablet | `768px – 991px` |
| Desktop | `992px – 1439px` |
| Large/Ultra-wide desktop | `≥ 1440px` (content likely stays capped at a max-width container beyond this) |

### 4.4 Platform & Tooling Fingerprint
- **CMS/Builder:** **Webflow** — confirmed via `cdn.prod.website-files.com` asset hosting for every image/SVG/video on the page.
- **Media:** Uses `.avif` images extensively (modern format, Webflow's optimized asset pipeline) plus `.mp4` background/inline videos with Webflow's auto-generated poster frames and `-transcode` naming convention.
- **Animation:** Native **Webflow Interactions 2 (IX2)** almost certainly drives load-in and hover states; a rotating decorative SVG suggests a small embedded custom-code snippet (vanilla CSS `@keyframes` or lightweight JS) layered on top.
- **Analytics/Tracking:** Meta/Facebook Pixel confirmed (`facebook.com/tr?id=...&ev=PageView`).
- **Forms:** Contact form is embedded via **HubSpot Forms** (`share-eu1.hsforms.com`), not native Webflow forms.
- **No evidence of:** React/Vue SPA framework, Tailwind utility classes (Webflow generates its own scoped class system), GSAP/Framer Motion signatures, or Swiper.js (carousel behavior further down the page likely uses Webflow's native Slider component instead).

---

### Recommended dev verification checklist
- [ ] Inspect real computed `font-family` stack via DevTools (self-hosted vs. Google Fonts vs. Adobe Fonts).
- [ ] Confirm exact hex values with an eyedropper tool against the live page (not the compressed screenshot).
- [ ] Record the header's scrolled-state background/blur via a scroll-triggered DevTools snapshot.
- [ ] Extract the mobile nav (hamburger) markup directly, since it wasn't visible in the supplied capture.
- [ ] Pull exact IX2 timing curves from Webflow's published `webflow.js` interactions JSON if reproducing load animations 1:1.
