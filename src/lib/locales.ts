import type { Language } from "./i18n";

export const localeCodes = ["en", "fr", "de"] as const;
export const allLocaleCodes = ["nl", ...localeCodes] as const;

export function isLanguage(value: string): value is Language {
  return allLocaleCodes.includes(value as (typeof allLocaleCodes)[number]);
}

export function normalizePageSlug(slug?: string[]) {
  const value = slug?.filter(Boolean).join("/") || "";
  return value === "home" ? "" : value;
}

export function localePath(locale: Language, slug?: string[]) {
  const page = normalizePageSlug(slug);
  if (locale === "nl") return page ? `/${page}` : "/home";
  return page ? `/${locale}/${page}` : `/${locale}`;
}

export function localizedAlternates(slug?: string[]) {
  return {
    nl: localePath("nl", slug),
    en: localePath("en", slug),
    fr: localePath("fr", slug),
    de: localePath("de", slug),
    "x-default": localePath("nl", slug),
  };
}

export function getLocaleFromPathname(pathname: string): Language | undefined {
  const segment = pathname.split("/")[1];
  return isLanguage(segment) ? segment : undefined;
}
