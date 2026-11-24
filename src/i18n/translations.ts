export type Locale = "en" | "nl" | "de";

export const translations = {
  nl: {
    nav: {
      diensten: "Diensten",
      cases: "Portfolio",
      faq: "FAQ",
      over: "Over",
      contact: "Contact",
      cta: "Plan een gratis call",
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
      headline1: "Apps, websites en AI-tools die je bedrijf",
      headlineAccent: "slimmer",
      headline2: "maken.",
      subtext:
        "Geen eigen developer? Wij bouwen wat je nodig hebt: voor een vaste prijs, zonder jargon. Jij houdt tijd over voor je bedrijf.",
      cta: "Plan een gratis call",
      viewServices: "Bekijk diensten",
      ctaTrust: "Gratis · 30 minuten · geen verplichtingen",
      ctaAlt: "Of stuur een bericht",
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
      ctaSubtext: "Vertel in 30 minuten wat je wilt bouwen. Je hoort meteen wat kan en wat het ongeveer kost.",
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
      liveBuild: {
        ariaLabel: "Demo: van idee naar werkend product",
        build: "Bouwen",
        scenes: {
          app: {
            tab: "App",
            prompt: "Een boekingsapp voor mijn sportschool",
            result: "Live in 3 weken",
            today: "Vandaag",
            classes: [
              { name: "Spinning", time: "07:00", spots: "4 plekken" },
              { name: "Yoga", time: "12:15", spots: "9 plekken" },
              { name: "Bootcamp", time: "18:30", spots: "2 plekken" },
            ],
            book: "Boek",
            booked: "Geboekt",
            toast: "Je les begint over 1 uur",
          },
          site: {
            tab: "Website",
            prompt: "Een website voor mijn accountantskantoor",
            result: "Snelheidsscore 98/100",
            brand: "Jansen & Co",
            nav: ["Diensten", "Tarieven", "Contact"],
            headline: "Boekhouding zonder gedoe.",
            cta: "Plan een gesprek",
            cards: ["Aangifte", "Loon", "Advies"],
            speed: "Snelheid",
          },
          ai: {
            tab: "AI tool",
            prompt: "Lees mijn facturen automatisch uit",
            result: "4 min → 20 sec per factuur",
            invoice: "Factuur",
            fields: [
              { label: "Leverancier", value: "Groothandel Noord BV" },
              { label: "Btw-nummer", value: "NL8521.04.937.B01" },
              { label: "Vervaldatum", value: "14-12-2026" },
              { label: "Totaal", value: "€ 2.418,60" },
            ],
            export: "Naar boekhouding",
          },
          ab: {
            tab: "A/B-test",
            prompt: "Test een nieuwe koopknop op mijn webshop",
            result: "+14% in winkelwagen",
            control: "Origineel",
            variant: "Variant",
            product: "Hardloopschoen",
            buttonA: "In winkelwagen",
            buttonB: "In winkelwagen · gratis bezorgd",
            conversion: "Conversie",
            convA: "3,1%",
            convB: "3,6%",
            winner: "Winnaar · 97% zeker",
          },
        },
      },
    },
    solutions: {
      label: "Kant-en-klaar",
      heading: "Oplossingen die al klaarstaan.",
      subtext:
        "Producten die we al gebouwd hebben en die in gebruik zijn. Snel live voor jouw bedrijf, en waar nodig passen we ze aan op jouw werkwijze.",
      ready: "Direct inzetbaar",
      custom: "Maatwerk mogelijk: eigen huisstijl, extra functies en koppelingen met je bestaande systemen.",
      cta: "Vraag een demo aan",
      realScreens: "Echte schermen uit de app",
      liveDemo: "Echt boekingsscherm · probeer het",
      products: {
        fittrack: {
          name: "FitTrack",
          tagline: "Trainings- en voedingsapp met AI-coach",
          features: [
            "Trainingsschema dat vanzelf meegroeit: gewicht omhoog als je sterker wordt",
            "Weekmenu en calorieën tellen met een foto van je maaltijd",
            "Agenda met geplande en gedane trainingen",
            "Koppeling met Apple Health en de agenda-app",
          ],
        },
        gymbook: {
          name: "GymBook",
          tagline: "Boekingssysteem voor personal trainers en kleine sportscholen",
          features: [
            "1-op-1, kleine groep en groepslessen met wachtlijst",
            "Betalen met iDEAL, SEPA of kaart; geld direct naar de sportschool",
            "Rittenkaarten en abonnementen, annuleren tot een vaste deadline",
            "Elke sportschool een eigen afgeschermde omgeving (AVG, data in de EU)",
          ],
        },
      },
      booking: {
        sessionType: "Soort sessie",
        trainer: "Trainer",
        day: "Dag",
        freeTimes: "Vrije tijden",
        bookedOk: "Geboekt! Tot dan.",
        screenBook: "Boeken",
        screenHome: "Mijn sportschool",
        screenReports: "Rapportage",
        home: {
          gym: "Studio Noord",
          bookTrainer: "Boek een trainer",
          shop: "Shop",
          walletT: "Mijn tegoed",
          walletName: "10-rittenkaart",
          walletLine: "6 ritten over · geldig tot 31 mrt",
          mineT: "Mijn boekingen",
          timetableT: "Rooster",
          sessions: [
            { name: "Personal training", when: "di 24 nov 07:00 · Sanne", status: "Geboekt · rittenkaart", tone: "good", btn: "Annuleren" },
            { name: "Bootcamp", when: "wo 25 nov 18:00 · Mo · Zaal 1", status: "3 plekken vrij", tone: "muted", btn: "Boeken" },
            { name: "Spinning", when: "do 26 nov 19:00 · Lisa · Zaal 2", status: "Vol", tone: "bad", btn: "Wachtlijst" },
          ],
        },
        reports: {
          periods: ["30 dagen", "Deze maand", "Dit jaar"],
          tiles: [["Omzet", "€ 8.420"], ["Boekingen", "312"], ["No-shows", "4%"], ["Nieuwe leden", "18"]],
          revenueT: "Omzet per maand",
          months: ["sep", "okt", "nov"],
          topT: "Populairste sessies",
          top: [["Personal training", 142], ["Bootcamp", 96], ["Spinning", 74]],
        },
        types: ["Personal training · 60 min · 1-op-1", "Duo-training · 45 min · Kleine groep"],
        trainers: ["Sanne", "Mo", "Lisa"],
        days: ["di 24 nov", "wo 25 nov", "do 26 nov"],
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
          tagline: "Snel online, professioneel en converterend.",
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
          id: "fittrack",
          mockup: "product",
          name: "Eigen product · in test bij een sportschool",
          business: "FitTrack",
          quote:
            "Een trainings- en voedingsapp met AI-coach. Het schema groeit mee met je kracht, maaltijden tel je met een foto en alles synchroniseert met Apple Health.",
          project: "Native app voor iOS en Android, plus web, met AI-coach",
          result: "Kant-en-klaar, maatwerk mogelijk",
        },
        {
          id: "gymbook",
          mockup: "product",
          name: "Eigen product · in test bij een sportschool",
          business: "GymBook",
          quote:
            "Boekingssysteem voor personal trainers en kleine sportscholen. Leden boeken en betalen zelf hun sessies, trainers beheren hun uren en de sportschool houdt overzicht.",
          project: "App voor iOS, Android en web, met betalen via iDEAL, SEPA of kaart",
          result: "Kant-en-klaar, maatwerk mogelijk",
        },
      ],
      ctaHeading: "Word de volgende.",
      cta: "Plan een gratis call",
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
      cta: "Book a free call",
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
      headline1: "Apps, websites and AI tools that make your business",
      headlineAccent: "run smarter.",
      headline2: "",
      subtext:
        "No developer of your own? We build what you need: for a fixed price, without jargon. You keep your time for your business.",
      cta: "Book a free call",
      viewServices: "View services",
      ctaTrust: "Free · 30 minutes · no strings attached",
      ctaAlt: "Or send a message",
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
        "Tell us in 30 minutes what you want to build. You hear right away what's possible and roughly what it costs.",
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
      liveBuild: {
        ariaLabel: "Demo: from idea to working product",
        build: "Build",
        scenes: {
          app: {
            tab: "App",
            prompt: "A booking app for my gym",
            result: "Live in 3 weeks",
            today: "Today",
            classes: [
              { name: "Spinning", time: "07:00", spots: "4 spots" },
              { name: "Yoga", time: "12:15", spots: "9 spots" },
              { name: "Bootcamp", time: "18:30", spots: "2 spots" },
            ],
            book: "Book",
            booked: "Booked",
            toast: "Your class starts in 1 hour",
          },
          site: {
            tab: "Website",
            prompt: "A website for my accountancy firm",
            result: "Speed score 98/100",
            brand: "Jansen & Co",
            nav: ["Services", "Pricing", "Contact"],
            headline: "Bookkeeping without the hassle.",
            cta: "Book a call",
            cards: ["Tax returns", "Payroll", "Advice"],
            speed: "Speed",
          },
          ai: {
            tab: "AI tool",
            prompt: "Read my invoices automatically",
            result: "4 min → 20 sec per invoice",
            invoice: "Invoice",
            fields: [
              { label: "Supplier", value: "North Wholesale Ltd" },
              { label: "VAT number", value: "NL8521.04.937.B01" },
              { label: "Due date", value: "14 Dec 2026" },
              { label: "Total", value: "€ 2,418.60" },
            ],
            export: "Send to accounting",
          },
          ab: {
            tab: "A/B test",
            prompt: "Test a new buy button on my webshop",
            result: "+14% add to cart",
            control: "Original",
            variant: "Variant",
            product: "Running shoe",
            buttonA: "Add to cart",
            buttonB: "Add to cart · free delivery",
            conversion: "Conversion",
            convA: "3.1%",
            convB: "3.6%",
            winner: "Winner · 97% sure",
          },
        },
      },
    },
    solutions: {
      label: "Ready to use",
      heading: "Solutions that are ready to go.",
      subtext:
        "Products we have already built and that are in use. Live for your business quickly, and where needed we adapt them to the way you work.",
      ready: "Ready to use",
      custom: "Customization possible: your own branding, extra features and links to your existing systems.",
      cta: "Request a demo",
      realScreens: "Real screens from the app",
      liveDemo: "Real booking screen · try it",
      products: {
        fittrack: {
          name: "FitTrack",
          tagline: "Workout and food app with an AI coach",
          features: [
            "Training program that grows with you: more weight as you get stronger",
            "Weekly meal plan and calorie counting from a photo of your meal",
            "Calendar with planned and completed workouts",
            "Syncs with Apple Health and the calendar app",
          ],
        },
        gymbook: {
          name: "GymBook",
          tagline: "Booking system for personal trainers and small gyms",
          features: [
            "1-on-1, small-group and group classes with a waitlist",
            "Pay by iDEAL, SEPA or card; money goes straight to the gym",
            "Session packs and memberships, cancel until a set deadline",
            "Each gym its own private space (GDPR, data in the EU)",
          ],
        },
      },
      booking: {
        sessionType: "Session type",
        trainer: "Trainer",
        day: "Day",
        freeTimes: "Free times",
        bookedOk: "Booked! See you there.",
        screenBook: "Booking",
        screenHome: "My gym",
        screenReports: "Reports",
        home: {
          gym: "Studio North",
          bookTrainer: "Book a trainer",
          shop: "Shop",
          walletT: "My credits",
          walletName: "10-class pass",
          walletLine: "6 classes left · valid until 31 Mar",
          mineT: "My bookings",
          timetableT: "Timetable",
          sessions: [
            { name: "Personal training", when: "Tue 24 Nov 07:00 · Sanne", status: "Booked · class pass", tone: "good", btn: "Cancel" },
            { name: "Bootcamp", when: "Wed 25 Nov 18:00 · Mo · Room 1", status: "3 spots left", tone: "muted", btn: "Book" },
            { name: "Spinning", when: "Thu 26 Nov 19:00 · Lisa · Room 2", status: "Full", tone: "bad", btn: "Waitlist" },
          ],
        },
        reports: {
          periods: ["30 days", "This month", "This year"],
          tiles: [["Revenue", "€8,420"], ["Bookings", "312"], ["No-shows", "4%"], ["New members", "18"]],
          revenueT: "Revenue per month",
          months: ["Sep", "Oct", "Nov"],
          topT: "Top sessions",
          top: [["Personal training", 142], ["Bootcamp", 96], ["Spinning", 74]],
        },
        types: ["Personal training · 60 min · 1-on-1", "Duo training · 45 min · Small group"],
        trainers: ["Sanne", "Mo", "Lisa"],
        days: ["Tue 24 Nov", "Wed 25 Nov", "Thu 26 Nov"],
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
          id: "fittrack",
          mockup: "product",
          name: "Our own product · in testing at a gym",
          business: "FitTrack",
          quote:
            "A workout and food app with an AI coach. The program grows with your strength, you count meals with a photo, and everything syncs with Apple Health.",
          project: "Native app for iOS and Android, plus web, with an AI coach",
          result: "Ready to use, customization possible",
        },
        {
          id: "gymbook",
          mockup: "product",
          name: "Our own product · in testing at a gym",
          business: "GymBook",
          quote:
            "Booking system for personal trainers and small gyms. Members book and pay for their own sessions, trainers manage their hours and the gym keeps the overview.",
          project: "App for iOS, Android and web, with payment by iDEAL, SEPA or card",
          result: "Ready to use, customization possible",
        },
      ],
      ctaHeading: "Be the next one.",
      cta: "Book a free call",
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
      cta: "Kostenloses Gespräch",
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
      headline1: "Apps, Websites und KI-Tools, die Ihr Unternehmen",
      headlineAccent: "smarter",
      headline2: "machen.",
      subtext:
        "Kein eigener Entwickler? Wir bauen, was Sie brauchen: zum Festpreis, ohne Fachjargon. Ihnen bleibt Zeit für Ihr Geschäft.",
      cta: "Kostenloses Gespräch",
      viewServices: "Leistungen ansehen",
      ctaTrust: "Kostenlos · 30 Minuten · unverbindlich",
      ctaAlt: "Oder Nachricht senden",
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
        "Erzählen Sie uns in 30 Minuten, was Sie bauen möchten. Sie hören sofort, was möglich ist und was es ungefähr kostet.",
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
      liveBuild: {
        ariaLabel: "Demo: von der Idee zum fertigen Produkt",
        build: "Bauen",
        scenes: {
          app: {
            tab: "App",
            prompt: "Eine Buchungs-App für mein Fitnessstudio",
            result: "Live in 3 Wochen",
            today: "Heute",
            classes: [
              { name: "Spinning", time: "07:00", spots: "4 Plätze" },
              { name: "Yoga", time: "12:15", spots: "9 Plätze" },
              { name: "Bootcamp", time: "18:30", spots: "2 Plätze" },
            ],
            book: "Buchen",
            booked: "Gebucht",
            toast: "Ihr Kurs beginnt in 1 Stunde",
          },
          site: {
            tab: "Website",
            prompt: "Eine Website für meine Steuerkanzlei",
            result: "Speed-Score 98/100",
            brand: "Jansen & Co",
            nav: ["Leistungen", "Preise", "Kontakt"],
            headline: "Buchhaltung ohne Aufwand.",
            cta: "Gespräch buchen",
            cards: ["Steuern", "Lohn", "Beratung"],
            speed: "Speed",
          },
          ai: {
            tab: "KI-Tool",
            prompt: "Lies meine Rechnungen automatisch aus",
            result: "4 Min → 20 Sek pro Rechnung",
            invoice: "Rechnung",
            fields: [
              { label: "Lieferant", value: "Großhandel Nord GmbH" },
              { label: "USt-IdNr.", value: "DE284519371" },
              { label: "Fällig am", value: "14.12.2026" },
              { label: "Summe", value: "2.418,60 €" },
            ],
            export: "An Buchhaltung senden",
          },
          ab: {
            tab: "A/B-Test",
            prompt: "Teste einen neuen Kaufen-Button in meinem Shop",
            result: "+14% in den Warenkorb",
            control: "Original",
            variant: "Variante",
            product: "Laufschuh",
            buttonA: "In den Warenkorb",
            buttonB: "In den Warenkorb · gratis Versand",
            conversion: "Conversion",
            convA: "3,1%",
            convB: "3,6%",
            winner: "Gewinner · 97% sicher",
          },
        },
      },
    },
    solutions: {
      label: "Sofort einsatzbereit",
      heading: "Lösungen, die schon bereitstehen.",
      subtext:
        "Produkte, die wir bereits gebaut haben und die im Einsatz sind. Schnell live für Ihr Unternehmen, und bei Bedarf passen wir sie an Ihre Arbeitsweise an.",
      ready: "Sofort einsatzbereit",
      custom: "Anpassung möglich: eigenes Branding, zusätzliche Funktionen und Anbindung an Ihre bestehenden Systeme.",
      cta: "Demo anfragen",
      realScreens: "Echte Screens aus der App",
      liveDemo: "Echter Buchungsscreen · ausprobieren",
      products: {
        fittrack: {
          name: "FitTrack",
          tagline: "Trainings- und Ernährungs-App mit KI-Coach",
          features: [
            "Trainingsplan, der mitwächst: mehr Gewicht, wenn Sie stärker werden",
            "Wochenplan fürs Essen und Kalorienzählen per Foto der Mahlzeit",
            "Kalender mit geplanten und erledigten Trainings",
            "Synchronisiert mit Apple Health und der Kalender-App",
          ],
        },
        gymbook: {
          name: "GymBook",
          tagline: "Buchungssystem für Personal Trainer und kleine Studios",
          features: [
            "1:1, Kleingruppe und Gruppenkurse mit Warteliste",
            "Bezahlen per iDEAL, SEPA oder Karte; Geld direkt ans Studio",
            "Zehnerkarten und Mitgliedschaften, Stornierung bis zu einer festen Frist",
            "Jedes Studio ein eigener geschützter Bereich (DSGVO, Daten in der EU)",
          ],
        },
      },
      booking: {
        sessionType: "Terminart",
        trainer: "Trainer",
        day: "Tag",
        freeTimes: "Freie Zeiten",
        bookedOk: "Gebucht! Bis dann.",
        screenBook: "Buchen",
        screenHome: "Mein Studio",
        screenReports: "Berichte",
        home: {
          gym: "Studio Nord",
          bookTrainer: "Trainer buchen",
          shop: "Shop",
          walletT: "Mein Guthaben",
          walletName: "10er-Karte",
          walletLine: "6 Einheiten übrig · gültig bis 31. März",
          mineT: "Meine Buchungen",
          timetableT: "Stundenplan",
          sessions: [
            { name: "Personal Training", when: "Di 24. Nov 07:00 · Sanne", status: "Gebucht · 10er-Karte", tone: "good", btn: "Stornieren" },
            { name: "Bootcamp", when: "Mi 25. Nov 18:00 · Mo · Raum 1", status: "3 Plätze frei", tone: "muted", btn: "Buchen" },
            { name: "Spinning", when: "Do 26. Nov 19:00 · Lisa · Raum 2", status: "Voll", tone: "bad", btn: "Warteliste" },
          ],
        },
        reports: {
          periods: ["30 Tage", "Dieser Monat", "Dieses Jahr"],
          tiles: [["Umsatz", "8.420 €"], ["Buchungen", "312"], ["No-Shows", "4 %"], ["Neue Mitglieder", "18"]],
          revenueT: "Umsatz pro Monat",
          months: ["Sep", "Okt", "Nov"],
          topT: "Beliebteste Sessions",
          top: [["Personal Training", 142], ["Bootcamp", 96], ["Spinning", 74]],
        },
        types: ["Personal Training · 60 Min · 1:1", "Duo-Training · 45 Min · Kleingruppe"],
        trainers: ["Sanne", "Mo", "Lisa"],
        days: ["Di 24. Nov", "Mi 25. Nov", "Do 26. Nov"],
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
          id: "fittrack",
          mockup: "product",
          name: "Eigenes Produkt · im Test bei einem Fitnessstudio",
          business: "FitTrack",
          quote:
            "Eine Trainings- und Ernährungs-App mit KI-Coach. Der Plan wächst mit Ihrer Kraft, Mahlzeiten zählen Sie per Foto und alles synchronisiert mit Apple Health.",
          project: "Native App für iOS und Android, plus Web, mit KI-Coach",
          result: "Sofort einsatzbereit, Anpassung möglich",
        },
        {
          id: "gymbook",
          mockup: "product",
          name: "Eigenes Produkt · im Test bei einem Fitnessstudio",
          business: "GymBook",
          quote:
            "Buchungssystem für Personal Trainer und kleine Studios. Mitglieder buchen und bezahlen ihre Termine selbst, Trainer verwalten ihre Zeiten und das Studio behält den Überblick.",
          project: "App für iOS, Android und Web, mit Bezahlung per iDEAL, SEPA oder Karte",
          result: "Sofort einsatzbereit, Anpassung möglich",
        },
      ],
      ctaHeading: "Werden Sie der Nächste.",
      cta: "Kostenloses Gespräch",
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
