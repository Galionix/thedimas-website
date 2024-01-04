import {
    GetStaticProps,
    InferGetServerSidePropsType,
} from 'next'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import s from '/src/styles/pages/BlogIndex.module.scss'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { useEffect, useRef, useState } from 'react'
import { useIntersection } from 'react-use';
import { get_endpoint_data } from '../../../utils/content_fetching'
import { Projects } from '../../../ts/responses'
import { Header } from '../../Header/Header'
import { ProduceBlocks } from '../../../utils/blocks'
import { Footer } from '../../Footer/Footer'



export const getStaticProps: GetStaticProps = async ({ locales }) => {
  const newLocales = locales || ["ua"];

  const header_data = await get_endpoint_data({
    endpoint: "header",
    // locales: newLocales,
  });

  const footer_data = await get_endpoint_data({
    endpoint: "footer",
    // locales: newLocales,
  });
  const posts = await get_endpoint_data({
    endpoint: "posts",
    // locales: newLocales,
  });
  const page_content = await get_endpoint_data({
    endpoint: "blog",
    // locales: newLocales,
  });

  return {
    props: {
      footer_data,
      header_data,
      posts,
      page_content,
    },
    revalidate: 10, // In seconds
  };
};

const ProjectCard = ({
  project_name,
  description,
  intro,
  image,
  updated_at,
  locale,
}: {
  locale: string;
  project_name: string;
  description: string;
  intro: string;
  image: Projects.Image2;
  updated_at: string;
}) => {
  TimeAgo.addLocale(ru);
  TimeAgo.addLocale(en);

  const timeAgo = new TimeAgo(locale);

  return (
    // <div
    //     className={` ${s.post} `}
    // >
    <Link legacyBehavior href={`/blog/${project_name}`}>
      <a className={s.post}>
        <h2 className={` ${s.title} `}>{description}</h2>
        <p className={` ${s.date} `}>{timeAgo.format(new Date(updated_at))}</p>
        <div className={` ${s.image} `}>
          <Image
            blurDataURL={image.formats.thumbnail.url}
            layout="intrinsic"
            draggable={false}
            placeholder="blur"
            width={image.width}
            height={image.height}
            src={image.url}
            loading="lazy"
            alt={image.alternativeText}
          />
        </div>
        <p className={` ${s.post_intro} `}>{intro}</p>
      </a>
    </Link>
    // </div>
  );
};
export default function Blog({
  footer_data,
  header_data,
  posts,
  page_content,
}: {
  footer_data: any;
  header_data: any;
  posts: any;
  page_content: any;
}) {
  const { locale } = useRouter();
  const content = page_content[locale || "ua"];
  const intros = posts[locale || "ua"].map(
    ({ intro, updated_at }: { intro: Projects.Intro; updated_at: string }) => ({
      ...intro,
      updated_at,
    })
  );
  const [limit, setLimit] = useState(2);

  const limitRef = useRef(null);
  const intersection = useIntersection(limitRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  useEffect(() => {
    if (intersection && intersection.intersectionRatio > 0.3)
      setLimit((prevLimit) => prevLimit + 2);
  }, [intersection?.intersectionRatio]);
  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
      </Head>
      <Header header_data={header_data} />
      <section className={` ${s.intro} `}>
        <h1>
          {content.intro.project_name
            .split("")
            .map((char: string, key: number) => (
              <span key={key}>{char}</span>
            ))}
        </h1>
        <h1>
          {content.intro.project_name
            .split("")
            .map((char: string, key: number) => (
              <span key={key}>{char}</span>
            ))}
        </h1>
        <h3>
          {content.intro.description
            .split("")
            .map((char: string, key: number) => (
              <span key={key}>{char}</span>
            ))}
        </h3>
        <h2>{content.intro.intro}</h2>
        <Image
          blurDataURL={content.intro.image.formats.thumbnail.url}
          placeholder="blur"
          width={content.intro.image.width}
          height={600}
          src={content.intro.image.url}
          loading="lazy"
          objectFit="cover"
          objectPosition="center"
          alt={content.intro.image.alternativeText}
        />
      </section>
      <ProduceBlocks page_data={content.comps} wrapperClass={s.blocks} />
      <section className={` ${s.posts} `}>
        {intros
          .splice(0)
          .reverse()
          .map((intro: any, i: number) => {
            if (i < limit)
              return (
                <ProjectCard
                  key={intro.id}
                  {...intro}
                  locale={locale || "ua"}
                />
              );
            else return null;
          })}
      </section>
      <hr ref={limitRef} />
      <Footer data={footer_data} />
    </>
  );
}