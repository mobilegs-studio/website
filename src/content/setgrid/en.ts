import type { SetgridContent } from "./types";

const en: SetgridContent = {
  meta: {
    title: "Setgrid — gym log and food coach",
    description:
      "Setgrid is a gym log and nutrition coach in one: log sets in seconds, automatic progression, photo calorie tracking and a weekly AI review.",
  },
  nav: { features: "Features", faq: "Q&A", support: "Support", terms: "Terms", privacy: "Privacy" },
  hero: {
    badge: "Health & Fitness · iPhone, Android and web",
    headline: "Your gym log and food coach in one app",
    sub: "Log your sets in seconds, let Setgrid tell you when to add weight, and snap a photo of your meal to see the calories.",
    note: "In testing now. Coming soon to the App Store and Google Play.",
    ctaSupport: "Ask a question",
    ctaFeatures: "See the app",
  },
  featuresTitle: "What it does",
  features: [
    {
      title: "Log sets in seconds",
      text: "Previous weights, kg, reps and a tick — plus a rest timer that tells you when the next set is due. Hit the top of the rep range and Setgrid adds weight next time.",
    },
    {
      title: "See your body change",
      text: "A weekly check-in for weight and waist, trend charts, and goals for your lifts, your measurements and sessions per week.",
    },
    {
      title: "Your AI coach",
      text: "Every week, Claude reads your training, your body and your food, and comes back with concrete changes for the week ahead.",
    },
    {
      title: "Never miss a session",
      text: "A calendar with done, planned and backup days. Skipped Saturday? Sunday counts. You can subscribe to it in Apple or Google Calendar.",
    },
    {
      title: "Hit your calories and protein",
      text: "Daily calorie and protein targets for your goal, and photo calorie tracking: take a picture and get the items, calories and macros.",
    },
    {
      title: "Shopping list in one tap",
      text: "Built from your weekly meal plan, in normal supermarket pack sizes, made from the foods you actually like.",
    },
    {
      title: "Swap any exercise",
      text: "One tap gives you alternatives that train the same movement — handy when the rack is taken or something hurts.",
    },
  ],
  faqTitle: "Questions and answers",
  faq: [
    {
      q: "What is Setgrid?",
      a: "A gym log and a nutrition coach in one app. It tracks your workouts and your food, and gives you a weekly review with concrete changes.",
    },
    {
      q: "Which devices does it work on?",
      a: "iPhone, Android and the browser. Each one keeps its own data on the device, so what you log on your phone stays on your phone. There is an Apple Watch app for logging sets during a workout.",
    },
    {
      q: "Can I download it already?",
      a: "Not yet. Setgrid is in testing and is being prepared for the App Store and Google Play. Send a message through the support form and you will hear when it is live.",
    },
    {
      q: "What does it cost?",
      a: "Nothing while it is in testing. No ads and no in-app purchases. If that ever changes, you will be told in advance.",
    },
    {
      q: "How does photo calorie tracking work?",
      a: "You take a picture of your meal and Claude estimates the items, calories and macros. They are estimates — you can correct every line by hand.",
    },
    {
      q: "Does it work with Apple Health and my watch?",
      a: "Yes. Setgrid reads workouts, steps, heart rate and body measurements from Apple Health, and writes your gym sessions and measurements back.",
    },
    {
      q: "Which languages does the app speak?",
      a: "English, Nederlands, Deutsch, Français, Español and Português.",
    },
    {
      q: "Where is my data and can I delete it?",
      a: "Only on your own device. We never receive it and keep no copy. Wipe the lot from Settings → Privacy and your data → Delete all my data, or by deleting the app.",
    },
    {
      q: "Is this medical advice?",
      a: "No. Setgrid gives general fitness and nutrition guidance. Check with a doctor before starting a new training or diet plan.",
    },
  ],
  support: {
    title: "Customer support",
    intro:
      "A bug, a question, or something you would like the app to do? Send a message and you will get a reply by email, usually within two working days.",
    name: "Your name",
    email: "Your email",
    topic: "Subject",
    topics: [
      "Question about the app",
      "Something is broken",
      "Feature request",
      "My account or my data",
      "Something else",
    ],
    message: "Your message",
    send: "Send message",
    sending: "Sending…",
    sent: "Thanks — your message has arrived. You will get a reply by email.",
    error: "That did not send. Please try again, or email info@mobilegrowthstudio.com.",
    required: "Please fill in your name, email and message.",
    privacy:
      "Your name, email and message are used to answer you and nothing else.",
  },
  terms: {
    title: "Terms and conditions",
    updated: "Last updated: 26 November 2026",
    intro:
      "These terms apply to the Setgrid app on iPhone, Android and the web. By using Setgrid you agree to them.",
    sections: [
      {
        h: "1. Who you are dealing with",
        p: "Setgrid is made and run by Mobile Growth Studio, Hilversum, the Netherlands. You can reach us at info@mobilegrowthstudio.com.",
      },
      {
        h: "2. What Setgrid is",
        p: "Setgrid is an app for logging workouts and food and for following your own progress. It is meant for personal use.",
      },
      {
        h: "3. No account",
        p:
          "Setgrid needs no account with us. Everything you log stays on your own device, so there is nothing to sign in to and no password for us to lose.",
      },
      {
        h: "4. Your data stays yours",
        p:
          "Your workouts, measurements, photos and notes are yours and stay on your device. We do not receive them, store them or process them. You can erase all of them yourself at any time.",
      },
      {
        h: "5. No medical advice",
        p: "Setgrid gives general fitness and nutrition guidance. It is not medical advice and not a substitute for a doctor, physiotherapist or dietitian. Check with a doctor before starting a new training or diet plan, and stop if something hurts.",
      },
      {
        h: "6. AI suggestions",
        p: "The coach, the meal plan and the photo calorie estimates are generated by AI (Claude, by Anthropic). They can be wrong. Treat them as suggestions and use your own judgement.",
      },
      {
        h: "7. How you may use it",
        p: "Do not break the app, work around its limits, scrape it, resell it, or use it for anything against the law. We can suspend access that does.",
      },
      {
        h: "8. Price",
        p: "Setgrid is free while it is in testing. There are no ads and no in-app purchases. If a paid version ever arrives, you will hear about it before it affects you.",
      },
      {
        h: "9. Availability",
        p: "We do our best to keep the app up and the data safe, but we cannot promise it is always available or error-free. Features can change or stop. If Setgrid is discontinued, you will get notice and time to export your data.",
      },
      {
        h: "10. Privacy",
        p: "What is collected and why is set out in the privacy policy. You can delete everything from Settings → Privacy → Delete all my data, or by emailing info@mobilegrowthstudio.com.",
      },
      {
        h: "11. Liability",
        p: "As far as the law allows, we are not liable for indirect damage or for damage that follows from using the app, including injury or health effects from training and nutrition choices. Nothing here limits the rights you have as a consumer.",
      },
      {
        h: "12. Changes to these terms",
        p: "We can change these terms. The current version always sits on this page with the date above. Keeping on using the app means you accept the new version.",
      },
      {
        h: "13. Law",
        p: "Dutch law applies. Disputes go to a competent court in the Netherlands.",
      },
    ],
  },
  privacy: {
    title: "Privacy policy",
    updated: "Last updated: 26 November 2026",
    intro:
      "Setgrid keeps everything you log on your own device. There is no account, we collect nothing and we never receive your data. This page sets out exactly what that means, and how it meets the GDPR.",
    sections: [
      {
        h: "The short version",
        p:
          "Your workouts, sets, weight, measurements, meals, photos, goals and settings are stored only on the device you use them on: the app's own storage on iPhone and Android, or your browser's storage on the web. There is no account, no sign-in with us and no copy on our servers.",
      },
      {
        h: "Who we are",
        p:
          "Setgrid is made by Mobile Growth Studio, Hilversum, the Netherlands. Because the app never sends us personal data, we are not a controller of it under the GDPR. For this website we are. You can reach us at info@mobilegrowthstudio.com.",
      },
      {
        h: "What we never collect",
        p:
          "No name, no e-mail address, no account, no device or advertising identifiers. Setgrid carries no tracking, no analytics and no advertising software. Nothing about you is sold or shared with anyone, because we have nothing to sell or share.",
      },
      {
        h: "Apple Health",
        p:
          "If you switch it on yourself, Setgrid writes your workouts, weight and waist to Apple Health on your phone and reads back what your watch recorded. That exchange happens entirely on the device. We never see it, and you can withdraw the permission at any time in your phone's settings.",
      },
      {
        h: "The Claude coach, and it is optional",
        p:
          "Progress analysis, meal photos, meal plans and recipes are the only features that send anything off your device, and only at the moment you use one. The data needed for that single question — your recent workouts and meals, or the photo of your plate — goes to the Setgrid server, which passes it to the Claude API of Anthropic and returns the answer. It is used for that answer only, is not kept afterwards, and is not used to train models. Leave the server field in Settings empty and the feature stays off.",
      },
      {
        h: "Calendar export",
        p:
          "The calendar file with your planned and finished workouts is built on your own device and then handed to the share sheet or downloaded. It is not uploaded anywhere; where it goes next is your choice.",
      },
      {
        h: "Your rights under the GDPR",
        p:
          "The GDPR gives you the right to see your data, correct it, take it with you and have it erased. Because everything is on your device, you use those rights directly in the app: every record is visible and editable, your workouts export as a calendar file, and Settings → Privacy and your data → Delete all my data erases the lot, as does deleting the app. We cannot hand over, correct or delete anything on your behalf, for the simple reason that we do not hold it.",
      },
      {
        h: "This website",
        p:
          "mobilegrowthstudio.com is hosted by Vercel and sets no tracking or advertising cookies. If you use the support form, your name, e-mail address and message are sent to us by e-mail (through Resend) so that we can answer you, and are kept no longer than that needs.",
      },
      {
        h: "Changes and questions",
        p:
          "If this policy changes, the new version appears on this page with a new date. Questions or a complaint: info@mobilegrowthstudio.com. You can also complain to the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).",
      },
    ],
  },
  footer: {
    madeBy: "Setgrid is made by Mobile Growth Studio, Hilversum.",
    back: "mobilegrowthstudio.com",
    privacy: "Privacy policy",
  },
};

export default en;
