export const contentLocales = ["ua", "en"] as const;

export type ContentLocale = (typeof contentLocales)[number];

export function getContentLocale(locale: string | undefined): ContentLocale {
  return locale === "ua" ? "ua" : "en";
}

export function getContentLocales(
  locales: readonly string[] | undefined
): ContentLocale[] {
  return (locales || contentLocales).filter(
    (locale): locale is ContentLocale =>
      locale === "ua" || locale === "en"
  );
}
