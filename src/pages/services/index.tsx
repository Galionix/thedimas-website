import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { get_endpoint_data } from "../../../utils/content_fetching";
import { getService, serviceSlugs } from "../../data/services";
import s from "../../styles/pages/ServicesIndex.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const [header_data, footer_data] = await Promise.all([
    get_endpoint_data({ endpoint: "header" }),
    get_endpoint_data({ endpoint: "footer" }),
  ]);

  return {
    props: {
      header_data,
      footer_data,
    },
    revalidate: 10,
  };
};

export default function ServicesIndex({
  header_data,
  footer_data,
}: {
  header_data: any;
  footer_data: any;
}) {
  const { locale } = useRouter();
  const currentLocale = locale === "en" ? "en" : "ua";
  const canonicalUrl = `https://thedimas.com/${currentLocale}/services`;
  const alternateLocale = currentLocale === "en" ? "ua" : "en";
  const services = serviceSlugs
    .map((slug) => getService(currentLocale, slug))
    .filter(Boolean);
  const copy = {
    en: {
      eyebrow: "Services",
      title: "Choose the page that matches the work you need.",
      description:
        "I build and rescue web products, backend systems, admin panels, internal tools, automations and integrations for founders, agencies and small teams.",
      open: "Open page",
      ctaTitle: "Not sure which page fits?",
      ctaText:
        "Send one email. I will ask for the missing context and point you to the smallest useful first step: paid audit, 20-hour pilot, rescue sprint or scoped build.",
      availability:
        "Currently open for one 15-20h/week remote contract. Production audits start at $750.",
      cta: "Contact me",
      seoTitle: "Full-Stack, Backend and Internal Tool Services | Dimas",
      seoDescription:
        "Service pages for hiring Dmitry Galaktionov: agency implementation partner, founder MVP build, backend development, admin panels, internal tools, automation and contract full-stack work.",
    },
    ua: {
      eyebrow: "Послуги",
      title: "Обери сторінку, яка найкраще відповідає задачі.",
      description:
        "Я будую та рятую web products, backend systems, адмінки, internal tools, автоматизації та інтеграції для засновників, агенцій і невеликих команд.",
      open: "Відкрити сторінку",
      ctaTitle: "Не впевнений, що саме підходить?",
      ctaText:
        "Напиши один email. Я сам уточню потрібний контекст і запропоную найменший корисний перший крок: paid audit, 20-hour pilot, rescue sprint або scoped build.",
      availability:
        "Зараз відкритий для одного remote contract на 15-20 год/тиждень. Production audit — від $750.",
      cta: "Зв'язатися",
      seoTitle: "Full-stack, backend та internal tool services | Dimas",
      seoDescription:
        "Сторінки послуг Дмитра Галактіонова: партнер для агенцій, MVP для засновників, backend development, адмінки, internal tools, автоматизація та contract full-stack work.",
    },
  }[currentLocale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#services`,
    name: copy.seoTitle,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service!.eyebrow,
      url: `https://thedimas.com/${currentLocale}/services/${service!.slug}`,
    })),
  };

  return (
    <div className={s.container}>
      <Head>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={copy.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          hrefLang={currentLocale === "en" ? "uk" : "en"}
          href={`https://thedimas.com/${alternateLocale}/services`}
        />
        <link rel="alternate" hrefLang="x-default" href="https://thedimas.com/en/services" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header header_data={header_data} preset="main_page" />
      <main className={s.main}>
        <section className={s.hero} data-testid="content-section">
          <p className={s.eyebrow}>{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </section>
        <section className={s.grid} aria-label={copy.eyebrow}>
          {services.map((service) => (
            <Link
              className={s.service}
              href={`/${currentLocale}/services/${service!.slug}`}
              key={service!.slug}
            >
              <p className={s.eyebrow}>{service!.eyebrow}</p>
              <h2>{service!.title}</h2>
              <p>{service!.description}</p>
              <span>{copy.open}</span>
            </Link>
          ))}
        </section>
        <section className={s.cta} data-testid="content-section">
          <h2>{copy.ctaTitle}</h2>
          <strong>{copy.availability}</strong>
          <p>{copy.ctaText}</p>
          <Link href={`/${currentLocale}#contact`}>{copy.cta}</Link>
        </section>
      </main>
      <Footer data={footer_data} preset="main_page" />
    </div>
  );
}
