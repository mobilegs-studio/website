# mobilegs-studio — Website

## Project doel
Portfolio en leadgeneratie website voor mobilegs-studio.
Doel: potentiële MKB/ZZP klanten overtuigen en contact laten opnemen.

## Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Deployment: Vercel
- Formulieren: Resend (e-mail) of Formspree
- Geen database nodig

## Design richting
- Donker, premium, minimalistisch
- Grote typografie, veel witruimte
- Subtiele animaties (Framer Motion)
- Referentie: yellowhead.com
- Voertaal: Nederlands (NL)

## Structuur pagina's
- Home — hero met propositie, diensten overzicht, social proof
- Diensten — wat doet mobilegs-studio (webapps, native apps, AI tooling)
- Cases — projecten (sportschool app, coachen met honden etc.)
- Over — wie is Hendrik Polinder
- Contact — formulier + directe contactinfo

## Doelgroep
Nederlandse MKB-ers en ZZP-ers die een digitale oplossing nodig hebben
maar geen eigen developer hebben.

## Tone of voice
Direct, concreet, geen jargon. Resultaatgericht.
Niet: "wij bieden innovatieve digitale transformatie oplossingen"
Wel: "we bouwen apps en tools die je bedrijf slimmer maken"

## Conventies
- Componentnamen in PascalCase
- Bestandsnamen in kebab-case
- Nederlandstalige copy, Engelstalige code
- Geen onnodige dependencies — keep it lean

## Deployment
- Vercel, gekoppeld aan github.com/mobilegs-studio/website
- Automatische deploys op push naar main
- Preview deploys op feature branches

## Contactpersoon
Hendrik Polinder — hc.polinder@proton.me

## Documentatie & logboek
Notion wordt niet meer gebruikt.

- Sitemap en architectuur: `docs/SETUP-AND-ARCHITECTURE.md` in de repo.
  "Laatst bijgewerkt" bovenaan altijd met datum EN tijd (bijv. "31 mei 2026 — 21:49").
  De hook `.githooks/post-commit` herinnert eraan als routes/componenten wijzigen.
- Sessie-logboek: Obsidian (zie hieronder).

Schrijf elke sessie als toggle in Obsidian (vault MGS, bestand
`MGS-Projects/Changelog - Claude Code.md`). Gebruik een `<details><summary>`-toggle,
bovenaan de "Logboek updates"-sectie, titel = Datum — Tijd — Onderwerp.
Schrijven gaat via de Local REST API van de plugin "Local REST API with MCP":
PATCH/append op `https://127.0.0.1:27124/vault/MGS-Projects/Changelog%20-%20Claude%20Code.md`
met header `Authorization: Bearer <OBSIDIAN_API_KEY>` (key staat in de obsidian MCP-config),
of via de `mcp__obsidian__*` tools zodra die in de sessie geladen zijn.


