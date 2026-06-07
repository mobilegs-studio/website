# MGS Website — Setup & Architectuur

> Laatst bijgewerkt: **7 juni 2026 — 19:06**
> Dit document is voorbereid om naar de Notion-log ("MGS Website Stack — Setup Log & Documentatie") gepusht te worden. Notion was onbereikbaar tijdens het schrijven, vandaar eerst hier in de repo.

---

## 1. Complete sitemap

Alle routes draaien onder `src/app`. Publieke pagina's zitten onder `[locale]` (en/nl/de). De middleware stuurt `/` door naar de juiste taal en ververst de Supabase-sessie.

### Publieke pagina's (per taal: `/en`, `/nl`, `/de`)
| Route | Bestand | Omschrijving |
|---|---|---|
| `/[locale]` | `app/[locale]/page.tsx` | Home — hero, diensten, proces, CTA, gratis pitch-download |
| `/[locale]/diensten` | `app/[locale]/diensten/page.tsx` | Diensten-overzicht |
| `/[locale]/cases` | `app/[locale]/cases/page.tsx` | Cases / succesverhalen |
| `/[locale]/faq` | `app/[locale]/faq/page.tsx` | Veelgestelde vragen |
| `/[locale]/over` | `app/[locale]/over/page.tsx` | Over Hendrik / MGS |
| `/[locale]/contact` | `app/[locale]/contact/page.tsx` | Contactformulier (Resend) |
| `/[locale]/privacy` | `app/[locale]/privacy/page.tsx` | Privacyverklaring (legal-doc) |
| `/[locale]/voorwaarden` | `app/[locale]/voorwaarden/page.tsx` | Algemene voorwaarden (legal-doc) |
| `/[locale]/cookies` | `app/[locale]/cookies/page.tsx` | Cookieverklaring (legal-doc) |

### Auth & account (nieuw deze sessie)
| Route | Bestand | Omschrijving |
|---|---|---|
| `/[locale]/login` | `app/[locale]/login/page.tsx` | Inloggen via magic link (+ Google-knop, provider nog uit) |
| `/[locale]/account` | `app/[locale]/account/page.tsx` | Account-centrum: producten, toegang, downloads, uitloggen. `force-dynamic`, redirect naar login zonder sessie |
| `/auth/callback` | `app/auth/callback/route.ts` | Wisselt auth-code in voor een sessie (magic link / OAuth). Buiten `[locale]`, door middleware overgeslagen |

### API-routes
| Route | Bestand | Omschrijving |
|---|---|---|
| `/api/contact` | `app/api/contact/route.ts` | Contactformulier → Resend e-mail |
| `/api/stripe/checkout` | `app/api/stripe/checkout/route.ts` | POST: maakt Stripe Checkout Session (payment of subscription), redirect-URL terug |
| `/api/stripe/webhook` | `app/api/stripe/webhook/route.ts` | POST: verifieert Stripe-handtekening, schrijft purchase/subscription via service-role |
| `/api/download` | `app/api/download/route.ts` | GET `?slug=`: checkt login + `has_access`, redirect naar 60s signed URL uit privé-bucket |

### Systeem-routes
| Route | Bestand |
|---|---|
| `/icon` | `app/icon.tsx` — favicon (Ascent-mark op brand-tile) |
| `/sitemap.xml` | `app/sitemap.ts` |
| `/robots.txt` | `app/robots.ts` |
| Middleware (`proxy`) | `src/middleware.ts` — i18n redirect + Supabase sessie-refresh |

---

## 2. Architectuur

### Stack
- **Framework**: Next.js 16 (App Router, Turbopack), React 19
- **Styling**: Tailwind CSS v4 (CSS-variabelen als design-tokens in `globals.css`)
- **Animatie**: Framer Motion
- **Hosting**: Vercel (auto-deploy op push naar `main`, preview-deploys op branches)
- **i18n**: eigen lichte oplossing — `src/i18n/translations.ts` (nl/en/de, `as const`), locale in het pad via `[locale]`, middleware bepaalt/forwardt taal
- **Auth + DB + Storage**: Supabase (`@supabase/ssr` + `@supabase/supabase-js`)
- **Betalingen**: Stripe (Checkout + webhooks), `stripe` server-SDK
- **E-mail**: Resend (contactformulier)
- **Monitoring**: Sentry
- **Foutmeldingen / talen**: nl primair, en/de vertaald

### Datastroom auth + paywall
```
Browser ──(magic link)──> Supabase Auth ──> /auth/callback (code→sessie, cookies)
   │
   ├─ Server Components/Routes lezen sessie via @supabase/ssr (cookies)
   │
   ├─ Koop: /api/stripe/checkout ──> Stripe Checkout ──> betaling
   │                                         │
   │                                         ▼
   │                          Stripe webhook ──> /api/stripe/webhook
   │                                         │ (handtekening geverifieerd)
   │                                         ▼
   │                          service-role client schrijft naar `purchases`/`subscriptions` (omzeilt RLS)
   │
   └─ Download: /api/download ──> check login + has_access() ──> service-role signed URL (60s) ──> privé bucket
```

### Supabase-laag (3 clients, bewust gescheiden)
| Client | Bestand | Sleutel | Gebruik |
|---|---|---|---|
| Browser | `lib/supabase/client.ts` | anon/publishable | Client components (login, navbar sessie-status) |
| Server | `lib/supabase/server.ts` | anon/publishable | Server components, route handlers, server actions — leest cookies |
| Middleware | `lib/supabase/middleware.ts` | anon/publishable | Ververst sessie-cookies bij elke navigatie |
| Admin | `lib/supabase/admin.ts` | **service-role** | Alleen server-side (webhook, signed URLs). Omzeilt RLS. Nooit naar browser |

### Datamodel (Supabase Postgres)
```
products       (id, slug, title, kind['one_time'|'subscription'], stripe_price_id, file_path, active, created_at)
purchases      (id, user_id→auth.users, product_id→products, stripe_checkout_session_id, created_at, UNIQUE(user_id,product_id))
subscriptions  (id, user_id→auth.users, stripe_subscription_id UNIQUE, status, current_period_end, created_at, updated_at)

has_access(product_id) → boolean   (SECURITY DEFINER)
   one_time     → bestaat er een purchase voor (auth.uid(), product)?
   subscription → heeft auth.uid() een subscription met status='active'?

RLS: products = iedereen leest; purchases/subscriptions = alleen eigen rijen lezen.
     Schrijven: alleen via de Stripe-webhook met service-role (geen insert/update policies).
Storage: privé bucket 'downloads', toegang uitsluitend via service-role signed URLs na has_access-check.
```
Migratie: `supabase/migrations/0001_products_purchases_subscriptions.sql` (idempotent, in de SQL Editor gedraaid).

### Brand-tokens (`src/app/globals.css`)
- `--accent` #5B5FE8 (Indigo), `--accent-light` #9BA3F2 (Periwinkle), `--accent-dark` #3F44C9
- `--warm` #E0B978 (Amber) — de "menselijke" warme noot
- `--brand-gradient`: Indigo → Periwinkle → Amber
- Koppen: bold sans (Geist extrabold/bold) — Instrument Serif is verlaten voor consistentie

---

## 3. A-Z setup & integratie, component voor component

Volgorde waarin alles is opgebouwd, met per stap wat je moet doen.

### 3.1 Supabase-project
1. Maak een Supabase-project. Noteer **Project URL** en de **API Keys** (anon/publishable + service-role/secret).
2. **Authentication → URL Configuration**:
   - Site URL = productie-domein (`https://www.mobilegrowthstudio.com`)
   - Redirect URLs: voeg toe `http://localhost:3000/auth/callback` én de productie-varianten (met en zonder `www`)
3. E-mail/magic link staat standaard aan. (Google-provider apart aanzetten met een Google Cloud OAuth-client — nog niet gedaan.)
4. Draai de migratie `0001_...sql` in de **SQL Editor** (tabellen, has_access, RLS, bucket).

### 3.2 Environment variables (`.env.local`, en in Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...        # publiek (browser)
SUPABASE_SERVICE_ROLE_KEY=...            # geheim (server)
STRIPE_SECRET_KEY=sk_test_...            # geheim
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...          # lokaal uit `stripe listen`, prod uit dashboard-endpoint
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # in Vercel: het productie-domein
RESEND_API_KEY=...                       # contactformulier
```
- `.env.local` staat in `.gitignore` (`.env*`), met uitzondering `!.env.example` voor documentatie.
- In Vercel: variabelen die met `NEXT_PUBLIC_` beginnen = publiek ("Mark as Safe", Sensitive uit). De rest = geheim (Sensitive aan). Env-wijzigingen worden pas actief bij een nieuwe deploy.

### 3.3 Supabase-clients (`src/lib/supabase/*`)
- `client.ts`, `server.ts`, `middleware.ts`, `admin.ts` — zie architectuur-tabel. Server- en middleware-client gebruiken cookie-handlers van `@supabase/ssr`.
- **Belangrijk**: alle vier guarden op ontbrekende env, of leunen op de SDK die dat afhandelt. De middleware-helper slaat de sessie-refresh over als de env ontbreekt (anders crasht elke request — zie bug #4).

### 3.4 Middleware (`src/middleware.ts`)
- Behoudt de i18n-redirect (taal in pad) én ververst de Supabase-sessie op de response.
- Skip-lijsten: statische assets, `/api/`, `/_next/`, `/auth/`, en exacte paden (`/icon`, `/sitemap.xml`, …).

### 3.5 Auth-pagina's
- `login/page.tsx` (client): magic link via `signInWithOtp`, `emailRedirectTo = origin + /auth/callback?next=/{locale}/account`. Google-knop via `signInWithOAuth`.
- `auth/callback/route.ts`: `exchangeCodeForSession(code)` → redirect naar `next`.
- `account/page.tsx` (server, `force-dynamic`): `getUser()`; geen sessie → redirect login. Toont producten + toegang, downloads, uitloggen (server action).
- Teksten: `src/i18n/auth.ts` (los van de grote `translations.ts`), nl/en/de.

### 3.6 Stripe — checkout + webhook
1. **Stripe-account** (sandbox/test). API keys: `sk_test_`, `pk_test_`.
2. `lib/stripe.ts`: lazy `getStripe()` (geen instantiatie bij module-load → breekt de build niet als de key mist).
3. `api/stripe/checkout/route.ts`: zoekt product op slug, maakt Checkout Session (`mode` payment/subscription), zet `user_id`+`product_id` in metadata, geeft `session.url` terug.
4. `api/stripe/webhook/route.ts` (`runtime = "nodejs"`): leest **raw body**, `constructEvent` met `STRIPE_WEBHOOK_SECRET`, schrijft op `checkout.session.completed` een purchase en op `customer.subscription.*` de status — via de **admin** client.
5. Product aanmaken: een Stripe **price** (auto-product) + een rij in `products` met die `stripe_price_id`.
6. **Lokaal testen**: Stripe CLI → `stripe login` → `stripe listen --forward-to localhost:3000/api/stripe/webhook` → `whsec_` in `.env.local`. Testkaart `4242 4242 4242 4242`.
7. **Productie webhook**: aparte endpoint in het Stripe-dashboard (`https://www.mobilegrowthstudio.com/api/stripe/webhook`, dezelfde events), eigen `whsec_` → in Vercel. De lokale `stripe listen`-secret werkt niet in productie.

### 3.7 Gated download
1. Upload bestand naar de privé `downloads`-bucket **via de supabase-js SDK** (niet ruwe curl — zie bug #7). Zet `products.file_path`.
2. `api/download/route.ts`: login-check → product → `has_access` (als de user) → **service-role** `createSignedUrl(path, 60, {download:true})` → redirect. Entitlement wordt in de route afgedwongen, daarom is storage-RLS niet nodig.
3. Account-pagina toont een **Download**-knop voor gekochte producten mét `file_path`, anders een vinkje.

### 3.8 Live gaan (test-mode eerst)
1. Alle env-vars in Vercel (Production). `NEXT_PUBLIC_SITE_URL` = productie-domein.
2. Productie Stripe-webhook (test-mode) → `whsec_` in Vercel.
3. Supabase Site URL = productie.
4. Merge `feat/...` → `main` (fast-forward), Vercel deployt.
5. Rooktest op productie: `/nl/login` 200, `/nl/account` 307→login, `/api/stripe/webhook` 400 zonder handtekening, `/api/download` 401 zonder login.
6. **Volledig live (echt geld)** = aparte stap: Stripe-account activeren, live keys, live producten/prijzen, live webhook. Pas doen als je echt klanten laat betalen.

---

## 4. Bugs, fixes en lessen

| # | Bug | Oorzaak | Fix | Les voor de volgende keer |
|---|---|---|---|---|
| 1 | Favicon laadde niet | i18n-middleware redirectte `/icon` → `/nl/icon` (404) | `/icon` aan `SKIP_EXACT` toegevoegd | Bij een i18n-middleware: bedenk welke system-routes overgeslagen moeten worden |
| 2 | EN/DE toonden NL-tekst in de hero-graphic | Labels stonden hardcoded in het component | Naar `translations.ts` gehaald en als prop doorgegeven | Zet **nooit** zichtbare tekst hardcoded in componenten — meteen i18n |
| 3 | Vercel-build faalde terwijl `npm run lint` slaagde | Lint doet **geen** type-check; `as const` maakt props readonly, interface was muteerbaar | Interface naar `readonly` arrays | Draai **`next build`** (of `tsc --noEmit`) vóór elke push, niet alleen lint |
| 4 | Preview-deploy crashte op élke request | Middleware maakte een Supabase-client met ontbrekende env → throw | Guard: sessie-refresh overslaan zonder env | Env-afhankelijke code moet **gracieus degraderen** vanaf het begin |
| 5 | Lint-error `set-state-in-effect` | Navbar sloot het mobiele menu via een `useEffect` op pathname | Vervangen door `onClick`-handler op de links | Sluit UI-state op een event, niet als neveneffect van een render |
| 6 | Stripe `current_period_end` type-gedoe | Veld verhuisde tussen API-versies | Alleen `status` opgeslagen (genoeg voor `has_access`) | Sla bij webhooks alleen op wat je nodig hebt; minder API-versie-afhankelijkheid |
| 7 | Bestand uploaden naar Storage faalde ("Invalid Compact JWS") | Nieuwe Supabase-key (`sb_secret_…`) is geen JWT; de ruwe Storage-API verwacht een JWT in de Bearer-header | Upload + signed URL via de **supabase-js SDK** | Gebruik voor Storage de SDK, niet ruwe curl, zeker met de nieuwe key-formats |
| 8 | `npm run build` faalde met `ENOTEMPTY` op `.next` | Dev-server draaide tegelijk en hield `.next` vast | Dev-server stoppen / poort 3000 vrijmaken vóór de build | Bouw niet terwijl `next dev` draait; beide gebruiken `.next` |
| 9 | Verweesde `next dev`-processen op poort 3000 | Preview-server stopte niet altijd netjes | `lsof -ti :3000` → kill | Houd losse dev-processen in de gaten bij herstarts |
| 10 | Notion-toggle werd platte tekst | `<toggle>` bestaat niet in Notion-markdown | Gebruik `<details><summary>…</summary>…</details>` | Voor inklapbare Notion-blokken: altijd `<details>` |
| 11 | Betaalde content zou publiek zijn | Bestand in `public/` is vrij toegankelijk | Privé bucket + service-role signed URLs na entitlement-check | Zet betaalde bestanden nooit in `public/`; alleen achter een access-check |

### Wat structureel anders kan
- **CI-poort dicht**: voeg een `npm run build` (of typecheck) toe als pre-push/CI-stap, zodat type-fouten niet pas op Vercel opduiken.
- **Env-pariteit**: zet Vercel preview-env-vars ook goed, of accepteer de graceful-degrade (nu beide: guard + later env).
- **i18n vanaf dag 1**: elke nieuwe tekststring direct in `translations.ts`/`auth.ts`.
- **Feature branches + fast-forward merge** werkten goed: bouw groot werk op een branch, test, merge schoon naar `main`.
- **Test-mode-first deploy** was de juiste keuze: hele paywall live en testbaar op het echte domein zonder geld-risico, daarna in één env-swap naar live.

---

## 5. Wat nog open staat
- **Echte betaalde content** koppelen (nu staat het pitch-PDF als testbestand aan het testproduct).
- **Stripe volledig live** (account-activatie, live keys/producten/webhook).
- **Google-login** aanzetten (Supabase-provider + Google Cloud OAuth-client).
- **UI-bugfixes** uit eerdere screenshots: letterlijke `${COMPANY}` op de voorwaarden-pagina (quotes → backticks in `src/content/legal.ts`), navbar die content overlapt, FAQ-antwoord met afwijkende tekstkleur.
