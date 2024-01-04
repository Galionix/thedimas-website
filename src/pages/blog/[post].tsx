import { GetStaticProps, InferGetServerSidePropsType } from "next";
// import s from 'styles/pages/Project.module.scss'
import { GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import s from "/src/styles/pages/BlogPost.module.scss";
import { Projects } from '../../../ts/responses';
import { Header } from '../../Header/Header';
import { ProduceBlocks } from '../../../utils/blocks';
import { Footer } from '../../Footer/Footer';
import { get_endpoint_data } from '../../../utils/content_fetching';

type GetServerSideProps = {
  myprop: string;
  say: string;
  projects: any;
};

const Pagination = ({ intros, current }: { intros: any; current: string }) => {
  const currentIndex = intros.findIndex(
    (item: any) => item.project_name === current
  );

  return (
    <section className={` ${s.pagination} `}>
      {currentIndex === 0 ? (
        <Link legacyBehavior href={"/blog"}>
          <a>Back to blog index</a>
        </Link>
      ) : (
        <Link legacyBehavior href={`/blog/${intros[currentIndex - 1].project_name}`}>
          <a>{intros[currentIndex - 1].description}</a>
        </Link>
      )}

      {currentIndex === intros.length - 1 ? (
        <Link legacyBehavior href={"/blog"}>
          <a>Back to blog index!</a>
        </Link>
      ) : (
        <Link legacyBehavior href={`/blog/${intros[currentIndex + 1].project_name}`}>
          <a>{intros[currentIndex + 1].description}</a>
        </Link>
      )}
    </section>
  );
};

export default function Post({
  header_data,
  footer_data,
  posts,
}: {
  header_data: any;
  footer_data: any;
  posts: any;
}) {
  // const { scrollY } = useViewportScroll();
  // const y1 = useTransform(scrollY, [0, -200], [0, 200]);

  const { locale, query, asPath, ...rest } = useRouter();
  const newLocale = locale || "ua";
  const disqusShortname = "dimascf";
  const disqusConfig = {
    title: `${query.project} comments`,
    language: locale,
  };
  const intros = posts[locale || "ua"].map(
    (post: Projects.RootObject) => post.intro
  );
  const post = posts[newLocale].filter(
    (post: any) => post.intro.project_name === query.post
  )[0];
  return (
    <>
      <Head>
        <title>{post?.seo?.title || post.intro.description}</title>
        <meta
          name="description"
          content={post?.seo?.description || post.intro.description}
        />
        <meta
          name="keywords"
          content={post?.seo?.keywords || post.intro.description}
        />
      </Head>
      <Header header_data={header_data} />
      <section className={` ${s.intro} `}>
        <h1>
          <span className={s.gray}>&#706;</span>
          div
          <span className={s.gray}>&#707;</span>
          <span>
            `$<span className={s.yellow}>&#123;</span>
          </span>
          <span className={s.header_inside}>{post.intro.project_name}</span>
          <span>
            <span className={s.yellow}>&#125;</span>`
          </span>
          <span className={s.gray}>&#706;/ </span>
          div
          <span className={s.gray}>&#707;</span>
        </h1>
        <h3>{post.intro.description}</h3>
        <h2>{post.intro.intro}</h2>
        <Image
          blurDataURL={post.intro.image.formats.thumbnail.url}
          placeholder="blur"
          width={post.intro.image.width}
          height={200}
          src={post.intro.image.url}
          loading="lazy"
          objectFit="cover"
          objectPosition="center"
          alt={post.intro.image.alternativeText}
        />
      </section>

      <ProduceBlocks
        page_data={post.comps}
        preset={"post-page"}
        wrapperClass={s.blocks}
      />
      <Pagination current={post.intro.project_name} intros={intros} />
      {/* <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
        /> */}
      <Footer data={footer_data} />
    </>
  );
}

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
  return {
    props: {
      header_data,
      footer_data,
      posts,
    },
    revalidate: 10, // In seconds
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const newLocales = locales || ["ua"];

  const posts:any = await get_endpoint_data({
    endpoint: "posts",
    // locales: newLocales,
  });
  const paths = newLocales.flatMap((loc) =>
    posts[loc].map((post: Projects.RootObject) => ({
      params: {
        post: post.intro.project_name,
      },
      locale: loc,
    }))
  );

  console.log(
    "%c 🇩🇰: paths ",
    "font-size:16px;background-color:#f6d4ab;color:black;",
    paths
  );

  return {
    paths,
    fallback: false,
  };
};
