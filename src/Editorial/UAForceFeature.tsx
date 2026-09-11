import Image from 'next/image';
import Link from 'next/link';
import type { ContentLocale } from '../i18n';
import s from './Editorial.module.scss';

export function UAForceFeature({ locale }: { locale: ContentLocale }) {
  const en = locale === 'en';
  return <section className={s.feature} aria-labelledby="uaforce-feature-title">
    <Image src="/portfolio/uaforce/gameplay.png" width={720} height={540} sizes="(max-width: 700px) 90vw, 320px" alt={en ? 'Lightning ability in UA Force' : 'Здібність із блискавкою в UA Force'} />
    <div>
      <p>{en ? 'New project · September 2026' : 'Новий проєкт · Вересень 2026'}</p>
      <h2 id="uaforce-feature-title">UA Force</h2>
      <p>{en ? 'From a team idea to a playable TypeScript browser game. Two-player co-op, destructible worlds and lessons from shipping with AI tools.' : 'Від командної ідеї до браузерної гри на TypeScript. Кооператив на двох, руйнування світу та досвід розробки з AI-інструментами.'}</p>
      <div className={s.actions}>
        <Link href="/projects/ua-force">{en ? 'Explore the case study →' : 'Переглянути кейс →'}</Link>
        <Link href="/blog/ua-force-development">{en ? 'Read the development story →' : 'Прочитати історію розробки →'}</Link>
      </div>
    </div>
  </section>;
}
