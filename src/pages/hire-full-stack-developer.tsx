import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { get_endpoint_data } from "../../utils/content_fetching";
import { getService } from "../data/services";
import s from "../styles/pages/Service.module.scss";

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

export default function HireFullStackDeveloper({
  header_data,
  footer_data,
}: {
  header_data: any;
  footer_data: any;
}) {
  const { locale } = useRouter();
  const currentLocale = locale === "en" ? "en" : "ua";
  const service = getService(currentLocale, "contract-full-stack-developer")!;
  const canonicalUrl = `https://thedimas.com/${currentLocale}/hire-full-stack-developer`;
  const alternateLocale = currentLocale === "en" ? "ua" : "en";
  const contactLabel = currentLocale === "en" ? "Contact me" : "Зв'язатися";
  const servicesLabel =
    currentLocale === "en" ? "See all services" : "Всі послуги";
  const availabilityNote =
    currentLocale === "en"
      ? "Available for one 15-20h/week remote contract. Paid production audits start at $750."
      : "Доступний для одного remote contract на 15-20 год/тиждень. Paid production audit — від $750.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://thedimas.com/#person",
    name: "Dmitry Galaktionov",
    alternateName: ["Galionix", "Dimas Galaktionov", "Dmytro Galaktionov"],
    jobTitle: "Full-stack, Backend and Infrastructure Developer",
    url: canonicalUrl,
    sameAs: [
      "https://github.com/Galionix",
      "https://www.linkedin.com/in/galionix",
      "https://t.me/galionix",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Supabase",
      "PostgreSQL",
      "Admin panels",
      "API integrations",
    ],
  };

  return (
    <div className={s.container}>
      <Head>
        <title>{service.seo.title}</title>
        <meta name="description" content={service.seo.description} />
        <meta name="keywords" content={service.seo.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="alternate"
          hrefLang={currentLocale === "en" ? "uk" : "en"}
          href={`https://thedimas.com/${alternateLocale}/hire-full-stack-developer`}
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://thedimas.com/en/hire-full-stack-developer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header header_data={header_data} preset="main_page" />
      <main className={s.main}>
        <section className={s.hero} data-testid="content-section">
          <p className={s.eyebrow}>{service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
          <strong className={s.availability}>{availabilityNote}</strong>
          <div className={s.actions}>
            <Link href={`/${currentLocale}#contact`}>{contactLabel}</Link>
            <Link href={`/${currentLocale}/services`}>{servicesLabel}</Link>
          </div>
        </section>
        <section className={s.contentBand}>
          <section className={s.signals} data-testid="content-section">
            <h2>
              {currentLocale === "en"
                ? "Fast recruiter signal"
                : "Швидкий сигнал для recruiter"}
            </h2>
            <div>
              {service.signals?.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>
          <div className={s.grid}>
            <section data-testid="content-section">
              <h2>{currentLocale === "en" ? "Best-fit roles" : "Найкращі ролі"}</h2>
              <ul>
                {service.audience?.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section data-testid="content-section">
              <h2>{currentLocale === "en" ? "Stack and work" : "Stack та робота"}</h2>
              <ul>
                {service.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <section className={s.proof} data-testid="content-section">
            <h2>{currentLocale === "en" ? "Commercial proof" : "Комерційний доказ"}</h2>
            <p>{service.proof}</p>
          </section>
          <section className={s.next} data-testid="content-section">
            <h2>{currentLocale === "en" ? "Send the role context" : "Надішліть контекст ролі"}</h2>
            <strong>{availabilityNote}</strong>
            <p>
              {currentLocale === "en"
                ? "Stack, contract length, timezone expectations and the first problem to solve are enough for a useful first conversation. I can start with a paid audit, a 20-hour pilot or a scoped contract."
                : "Stack, contract length, timezone expectations і перша problem to solve — достатньо для корисної першої розмови. Можу почати з paid audit, 20-hour pilot або scoped contract."}
            </p>
            <Link href={`/${currentLocale}#contact`}>{contactLabel}</Link>
          </section>
        </section>
      </main>
      <Footer data={footer_data} preset="main_page" />
    </div>
  );
}
