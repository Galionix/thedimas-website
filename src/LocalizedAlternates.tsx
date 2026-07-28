const SITE_URL = "https://thedimas.com";

export function LocalizedAlternates({ path = "" }: { path?: string }) {
  const normalizedPath = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";

  return (
    <>
      <link
        rel="alternate"
        hrefLang="en"
        href={`${SITE_URL}/en${normalizedPath}`}
      />
      <link
        rel="alternate"
        hrefLang="uk"
        href={`${SITE_URL}/ua${normalizedPath}`}
      />
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}/en${normalizedPath}`}
      />
    </>
  );
}
