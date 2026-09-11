import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { ContentLocale } from '../i18n';
import s from './Editorial.module.scss';

type EditorialRecord = {
  created_at: string;
  updated_at: string;
  seo: { title: string; description: string };
  intro: { image: { url: string; width: number; height: number; alternativeText: string } };
  editorial: { eyebrow: string; title: string; lead: string; sections: { title: string; paragraphs: string[] }[] };
};

export function Editorial({ record, locale, kind }: {
  record: EditorialRecord; locale: ContentLocale; kind: 'project' | 'post';
}) {
  const en = locale === 'en';
  const isProject = kind === 'project';
  const path = isProject ? '/projects/ua-force' : '/blog/ua-force-development';
  const url = `https://thedimas.com/${locale}${path}`;
  const otherPath = isProject ? '/blog/ua-force-development' : '/projects/ua-force';
  const image = record.intro.image;
  const content = record.editorial;
  const author = { '@type': 'Person', '@id': 'https://thedimas.com/#dmytro', name: 'Dmytro Halaktionov', url: 'https://thedimas.com/en' };
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': isProject ? 'CreativeWork' : 'BlogPosting', '@id': `${url}#content`,
        name: content.title, headline: content.title, description: record.seo.description,
        url, mainEntityOfPage: url, inLanguage: en ? 'en' : 'uk', author,
        image: `https://thedimas.com${image.url}`, datePublished: record.created_at,
        dateModified: record.updated_at,
        about: { '@type': 'VideoGame', name: 'UA Force', url: 'https://uaforce.thedimas.com' },
      },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'TheDimas', item: `https://thedimas.com/${locale}` },
        { '@type': 'ListItem', position: 2, name: isProject ? (en ? 'Projects' : 'Проєкти') : (en ? 'Blog' : 'Блог'), item: `https://thedimas.com/${locale}/${isProject ? 'projects' : 'blog'}` },
        { '@type': 'ListItem', position: 3, name: content.title, item: url },
      ] },
    ],
  };
  return <>
    <Head>
      <title>{record.seo.title}</title>
      <meta name="description" content={record.seo.description} />
      <meta name="author" content="Dmytro Halaktionov" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={`https://thedimas.com/en${path}`} />
      <link rel="alternate" hrefLang="uk" href={`https://thedimas.com/ua${path}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://thedimas.com/en${path}`} />
      <meta property="og:type" content={isProject ? 'website' : 'article'} />
      <meta property="og:title" content={record.seo.title} />
      <meta property="og:description" content={record.seo.description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="TheDimas · Dmytro Halaktionov" />
      <meta property="og:locale" content={en ? 'en_US' : 'uk_UA'} />
      <meta property="og:locale:alternate" content={en ? 'uk_UA' : 'en_US'} />
      <meta property="og:image" content={`https://thedimas.com${image.url}`} />
      <meta property="og:image:width" content={String(image.width)} />
      <meta property="og:image:height" content={String(image.height)} />
      <meta property="og:image:alt" content={image.alternativeText} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={record.seo.title} />
      <meta name="twitter:description" content={record.seo.description} />
      <meta name="twitter:image" content={`https://thedimas.com${image.url}`} />
      <meta name="twitter:image:alt" content={image.alternativeText} />
      {!isProject && <meta property="article:published_time" content={record.created_at} />}
      {!isProject && <meta property="article:modified_time" content={record.updated_at} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    </Head>
    <main className={s.editorial}>
      <article>
        <header className={s.hero}>
          <div>
            <p className={s.eyebrow}>{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p className={s.lead}>{content.lead}</p>
            <p className={s.byline}>Dmytro Halaktionov · <time dateTime={record.created_at}>{en ? '11 September 2026' : '11 вересня 2026'}</time></p>
            <div className={s.actions}>
              <a className={s.primary} href="https://uaforce.thedimas.com">{en ? 'Play the free prototype ↗' : 'Грати безкоштовно ↗'}</a>
              <Link href={otherPath}>{isProject ? (en ? 'Read the development story' : 'Історія розробки') : (en ? 'Explore the technical case' : 'Технічний кейс')}</Link>
            </div>
            <p className={s.note}>{en ? 'Ukrainian-language game · Cartoon combat and mature humour' : 'Гра українською · Мультяшні бої та дорослий гумор'}</p>
          </div>
          <figure>
            <Image priority src={image.url} width={image.width} height={image.height} sizes="(max-width: 900px) 100vw, 45vw" alt={image.alternativeText} />
            <figcaption>{en ? 'An actual gameplay frame: a lightning ability in action.' : 'Кадр із гри: здібність із блискавкою в дії.'}</figcaption>
          </figure>
        </header>
        <div className={s.reading}>
          <nav className={s.contents} aria-label={en ? 'On this page' : 'На цій сторінці'}>
            <p>{en ? 'On this page' : 'На цій сторінці'}</p>
            <ol>{content.sections.map((section, i) => <li key={section.title}><a href={`#section-${i + 1}`}>{section.title}</a></li>)}</ol>
          </nav>
          <div className={s.body}>
            {content.sections.map((section, i) => <section id={`section-${i + 1}`} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </section>)}
            <section className={s.clip}>
              <div>
                <h2>{en ? 'A few seconds of co-op' : 'Кілька секунд кооперативу'}</h2>
                <p>{en ? 'Two players, one battlefield. This short clip was captured from the current browser prototype using two connected clients on a Mac. It is gameplay footage, not a concept animation.' : 'Двоє гравців, одне поле бою. Короткий ролик записано з поточного браузерного прототипу з двома з’єднаними клієнтами на Mac. Це геймплей, а не концептуальна анімація.'}</p>
                <p className={s.note}>{en ? '7 seconds · Muted by default; sound is optional.' : '7 секунд · Звук вимкнено за замовчуванням.'}</p>
              </div>
              <video controls muted playsInline preload="none" poster="/portfolio/uaforce/coop-cover.jpg" aria-label={en ? 'UA Force two-player co-op gameplay' : 'Геймплей UA Force у кооперативі на двох'}>
                <source src="/portfolio/uaforce/coop.mp4" type="video/mp4" />
                <a href="/portfolio/uaforce/coop.mp4">{en ? 'Download the gameplay clip' : 'Завантажити ролик'}</a>
              </video>
            </section>
            <aside className={s.contact}>
              <p className={s.eyebrow}>{en ? 'Work with me' : 'Співпраця'}</p>
              <h2>{en ? 'Looking for someone to help ship your next web product?' : 'Шукаєте розробника для наступного вебпродукту?'}</h2>
              <p>{en ? 'I’m open to Senior Frontend and frontend-focused Full-stack TypeScript roles, as well as contract work. My commercial work includes React, Next.js and API integrations; UA Force shows how I approach product decisions and iteration.' : 'Розглядаю позиції Senior Frontend та Full-stack TypeScript із фокусом на фронтенді, а також контрактну співпрацю. Мій комерційний досвід охоплює React, Next.js та API-інтеграції; UA Force показує підхід до продуктових рішень та ітерацій.'}</p>
              <div className={s.actions}>
                <a className={s.primary} href="mailto:galionix2@gmail.com?subject=UA%20Force%20%E2%80%94%20work%20opportunity">{en ? 'Email Dmytro' : 'Написати Дмитру'}</a>
                <a href="https://www.linkedin.com/in/galionix/">LinkedIn ↗</a>
                <Link href="/projects/Bella%20AI">{en ? 'Commercial project: Bella AI' : 'Комерційний проєкт: Bella AI'}</Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
      <nav className={s.actions} aria-label={en ? 'More from TheDimas' : 'Більше на TheDimas'}>
        <Link href={isProject ? '/projects' : '/blog'}>{isProject ? (en ? '← All projects' : '← Усі проєкти') : (en ? '← All articles' : '← Усі статті')}</Link>
        <Link href={otherPath}>{isProject ? (en ? 'Development story →' : 'Історія розробки →') : (en ? 'Technical case →' : 'Технічний кейс →')}</Link>
      </nav>
    </main>
  </>;
}
