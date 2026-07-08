import Head from 'next/head'
import Image from 'next/image'
import { track } from "@vercel/analytics";
import s from '/src/styles/pages/Home.module.scss'

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'

// import { ImTelegram } from "react-icons/im";
import { RiWhatsappFill, RiTelegramFill, RiMailSendFill } from "react-icons/ri";
import { FormEvent, useEffect, useState } from 'react'
import { get_endpoint_data } from '../../utils/content_fetching'
import { useStore } from '../../utils/state'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { ProduceBlocks } from '../../utils/blocks'
import { gaEvent } from '../../utils/google_analytics'

const contactCopy = {
  en: {
    action: "Discuss a project",
    hint: "or email galionix2@gmail.com",
    emailLabel: "Your email",
    emailPlaceholder: "Email",
    formTitle: "Quick contact",
    formHint: "Leave your email. I will reply and ask for the missing context.",
    socialLabel: "Direct contacts",
    submit: "Contact me",
    sending: "Sending...",
    sent: "Sent. I will reply by email.",
    fallbackError: "Could not send the message. Please email me directly.",
    mailSubject: "Project discussion",
    mailBody:
      "Hi Dimas,\n\nI want to discuss a web or backend project.\n\nBest way to reach me:",
  },
  ua: {
    action: "Зв'язатися",
    hint: "або напиши на galionix2@gmail.com",
    emailLabel: "Твій email",
    emailPlaceholder: "Email",
    formTitle: "Швидкий контакт",
    formHint: "Залиши email. Я відповім і сам уточню потрібний контекст.",
    socialLabel: "Прямі контакти",
    submit: "Зв'язатися",
    sending: "Відправляю...",
    sent: "Готово. Я відповім на email.",
    fallbackError: "Не вдалося відправити повідомлення. Напиши мені напряму.",
    mailSubject: "Обговорення проекту",
    mailBody:
      "Привіт, Dimas,\n\nХочу обговорити web або backend проект.\n\nЯк краще зі мною зв'язатися:",
  },
};

const buildLeadSource = ({
  cta,
  locale,
}: {
  cta: string;
  locale: string;
}) => {
  if (typeof window === "undefined") {
    return {
      cta,
      locale,
    };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    cta,
    locale,
    page: window.location.href,
    referrer: document.referrer,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
  };
};


export const getStaticProps: GetStaticProps = async ({ locales }) => {
  // const newLocales = locales || ['ua']

  const header_data = await get_endpoint_data({
    endpoint: "header",
    // locales: newLocales,
  });

  const footer_data = await get_endpoint_data({
    endpoint: "footer",
    // locales: newLocales,
  });
  const page_content = await get_endpoint_data({
    endpoint: "main_page",
    // locales: newLocales,
  });
  return {
    props: {
      header_data,
      footer_data,
      page_content,
    },
    revalidate: 10, // In seconds
  };
};

export default function Home({
  page_content,
  header_data,
  footer_data,
}: {
  page_content: any;
  header_data: any;
  footer_data: any;
}) {
  // const currentHeader = header_data[]

  const { locale } = useRouter();
  const currentLocale = locale === "en" ? "en" : "ua";
  const copy = contactCopy[currentLocale];
  const content = page_content[currentLocale];
  const canonicalUrl =
    locale === "en" ? "https://thedimas.com/en" : "https://thedimas.com/ua";
  const alternateUrl =
    locale === "en" ? "https://thedimas.com/ua" : "https://thedimas.com/en";
  const contactHref = `mailto:galionix2@gmail.com?subject=${encodeURIComponent(
    copy.mailSubject
  )}&body=${encodeURIComponent(copy.mailBody)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://thedimas.com/#person",
        name: "Dmitry Galaktionov",
        alternateName: "Dimas",
        url: "https://thedimas.com",
        jobTitle: "Full-stack, Backend and Infrastructure Developer",
        email: "mailto:galionix2@gmail.com",
        sameAs: ["https://github.com/Galionix", "https://t.me/galionix"],
        knowsAbout: [
          "Full-stack development",
          "Backend development",
          "Web infrastructure",
          "Automation",
          "API integrations",
          "React",
          "Next.js",
          "Node.js",
          "Docker",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://thedimas.com/#service",
        name: "Dimas Galaktionov Web, Backend and Infrastructure Development",
        url: "https://thedimas.com",
        provider: {
          "@id": "https://thedimas.com/#person",
        },
        areaServed: "Worldwide",
        serviceType: [
          "MVP development",
          "Backend development",
          "Internal tools and admin panels",
          "API integrations",
          "Automation",
          "Infrastructure cleanup",
        ],
      },
    ],
  };

  const { theme, skip_intro, doSkipIntro } = useStore();
  const [contactForm, setContactForm] = useState({
    email: "",
    company: "",
  });
  const [contactStatus, setContactStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [contactError, setContactError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      // console.log("doSkipIntro")
      doSkipIntro();
    }, 5000);
  }, [doSkipIntro]);

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("sending");
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          source: buildLeadSource({
            cta: "quick_contact_form",
            locale: currentLocale,
          }),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Could not send the message.");
      }

      setContactStatus("sent");
      track("contact_email_submit", {
        locale: currentLocale,
        page: typeof window === "undefined" ? "" : window.location.pathname,
      });
      gaEvent("generate_lead", {
        currency: "USD",
        lead_source: "quick_contact_form",
        locale: currentLocale,
      });
      setContactForm({ email: "", company: "" });
    } catch (error) {
      setContactStatus("error");
      setContactError(
        error instanceof Error
          ? error.message
          : copy.fallbackError
      );
    }
  };

  return (
    <div className={s.container}>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang={locale === "en" ? "uk" : "en"} href={alternateUrl} />
        <link rel="alternate" hrefLang="x-default" href="https://thedimas.com/en" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Dimas Galaktionov" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <Header header_data={header_data} preset="main_page" />
      <div
        className={`${s.wrapper_wrapper} ${skip_intro ? s.skip_intro : ""}`}
        data-testid="home-hero"
      >
        <div className={s.wrapper} data-testid="home-hero-media">
          <h1>{content.intro.project_name}</h1>
          <h2 data-text={content.intro.project_name} />
        </div>
        <div className={s.heroPanel} data-testid="home-hero-panel">
          <div className={s.heroCopy}>
            <p>{content.intro.description}</p>
            <p>{content.intro.intro}</p>
            <div className={s.heroActions}>
              <a
                href={contactHref}
                onClick={() => {
                  track("contact_mailto_click", { locale: currentLocale });
                  gaEvent("contact_click", {
                    contact_method: "email",
                    placement: "hero",
                    locale: currentLocale,
                  });
                }}
              >
                {copy.action}
              </a>
              <span className={s.contactHint}>{copy.hint}</span>
            </div>
            <section className={s.socialLinks} aria-label={copy.socialLabel}>
              <a
                href="whatsapp://send?phone=380637637726"
                aria-label="WhatsApp"
                onClick={() => {
                  track("social_contact_click", { channel: "whatsapp", locale: currentLocale });
                  gaEvent("contact_click", {
                    contact_method: "whatsapp",
                    placement: "hero_social",
                    locale: currentLocale,
                  });
                }}
              >
                <RiWhatsappFill />
              </a>
              <a
                href="tg://resolve?domain=galionix"
                aria-label="Telegram"
                onClick={() => {
                  track("social_contact_click", { channel: "telegram", locale: currentLocale });
                  gaEvent("contact_click", {
                    contact_method: "telegram",
                    placement: "hero_social",
                    locale: currentLocale,
                  });
                }}
              >
                <RiTelegramFill />
              </a>
              <a
                href={contactHref}
                aria-label="Email Dimas"
                onClick={() => {
                  track("social_contact_click", { channel: "email", locale: currentLocale });
                  gaEvent("contact_click", {
                    contact_method: "email",
                    placement: "hero_social",
                    locale: currentLocale,
                  });
                }}
              >
                <RiMailSendFill />
              </a>
            </section>
          </div>
          <form id="contact" className={s.contactForm} onSubmit={submitContactForm}>
            <div className={s.contactLead}>
              <strong>{copy.formTitle}</strong>
              <span>{copy.formHint}</span>
            </div>
            <input
              aria-label={copy.emailLabel}
              autoComplete="email"
              name="email"
              onChange={(event) =>
                setContactForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder={copy.emailPlaceholder}
              required
              type="email"
              value={contactForm.email}
            />
            <input
              aria-hidden="true"
              className={s.companyField}
              name="company"
              onChange={(event) =>
                setContactForm((current) => ({
                  ...current,
                  company: event.target.value,
                }))
              }
              tabIndex={-1}
              value={contactForm.company}
            />
            <button disabled={contactStatus === "sending"} type="submit">
              {contactStatus === "sending" ? copy.sending : copy.submit}
            </button>
            {contactStatus === "sent" ? (
              <span className={s.formMessage}>{copy.sent}</span>
            ) : null}
            {contactStatus === "error" ? (
              <span className={s.formError}>{contactError}</span>
            ) : null}
          </form>
        </div>
      </div>
      <ProduceBlocks
        preset="main_page"
        page_data={content.comps}
        wrapperClass={s.blocks}
      />

      {/* <pre>{
        JSON.stringify(
          footer_data,
          null,
          2)
      }</pre> */}
      <Footer data={footer_data} preset="main_page" />
    </div>
  );
}
