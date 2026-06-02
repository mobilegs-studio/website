// Juridische documenten — privacyverklaring, algemene voorwaarden, cookieverklaring.
// LET OP: bevat placeholders ([KvK-nummer], [BTW-id], [Vestigingsadres]).
// Dit zijn templates; laat ze nakijken door een jurist voordat ze definitief zijn.

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};
export type LegalContent = {
  privacy: LegalDoc;
  terms: LegalDoc;
  cookies: LegalDoc;
};

const COMPANY = "Mobile Growth Studio";
const OWNER = "Hendrik Polinder";
const EMAIL = "info@mobilegrowthstudio.com";

export const legal: Record<"nl" | "en" | "de", LegalContent> = {
  nl: {
    privacy: {
      slug: "privacy",
      title: "Privacyverklaring",
      updated: "2 juni 2026",
      intro: `${COMPANY} respecteert je privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG). In deze verklaring lees je welke gegevens we verzamelen, waarom en wat jouw rechten zijn.`,
      sections: [
        {
          heading: "1. Wie zijn wij",
          body: [
            `${COMPANY} is een eenmanszaak en de handelsnaam van ${OWNER}, gevestigd in Hilversum.`,
            "Adres: [Vestigingsadres], Hilversum",
            "KvK-nummer: [KvK-nummer]",
            "BTW-id: [BTW-id]",
            `E-mail: ${EMAIL}`,
            `${COMPANY} is de verwerkingsverantwoordelijke voor de verwerking van persoonsgegevens via deze website.`,
          ],
        },
        {
          heading: "2. Welke gegevens we verzamelen",
          body: [
            "Contactformulier: naam, e-mailadres, telefoonnummer (optioneel), je interesse en de inhoud van je bericht.",
            "Technische gegevens: bij het bezoeken van de site worden beperkte technische gegevens verwerkt, zoals geanonimiseerde bezoekstatistieken en, bij een technische fout, foutmeldingen.",
            "We verzamelen geen bijzondere persoonsgegevens en doen niet aan profilering of geautomatiseerde besluitvorming.",
          ],
        },
        {
          heading: "3. Waarvoor en op welke grondslag",
          body: [
            "Om te reageren op je bericht en een eventuele samenwerking te bespreken. Grondslag: uitvoering van een overeenkomst of het nemen van precontractuele maatregelen op jouw verzoek.",
            "Om de website te verbeteren en veilig en foutloos te laten werken. Grondslag: ons gerechtvaardigd belang bij een goed werkende website.",
          ],
        },
        {
          heading: "4. Bewaartermijnen",
          body: [
            "Berichten via het contactformulier bewaren we zolang dat nodig is om je vraag af te handelen en een eventuele samenwerking op te volgen, en daarna maximaal 24 maanden.",
            "Gegevens die we wettelijk moeten bewaren (zoals administratie) houden we aan volgens de geldende bewaarplicht.",
          ],
        },
        {
          heading: "5. Delen met derden",
          body: [
            "We verkopen je gegevens nooit. We schakelen wel verwerkers in die ons helpen de website en communicatie te laten werken:",
            "Vercel — hosting van de website.",
            "Resend — verzending van e-mail vanuit het contactformulier.",
            "Proton Mail — ontvangst van e-mail op ons domein.",
            "Sentry — foutmeldingen om technische problemen op te sporen.",
            "Met deze partijen zijn waar nodig verwerkersovereenkomsten gesloten. Sommige partijen kunnen gegevens buiten de EER verwerken; in dat geval zorgen we voor passende waarborgen zoals modelcontractbepalingen.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "Deze website plaatst geen tracking- of marketingcookies. Onze bezoekstatistieken zijn cookieloos. Lees meer in onze cookieverklaring.",
          ],
        },
        {
          heading: "7. Jouw rechten",
          body: [
            "Je hebt het recht op inzage, correctie, verwijdering, beperking en overdraagbaarheid van je gegevens, en het recht om bezwaar te maken tegen de verwerking.",
            `Wil je hier gebruik van maken? Stuur een e-mail naar ${EMAIL}. We reageren binnen de wettelijke termijn.`,
            "Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
          ],
        },
        {
          heading: "8. Beveiliging",
          body: [
            "We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen, waaronder versleutelde verbindingen (HTTPS) en toegang op need-to-know-basis.",
          ],
        },
        {
          heading: "9. Wijzigingen",
          body: [
            "We kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina, met bovenaan de datum van de laatste wijziging.",
          ],
        },
      ],
    },
    terms: {
      slug: "voorwaarden",
      title: "Algemene voorwaarden",
      updated: "2 juni 2026",
      intro: `Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten en overeenkomsten van ${COMPANY}, en op het gebruik van deze website.`,
      sections: [
        {
          heading: "1. Definities",
          body: [
            `${COMPANY}: de eenmanszaak en handelsnaam van ${OWNER}, gevestigd in Hilversum.`,
            "Opdrachtgever: de partij die met ${COMPANY} een overeenkomst aangaat.",
            "Overeenkomst: elke afspraak tussen ${COMPANY} en opdrachtgever over het leveren van diensten.",
          ],
        },
        {
          heading: "2. Toepasselijkheid",
          body: [
            `Deze voorwaarden gelden voor alle aanbiedingen en overeenkomsten van ${COMPANY}, tenzij schriftelijk anders overeengekomen. Algemene voorwaarden van de opdrachtgever worden uitdrukkelijk van de hand gewezen.`,
          ],
        },
        {
          heading: "3. Offertes en totstandkoming",
          body: [
            "Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld. Een overeenkomst komt tot stand zodra de opdrachtgever een offerte schriftelijk of per e-mail akkoord geeft.",
          ],
        },
        {
          heading: "4. Uitvoering en oplevering",
          body: [
            `${COMPANY} voert de opdracht naar beste inzicht en vermogen uit. Genoemde termijnen zijn indicatief en geen fatale termijnen.`,
            "De opdrachtgever zorgt tijdig voor de informatie, toegang en materialen die nodig zijn voor de uitvoering.",
          ],
        },
        {
          heading: "5. Prijzen en betaling",
          body: [
            "Alle bedragen zijn in euro's en exclusief btw, tenzij anders vermeld.",
            "Bij aanvang van een project geldt een aanbetaling van 50% van het offertebedrag. Het restant wordt bij oplevering gefactureerd.",
            "Facturen worden betaald binnen 14 dagen na factuurdatum. Bij niet-tijdige betaling is de opdrachtgever in verzuim en kunnen wettelijke rente en incassokosten in rekening worden gebracht.",
          ],
        },
        {
          heading: "6. Wijzigingen en meerwerk",
          body: [
            "Wijzigingen in de opdracht die leiden tot extra werk worden als meerwerk in rekening gebracht. We stemmen meerwerk vooraf met je af.",
          ],
        },
        {
          heading: "7. Intellectueel eigendom",
          body: [
            "Na volledige betaling draagt ${COMPANY} de gebruiksrechten op het opgeleverde werk over aan de opdrachtgever, voor zover overeengekomen.",
            `${COMPANY} mag het opgeleverde werk gebruiken voor eigen promotie en portfolio, tenzij schriftelijk anders afgesproken.`,
          ],
        },
        {
          heading: "8. Aansprakelijkheid",
          body: [
            `De aansprakelijkheid van ${COMPANY} is beperkt tot het bedrag dat voor de betreffende opdracht is gefactureerd. ${COMPANY} is niet aansprakelijk voor indirecte schade, zoals gevolgschade of gederfde winst.`,
          ],
        },
        {
          heading: "9. Overmacht",
          body: [
            `Bij overmacht worden de verplichtingen van ${COMPANY} opgeschort. Als de overmacht langer dan 30 dagen duurt, mogen beide partijen de overeenkomst beëindigen zonder verplichting tot schadevergoeding.`,
          ],
        },
        {
          heading: "10. Geheimhouding",
          body: [
            "Beide partijen houden vertrouwelijke informatie die zij in het kader van de opdracht ontvangen geheim.",
          ],
        },
        {
          heading: "11. Website-gebruik",
          body: [
            "De informatie op deze website is met zorg samengesteld, maar wordt zonder garanties aangeboden. Aan de inhoud kunnen geen rechten worden ontleend.",
            `De cases en succesverhalen op deze website kunnen illustratief zijn. ${COMPANY} is niet aansprakelijk voor beslissingen die op basis van de website-inhoud worden genomen.`,
          ],
        },
        {
          heading: "12. Toepasselijk recht en geschillen",
          body: [
            "Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter van de Rechtbank Midden-Nederland.",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookieverklaring",
      updated: "2 juni 2026",
      intro: `${COMPANY} vindt jouw privacy belangrijk. Deze website is bewust zo opgezet dat er geen tracking- of marketingcookies nodig zijn.`,
      sections: [
        {
          heading: "1. Wat zijn cookies",
          body: [
            "Cookies zijn kleine tekstbestanden die een website op je apparaat kan plaatsen. Ze worden vaak gebruikt om bezoekers te herkennen of te volgen.",
          ],
        },
        {
          heading: "2. Welke cookies wij gebruiken",
          body: [
            "Deze website plaatst geen tracking-, advertentie- of social-mediacookies.",
            "Onze bezoekstatistieken (Vercel Web Analytics) zijn cookieloos: er worden geen cookies geplaatst en geen individuele profielen opgebouwd.",
            "Voor het opsporen van technische fouten gebruiken we Sentry, dat geen tracking-cookies plaatst.",
          ],
        },
        {
          heading: "3. Toestemming",
          body: [
            "Omdat we geen niet-essentiële cookies plaatsen, is een cookiebanner of voorafgaande toestemming niet nodig.",
          ],
        },
        {
          heading: "4. Cookies beheren",
          body: [
            "Je kunt cookies altijd beheren of verwijderen via de instellingen van je browser. Omdat wij geen tracking-cookies plaatsen, heeft dit geen invloed op de werking van deze site.",
          ],
        },
      ],
    },
  },

  en: {
    privacy: {
      slug: "privacy",
      title: "Privacy Policy",
      updated: "2 June 2026",
      intro: `${COMPANY} respects your privacy and processes personal data in line with the General Data Protection Regulation (GDPR). This policy explains what data we collect, why, and what your rights are.`,
      sections: [
        {
          heading: "1. Who we are",
          body: [
            `${COMPANY} is a sole proprietorship and the trading name of ${OWNER}, based in Hilversum, the Netherlands.`,
            "Address: [Vestigingsadres], Hilversum",
            "Chamber of Commerce (KvK): [KvK-nummer]",
            "VAT ID: [BTW-id]",
            `Email: ${EMAIL}`,
            `${COMPANY} is the data controller for personal data processed through this website.`,
          ],
        },
        {
          heading: "2. What data we collect",
          body: [
            "Contact form: name, email address, phone number (optional), your area of interest and the content of your message.",
            "Technical data: when you visit the site, limited technical data is processed, such as anonymised visit statistics and, in case of a technical error, error reports.",
            "We do not collect special categories of personal data and do not carry out profiling or automated decision-making.",
          ],
        },
        {
          heading: "3. Why and on what basis",
          body: [
            "To respond to your message and discuss a possible collaboration. Basis: performance of a contract or pre-contractual steps taken at your request.",
            "To improve the website and keep it working securely and reliably. Basis: our legitimate interest in a well-functioning website.",
          ],
        },
        {
          heading: "4. Retention periods",
          body: [
            "We keep contact form messages for as long as needed to handle your request and follow up on any collaboration, and for a maximum of 24 months afterwards.",
            "Data we are legally required to keep (such as accounting records) is retained according to the applicable statutory periods.",
          ],
        },
        {
          heading: "5. Sharing with third parties",
          body: [
            "We never sell your data. We do use processors that help us run the website and communications:",
            "Vercel — website hosting.",
            "Resend — sending email from the contact form.",
            "Proton Mail — receiving email on our domain.",
            "Sentry — error reports to detect technical issues.",
            "Where required, data processing agreements are in place. Some providers may process data outside the EEA; in that case we ensure appropriate safeguards such as standard contractual clauses.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "This website does not place tracking or marketing cookies. Our visit statistics are cookieless. Read more in our cookie statement.",
          ],
        },
        {
          heading: "7. Your rights",
          body: [
            "You have the right to access, rectify, erase, restrict and port your data, and to object to processing.",
            `To exercise these rights, email ${EMAIL}. We respond within the legal time limit.`,
            "You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).",
          ],
        },
        {
          heading: "8. Security",
          body: [
            "We take appropriate technical and organisational measures to protect your data, including encrypted connections (HTTPS) and need-to-know access.",
          ],
        },
        {
          heading: "9. Changes",
          body: [
            "We may update this privacy policy. The most recent version is always available on this page, with the date of the last change at the top.",
          ],
        },
      ],
    },
    terms: {
      slug: "voorwaarden",
      title: "Terms & Conditions",
      updated: "2 June 2026",
      intro: `These terms and conditions apply to all quotes, assignments and agreements of ${COMPANY}, and to the use of this website.`,
      sections: [
        {
          heading: "1. Definitions",
          body: [
            `${COMPANY}: the sole proprietorship and trading name of ${OWNER}, based in Hilversum.`,
            `Client: the party entering into an agreement with ${COMPANY}.`,
            `Agreement: any arrangement between ${COMPANY} and the client regarding the delivery of services.`,
          ],
        },
        {
          heading: "2. Applicability",
          body: [
            `These terms apply to all offers and agreements of ${COMPANY}, unless agreed otherwise in writing. The client's own terms are expressly rejected.`,
          ],
        },
        {
          heading: "3. Quotes and formation",
          body: [
            "Quotes are without obligation and valid for 30 days unless stated otherwise. An agreement is formed once the client approves a quote in writing or by email.",
          ],
        },
        {
          heading: "4. Performance and delivery",
          body: [
            `${COMPANY} performs the assignment to the best of its insight and ability. Stated timelines are indicative and not strict deadlines.`,
            "The client provides the information, access and materials needed for delivery in good time.",
          ],
        },
        {
          heading: "5. Prices and payment",
          body: [
            "All amounts are in euros and exclusive of VAT, unless stated otherwise.",
            "A 50% deposit of the quoted amount is due at the start of a project. The remainder is invoiced on delivery.",
            "Invoices are payable within 14 days of the invoice date. Late payment puts the client in default and may incur statutory interest and collection costs.",
          ],
        },
        {
          heading: "6. Changes and additional work",
          body: [
            "Changes to the assignment that lead to extra work are charged as additional work, agreed with you in advance.",
          ],
        },
        {
          heading: "7. Intellectual property",
          body: [
            `After full payment, ${COMPANY} transfers the usage rights to the delivered work to the client, to the extent agreed.`,
            `${COMPANY} may use the delivered work for its own promotion and portfolio, unless agreed otherwise in writing.`,
          ],
        },
        {
          heading: "8. Liability",
          body: [
            `${COMPANY}'s liability is limited to the amount invoiced for the relevant assignment. ${COMPANY} is not liable for indirect damage, such as consequential loss or lost profit.`,
          ],
        },
        {
          heading: "9. Force majeure",
          body: [
            `In the event of force majeure, ${COMPANY}'s obligations are suspended. If the force majeure lasts longer than 30 days, both parties may terminate the agreement without any obligation to pay compensation.`,
          ],
        },
        {
          heading: "10. Confidentiality",
          body: [
            "Both parties keep confidential information received in the context of the assignment confidential.",
          ],
        },
        {
          heading: "11. Use of the website",
          body: [
            "The information on this website has been compiled with care but is provided without warranties. No rights can be derived from its content.",
            `The cases and success stories on this website may be illustrative. ${COMPANY} is not liable for decisions made based on the website content.`,
          ],
        },
        {
          heading: "12. Governing law and disputes",
          body: [
            "All agreements are governed by Dutch law. Disputes are submitted to the competent court of the District Court of Midden-Nederland.",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookie Statement",
      updated: "2 June 2026",
      intro: `${COMPANY} values your privacy. This website is deliberately set up so that no tracking or marketing cookies are needed.`,
      sections: [
        {
          heading: "1. What are cookies",
          body: [
            "Cookies are small text files a website can place on your device. They are often used to recognise or track visitors.",
          ],
        },
        {
          heading: "2. Which cookies we use",
          body: [
            "This website places no tracking, advertising or social media cookies.",
            "Our visit statistics (Vercel Web Analytics) are cookieless: no cookies are placed and no individual profiles are built.",
            "To detect technical errors we use Sentry, which places no tracking cookies.",
          ],
        },
        {
          heading: "3. Consent",
          body: [
            "Because we place no non-essential cookies, a cookie banner or prior consent is not required.",
          ],
        },
        {
          heading: "4. Managing cookies",
          body: [
            "You can always manage or delete cookies through your browser settings. Since we place no tracking cookies, this has no effect on how this site works.",
          ],
        },
      ],
    },
  },

  de: {
    privacy: {
      slug: "privacy",
      title: "Datenschutzerklärung",
      updated: "2. Juni 2026",
      intro: `${COMPANY} respektiert Ihre Privatsphäre und verarbeitet personenbezogene Daten im Einklang mit der Datenschutz-Grundverordnung (DSGVO). Diese Erklärung beschreibt, welche Daten wir erheben, warum und welche Rechte Sie haben.`,
      sections: [
        {
          heading: "1. Wer wir sind",
          body: [
            `${COMPANY} ist ein Einzelunternehmen und der Handelsname von ${OWNER} mit Sitz in Hilversum, Niederlande.`,
            "Adresse: [Vestigingsadres], Hilversum",
            "Handelsregister (KvK): [KvK-nummer]",
            "USt-IdNr.: [BTW-id]",
            `E-Mail: ${EMAIL}`,
            `${COMPANY} ist der Verantwortliche für die über diese Website verarbeiteten personenbezogenen Daten.`,
          ],
        },
        {
          heading: "2. Welche Daten wir erheben",
          body: [
            "Kontaktformular: Name, E-Mail-Adresse, Telefonnummer (optional), Ihr Interesse und der Inhalt Ihrer Nachricht.",
            "Technische Daten: Beim Besuch der Website werden begrenzte technische Daten verarbeitet, etwa anonymisierte Besuchsstatistiken und bei einem technischen Fehler Fehlerberichte.",
            "Wir erheben keine besonderen Kategorien personenbezogener Daten und führen kein Profiling oder automatisierte Entscheidungen durch.",
          ],
        },
        {
          heading: "3. Zweck und Rechtsgrundlage",
          body: [
            "Um auf Ihre Nachricht zu antworten und eine mögliche Zusammenarbeit zu besprechen. Grundlage: Erfüllung eines Vertrags oder vorvertragliche Maßnahmen auf Ihre Anfrage.",
            "Um die Website zu verbessern und sicher und fehlerfrei zu betreiben. Grundlage: unser berechtigtes Interesse an einer gut funktionierenden Website.",
          ],
        },
        {
          heading: "4. Speicherfristen",
          body: [
            "Nachrichten über das Kontaktformular bewahren wir so lange auf, wie es zur Bearbeitung Ihrer Anfrage und zur Nachverfolgung einer Zusammenarbeit nötig ist, und danach höchstens 24 Monate.",
            "Daten, die wir gesetzlich aufbewahren müssen (etwa Buchhaltung), bewahren wir gemäß den geltenden Fristen auf.",
          ],
        },
        {
          heading: "5. Weitergabe an Dritte",
          body: [
            "Wir verkaufen Ihre Daten niemals. Wir setzen jedoch Auftragsverarbeiter ein, die uns beim Betrieb der Website und der Kommunikation unterstützen:",
            "Vercel — Hosting der Website.",
            "Resend — Versand von E-Mails aus dem Kontaktformular.",
            "Proton Mail — Empfang von E-Mails auf unserer Domain.",
            "Sentry — Fehlerberichte zur Erkennung technischer Probleme.",
            "Sofern erforderlich, bestehen Auftragsverarbeitungsverträge. Einige Anbieter können Daten außerhalb des EWR verarbeiten; in diesem Fall sorgen wir für geeignete Garantien wie Standardvertragsklauseln.",
          ],
        },
        {
          heading: "6. Cookies",
          body: [
            "Diese Website setzt keine Tracking- oder Marketing-Cookies. Unsere Besuchsstatistiken sind cookielos. Mehr dazu in unserer Cookie-Erklärung.",
          ],
        },
        {
          heading: "7. Ihre Rechte",
          body: [
            "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Übertragbarkeit Ihrer Daten sowie das Recht, der Verarbeitung zu widersprechen.",
            `Um diese Rechte auszuüben, schreiben Sie an ${EMAIL}. Wir antworten innerhalb der gesetzlichen Frist.`,
            "Sie haben außerdem das Recht, eine Beschwerde bei der niederländischen Datenschutzbehörde (Autoriteit Persoonsgegevens) einzureichen.",
          ],
        },
        {
          heading: "8. Sicherheit",
          body: [
            "Wir treffen geeignete technische und organisatorische Maßnahmen zum Schutz Ihrer Daten, einschließlich verschlüsselter Verbindungen (HTTPS) und Zugriff nach dem Need-to-know-Prinzip.",
          ],
        },
        {
          heading: "9. Änderungen",
          body: [
            "Wir können diese Datenschutzerklärung anpassen. Die aktuellste Version finden Sie stets auf dieser Seite, oben mit dem Datum der letzten Änderung.",
          ],
        },
      ],
    },
    terms: {
      slug: "voorwaarden",
      title: "Allgemeine Geschäftsbedingungen",
      updated: "2. Juni 2026",
      intro: `Diese Allgemeinen Geschäftsbedingungen gelten für alle Angebote, Aufträge und Verträge von ${COMPANY} sowie für die Nutzung dieser Website.`,
      sections: [
        {
          heading: "1. Definitionen",
          body: [
            `${COMPANY}: das Einzelunternehmen und der Handelsname von ${OWNER} mit Sitz in Hilversum.`,
            `Auftraggeber: die Partei, die einen Vertrag mit ${COMPANY} schließt.`,
            `Vertrag: jede Vereinbarung zwischen ${COMPANY} und dem Auftraggeber über die Erbringung von Leistungen.`,
          ],
        },
        {
          heading: "2. Geltungsbereich",
          body: [
            `Diese Bedingungen gelten für alle Angebote und Verträge von ${COMPANY}, sofern nicht schriftlich etwas anderes vereinbart wurde. Eigene Bedingungen des Auftraggebers werden ausdrücklich abgelehnt.`,
          ],
        },
        {
          heading: "3. Angebote und Zustandekommen",
          body: [
            "Angebote sind freibleibend und 30 Tage gültig, sofern nicht anders angegeben. Ein Vertrag kommt zustande, sobald der Auftraggeber ein Angebot schriftlich oder per E-Mail bestätigt.",
          ],
        },
        {
          heading: "4. Ausführung und Lieferung",
          body: [
            `${COMPANY} führt den Auftrag nach bestem Wissen und Können aus. Genannte Fristen sind unverbindlich und keine festen Termine.`,
            "Der Auftraggeber stellt rechtzeitig die Informationen, Zugänge und Materialien bereit, die für die Ausführung erforderlich sind.",
          ],
        },
        {
          heading: "5. Preise und Zahlung",
          body: [
            "Alle Beträge verstehen sich in Euro und zuzüglich Umsatzsteuer, sofern nicht anders angegeben.",
            "Zu Projektbeginn ist eine Anzahlung von 50% des Angebotsbetrags fällig. Der Restbetrag wird bei Lieferung in Rechnung gestellt.",
            "Rechnungen sind innerhalb von 14 Tagen ab Rechnungsdatum zu zahlen. Bei verspäteter Zahlung gerät der Auftraggeber in Verzug, und es können Verzugszinsen und Inkassokosten anfallen.",
          ],
        },
        {
          heading: "6. Änderungen und Mehraufwand",
          body: [
            "Änderungen am Auftrag, die zu Mehraufwand führen, werden als Mehraufwand berechnet und vorab mit Ihnen abgestimmt.",
          ],
        },
        {
          heading: "7. Geistiges Eigentum",
          body: [
            `Nach vollständiger Zahlung überträgt ${COMPANY} die Nutzungsrechte am gelieferten Werk im vereinbarten Umfang auf den Auftraggeber.`,
            `${COMPANY} darf das gelieferte Werk für eigene Werbung und das Portfolio nutzen, sofern nicht schriftlich anders vereinbart.`,
          ],
        },
        {
          heading: "8. Haftung",
          body: [
            `Die Haftung von ${COMPANY} ist auf den für den jeweiligen Auftrag in Rechnung gestellten Betrag beschränkt. ${COMPANY} haftet nicht für indirekte Schäden wie Folgeschäden oder entgangenen Gewinn.`,
          ],
        },
        {
          heading: "9. Höhere Gewalt",
          body: [
            `Bei höherer Gewalt werden die Verpflichtungen von ${COMPANY} ausgesetzt. Dauert die höhere Gewalt länger als 30 Tage, können beide Parteien den Vertrag ohne Schadensersatzpflicht beenden.`,
          ],
        },
        {
          heading: "10. Geheimhaltung",
          body: [
            "Beide Parteien behandeln vertrauliche Informationen, die sie im Rahmen des Auftrags erhalten, vertraulich.",
          ],
        },
        {
          heading: "11. Nutzung der Website",
          body: [
            "Die Informationen auf dieser Website wurden sorgfältig zusammengestellt, werden jedoch ohne Gewähr bereitgestellt. Aus dem Inhalt können keine Rechte abgeleitet werden.",
            `Die Cases und Erfolgsgeschichten auf dieser Website können beispielhaft sein. ${COMPANY} haftet nicht für Entscheidungen, die auf Grundlage der Website-Inhalte getroffen werden.`,
          ],
        },
        {
          heading: "12. Anwendbares Recht und Streitigkeiten",
          body: [
            "Auf alle Verträge ist niederländisches Recht anwendbar. Streitigkeiten werden dem zuständigen Gericht der Rechtbank Midden-Nederland vorgelegt.",
          ],
        },
      ],
    },
    cookies: {
      slug: "cookies",
      title: "Cookie-Erklärung",
      updated: "2. Juni 2026",
      intro: `${COMPANY} legt Wert auf Ihre Privatsphäre. Diese Website ist bewusst so gestaltet, dass keine Tracking- oder Marketing-Cookies nötig sind.`,
      sections: [
        {
          heading: "1. Was sind Cookies",
          body: [
            "Cookies sind kleine Textdateien, die eine Website auf Ihrem Gerät speichern kann. Sie werden häufig verwendet, um Besucher zu erkennen oder zu verfolgen.",
          ],
        },
        {
          heading: "2. Welche Cookies wir verwenden",
          body: [
            "Diese Website setzt keine Tracking-, Werbe- oder Social-Media-Cookies.",
            "Unsere Besuchsstatistiken (Vercel Web Analytics) sind cookielos: Es werden keine Cookies gesetzt und keine individuellen Profile erstellt.",
            "Zur Erkennung technischer Fehler verwenden wir Sentry, das keine Tracking-Cookies setzt.",
          ],
        },
        {
          heading: "3. Einwilligung",
          body: [
            "Da wir keine nicht notwendigen Cookies setzen, ist ein Cookie-Banner oder eine vorherige Einwilligung nicht erforderlich.",
          ],
        },
        {
          heading: "4. Cookies verwalten",
          body: [
            "Sie können Cookies jederzeit über die Einstellungen Ihres Browsers verwalten oder löschen. Da wir keine Tracking-Cookies setzen, hat dies keine Auswirkung auf die Funktion dieser Website.",
          ],
        },
      ],
    },
  },
};

export function getLegal(locale: string): LegalContent {
  return legal[(locale as "nl" | "en" | "de")] ?? legal.nl;
}
