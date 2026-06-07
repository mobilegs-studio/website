// Losse i18n-strings voor login/account, los van de grote translations.ts.

export interface AuthStrings {
  loginTitle: string;
  loginSubtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  magicLinkCta: string;
  magicLinkSent: string;
  googleCta: string;
  or: string;
  sending: string;
  errorGeneric: string;
  accountTitle: string;
  signedInAs: string;
  signOut: string;
  downloadsTitle: string;
  downloadsEmpty: string;
  subscriptionTitle: string;
  subscriptionNone: string;
}

export const authStrings: Record<string, AuthStrings> = {
  nl: {
    loginTitle: "Inloggen",
    loginSubtitle: "Krijg toegang tot je downloads en betaalde content.",
    emailLabel: "E-mailadres",
    emailPlaceholder: "jij@bedrijf.nl",
    magicLinkCta: "Stuur magische link",
    magicLinkSent: "Check je mail — we hebben je een inloglink gestuurd.",
    googleCta: "Inloggen met Google",
    or: "of",
    sending: "Versturen…",
    errorGeneric: "Er ging iets mis. Probeer het opnieuw.",
    accountTitle: "Mijn account",
    signedInAs: "Ingelogd als",
    signOut: "Uitloggen",
    downloadsTitle: "Jouw downloads",
    downloadsEmpty: "Je hebt nog geen downloads.",
    subscriptionTitle: "Abonnement",
    subscriptionNone: "Je hebt geen actief abonnement.",
  },
  en: {
    loginTitle: "Log in",
    loginSubtitle: "Access your downloads and paid content.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    magicLinkCta: "Send magic link",
    magicLinkSent: "Check your inbox — we sent you a login link.",
    googleCta: "Continue with Google",
    or: "or",
    sending: "Sending…",
    errorGeneric: "Something went wrong. Please try again.",
    accountTitle: "My account",
    signedInAs: "Signed in as",
    signOut: "Sign out",
    downloadsTitle: "Your downloads",
    downloadsEmpty: "You have no downloads yet.",
    subscriptionTitle: "Subscription",
    subscriptionNone: "You have no active subscription.",
  },
  de: {
    loginTitle: "Anmelden",
    loginSubtitle: "Zugriff auf deine Downloads und bezahlten Inhalte.",
    emailLabel: "E-Mail-Adresse",
    emailPlaceholder: "du@firma.de",
    magicLinkCta: "Magischen Link senden",
    magicLinkSent: "Prüfe dein Postfach — wir haben dir einen Login-Link geschickt.",
    googleCta: "Mit Google anmelden",
    or: "oder",
    sending: "Senden…",
    errorGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    accountTitle: "Mein Konto",
    signedInAs: "Angemeldet als",
    signOut: "Abmelden",
    downloadsTitle: "Deine Downloads",
    downloadsEmpty: "Du hast noch keine Downloads.",
    subscriptionTitle: "Abonnement",
    subscriptionNone: "Du hast kein aktives Abonnement.",
  },
};

export function getAuthStrings(locale: string): AuthStrings {
  return authStrings[locale] ?? authStrings.nl;
}
