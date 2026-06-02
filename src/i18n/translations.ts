export type Locale = "en" | "nl" | "de";

export const translations = {
  nl: {
    nav: {
      diensten: "Diensten",
      cases: "Cases",
      faq: "FAQ",
      over: "Over",
      contact: "Contact",
      cta: "Neem contact op",
      menuOpen: "Menu openen",
      menuClose: "Menu sluiten",
    },
    footer: {
      location: "Hilversum, Nederland",
      copyright: "Mobile Growth Studio",
    },
    home: {
      label: "Mobile Growth Studio",
      headline1: "Apps & tools die je",
      headlineAccent: "performance",
      headline2: "een boost geven.",
      subtext:
        "We bouwen webapps, native apps en AI tooling voor Nederlandse MKB-ers en ZZP-ers — zonder poespas, met resultaat, zodat jij je bezig kan houden met waar het echt om draait.",
      cta: "Neem contact op",
      viewServices: "Bekijk diensten",
      whatWeBuild: "Wat we bouwen",
      moreInfo: "Meer info",
      ctaTileTitle: "Iets anders?",
      ctaTileText: "Vertel ons je idee. We denken graag mee over de beste aanpak.",
      ctaTileLink: "Plan een gesprek",
      processLabel: "Zo werkt het",
      processHeading: "Van idee naar oplevering.",
      processSteps: [
        {
          number: "01",
          title: "Kennismaking",
          text: "We bespreken je idee en doelen in een gratis gesprek. Geen verplichtingen.",
        },
        {
          number: "02",
          title: "Helder voorstel",
          text: "Je krijgt een concrete offerte met vaste prijs en planning. Geen verrassingen.",
        },
        {
          number: "03",
          title: "Bouwen & opleveren",
          text: "We bouwen met regelmatige updates en zorgen voor een soepele oplevering.",
        },
      ],
      ctaHeading: "Klaar om te beginnen?",
      ctaSubtext: "Vertel ons wat je wilt bouwen. We reageren binnen 24 uur.",
    },
    services: {
      label: "Diensten",
      heading: "Wat we bouwen.",
      items: [
        {
          id: "webapps",
          number: "01",
          title: "Webapps",
          tagline: "Van idee naar werkende applicatie.",
          description:
            "We bouwen maatwerk webapplicaties die jouw bedrijfsprocessen digitaliseren en automatiseren. Of het nu gaat om een klantportaal, een intern dashboard of een volledig SaaS-product — we bouwen het van begin tot eind.",
          items: [
            "Next.js webapplicaties",
            "Klantportalen en dashboards",
            "API-integraties",
            "SaaS-producten",
          ],
        },
        {
          id: "native-apps",
          number: "02",
          title: "Native apps",
          tagline: "iOS en Android, goed gedaan.",
          description:
            "We bouwen native mobiele apps die je klanten graag gebruiken. Strak design, soepele performance en een ervaring die aanvoelt alsof hij thuishoort op het platform.",
          items: [
            "iOS apps (Swift / SwiftUI)",
            "Android apps",
            "Cross-platform (React Native)",
            "App Store & Play Store publicatie",
          ],
        },
        {
          id: "ai-tooling",
          number: "03",
          title: "AI tooling",
          tagline: "Automatiseer wat jou tijd kost.",
          description:
            "We bouwen AI-tools die repetitieve taken overnemen. Geen generieke chatbots, maar slimme oplossingen op maat voor jouw specifieke bedrijfsprocessen.",
          items: [
            "AI-gestuurde workflows",
            "Document- en dataverwerking",
            "Chatbots op maat",
            "Integraties met GPT, Claude en andere LLMs",
          ],
        },
        {
          id: "dashboarding",
          number: "04",
          title: "Dashboarding",
          tagline: "Inzicht in je cijfers, zonder gedoe.",
          description:
            "We bouwen dashboards die jouw data omzetten naar overzicht. Of je nu werkt met Google Analytics, een eigen database of externe API's — we maken het inzichtelijk en bruikbaar.",
          items: [
            "Real-time data dashboards",
            "Koppelingen met bestaande databronnen",
            "KPI-overzichten op maat",
            "Exporteerbare rapporten",
          ],
        },
        {
          id: "websites",
          number: "05",
          title: "Websites",
          tagline: "Snel online, professioneel en converteerend.",
          description:
            "Van landingspagina tot volledige marketing site. We bouwen websites die er niet alleen goed uitzien, maar ook laden en converteren.",
          items: [
            "Marketing- en portfolio sites",
            "Landingspagina's",
            "SEO-geoptimaliseerde structuur",
            "CMS-integratie (indien gewenst)",
          ],
        },
      ],
    },
    about: {
      label: "Over",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio is het freelance label van Hendrik Polinder — senior growth manager en digitaal consultant gevestigd in Hilversum.",
        "Ik help Nederlandse MKB-ers en ZZP-ers met het bouwen van digitale producten die echt werken. Geen overbodig advies, geen ingewikkelde trajecten — gewoon bouwen wat je nodig hebt.",
        "Van webapp tot native app tot AI-tooling: ik neem het technische gedeelte uit handen zodat jij je kunt focussen op je bedrijf.",
      ],
      locationLabel: "Locatie",
      locationValue: "Hilversum, Nederland",
      availabilityLabel: "Beschikbaarheid",
      availabilityValue: "Beschikbaar voor nieuwe projecten",
      contactLabel: "Contact",
      contactCta: "Stuur een bericht →",
    },
    cases: {
      label: "Cases",
      heading: "Wat we gemaakt hebben.",
      intro:
        "Echte ondernemers, echte resultaten. Een greep uit de projecten die we hebben opgeleverd.",
      projectLabel: "Wat we bouwden",
      resultLabel: "Resultaat",
      stories: [
        {
          id: "schilder",
          image: "/assets/Mark.jpg",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "Vroeger raakte ik offertes kwijt tussen de mails. Nu komt elke aanvraag netjes binnen en stuur ik binnen een dag een voorstel.",
          project: "Klantportaal met offerte-aanvragen en planning",
          result: "+40% meer aanvragen, helft minder administratie",
        },
        {
          id: "pt",
          image: "/assets/Sven.jpg",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "Mijn klanten boeken nu zelf hun sessies en volgen hun voortgang in de app. Ik houd tijd over voor het echte werk: coachen.",
          project: "Native app met boekingen en voortgang",
          result: "120 actieve gebruikers in 3 maanden",
        },
        {
          id: "coach",
          image: "/assets/Daan.jpg",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "De AI-tool vat mijn sessienotities samen en stelt vervolgvragen voor. Ik bespaar uren per week.",
          project: "AI-tool voor sessieverslagen",
          result: "6 uur per week bespaard",
        },
        {
          id: "advocaat",
          image: "/assets/Sanne.jpg",
          name: "Sanne",
          business: "Bakker Advocatuur",
          quote:
            "Cliënten uploaden documenten veilig via het portaal. Geen losse mails meer, alles op één plek.",
          project: "Beveiligd cliëntportaal met documentbeheer",
          result: "Dossiers 3x sneller compleet",
        },
      ],
      ctaHeading: "Word de volgende.",
      cta: "Neem contact op",
    },
    contact: {
      label: "Contact",
      heading: "Laten we praten.",
      subtext:
        "Heb je een project in gedachten? Vertel me wat je nodig hebt en ik reageer binnen één werkdag.",
      nameLabel: "Naam",
      namePlaceholder: "Jan de Vries",
      emailLabel: "E-mail",
      emailPlaceholder: "jan@bedrijf.nl",
      phoneLabel: "Telefoonnummer (optioneel)",
      phonePlaceholder: "06 12 34 56 78",
      interestLabel: "Ik heb interesse in het laten bouwen van",
      interestPlaceholder: "Maak een keuze",
      interestOptions: [
        { value: "webapp", label: "Een webapp" },
        { value: "native-app", label: "Een native app" },
        { value: "ai-tooling", label: "AI tooling" },
        { value: "dashboard", label: "Een dashboard" },
        { value: "website", label: "Een website" },
        { value: "anders", label: "Iets anders" },
      ],
      messageLabel: "Bericht",
      messagePlaceholder: "Vertel me over je project...",
      submitIdle: "Verstuur bericht",
      submitLoading: "Versturen...",
      successHeading: "Bericht verstuurd.",
      successSubtext: "Ik reageer binnen één werkdag.",
      errorText:
        "Er ging iets mis. Probeer het opnieuw of mail direct naar info@mobilegrowthstudio.com.",
      emailInfoLabel: "E-mail",
      locationLabel: "Locatie",
      locationValue: "Hilversum, Nederland",
      responseLabel: "Reactietijd",
      responseValue: "Binnen één werkdag",
      whatsappLabel: "WhatsApp",
      whatsappCta: "Stuur een WhatsApp",
    },
    faq: {
      label: "FAQ",
      heading: "Veelgestelde vragen.",
      subtext:
        "Alles wat je wilt weten over samenwerken met Mobile Growth Studio.",
      notFoundHeading: "Staat je vraag er niet bij?",
      notFoundSubtext:
        "Stuur een bericht en we reageren binnen één werkdag.",
      notFoundCta: "Neem contact op",
      items: [
        {
          question: "Wat doet Mobile Growth Studio?",
          answer:
            "Mobile Growth Studio bouwt digitale producten voor Nederlandse MKB-ers en ZZP-ers: webapplicaties, native iOS- en Android-apps, AI-tools, dashboards en websites. We nemen het technische gedeelte volledig uit handen zodat jij je kunt focussen op je bedrijf.",
        },
        {
          question: "Voor wie is Mobile Growth Studio bedoeld?",
          answer:
            "Onze klanten zijn Nederlandse MKB-bedrijven en ZZP-ers die een digitale oplossing nodig hebben maar geen eigen developers in dienst hebben. We werken voor bedrijven uit alle sectoren — van sportscholen en coachingspraktijken tot webwinkels en dienstverleners.",
        },
        {
          question: "Wat kost het om een webapp te laten bouwen?",
          answer:
            "De kosten van een webapp hangen af van de complexiteit en het aantal functies. Eenvoudige webapplicaties starten rond de €3.000–€6.000. Complexere SaaS-producten of klantportalen kosten meer. We werken op basis van een vaste projectprijs na een gratis kennismakingsgesprek.",
        },
        {
          question: "Wat is het verschil tussen een webapp en een native app?",
          answer:
            "Een webapp draait in de browser en is toegankelijk via een URL — geen download nodig. Een native app wordt geïnstalleerd via de App Store of Google Play en maakt direct gebruik van telefoonhardware zoals camera, notificaties en GPS. Native apps bieden doorgaans een vloeiendere gebruikerservaring, maar zijn duurder om te ontwikkelen.",
        },
        {
          question:
            "Hoe lang duurt het om een app of website te laten bouwen?",
          answer:
            "Een eenvoudige website of landingspagina is er binnen 1–2 weken. Een webapp of native app duurt gemiddeld 4–10 weken afhankelijk van de scope. Na het eerste gesprek krijg je altijd een concrete planning.",
        },
        {
          question: "Werken jullie met vaste prijzen of op uurbasis?",
          answer:
            "We werken bij voorkeur met een vaste projectprijs. Zo weet jij vooraf precies wat je betaalt en zijn er geen verrassingen achteraf. Voor doorlopend onderhoud of uitbreidingen werken we soms op retainer-basis.",
        },
        {
          question: "Wat is AI tooling en hoe kan het mijn bedrijf helpen?",
          answer:
            "AI tooling zijn op maat gemaakte softwaretools die gebruik maken van kunstmatige intelligentie om repetitieve taken te automatiseren. Denk aan automatische documentverwerking, slimme klantcommunicatie of datanalyse. We koppelen bestaande AI-modellen (zoals GPT of Claude) aan jouw specifieke bedrijfsprocessen.",
        },
        {
          question:
            "Kunnen jullie mijn bestaande systemen of software koppelen?",
          answer:
            "Ja. We bouwen regelmatig API-integraties met bestaande software zoals boekhoudsystemen, CRM-pakketten, webshops of externe databases. Vertel ons welke systemen je gebruikt en we kijken wat mogelijk is.",
        },
        {
          question: "Wat is dashboarding en waarom heb ik het nodig?",
          answer:
            "Een dashboard visualiseert jouw bedrijfsdata op één centrale plek — denk aan omzetcijfers, websitetraffic, klantendata of voorraadstatus. In plaats van losse Excel-bestanden of meerdere tools heb je alles realtime en overzichtelijk bij de hand. Wij bouwen dashboards op maat, gekoppeld aan jouw databronnen.",
        },
        {
          question: "Hoe werkt het proces bij Mobile Growth Studio?",
          answer:
            "We starten altijd met een gratis kennismakingsgesprek om jouw wensen en doelen te begrijpen. Daarna sturen we een heldere offerte. Bij akkoord starten we met de bouw, waarbij je regelmatig updates ontvangt. Na oplevering zorgen we voor een soepele overdracht en bieden we optioneel onderhoud aan.",
        },
        {
          question: "Waar is Mobile Growth Studio gevestigd?",
          answer:
            "Mobile Growth Studio is gevestigd in Hilversum, Nederland. We werken met klanten door heel Nederland, zowel op afstand als op locatie.",
        },
        {
          question:
            "Kan ik mijn website of app na oplevering zelf aanpassen?",
          answer:
            "Dat hangt af van de technologie die we kiezen. Voor websites bouwen we indien gewenst een CMS-integratie zodat je teksten en afbeeldingen zelf kunt aanpassen. Voor webapps en apps bespreken we vooraf welk niveau van zelfbeheer je wilt.",
        },
      ],
    },
  },

  en: {
    nav: {
      diensten: "Services",
      cases: "Cases",
      faq: "FAQ",
      over: "About",
      contact: "Contact",
      cta: "Get in touch",
      menuOpen: "Open menu",
      menuClose: "Close menu",
    },
    footer: {
      location: "Hilversum, Netherlands",
      copyright: "Mobile Growth Studio",
    },
    home: {
      label: "Mobile Growth Studio",
      headline1: "Apps & tools that give your",
      headlineAccent: "performance",
      headline2: "a boost.",
      subtext:
        "We build webapps, native apps and AI tooling for Dutch SMEs and freelancers — no nonsense, just results, so you can focus on what really matters.",
      cta: "Get in touch",
      viewServices: "View services",
      whatWeBuild: "What we build",
      moreInfo: "More info",
      ctaTileTitle: "Something else?",
      ctaTileText: "Tell us your idea. We're happy to think along about the best approach.",
      ctaTileLink: "Book a call",
      processLabel: "How it works",
      processHeading: "From idea to delivery.",
      processSteps: [
        {
          number: "01",
          title: "Introduction",
          text: "We discuss your idea and goals in a free call. No obligations.",
        },
        {
          number: "02",
          title: "Clear proposal",
          text: "You get a concrete quote with a fixed price and timeline. No surprises.",
        },
        {
          number: "03",
          title: "Build & deliver",
          text: "We build with regular updates and ensure a smooth delivery.",
        },
      ],
      ctaHeading: "Ready to start?",
      ctaSubtext:
        "Tell us what you want to build. We'll respond within 24 hours.",
    },
    services: {
      label: "Services",
      heading: "What we build.",
      items: [
        {
          id: "webapps",
          number: "01",
          title: "Webapps",
          tagline: "From idea to working application.",
          description:
            "We build custom web applications that digitise and automate your business processes. Whether it's a client portal, an internal dashboard or a full SaaS product — we build it from start to finish.",
          items: [
            "Next.js web applications",
            "Client portals and dashboards",
            "API integrations",
            "SaaS products",
          ],
        },
        {
          id: "native-apps",
          number: "02",
          title: "Native apps",
          tagline: "iOS and Android, done right.",
          description:
            "We build native mobile apps your customers love to use. Clean design, smooth performance and an experience that feels right at home on the platform.",
          items: [
            "iOS apps (Swift / SwiftUI)",
            "Android apps",
            "Cross-platform (React Native)",
            "App Store & Play Store publishing",
          ],
        },
        {
          id: "ai-tooling",
          number: "03",
          title: "AI tooling",
          tagline: "Automate what costs you time.",
          description:
            "We build AI tools that take over repetitive tasks. Not generic chatbots, but smart custom solutions tailored to your specific business processes.",
          items: [
            "AI-driven workflows",
            "Document and data processing",
            "Custom chatbots",
            "Integrations with GPT, Claude and other LLMs",
          ],
        },
        {
          id: "dashboarding",
          number: "04",
          title: "Dashboarding",
          tagline: "Clarity on your numbers, without the hassle.",
          description:
            "We build dashboards that turn your data into insight. Whether you use Google Analytics, your own database or external APIs — we make it clear and actionable.",
          items: [
            "Real-time data dashboards",
            "Connections to existing data sources",
            "Custom KPI overviews",
            "Exportable reports",
          ],
        },
        {
          id: "websites",
          number: "05",
          title: "Websites",
          tagline: "Online fast, professional and converting.",
          description:
            "From landing page to full marketing site. We build websites that not only look great but also load fast and convert.",
          items: [
            "Marketing and portfolio sites",
            "Landing pages",
            "SEO-optimised structure",
            "CMS integration (if desired)",
          ],
        },
      ],
    },
    about: {
      label: "About",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio is the freelance label of Hendrik Polinder — senior growth manager and digital consultant based in Hilversum, Netherlands.",
        "I help Dutch SMEs and freelancers build digital products that actually work. No unnecessary advice, no complicated processes — just building what you need.",
        "From webapp to native app to AI tooling: I handle the technical side so you can focus on your business.",
      ],
      locationLabel: "Location",
      locationValue: "Hilversum, Netherlands",
      availabilityLabel: "Availability",
      availabilityValue: "Available for new projects",
      contactLabel: "Contact",
      contactCta: "Send a message →",
    },
    cases: {
      label: "Cases",
      heading: "What we've built.",
      intro:
        "Real entrepreneurs, real results. A selection of the projects we've delivered.",
      projectLabel: "What we built",
      resultLabel: "Result",
      stories: [
        {
          id: "schilder",
          image: "/assets/Mark.jpg",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "I used to lose quotes in my inbox. Now every request comes in neatly and I send a proposal within a day.",
          project: "Client portal with quote requests and scheduling",
          result: "+40% more requests, half the admin",
        },
        {
          id: "pt",
          image: "/assets/Sven.jpg",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "My clients now book their own sessions and track progress in the app. That frees me up for the real work: coaching.",
          project: "Native app with bookings and progress tracking",
          result: "120 active users in 3 months",
        },
        {
          id: "coach",
          image: "/assets/Daan.jpg",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "The AI tool summarises my session notes and suggests follow-up questions. It saves me hours every week.",
          project: "AI tool for session reports",
          result: "6 hours saved per week",
        },
        {
          id: "advocaat",
          image: "/assets/Sanne.jpg",
          name: "Sanne",
          business: "Bakker Advocatuur",
          quote:
            "Clients upload documents securely through the portal. No more scattered emails, everything in one place.",
          project: "Secure client portal with document management",
          result: "Case files complete 3x faster",
        },
      ],
      ctaHeading: "Be the next one.",
      cta: "Get in touch",
    },
    contact: {
      label: "Contact",
      heading: "Let's talk.",
      subtext:
        "Have a project in mind? Tell me what you need and I'll respond within one business day.",
      nameLabel: "Name",
      namePlaceholder: "John Smith",
      emailLabel: "E-mail",
      emailPlaceholder: "john@company.com",
      phoneLabel: "Phone number (optional)",
      phonePlaceholder: "+31 6 12 34 56 78",
      interestLabel: "I'm interested in building",
      interestPlaceholder: "Make a choice",
      interestOptions: [
        { value: "webapp", label: "A web app" },
        { value: "native-app", label: "A native app" },
        { value: "ai-tooling", label: "AI tooling" },
        { value: "dashboard", label: "A dashboard" },
        { value: "website", label: "A website" },
        { value: "anders", label: "Something else" },
      ],
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your project...",
      submitIdle: "Send message",
      submitLoading: "Sending...",
      successHeading: "Message sent.",
      successSubtext: "I'll respond within one business day.",
      errorText:
        "Something went wrong. Please try again or email directly at info@mobilegrowthstudio.com.",
      emailInfoLabel: "E-mail",
      locationLabel: "Location",
      locationValue: "Hilversum, Netherlands",
      responseLabel: "Response time",
      responseValue: "Within one business day",
      whatsappLabel: "WhatsApp",
      whatsappCta: "Message us on WhatsApp",
    },
    faq: {
      label: "FAQ",
      heading: "Frequently asked questions.",
      subtext:
        "Everything you want to know about working with Mobile Growth Studio.",
      notFoundHeading: "Can't find your question?",
      notFoundSubtext:
        "Send a message and we'll respond within one business day.",
      notFoundCta: "Get in touch",
      items: [
        {
          question: "What does Mobile Growth Studio do?",
          answer:
            "Mobile Growth Studio builds digital products for Dutch SMEs and freelancers: web applications, native iOS and Android apps, AI tools, dashboards and websites. We take the technical side completely off your hands so you can focus on your business.",
        },
        {
          question: "Who is Mobile Growth Studio for?",
          answer:
            "Our clients are Dutch SMEs and freelancers who need a digital solution but don't have in-house developers. We work for businesses across all sectors — from gyms and coaching practices to online shops and service providers.",
        },
        {
          question: "What does it cost to have a webapp built?",
          answer:
            "The cost of a webapp depends on complexity and the number of features. Simple web applications start around €3,000–€6,000. More complex SaaS products or client portals cost more. We work with a fixed project price after a free introductory call.",
        },
        {
          question: "What is the difference between a webapp and a native app?",
          answer:
            "A webapp runs in the browser and is accessible via a URL — no download needed. A native app is installed via the App Store or Google Play and directly uses phone hardware such as camera, notifications and GPS. Native apps generally offer a smoother user experience but are more expensive to develop.",
        },
        {
          question: "How long does it take to build an app or website?",
          answer:
            "A simple website or landing page can be ready within 1–2 weeks. A webapp or native app typically takes 4–10 weeks depending on scope. After the first call you always receive a concrete timeline.",
        },
        {
          question: "Do you work with fixed prices or hourly rates?",
          answer:
            "We prefer to work with a fixed project price. That way you know exactly what you'll pay upfront and there are no surprises afterwards. For ongoing maintenance or extensions we sometimes work on a retainer basis.",
        },
        {
          question: "What is AI tooling and how can it help my business?",
          answer:
            "AI tooling is custom software that uses artificial intelligence to automate repetitive tasks. Think automatic document processing, smart customer communication or data analysis. We connect existing AI models (such as GPT or Claude) to your specific business processes.",
        },
        {
          question: "Can you integrate my existing systems or software?",
          answer:
            "Yes. We regularly build API integrations with existing software such as accounting systems, CRM packages, webshops or external databases. Tell us which systems you use and we'll see what's possible.",
        },
        {
          question: "What is dashboarding and why do I need it?",
          answer:
            "A dashboard visualises your business data in one central place — think revenue figures, website traffic, customer data or inventory status. Instead of separate Excel files or multiple tools you have everything real-time and clear at hand. We build custom dashboards connected to your data sources.",
        },
        {
          question: "How does the process at Mobile Growth Studio work?",
          answer:
            "We always start with a free introductory call to understand your wishes and goals. We then send a clear quote. Upon agreement we start building, with regular updates. After delivery we ensure a smooth handover and offer optional maintenance.",
        },
        {
          question: "Where is Mobile Growth Studio located?",
          answer:
            "Mobile Growth Studio is based in Hilversum, Netherlands. We work with clients throughout the Netherlands, both remotely and on-site.",
        },
        {
          question: "Can I update my website or app myself after delivery?",
          answer:
            "That depends on the technology we choose. For websites we can build a CMS integration so you can update text and images yourself. For webapps and apps we discuss upfront what level of self-management you want.",
        },
      ],
    },
  },

  de: {
    nav: {
      diensten: "Leistungen",
      cases: "Cases",
      faq: "FAQ",
      over: "Über uns",
      contact: "Kontakt",
      cta: "Kontakt aufnehmen",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
    },
    footer: {
      location: "Hilversum, Niederlande",
      copyright: "Mobile Growth Studio",
    },
    home: {
      label: "Mobile Growth Studio",
      headline1: "Apps & Tools, die Ihre",
      headlineAccent: "Performance",
      headline2: "ankurbeln.",
      subtext:
        "Wir entwickeln Webapps, native Apps und KI-Tools für kleine und mittlere Unternehmen — ohne Schnickschnack, mit Ergebnissen, damit Sie sich auf das Wesentliche konzentrieren können.",
      cta: "Kontakt aufnehmen",
      viewServices: "Leistungen ansehen",
      whatWeBuild: "Was wir bauen",
      moreInfo: "Mehr erfahren",
      ctaTileTitle: "Etwas anderes?",
      ctaTileText: "Erzählen Sie uns Ihre Idee. Wir denken gerne über den besten Ansatz mit.",
      ctaTileLink: "Gespräch vereinbaren",
      processLabel: "So funktioniert es",
      processHeading: "Von der Idee zur Lieferung.",
      processSteps: [
        {
          number: "01",
          title: "Kennenlernen",
          text: "Wir besprechen Ihre Idee und Ziele in einem kostenlosen Gespräch. Unverbindlich.",
        },
        {
          number: "02",
          title: "Klares Angebot",
          text: "Sie erhalten ein konkretes Angebot mit Festpreis und Zeitplan. Keine Überraschungen.",
        },
        {
          number: "03",
          title: "Bauen & liefern",
          text: "Wir bauen mit regelmäßigen Updates und sorgen für eine reibungslose Lieferung.",
        },
      ],
      ctaHeading: "Bereit loszulegen?",
      ctaSubtext:
        "Erzählen Sie uns, was Sie bauen möchten. Wir antworten innerhalb von 24 Stunden.",
    },
    services: {
      label: "Leistungen",
      heading: "Was wir bauen.",
      items: [
        {
          id: "webapps",
          number: "01",
          title: "Webapps",
          tagline: "Von der Idee zur fertigen Anwendung.",
          description:
            "Wir entwickeln maßgeschneiderte Webanwendungen, die Ihre Geschäftsprozesse digitalisieren und automatisieren. Ob Kundenportal, internes Dashboard oder vollständiges SaaS-Produkt — wir bauen es von Anfang bis Ende.",
          items: [
            "Next.js Webanwendungen",
            "Kundenportale und Dashboards",
            "API-Integrationen",
            "SaaS-Produkte",
          ],
        },
        {
          id: "native-apps",
          number: "02",
          title: "Native Apps",
          tagline: "iOS und Android, richtig gemacht.",
          description:
            "Wir entwickeln native mobile Apps, die Ihre Kunden gerne nutzen. Klares Design, flüssige Performance und ein Erlebnis, das sich auf der Plattform zu Hause fühlt.",
          items: [
            "iOS Apps (Swift / SwiftUI)",
            "Android Apps",
            "Cross-platform (React Native)",
            "App Store & Play Store Veröffentlichung",
          ],
        },
        {
          id: "ai-tooling",
          number: "03",
          title: "KI-Tools",
          tagline: "Automatisieren Sie, was Sie Zeit kostet.",
          description:
            "Wir entwickeln KI-Tools, die repetitive Aufgaben übernehmen. Keine generischen Chatbots, sondern intelligente Lösungen für Ihre spezifischen Geschäftsprozesse.",
          items: [
            "KI-gesteuerte Workflows",
            "Dokument- und Datenverarbeitung",
            "Maßgeschneiderte Chatbots",
            "Integrationen mit GPT, Claude und anderen LLMs",
          ],
        },
        {
          id: "dashboarding",
          number: "04",
          title: "Dashboarding",
          tagline: "Klarheit über Ihre Zahlen, ohne Aufwand.",
          description:
            "Wir entwickeln Dashboards, die Ihre Daten in Übersicht verwandeln. Ob Google Analytics, eigene Datenbank oder externe APIs — wir machen es verständlich und nutzbar.",
          items: [
            "Echtzeit-Daten-Dashboards",
            "Anbindung bestehender Datenquellen",
            "Individuelle KPI-Übersichten",
            "Exportierbare Berichte",
          ],
        },
        {
          id: "websites",
          number: "05",
          title: "Websites",
          tagline: "Schnell online, professionell und konvertierend.",
          description:
            "Von der Landing Page bis zur vollständigen Marketing-Website. Wir entwickeln Websites, die nicht nur gut aussehen, sondern auch schnell laden und konvertieren.",
          items: [
            "Marketing- und Portfolio-Websites",
            "Landing Pages",
            "SEO-optimierte Struktur",
            "CMS-Integration (auf Wunsch)",
          ],
        },
      ],
    },
    about: {
      label: "Über uns",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio ist das Freelance-Label von Hendrik Polinder — Senior Growth Manager und digitaler Consultant mit Sitz in Hilversum, Niederlande.",
        "Ich helfe kleinen und mittleren Unternehmen dabei, digitale Produkte zu entwickeln, die wirklich funktionieren. Keine unnötigen Beratungen, keine komplizierten Prozesse — einfach bauen, was Sie brauchen.",
        "Vom Webapp über native Apps bis zu KI-Tools: Ich übernehme den technischen Teil, damit Sie sich auf Ihr Unternehmen konzentrieren können.",
      ],
      locationLabel: "Standort",
      locationValue: "Hilversum, Niederlande",
      availabilityLabel: "Verfügbarkeit",
      availabilityValue: "Verfügbar für neue Projekte",
      contactLabel: "Kontakt",
      contactCta: "Nachricht senden →",
    },
    cases: {
      label: "Cases",
      heading: "Was wir gebaut haben.",
      intro:
        "Echte Unternehmer, echte Ergebnisse. Eine Auswahl der Projekte, die wir geliefert haben.",
      projectLabel: "Was wir gebaut haben",
      resultLabel: "Ergebnis",
      stories: [
        {
          id: "schilder",
          image: "/assets/Mark.jpg",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "Früher gingen Angebote in meinem Postfach unter. Jetzt kommt jede Anfrage sauber an und ich schicke innerhalb eines Tages ein Angebot.",
          project: "Kundenportal mit Angebotsanfragen und Planung",
          result: "+40% mehr Anfragen, halb so viel Verwaltung",
        },
        {
          id: "pt",
          image: "/assets/Sven.jpg",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "Meine Kunden buchen jetzt selbst ihre Sessions und verfolgen ihren Fortschritt in der App. So bleibt mir Zeit für das Wesentliche: das Coaching.",
          project: "Native App mit Buchungen und Fortschritt",
          result: "120 aktive Nutzer in 3 Monaten",
        },
        {
          id: "coach",
          image: "/assets/Daan.jpg",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "Das KI-Tool fasst meine Sitzungsnotizen zusammen und schlägt Folgefragen vor. Das spart mir jede Woche Stunden.",
          project: "KI-Tool für Sitzungsberichte",
          result: "6 Stunden pro Woche gespart",
        },
        {
          id: "advocaat",
          image: "/assets/Sanne.jpg",
          name: "Sanne",
          business: "Bakker Advocatuur",
          quote:
            "Mandanten laden Dokumente sicher über das Portal hoch. Keine verstreuten E-Mails mehr, alles an einem Ort.",
          project: "Sicheres Mandantenportal mit Dokumentenverwaltung",
          result: "Akten 3x schneller vollständig",
        },
      ],
      ctaHeading: "Werden Sie der Nächste.",
      cta: "Kontakt aufnehmen",
    },
    contact: {
      label: "Kontakt",
      heading: "Lassen Sie uns reden.",
      subtext:
        "Haben Sie ein Projekt im Sinn? Erzählen Sie mir, was Sie brauchen, und ich antworte innerhalb eines Werktages.",
      nameLabel: "Name",
      namePlaceholder: "Max Mustermann",
      emailLabel: "E-Mail",
      emailPlaceholder: "max@unternehmen.de",
      phoneLabel: "Telefonnummer (optional)",
      phonePlaceholder: "+49 151 23 45 67 89",
      interestLabel: "Ich interessiere mich für die Entwicklung von",
      interestPlaceholder: "Treffen Sie eine Auswahl",
      interestOptions: [
        { value: "webapp", label: "Einer Web-App" },
        { value: "native-app", label: "Einer Native App" },
        { value: "ai-tooling", label: "KI-Tools" },
        { value: "dashboard", label: "Einem Dashboard" },
        { value: "website", label: "Einer Website" },
        { value: "anders", label: "Etwas anderem" },
      ],
      messageLabel: "Nachricht",
      messagePlaceholder: "Erzählen Sie mir von Ihrem Projekt...",
      submitIdle: "Nachricht senden",
      submitLoading: "Wird gesendet...",
      successHeading: "Nachricht gesendet.",
      successSubtext: "Ich antworte innerhalb eines Werktages.",
      errorText:
        "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an info@mobilegrowthstudio.com.",
      emailInfoLabel: "E-Mail",
      locationLabel: "Standort",
      locationValue: "Hilversum, Niederlande",
      responseLabel: "Antwortzeit",
      responseValue: "Innerhalb eines Werktages",
      whatsappLabel: "WhatsApp",
      whatsappCta: "Schreib uns auf WhatsApp",
    },
    faq: {
      label: "FAQ",
      heading: "Häufig gestellte Fragen.",
      subtext:
        "Alles, was Sie über die Zusammenarbeit mit Mobile Growth Studio wissen möchten.",
      notFoundHeading: "Ihre Frage nicht dabei?",
      notFoundSubtext:
        "Senden Sie eine Nachricht und wir antworten innerhalb eines Werktages.",
      notFoundCta: "Kontakt aufnehmen",
      items: [
        {
          question: "Was macht Mobile Growth Studio?",
          answer:
            "Mobile Growth Studio entwickelt digitale Produkte für kleine und mittlere Unternehmen sowie Freelancer: Webanwendungen, native iOS- und Android-Apps, KI-Tools, Dashboards und Websites. Wir übernehmen den technischen Teil vollständig, damit Sie sich auf Ihr Unternehmen konzentrieren können.",
        },
        {
          question: "Für wen ist Mobile Growth Studio gedacht?",
          answer:
            "Unsere Kunden sind KMUs und Freelancer, die eine digitale Lösung benötigen, aber keine eigenen Entwickler angestellt haben. Wir arbeiten für Unternehmen aus allen Branchen — von Fitnessstudios und Coaching-Praxen bis zu Online-Shops und Dienstleistern.",
        },
        {
          question: "Was kostet es, eine Webapp entwickeln zu lassen?",
          answer:
            "Die Kosten einer Webapp hängen von der Komplexität und der Anzahl der Funktionen ab. Einfache Webanwendungen beginnen bei ca. €3.000–€6.000. Komplexere SaaS-Produkte oder Kundenportale kosten mehr. Wir arbeiten mit einem Festpreis nach einem kostenlosen Erstgespräch.",
        },
        {
          question:
            "Was ist der Unterschied zwischen einer Webapp und einer nativen App?",
          answer:
            "Eine Webapp läuft im Browser und ist über eine URL zugänglich — kein Download nötig. Eine native App wird über den App Store oder Google Play installiert und nutzt direkt die Gerätehardware wie Kamera, Benachrichtigungen und GPS. Native Apps bieten in der Regel ein flüssigeres Nutzererlebnis, sind aber teurer in der Entwicklung.",
        },
        {
          question:
            "Wie lange dauert die Entwicklung einer App oder Website?",
          answer:
            "Eine einfache Website oder Landing Page ist in 1–2 Wochen fertig. Eine Webapp oder native App dauert durchschnittlich 4–10 Wochen je nach Umfang. Nach dem ersten Gespräch erhalten Sie immer eine konkrete Planung.",
        },
        {
          question: "Arbeiten Sie mit Festpreisen oder auf Stundenbasis?",
          answer:
            "Wir bevorzugen einen Festpreis. So wissen Sie im Voraus genau, was Sie zahlen, und es gibt keine Überraschungen im Nachhinein. Für laufende Wartung oder Erweiterungen arbeiten wir manchmal auf Retainer-Basis.",
        },
        {
          question:
            "Was sind KI-Tools und wie können sie meinem Unternehmen helfen?",
          answer:
            "KI-Tools sind maßgeschneiderte Softwarelösungen, die künstliche Intelligenz nutzen, um repetitive Aufgaben zu automatisieren. Denken Sie an automatische Dokumentenverarbeitung, intelligente Kundenkommunikation oder Datenanalyse. Wir verbinden bestehende KI-Modelle (wie GPT oder Claude) mit Ihren spezifischen Geschäftsprozessen.",
        },
        {
          question:
            "Können Sie meine bestehenden Systeme oder Software integrieren?",
          answer:
            "Ja. Wir entwickeln regelmäßig API-Integrationen mit bestehender Software wie Buchhaltungssystemen, CRM-Paketen, Webshops oder externen Datenbanken. Teilen Sie uns mit, welche Systeme Sie verwenden, und wir prüfen, was möglich ist.",
        },
        {
          question: "Was ist Dashboarding und warum brauche ich es?",
          answer:
            "Ein Dashboard visualisiert Ihre Unternehmensdaten an einem zentralen Ort — denken Sie an Umsatzzahlen, Website-Traffic, Kundendaten oder Lagerstand. Statt einzelner Excel-Dateien oder mehrerer Tools haben Sie alles in Echtzeit und übersichtlich zur Hand. Wir entwickeln individuelle Dashboards, die mit Ihren Datenquellen verbunden sind.",
        },
        {
          question: "Wie läuft der Prozess bei Mobile Growth Studio ab?",
          answer:
            "Wir beginnen immer mit einem kostenlosen Erstgespräch, um Ihre Wünsche und Ziele zu verstehen. Dann senden wir ein klares Angebot. Bei Zustimmung beginnen wir mit der Entwicklung, wobei Sie regelmäßige Updates erhalten. Nach der Lieferung sorgen wir für eine reibungslose Übergabe und bieten optional Wartung an.",
        },
        {
          question: "Wo ist Mobile Growth Studio ansässig?",
          answer:
            "Mobile Growth Studio hat seinen Sitz in Hilversum, Niederlande. Wir arbeiten mit Kunden in den Niederlanden, sowohl remote als auch vor Ort.",
        },
        {
          question:
            "Kann ich meine Website oder App nach der Lieferung selbst anpassen?",
          answer:
            "Das hängt von der gewählten Technologie ab. Für Websites können wir auf Wunsch eine CMS-Integration einbauen, damit Sie Texte und Bilder selbst anpassen können. Für Webapps und Apps besprechen wir vorab, welches Maß an Selbstverwaltung Sie wünschen.",
        },
      ],
    },
  },
} as const;

export type Translations = (typeof translations)[Locale];

export function getTranslations(locale: string): Translations {
  if (locale === "nl") return translations.nl;
  if (locale === "de") return translations.de;
  return translations.en;
}
