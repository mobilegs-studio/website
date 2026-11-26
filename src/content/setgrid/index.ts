import en from "./en";
import nl from "./nl";
import de from "./de";
import fr from "./fr";
import es from "./es";
import pt from "./pt";
import { SETGRID_LANGS, type SetgridContent, type SetgridLang } from "./types";

export * from "./types";

const content: Record<SetgridLang, SetgridContent> = { en, nl, de, fr, es, pt };

export function isSetgridLang(value: string): value is SetgridLang {
  return (SETGRID_LANGS as readonly string[]).includes(value);
}

export function getSetgridContent(lang: string): SetgridContent {
  return isSetgridLang(lang) ? content[lang] : content.en;
}

/** Picks the best Setgrid language from an Accept-Language header. */
export function setgridLangFromHeader(header: string | null): SetgridLang {
  if (!header) return "en";
  for (const part of header.split(",")) {
    const tag = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (isSetgridLang(tag)) return tag;
  }
  return "en";
}
