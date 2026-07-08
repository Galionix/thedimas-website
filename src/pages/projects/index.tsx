
import { GetStaticProps } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import s from "/src/styles/pages/ProjectsIndex.module.scss";
import { get_endpoint_data } from '../../../utils/content_fetching';
import { Projects } from '../../../ts/responses';
import { Header } from '../../Header/Header';
import { ProduceBlocks } from '../../../utils/blocks';
import { Footer } from '../../Footer/Footer';

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
  description,
  intro,
  image,
  iterator,
}: {
  project_name: string;
  description: string;
  intro: string;
  iterator: number;
  image: Projects.Image2;
}) => {
  const isPortfolioScreenshot = image.url.startsWith("/portfolio/");
  const isSvg = image.url.endsWith(".svg");
  const thumbnail = isSvg ? undefined : image.formats?.thumbnail?.url;

  return (
    <li
      className={`${s.card} ${iterator % 2 !== 0 ? s.reversed : ""} ${
        isPortfolioScreenshot ? s.screenshotCard : s.iconCard
      }`}
      data-testid="project-card"
    >
      <Link legacyBehavior href={`/projects/${project_name}`}>
        <a className={s.cardLink}>
          <div className={s.copy}>
            <p className={s.label}>{isPortfolioScreenshot ? "Case study" : "Project"}</p>
            <h2>{project_name}</h2>
            <p className={s.description}>{description}</p>
            {intro ? <p className={s.intro}>{intro}</p> : null}
          </div>
          <div className={s.media} data-testid="project-card-media">
            {isSvg ? (
              <img
                width={image.width}
                height={image.height}
                src={image.url}
                loading="lazy"
                alt={image.alternativeText || `${project_name} preview`}
                className={s.image}
              />
            ) : (
              <Image
                blurDataURL={thumbnail}
                placeholder={thumbnail ? "blur" : "empty"}
                width={image.width}
                height={image.height}
                src={image.url}
                loading="lazy"
                alt={image.alternativeText || `${project_name} preview`}
                sizes="(max-width: 767px) 100vw, 45vw"
                className={s.image}
              />
            )}
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
  const intros = projects[locale || "ua"].map(
    (project: Projects.RootObject) => project.intro
  );
  const content = page_content[locale || "ua"];
  return (
    <>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
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
