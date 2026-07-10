import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { track } from "@vercel/analytics";
import { Header } from "../../Header/Header";
import { Footer } from "../../Footer/Footer";
import { get_endpoint_data } from "../../../utils/content_fetching";
import { getService, serviceSlugs } from "../../data/services";
import { gaEvent } from "../../../utils/google_analytics";
import s from "../../styles/pages/Service.module.scss";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = serviceSlugs.flatMap((service) =>
    (locales || ["ua", "en"]).map((locale) => ({
      params: { service },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const service = getService(locale, String(params?.service || ""));

  if (!service) {
    return {
      notFound: true,
    };
  }

  const [header_data, footer_data] = await Promise.all([
    get_endpoint_data({ endpoint: "header" }),
    get_endpoint_data({ endpoint: "footer" }),
  ]);

  return {
    props: {
      header_data,
      footer_data,
      service,
    },
    revalidate: 10,
  };
};

export default function ServicePage({
  header_data,
  footer_data,
  service,
}: {
  header_data: any;
  footer_data: any;
  service: ReturnType<typeof getService>;
}) {
  const { locale } = useRouter();
  const currentLocale = locale === "en" ? "en" : "ua";
  const canonicalUrl = `https://thedimas.com/${currentLocale}/services/${service!.slug}`;
  const alternateLocale = currentLocale === "en" ? "ua" : "en";
  const contactLabel = currentLocale === "en" ? "Contact me" : "Зв'язатися";
  const contactHref = `/${currentLocale}#contact`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: service!.eyebrow,
        description: service!.description,
        provider: {
          "@type": "Person",
          "@id": "https://thedimas.com/#person",
          name: "Dmitry Galaktionov",
        },
        areaServed: "Worldwide",
        url: canonicalUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: service!.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className={s.container}>
      <Head>
        <title>{service!.seo.title}</title>
        <meta name="description" content={service!.seo.description} />
        <meta name="keywords" content={service!.seo.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          hrefLang={currentLocale === "en" ? "uk" : "en"}
          href={`https://thedimas.com/${alternateLocale}/services/${service!.slug}`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href={`https://thedimas.com/en/services/${service!.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={service!.seo.title} />
        <meta property="og:description" content={service!.seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header header_data={header_data} preset="main_page" />
      <main className={s.main}>
        <section className={s.hero} data-testid="content-section">
          <p className={s.eyebrow}>{service!.eyebrow}</p>
          <h1>{service!.title}</h1>
          <p>{service!.description}</p>
          <div className={s.actions}>
            <Link
              href={contactHref}
              onClick={() => {
                track("service_contact_click", {
                  locale: currentLocale,
                  service: service!.slug,
                });
                gaEvent("select_content", {
                  content_type: "service_contact_cta",
                  item_id: service!.slug,
                  locale: currentLocale,
                });
              }}
            >
              {contactLabel}
            </Link>
            <Link href={`/${currentLocale}/projects/Bella%20AI`}>Bella AI case</Link>
          </div>
        </section>
        <section className={s.contentBand}>
          <div className={s.statement} data-testid="content-section">
            <h2>{currentLocale === "en" ? "When this helps" : "Коли це допомагає"}</h2>
            <p>{service!.intro}</p>
          </div>
          {service!.audience?.length ? (
            <section className={s.audience} data-testid="content-section">
              <h2>{currentLocale === "en" ? "Built for" : "Для кого"}</h2>
              <div>
                {service!.audience.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          ) : null}
          {service!.signals?.length ? (
            <section className={s.signals} data-testid="content-section">
              <h2>{currentLocale === "en" ? "Why this is credible" : "Чому це не порожні слова"}</h2>
              <div>
                {service!.signals.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
          <div className={s.grid}>
            <section data-testid="content-section">
              <h2>{currentLocale === "en" ? "Outcomes" : "Результати"}</h2>
              <ul>
                {service!.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section data-testid="content-section">
              <h2>{currentLocale === "en" ? "Process" : "Процес"}</h2>
              <ol>
                {service!.process.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </section>
          </div>
          <section className={s.proof} data-testid="content-section">
            <h2>{currentLocale === "en" ? "Relevant proof" : "Релевантний доказ"}</h2>
            <p>{service!.proof}</p>
          </section>
          <section className={s.faq} data-testid="content-section">
            <h2>FAQ</h2>
            {service!.faq.map((item) => (
              <article key={item.question} data-testid="content-section">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </section>
          <section className={s.next} data-testid="content-section">
            <h2>{currentLocale === "en" ? "Start with one email" : "Почнемо з одного email"}</h2>
            <p>
              {currentLocale === "en"
                ? "Send your email and I will ask for the missing context instead of making you write a long brief."
                : "Залиши email, і я сам уточню потрібний контекст замість того, щоб змушувати тебе писати довгий brief."}
            </p>
            <Link href={contactHref}>{contactLabel}</Link>
          </section>
        </section>
      </main>
      <Footer data={footer_data} preset="main_page" />
    </div>
  );
}
