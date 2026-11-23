# Site overhaul plan — mobilegrowthstudio.com

Decisions (23 Nov 2026): product-led motion · hero = live build demo · showcases for AI, apps, websites, webapps · main CTA = book a free call · AI demos scripted · homepage tabs by category · add price indications, results per showcase, NL/EN fix, speed/a11y pass.

## 1. Review: what's wrong now

| Issue | Where | Fix |
|---|---|---|
| Headline blurs in, unreadable for ~1.5s | Hero | Text visible instantly; motion only in the visual |
| WebGL particles barely visible, heavy on load | `hero-canvas.tsx` | Remove |
| "Too much admin → M → Website" graphic is generic, says nothing | `connection-graphic.tsx` | Replace with live build demo |
| Service cards reveal late (Webapps still faded when in view) | Services | Reveal earlier or not at all |
| "OUR FOCUS" badge replaces 01/02, numbering breaks | Services | One system: badge or numbers |
| All 3 showcases are marketing dashboards; no app, site or AI tool | Showcases | 4 categories, see below |
| No cases or results on homepage | Home | Result line per showcase + 2 case teasers |
| "Fraction of the cost" with no number | Approach | "From €…" price indications |
| CTA mix: "Get in touch" / "Book a call" / "Want something like this?" | Site-wide | One CTA: "Book a free call" → calendar |
| Page title Dutch on /en | `layout.tsx` metadata | Locale-aware titles; check all copy |
| No reduced-motion support | Animations | `prefers-reduced-motion` → static |

## 2. New motion system (product-led)

- Motion only shows product: screens assembling, an agent working, a form being filled.
- One easing + duration set (e.g. 400ms ease-out); no blur, no particles, no glow pulses.
- Demos start when in view, pause when out of view, loop quietly.
- Every demo has a static fallback (reduced motion, slow devices).

## 3. Hero: live build demo

Loop of ~8s per item, 3 items:
1. Prompt types: "Booking app for my gym" → wireframe → styled phone screens → badge "Live in 3 weeks".
2. "Website for my accountancy firm" → layout blocks drop in → finished page → scores 98/100.
3. "Read my invoices automatically" → PDF → fields fly into a table → "4 min → 20 sec".

Built in CSS/Framer Motion, no WebGL. Headline next to it, CTA "Book a free call".

## 4. Showcases (anonymized, fictional data)

Homepage: tabs AI tools · Apps · Websites · Webapps, one live demo each. Portfolio page: all of them.
Each card: fictional client type, the problem, the interactive demo, one result line, CTA.

### AI tools (scripted, interactive)
1. **Document extractor** — *wholesaler*. Visitor picks one of 3 sample invoices; fields (supplier, VAT no., lines, total) animate into a table with confidence badges; "Export to Excel / accounting". Result: *invoice processing 4 min → 20 sec*.
2. **Chatbot on own data** — *installation company*. 4 suggested questions; answers stream in with source chips ("Manual p.12", "Price list 2026"); handoff to human. Result: *~40% fewer support calls*.
3. **AI insights agent** — *webshop*. Agent shows its steps (reading orders → comparing weeks → writing); outputs a weekly summary + 3 actions. Reuses growth-cockpit parts. Result: *Monday report written before 8:00*.
4. **Meeting notes → actions** — *consultancy*. Transcript scrolls; summary, decisions and action items with owner + due date appear; "Send to Slack / Notion". Result: *0 minutes of minute-taking*.

### Native apps (tappable phone mockup)
5. **Gym booking app** — class schedule, book a spot, QR check-in, push "Your class starts in 1 hr".
6. **Coaching app** (e.g. dog training) — training plan, video lesson, progress streak, chat with coach.
7. **Field-service app** — job list, photos + customer signature, "offline" badge, sync on reconnect.

### Websites
8. **Before/after redesign** — drag slider on a fictional bakery or accountant; speed score 54 → 98.
9. **Found on Google and AI search** — mock AI answer that cites the client's site; SEO/GEO checklist ticks green.
10. **Multilingual site** — NL / EN / DE toggle swaps the page live.

### Webapps / portals
11. **Client portal** — *accountancy*: documents, status tracker, messages; switch view client ↔ admin.
12. **Planning tool** — drag shifts in a week calendar; conflict warning.
13. **Marketing cockpit** — keep the current dashboard (already strong).
14. **A/B-test & site patcher** — *large webshop*. Run A/B tests and hotfixes without a developer: variant vs original side by side, traffic split, live conversion, "Winner · 97% sure". Also a scene in the hero demo. Result: *+14% add to cart*.

### Ready-made solutions (real products, customizable)
15. **Fit Track** — first client: a gym. Show the real product (screenshots/recording); "customization possible if needed".
16. **Trainer booking system** — same client. Real product + customization note.

## 5. Other changes
- **Price indications** per type: "Website from €…", "App from €…", "AI tool from €…" (numbers needed).
- **Book a free call**: calendar embed (Cal.com) on Contact + modal from every CTA.
- **NL/EN/DE**: locale-aware metadata, audit all strings in `translations.ts`.
- **Speed/a11y**: drop WebGL, lazy-load demos, reduced motion, keyboard-usable demos.

## 6. Build order
1. Remove old motion + new hero (one branch).
2. Showcase framework (tabs, card, static fallback) + 4 homepage demos (1 per category).
3. Remaining 9 demos on Portfolio.
4. Prices, call booking, NL/EN/DE fix, speed pass.
