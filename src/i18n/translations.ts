export type Locale = "en" | "nl" | "de";

export const translations = {
  nl: {
    nav: {
      diensten: "Diensten",
      cases: "Portfolio",
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
      privacy: "Privacy",
      terms: "Voorwaarden",
      cookies: "Cookies",
    },
    home: {
      label: "Mobile Growth Studio",
      headline1: "Apps & tools die je",
      headlineAccent: "performance",
      headline2: "een boost geven.",
      subtext:
        "We bouwen webapps, native apps en AI tooling voor MKB-ers en ZZP-ers — zonder poespas, met resultaat, zodat jij je bezig kan houden met waar het echt om draait.",
      cta: "Neem contact op",
      viewServices: "Bekijk diensten",
      whatWeBuild: "Wat we bouwen",
      featuredLabel: "Onze focus",
      examplesTitle: "Voorbeelden van ons werk",
      viewExamples: "Bekijk voorbeelden",
      hideExamples: "Verberg voorbeelden",
      examplesSoon: "Binnenkort",
      closeLabel: "Sluiten",
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
      differentiator: {
        label: "Onze aanpak",
        heading: "Gebouwd met AI. Sneller, scherper, bijna grenzeloos.",
        body: "We bouwen met AI in het hart van ons proces. Dat versnelt elke fase — van concept en design tot code en oplevering — zodat je sneller een werkend product in handen hebt. Het maakt qua design en functionaliteit bijna niets onmogelijk: ideeën die met traditionele ontwikkeling te duur of te complex waren, zijn nu wél haalbaar. En dat alles tegen een fractie van de kosten van een klassiek dev-traject, zonder in te leveren op kwaliteit. Bovendien is alles maatwerk, volledig toegespitst op jouw bedrijf en werkprocessen.",
        points: [
          {
            title: "Sneller opgeleverd",
            text: "AI versnelt elke fase, van concept en design tot code en oplevering.",
          },
          {
            title: "Bijna niets onmogelijk",
            text: "Complexe ideeën die voorheen te duur of te ingewikkeld waren, zijn nu wél haalbaar.",
          },
          {
            title: "Fractie van de kosten",
            text: "De kwaliteit van traditionele ontwikkeling, voor een fractie van de prijs.",
          },
          {
            title: "Maatwerk op jouw processen",
            text: "Volledig toegespitst op jouw bedrijf en werkprocessen, geen standaardpakket.",
          },
        ],
      },
      connectionGraphic: {
        inputs: [
          { id: "admin", label: "Te veel admin" },
          { id: "process", label: "Trage processen" },
          { id: "time", label: "Geen tijd" },
        ],
        outputs: [
          { id: "webapp", label: "Webapp" },
          { id: "native", label: "Native app" },
          { id: "ai", label: "AI tooling" },
          { id: "dashboard", label: "Dashboard" },
          { id: "website", label: "Website" },
        ],
      },
    },
    services: {
      label: "Diensten",
      heading: "Wat we bouwen.",
      items: [
        {
          id: "ai-tooling",
          number: "01",
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
          number: "02",
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
          number: "03",
          title: "Websites",
          tagline: "Snel online, professioneel en converteerend.",
          description:
            "Van landingspagina tot volledige marketing site. We bouwen websites die er niet alleen goed uitzien, maar ook laden en converteren.",
          items: [
            "Marketing- en portfolio sites",
            "Landingspagina's",
            "SEO, GEO & AEO (vindbaar in Google én AI-zoekmachines)",
            "Integratie met externe tools (CRM, nieuwsbrief, betalingen)",
            "Betaalmuren & members-only content",
            "Analytics, A/B-testing & conversie-optimalisatie (CRO)",
            "AVG- & cookie-consent",
            "Topprestaties & rich results (Core Web Vitals, schema.org)",
            "CMS-integratie (indien gewenst)",
          ],
        },
        {
          id: "webapps",
          number: "04",
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
          number: "05",
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
      ],
    },
    about: {
      label: "Over",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio is het freelance label van Hendrik Polinder — senior growth manager en digitaal consultant gevestigd in Hilversum.",
        "We helpen MKB-ers en ZZP-ers met het bouwen van digitale producten die echt werken. Geen overbodig advies, geen ingewikkelde trajecten — gewoon bouwen wat je nodig hebt.",
        "Van webapp tot native app tot AI-tooling: we nemen het technische gedeelte uit handen zodat jij je kunt focussen op je bedrijf.",
      ],
      locationLabel: "Locatie",
      locationValue: "Hilversum, Nederland",
      availabilityLabel: "Beschikbaarheid",
      availabilityValue: "Beschikbaar voor nieuwe projecten",
      contactLabel: "Contact",
      contactCta: "Stuur een bericht →",
    },
    cases: {
      label: "Portfolio",
      heading: "Wat we gemaakt hebben.",
      intro:
        "Echte ondernemers, echte resultaten. Een greep uit de projecten die we hebben opgeleverd.",
      projectLabel: "Wat we bouwden",
      resultLabel: "Resultaat",
      visitLabel: "Bekijk de site",
      stories: [
        {
          id: "oreq",
          mockup: "browser",
          name: "Eric van der Zwan",
          business: "OREQ",
          quote:
            "De site laat nu in één oogopslag zien wat OREQ doet. Sinds de livegang komen aanvragen voor coaching en trainingen veel vaker binnen.",
          project: "Website met heldere propositie voor coaching en trainingen",
          result: "Meer aanvragen voor coaching en trainingen",
          image: "/cases/oreq.png",
          url: "https://oreq.nl",
        },
        {
          id: "ericsweder",
          mockup: "browser",
          name: "Eric Sweder",
          business: "By Eric Sweder",
          quote:
            "Mijn werk is persoonlijk en dat moest de site ook uitstralen. Bezoekers boeken nu zelf een consult en melden zich direct aan voor de opleiding.",
          project: "Website met consult-aanvragen en aanmeldingen voor de opleiding",
          result: "Boekingen en aanmeldingen lopen via de site",
          image: "/cases/ericsweder.png",
          url: "https://ericsweder.com",
        },
        {
          id: "schilder",
          mockup: "browser",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "Vroeger raakte ik offertes kwijt tussen de mails. Nu komt elke aanvraag netjes binnen en stuur ik binnen een dag een voorstel.",
          project: "Klantportaal met offerte-aanvragen en planning",
          result: "+40% meer aanvragen, helft minder administratie",
        },
        {
          id: "pt",
          mockup: "mobile",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "Mijn klanten boeken nu zelf hun sessies en volgen hun voortgang in de app. Ik houd tijd over voor het echte werk: coachen.",
          project: "Native app met boekingen en voortgang",
          result: "120 actieve gebruikers in 3 maanden",
        },
        {
          id: "coach",
          mockup: "ai",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "De AI-tool vat mijn sessienotities samen en stelt vervolgvragen voor. Ik bespaar uren per week.",
          project: "AI-tool voor sessieverslagen",
          result: "6 uur per week bespaard",
        },
        {
          id: "advocaat",
          mockup: "browser",
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
        "Heb je een project in gedachten? Vertel ons wat je nodig hebt en we reageren binnen één werkdag.",
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
      messagePlaceholder: "Vertel ons over je project...",
      submitIdle: "Verstuur bericht",
      submitLoading: "Versturen...",
      successHeading: "Bericht verstuurd.",
      successSubtext: "We reageren binnen één werkdag.",
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
            "Mobile Growth Studio bouwt digitale producten voor MKB-ers en ZZP-ers: webapplicaties, native iOS- en Android-apps, AI-tools, dashboards en websites. We nemen het technische gedeelte volledig uit handen zodat jij je kunt focussen op je bedrijf.",
        },
        {
          question: "Voor wie is Mobile Growth Studio bedoeld?",
          answer:
            "Onze klanten zijn MKB-bedrijven en ZZP-ers die een digitale oplossing nodig hebben maar geen eigen developers in dienst hebben. We werken voor bedrijven uit alle sectoren — van sportscholen en coachingspraktijken tot webwinkels en dienstverleners.",
        },
        {
          question: "Wat maakt jullie anders?",
          answer:
            "We bouwen met AI in het hart van ons proces. Dat versnelt elke fase — van concept en design tot code en oplevering — zodat je sneller een werkend product in handen hebt. Het maakt qua design en functionaliteit bijna niets onmogelijk: ideeën die met traditionele ontwikkeling te duur of te complex waren, zijn nu wél haalbaar. En dat alles tegen een fractie van de kosten van een klassiek dev-traject, zonder in te leveren op kwaliteit. Bovendien is alles maatwerk, volledig toegespitst op jouw bedrijf en werkprocessen — geen standaardpakket, maar een oplossing die past op hoe jij werkt. Jij profiteert van de snelheid en de scherpe prijs, wij doen het zware werk.",
        },
        {
          question: "Wat voor dingen kunnen jullie zoal bouwen?",
          answer:
            "Bijna alles wat digitaal is. Een greep uit wat we maken: klantportalen en boekingssystemen, interne tools en planningssoftware, complete SaaS-producten, native iOS- en Android-apps, AI-assistenten en automatiseringen, realtime dashboards, webshops met betaalmuren of members-only content, en snelle marketing- of portfoliosites. Heb je een idee dat hier niet tussen staat? Grote kans dat het toch kan — vertel het ons en we denken mee.",
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
          question: "Werken jullie met vaste prijzen?",
          answer:
            "Ja. We werken bij voorkeur met een vaste projectprijs, afgesproken na een gratis kennismakingsgesprek. Zo weet je vooraf waar je aan toe bent en zijn er geen verrassingen achteraf. Voor doorlopend onderhoud of uitbreidingen werken we soms op retainer-basis.",
        },
        {
          question: "Wat is AI tooling en hoe kan het mijn bedrijf helpen?",
          answer:
            "AI tooling zijn op maat gemaakte tools die kunstmatige intelligentie inzetten om werk uit handen te nemen dat normaal veel tijd of mensen kost. Geen generieke chatbot, maar een oplossing die precies op jouw processen past. Voorbeelden die we bouwen: een assistent die offertes, contracten of e-mails automatisch opstelt uit je eigen sjablonen; documentverwerking die facturen, bonnen of formulieren uitleest en direct in je systeem zet; een support-chatbot getraind op jouw handleidingen en veelgestelde vragen; binnenkomende tickets en mails die automatisch worden gecategoriseerd en beantwoord; of een tool die lange rapporten en databergen samenvat tot heldere inzichten. We koppelen modellen als GPT en Claude aan jouw eigen data en software, met de juiste waarborgen voor privacy.",
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
            "Een dashboard brengt al je bedrijfsdata samen op één plek, realtime en overzichtelijk — in plaats van losse Excel-bestanden en een wirwar aan tools. We bouwen dashboards op maat, gekoppeld aan jouw bronnen: Google Analytics, je eigen database, je boekhouding, CRM of externe API's. Voorbeelden: een directie-cockpit met omzet, marge en KPI's; een realtime sales- of marketingoverzicht; voorraad- en logistiekrapportages; of klant- en projectdashboards die je kunt exporteren. Met AI gaan we een stap verder: het dashboard signaleert trends, licht afwijkingen uit en legt in gewone taal uit wát je cijfers betekenen en wat je beste volgende stap is.",
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
      cases: "Portfolio",
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
      privacy: "Privacy",
      terms: "Terms",
      cookies: "Cookies",
    },
    home: {
      label: "Mobile Growth Studio",
      headline1: "Apps & tools that give your",
      headlineAccent: "performance",
      headline2: "a boost.",
      subtext:
        "We build webapps, native apps and AI tooling for SMEs and freelancers — no nonsense, just results, so you can focus on what really matters.",
      cta: "Get in touch",
      viewServices: "View services",
      whatWeBuild: "What we build",
      featuredLabel: "Our focus",
      examplesTitle: "Examples of our work",
      viewExamples: "View examples",
      hideExamples: "Hide examples",
      examplesSoon: "Coming soon",
      closeLabel: "Close",
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
      differentiator: {
        label: "Our approach",
        heading: "Built with AI. Faster, sharper, almost limitless.",
        body: "We build with AI at the heart of our process. That speeds up every phase — from concept and design to code and delivery — so you have a working product in hand sooner. It makes almost nothing impossible in terms of design and functionality: ideas that were too expensive or too complex with traditional development are now within reach. And all of that at a fraction of the cost of a classic dev project, without compromising on quality. On top of that, everything is custom-built, fully tailored to your business and the way you work.",
        points: [
          {
            title: "Delivered faster",
            text: "AI speeds up every phase, from concept and design to code and delivery.",
          },
          {
            title: "Almost nothing impossible",
            text: "Complex ideas that used to be too expensive or too complex are now within reach.",
          },
          {
            title: "A fraction of the cost",
            text: "The quality of traditional development, for a fraction of the price.",
          },
          {
            title: "Tailored to your processes",
            text: "Fully built around your business and the way you work, never off-the-shelf.",
          },
        ],
      },
      connectionGraphic: {
        inputs: [
          { id: "admin", label: "Too much admin" },
          { id: "process", label: "Slow processes" },
          { id: "time", label: "No time" },
        ],
        outputs: [
          { id: "webapp", label: "Web app" },
          { id: "native", label: "Native app" },
          { id: "ai", label: "AI tooling" },
          { id: "dashboard", label: "Dashboard" },
          { id: "website", label: "Website" },
        ],
      },
    },
    services: {
      label: "Services",
      heading: "What we build.",
      items: [
        {
          id: "ai-tooling",
          number: "01",
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
          number: "02",
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
          number: "03",
          title: "Websites",
          tagline: "Online fast, professional and converting.",
          description:
            "From landing page to full marketing site. We build websites that not only look great but also load fast and convert.",
          items: [
            "Marketing and portfolio sites",
            "Landing pages",
            "SEO, GEO & AEO (found on Google and AI search)",
            "Integration with external tools (CRM, newsletter, payments)",
            "Paywalls & members-only content",
            "Analytics, A/B testing & conversion optimisation (CRO)",
            "GDPR & cookie consent",
            "Top performance & rich results (Core Web Vitals, schema.org)",
            "CMS integration (if desired)",
          ],
        },
        {
          id: "webapps",
          number: "04",
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
          number: "05",
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
      ],
    },
    about: {
      label: "About",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio is the freelance label of Hendrik Polinder — senior growth manager and digital consultant based in Hilversum, Netherlands.",
        "We help SMEs and freelancers build digital products that actually work. No unnecessary advice, no complicated processes — just building what you need.",
        "From webapp to native app to AI tooling: we handle the technical side so you can focus on your business.",
      ],
      locationLabel: "Location",
      locationValue: "Hilversum, Netherlands",
      availabilityLabel: "Availability",
      availabilityValue: "Available for new projects",
      contactLabel: "Contact",
      contactCta: "Send a message →",
    },
    cases: {
      label: "Portfolio",
      heading: "What we've built.",
      intro:
        "Real entrepreneurs, real results. A selection of the projects we've delivered.",
      projectLabel: "What we built",
      resultLabel: "Result",
      visitLabel: "Visit the site",
      stories: [
        {
          id: "oreq",
          mockup: "browser",
          name: "Eric van der Zwan",
          business: "OREQ",
          quote:
            "The site now shows at a glance what OREQ does. Since launch, requests for coaching and training come in far more often.",
          project: "Website with a clear proposition for coaching and training",
          result: "More requests for coaching and training",
          image: "/cases/oreq.png",
          url: "https://oreq.nl",
        },
        {
          id: "ericsweder",
          mockup: "browser",
          name: "Eric Sweder",
          business: "By Eric Sweder",
          quote:
            "My work is personal and the site had to reflect that. Visitors now book a session themselves and sign up for the training right away.",
          project: "Website with session bookings and training sign-ups",
          result: "Bookings and sign-ups run through the site",
          image: "/cases/ericsweder.png",
          url: "https://ericsweder.com",
        },
        {
          id: "schilder",
          mockup: "browser",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "I used to lose quotes in my inbox. Now every request comes in neatly and I send a proposal within a day.",
          project: "Client portal with quote requests and scheduling",
          result: "+40% more requests, half the admin",
        },
        {
          id: "pt",
          mockup: "mobile",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "My clients now book their own sessions and track progress in the app. That frees me up for the real work: coaching.",
          project: "Native app with bookings and progress tracking",
          result: "120 active users in 3 months",
        },
        {
          id: "coach",
          mockup: "ai",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "The AI tool summarises my session notes and suggests follow-up questions. It saves me hours every week.",
          project: "AI tool for session reports",
          result: "6 hours saved per week",
        },
        {
          id: "advocaat",
          mockup: "browser",
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
        "Have a project in mind? Tell us what you need and we'll respond within one business day.",
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
      messagePlaceholder: "Tell us about your project...",
      submitIdle: "Send message",
      submitLoading: "Sending...",
      successHeading: "Message sent.",
      successSubtext: "We'll respond within one business day.",
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
            "Mobile Growth Studio builds digital products for SMEs and freelancers: web applications, native iOS and Android apps, AI tools, dashboards and websites. We take the technical side completely off your hands so you can focus on your business.",
        },
        {
          question: "Who is Mobile Growth Studio for?",
          answer:
            "Our clients are SMEs and freelancers who need a digital solution but don't have in-house developers. We work for businesses across all sectors — from gyms and coaching practices to online shops and service providers.",
        },
        {
          question: "What makes you different?",
          answer:
            "We build with AI at the heart of our process. That speeds up every phase — from concept and design to code and delivery — so you have a working product in hand sooner. It makes almost nothing impossible in terms of design and functionality: ideas that were too expensive or too complex with traditional development are now within reach. And all of that at a fraction of the cost of a classic dev project, without compromising on quality. On top of that, everything is custom-built, fully tailored to your business and the way you work — not an off-the-shelf package, but a solution that fits your processes. You get the speed and the sharp price, we do the heavy lifting.",
        },
        {
          question: "What kinds of things can you build?",
          answer:
            "Almost anything digital. A taste of what we make: client portals and booking systems, internal tools and planning software, full SaaS products, native iOS and Android apps, AI assistants and automations, real-time dashboards, webshops with paywalls or members-only content, and fast marketing or portfolio sites. Have an idea that isn't on this list? Chances are it's still possible — tell us and we'll think along.",
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
          question: "Do you work with fixed prices?",
          answer:
            "Yes. We prefer to work with a fixed project price, agreed after a free introductory call. That way you know where you stand upfront and there are no surprises afterwards. For ongoing maintenance or extensions we sometimes work on a retainer basis.",
        },
        {
          question: "What is AI tooling and how can it help my business?",
          answer:
            "AI tooling is custom software that uses artificial intelligence to take over work that normally costs a lot of time or people. Not a generic chatbot, but a solution that fits your exact processes. Examples we build: an assistant that drafts quotes, contracts or emails from your own templates; document processing that reads invoices, receipts or forms and files them straight into your system; a support chatbot trained on your manuals and FAQs; incoming tickets and emails that are automatically categorised and answered; or a tool that summarises long reports and piles of data into clear insights. We connect models like GPT and Claude to your own data and software, with the right privacy safeguards.",
        },
        {
          question: "Can you integrate my existing systems or software?",
          answer:
            "Yes. We regularly build API integrations with existing software such as accounting systems, CRM packages, webshops or external databases. Tell us which systems you use and we'll see what's possible.",
        },
        {
          question: "What is dashboarding and why do I need it?",
          answer:
            "A dashboard brings all your business data together in one place, real-time and clear — instead of scattered Excel files and a tangle of tools. We build custom dashboards connected to your sources: Google Analytics, your own database, your accounting, CRM or external APIs. Examples: a leadership cockpit with revenue, margin and KPIs; a real-time sales or marketing overview; inventory and logistics reports; or client and project dashboards you can export. With AI we go a step further: the dashboard spots trends, flags anomalies and explains in plain language what your numbers mean and what your best next step is.",
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
      cases: "Portfolio",
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
      privacy: "Datenschutz",
      terms: "AGB",
      cookies: "Cookies",
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
      featuredLabel: "Unser Fokus",
      examplesTitle: "Beispiele unserer Arbeit",
      viewExamples: "Beispiele ansehen",
      hideExamples: "Beispiele ausblenden",
      examplesSoon: "In Kürze",
      closeLabel: "Schließen",
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
      differentiator: {
        label: "Unser Ansatz",
        heading: "Gebaut mit KI. Schneller, schärfer, fast grenzenlos.",
        body: "Wir bauen mit KI im Zentrum unseres Prozesses. Das beschleunigt jede Phase — von Konzept und Design über Code bis zur Auslieferung — sodass Sie schneller ein funktionierendes Produkt in der Hand haben. Bei Design und Funktionalität ist damit fast nichts unmöglich: Ideen, die mit klassischer Entwicklung zu teuer oder zu komplex waren, sind jetzt machbar. Und das alles zu einem Bruchteil der Kosten eines klassischen Entwicklungsprojekts, ohne Abstriche bei der Qualität. Außerdem ist alles maßgeschneidert, vollständig auf Ihr Unternehmen und Ihre Arbeitsabläufe zugeschnitten.",
        points: [
          {
            title: "Schneller geliefert",
            text: "KI beschleunigt jede Phase, von Konzept und Design bis Code und Auslieferung.",
          },
          {
            title: "Fast nichts unmöglich",
            text: "Komplexe Ideen, die früher zu teuer oder zu komplex waren, sind jetzt machbar.",
          },
          {
            title: "Bruchteil der Kosten",
            text: "Die Qualität klassischer Entwicklung, zu einem Bruchteil des Preises.",
          },
          {
            title: "Maßgeschneidert auf Ihre Prozesse",
            text: "Vollständig auf Ihr Unternehmen und Ihre Arbeitsabläufe zugeschnitten, kein Standardpaket.",
          },
        ],
      },
      connectionGraphic: {
        inputs: [
          { id: "admin", label: "Zu viel Admin" },
          { id: "process", label: "Langsame Abläufe" },
          { id: "time", label: "Keine Zeit" },
        ],
        outputs: [
          { id: "webapp", label: "Webapp" },
          { id: "native", label: "Native App" },
          { id: "ai", label: "KI-Tools" },
          { id: "dashboard", label: "Dashboard" },
          { id: "website", label: "Website" },
        ],
      },
    },
    services: {
      label: "Leistungen",
      heading: "Was wir bauen.",
      items: [
        {
          id: "ai-tooling",
          number: "01",
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
          number: "02",
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
          number: "03",
          title: "Websites",
          tagline: "Schnell online, professionell und konvertierend.",
          description:
            "Von der Landing Page bis zur vollständigen Marketing-Website. Wir entwickeln Websites, die nicht nur gut aussehen, sondern auch schnell laden und konvertieren.",
          items: [
            "Marketing- und Portfolio-Websites",
            "Landing Pages",
            "SEO, GEO & AEO (auffindbar bei Google und KI-Suche)",
            "Integration mit externen Tools (CRM, Newsletter, Zahlungen)",
            "Bezahlschranken & Mitglieder-Inhalte",
            "Analytics, A/B-Tests & Conversion-Optimierung (CRO)",
            "DSGVO- & Cookie-Consent",
            "Top-Performance & Rich Results (Core Web Vitals, schema.org)",
            "CMS-Integration (auf Wunsch)",
          ],
        },
        {
          id: "webapps",
          number: "04",
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
          number: "05",
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
      ],
    },
    about: {
      label: "Über uns",
      heading: "Hendrik Polinder.",
      bio: [
        "Mobile Growth Studio ist das Freelance-Label von Hendrik Polinder — Senior Growth Manager und digitaler Consultant mit Sitz in Hilversum, Niederlande.",
        "Wir helfen kleinen und mittleren Unternehmen dabei, digitale Produkte zu entwickeln, die wirklich funktionieren. Keine unnötigen Beratungen, keine komplizierten Prozesse — einfach bauen, was Sie brauchen.",
        "Vom Webapp über native Apps bis zu KI-Tools: Wir übernehmen den technischen Teil, damit Sie sich auf Ihr Unternehmen konzentrieren können.",
      ],
      locationLabel: "Standort",
      locationValue: "Hilversum, Niederlande",
      availabilityLabel: "Verfügbarkeit",
      availabilityValue: "Verfügbar für neue Projekte",
      contactLabel: "Kontakt",
      contactCta: "Nachricht senden →",
    },
    cases: {
      label: "Portfolio",
      heading: "Was wir gebaut haben.",
      intro:
        "Echte Unternehmer, echte Ergebnisse. Eine Auswahl der Projekte, die wir geliefert haben.",
      projectLabel: "Was wir gebaut haben",
      resultLabel: "Ergebnis",
      visitLabel: "Zur Website",
      stories: [
        {
          id: "oreq",
          mockup: "browser",
          name: "Eric van der Zwan",
          business: "OREQ",
          quote:
            "Die Seite zeigt jetzt auf einen Blick, was OREQ macht. Seit dem Launch kommen Anfragen für Coaching und Trainings deutlich häufiger rein.",
          project: "Website mit klarer Positionierung für Coaching und Trainings",
          result: "Mehr Anfragen für Coaching und Trainings",
          image: "/cases/oreq.png",
          url: "https://oreq.nl",
        },
        {
          id: "ericsweder",
          mockup: "browser",
          name: "Eric Sweder",
          business: "By Eric Sweder",
          quote:
            "Meine Arbeit ist persönlich und das sollte die Seite ausstrahlen. Besucher buchen jetzt selbst eine Sitzung und melden sich direkt für die Ausbildung an.",
          project: "Website mit Sitzungsbuchungen und Anmeldungen zur Ausbildung",
          result: "Buchungen und Anmeldungen laufen über die Seite",
          image: "/cases/ericsweder.png",
          url: "https://ericsweder.com",
        },
        {
          id: "schilder",
          mockup: "browser",
          name: "Mark",
          business: "Visser Schilderwerken",
          quote:
            "Früher gingen Angebote in meinem Postfach unter. Jetzt kommt jede Anfrage sauber an und ich schicke innerhalb eines Tages ein Angebot.",
          project: "Kundenportal mit Angebotsanfragen und Planung",
          result: "+40% mehr Anfragen, halb so viel Verwaltung",
        },
        {
          id: "pt",
          mockup: "mobile",
          name: "Sven",
          business: "Train met Sven",
          quote:
            "Meine Kunden buchen jetzt selbst ihre Sessions und verfolgen ihren Fortschritt in der App. So bleibt mir Zeit für das Wesentliche: das Coaching.",
          project: "Native App mit Buchungen und Fortschritt",
          result: "120 aktive Nutzer in 3 Monaten",
        },
        {
          id: "coach",
          mockup: "ai",
          name: "Daan",
          business: "Hofman Coaching",
          quote:
            "Das KI-Tool fasst meine Sitzungsnotizen zusammen und schlägt Folgefragen vor. Das spart mir jede Woche Stunden.",
          project: "KI-Tool für Sitzungsberichte",
          result: "6 Stunden pro Woche gespart",
        },
        {
          id: "advocaat",
          mockup: "browser",
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
        "Haben Sie ein Projekt im Sinn? Erzählen Sie uns, was Sie brauchen, und wir antworten innerhalb eines Werktages.",
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
      messagePlaceholder: "Erzählen Sie uns von Ihrem Projekt...",
      submitIdle: "Nachricht senden",
      submitLoading: "Wird gesendet...",
      successHeading: "Nachricht gesendet.",
      successSubtext: "Wir antworten innerhalb eines Werktages.",
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
          question: "Was machen Sie anders?",
          answer:
            "Wir bauen mit KI im Zentrum unseres Prozesses. Das beschleunigt jede Phase — von Konzept und Design über Code bis zur Auslieferung — sodass Sie schneller ein funktionierendes Produkt in der Hand haben. Bei Design und Funktionalität ist damit fast nichts unmöglich: Ideen, die mit klassischer Entwicklung zu teuer oder zu komplex waren, sind jetzt machbar. Und das alles zu einem Bruchteil der Kosten eines klassischen Entwicklungsprojekts, ohne Abstriche bei der Qualität. Außerdem ist alles maßgeschneidert, vollständig auf Ihr Unternehmen und Ihre Arbeitsabläufe zugeschnitten — kein Standardpaket, sondern eine Lösung, die zu Ihrer Arbeitsweise passt. Sie profitieren von Tempo und scharfem Preis, wir übernehmen die schwere Arbeit.",
        },
        {
          question: "Was für Dinge können Sie alles bauen?",
          answer:
            "Fast alles Digitale. Ein Auszug aus dem, was wir machen: Kundenportale und Buchungssysteme, interne Tools und Planungssoftware, komplette SaaS-Produkte, native iOS- und Android-Apps, KI-Assistenten und Automatisierungen, Echtzeit-Dashboards, Webshops mit Bezahlschranken oder Mitglieder-Inhalten und schnelle Marketing- oder Portfolio-Websites. Haben Sie eine Idee, die nicht auf dieser Liste steht? Wahrscheinlich geht es trotzdem — erzählen Sie es uns und wir denken mit.",
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
          question: "Arbeiten Sie mit Festpreisen?",
          answer:
            "Ja. Wir arbeiten bevorzugt mit einem Festpreis, vereinbart nach einem kostenlosen Erstgespräch. So wissen Sie im Voraus, woran Sie sind, und es gibt keine Überraschungen im Nachhinein. Für laufende Wartung oder Erweiterungen arbeiten wir manchmal auf Retainer-Basis.",
        },
        {
          question:
            "Was sind KI-Tools und wie können sie meinem Unternehmen helfen?",
          answer:
            "KI-Tools sind maßgeschneiderte Lösungen, die künstliche Intelligenz nutzen, um Arbeit abzunehmen, die normalerweise viel Zeit oder Personal kostet. Kein generischer Chatbot, sondern eine Lösung, die genau zu Ihren Prozessen passt. Beispiele, die wir bauen: ein Assistent, der Angebote, Verträge oder E-Mails aus Ihren eigenen Vorlagen erstellt; Dokumentenverarbeitung, die Rechnungen, Belege oder Formulare ausliest und direkt in Ihr System einträgt; ein Support-Chatbot, trainiert auf Ihren Handbüchern und häufigen Fragen; eingehende Tickets und Mails, die automatisch kategorisiert und beantwortet werden; oder ein Tool, das lange Berichte und Datenberge zu klaren Erkenntnissen zusammenfasst. Wir verbinden Modelle wie GPT und Claude mit Ihren eigenen Daten und Ihrer Software — mit den richtigen Datenschutz-Vorkehrungen.",
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
            "Ein Dashboard bringt alle Ihre Unternehmensdaten an einem Ort zusammen, in Echtzeit und übersichtlich — statt verstreuter Excel-Dateien und eines Wirrwarrs an Tools. Wir entwickeln individuelle Dashboards, verbunden mit Ihren Quellen: Google Analytics, Ihrer eigenen Datenbank, Ihrer Buchhaltung, Ihrem CRM oder externen APIs. Beispiele: ein Führungs-Cockpit mit Umsatz, Marge und KPIs; eine Echtzeit-Übersicht für Vertrieb oder Marketing; Lager- und Logistikberichte; oder Kunden- und Projekt-Dashboards zum Exportieren. Mit KI gehen wir einen Schritt weiter: Das Dashboard erkennt Trends, hebt Auffälligkeiten hervor und erklärt in klarer Sprache, was Ihre Zahlen bedeuten und was Ihr bester nächster Schritt ist.",
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
