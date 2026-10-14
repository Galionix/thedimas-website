
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import s from "/src/styles/pages/ProjectsIndex.module.scss";
import { motion } from "framer-motion";
import { useIntersection } from "react-use";
import { useRef } from "react";
import { get_endpoint_data } from '../../../utils/content_fetching';
import { Projects } from '../../../ts/responses';
import { Header } from '../../Header/Header';
import { ProduceBlocks } from '../../../utils/blocks';
import { Footer } from '../../Footer/Footer';
import { getContentLocale } from '../../i18n';

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
  const projects = await get_endpoint_data({
    endpoint: "projects",
    // locales: newLocales,
  });
  const page_content = await get_endpoint_data({
    endpoint: "projects_page",
    // locales: newLocales,
  });
  return {
    props: {
      footer_data,
      header_data,
      projects,
      page_content,
    },
    revalidate: 10, // In seconds
  };
};

const ProjectCard = ({
  project_name,
  slug,
  description,
  intro,
  image,
  iterator,
}: {
  project_name: string;
  slug?: string;
  description: string;
  intro: string;
  iterator: number;
  image: Projects.Image2;
}) => {
  const ref = useRef(null);
  const isPortfolioScreenshot = image.url.startsWith("/portfolio/");
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        ease: [0.6, 0, 0, 1],
        staggerChildren: 0.031,
      },
    },
  };
  const listItem = {
    hidden: { opacity: 0, y: 0, scale: 0 },
    show: {
      transition: {
        duration: 0.3,
      },
      opacity: 1,
      scale: 1,
      y: ["100px", "0px"],
    },
  };
  return (
    <li
      ref={ref}
      className={` ${s.card} ${isPortfolioScreenshot ? s.caseStudyCard : ""} `}
    >
      <Link legacyBehavior href={`/projects/${slug || project_name}`}>
        <a className={s.cardLink} aria-label={`${project_name}: ${description}`}>
          <motion.div className={` ${s.hider} `}>
            <motion.p
              initial={{
                opacity: 0,
                scale: 3,
                x: iterator % 2 !== 0 ? "-1500px" : "1500px",
              }}
              animate={
                intersection && intersection.intersectionRatio > 0.3
                  ? {
                      transition: {
                        duration: 0.6,
                        ease: [0.6, 0, 0, 1],
                      },
                      x: "0px",
                      opacity: 1,
                      scale: 1,
                    }
                  : {}
              }
              className={` ${s.description} `}
            >
              {description}
            </motion.p>
          </motion.div>
          <p className={` ${s.intro} `}>{intro}</p>
          <div className={s.visual}>
            <div className={` ${s.image} `}>
              <motion.div
                initial={{
                  scale: 1.1,
                  opacity: 0.5,
                }}
                animate={
                  intersection && intersection.intersectionRatio > 0.3
                    ? {
                        scale: isPortfolioScreenshot ? 1.02 : 1.5,
                        opacity: 1,
                        transition: {
                          duration: 1,
                          ease: [0.6, 0, 0, 1],
                        },
                      }
                    : {}
                }
                whileHover={{ scale: 1 }}
                transition={{
                  ease: [0.6, 0, 0, 1],
                }}
              >
                <Image
                  blurDataURL={image.formats?.thumbnail?.url || image.url}
                  placeholder="blur"
                  width={image.width}
                  objectFit="contain"
                  objectPosition="center"
                  height={500}
                  src={image.url}
                  loading="lazy"
                  alt={image.alternativeText || project_name}
                />
              </motion.div>
            </div>
            <motion.h2
              variants={container}
              initial="hidden"
              animate={
                intersection && intersection.intersectionRatio > 0.3
                  ? "show"
                  : ""
              }
            >
              {project_name.split("").map((letter, key) => (
                <motion.span key={letter + "_" + key} variants={listItem}>
                  {letter}
                </motion.span>
              ))}
            </motion.h2>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default function ProjectsPage({
  header_data,
  projects,
  page_content,
  footer_data,
}: {
  footer_data: any;
  header_data: any;
  projects: any;
  page_content: any;
}) {
  const { locale } = useRouter();
  const currentLocale = getContentLocale(locale);
  const intros = projects[currentLocale].map(
    (project: Projects.RootObject) => project.intro
  );
  const content = page_content[currentLocale];
  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:url" content={`https://thedimas.com/${currentLocale}/projects`} />
        <meta property="og:image" content="https://thedimas.com/portfolio/og-cover.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Dmitry Galaktionov | Commercial Projects & Engineering Cases" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={content.seo.title} />
        <meta name="twitter:description" content={content.seo.description} />
        <meta name="twitter:image" content="https://thedimas.com/portfolio/og-cover.png" />
      </Head>
      <Header header_data={header_data} />
      <ul className={` ${s.cards} `}>
        {intros.map((intro: Projects.Intro, iterator: number) => (
          <ProjectCard key={intro.id} iterator={iterator} {...intro} />
        ))}
      </ul>
      <ProduceBlocks wrapperClass={s.blocksWrapper} page_data={content.comps} />
      <Footer data={footer_data} />
    </>
  );
}
