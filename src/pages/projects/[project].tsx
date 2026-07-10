import { GetStaticProps, InferGetServerSidePropsType } from "next";
import s from "/src/styles/pages/Project.module.scss";
import { GetStaticPaths } from "next";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import { BiNews } from "react-icons/bi";
import {
  IoReturnUpBackOutline,
  IoReturnDownForwardOutline,
} from "react-icons/io5";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Head from "next/head";
import { FaGithub } from "react-icons/fa";

import Link from "next/link";
import { get_endpoint_data } from "../../../utils/content_fetching";
import { Projects } from "../../../ts/responses";
import { Header } from "../../Header/Header";
import { ProduceBlocks } from "../../../utils/blocks";
import { Footer } from "../../Footer/Footer";
import Sparkles from "react-sparkle";

type GetServerSideProps = {
  myprop: string;
  say: string;
  projects: any;
};
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const newLocales = locales || ["ua"];

  const projects: any = await get_endpoint_data({
    endpoint: "projects",
    // locales: newLocales,
  });
  const paths = newLocales.flatMap((loc) =>
    projects[loc].map((project: Projects.RootObject) => ({
      params: {
        project: project.intro.project_name,
      },
      locale: loc,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};
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
  return {
    props: {
      header_data,
      footer_data,
      projects,
    },
    revalidate: 10, // In seconds
  };
};

const Pagination = ({ intros, current }: { intros: any; current: string }) => {
  const currentIndex = intros.findIndex(
    (item: any) => item.project_name === current
  );

  return (
    <ul className={` ${s.pagination} `}>
      <li>
        {currentIndex === 0 ? (
          <Link legacyBehavior href={"/projects"}>
            <a>
              <IoReturnUpBackOutline />
              <span>Back to projects</span>
            </a>
          </Link>
        ) : (
          <Link
            legacyBehavior
            href={`/projects/${intros[currentIndex - 1].project_name}`}
          >
            <a>
              <IoReturnUpBackOutline />
              <span>{intros[currentIndex - 1].project_name}</span>
            </a>
          </Link>
        )}
      </li>
      <li>
        {currentIndex === intros.length - 1 ? (
          <>
            <Link legacyBehavior href={"/blog"}>
              <a>
                <span>Check out my blog!</span>
                <BiNews />
              </a>
            </Link>
          </>
        ) : (
          <>
            <Link
              legacyBehavior
              href={`/projects/${intros[currentIndex + 1].project_name}`}
            >
              <a>
                <span>{intros[currentIndex + 1].project_name}</span>
                <IoReturnDownForwardOutline />
              </a>
            </Link>
          </>
        )}
      </li>
    </ul>
  );
};

export default function Project({
  header_data,
  footer_data,
  projects,
}: {
  header_data: any;
  footer_data: any;
  projects: any;
}) {
  const { locale, query, asPath, ...rest } = useRouter();
  const newLocale = locale || "ua";
  const disqusShortname = "dimascf";
  const disqusConfig = {
    // url: `https://dimascf.disqus.com` + asPath,
    // url: `http://localhost:5000`,
    // identifier: asPath + ' ' + locale,
    title: `${query.project} comments`,
    language: locale,
    // categoryID: 'projects'
  };
  const intros = projects[locale || "ua"].map(
    (project: Projects.RootObject) => project.intro
  );
  const project = projects[newLocale].filter(
    (project: any) => project.intro.project_name === query.project
  )[0];
  const index = projects[newLocale].findIndex(
    (project: any) => project.intro.project_name === query.project
  );
  const isPortfolioScreenshot = project.intro.image.url.startsWith("/portfolio/");
  const isEnglish = newLocale === "en";
  const projectCta = {
    title: isEnglish
      ? "Need something in this direction?"
      : "Потрібно щось у цьому напрямку?",
    text: isEnglish
      ? "I can help with MVPs, backend/API work, admin panels, internal tools, integrations or technical rescue. The first step can be a paid production audit, a 20-hour pilot or a scoped implementation sprint."
      : "Я можу допомогти з MVP, backend/API, адмінками, internal tools, integrations або technical rescue. Першим кроком може бути paid production audit, 20-hour pilot або scoped implementation sprint.",
    availability: isEnglish
      ? "Available for one 15-20h/week remote contract. Paid audits start at $750."
      : "Доступний для одного remote contract на 15-20 год/тиждень. Paid audit — від $750.",
    contact: isEnglish ? "Contact me" : "Зв'язатися",
    services: isEnglish ? "See services" : "Подивитися послуги",
    caseService: isEnglish ? "Relevant service" : "Релевантна послуга",
  };
  const projectName = String(project.intro.project_name || "").toLowerCase();
  const relevantService = projectName.includes("bella")
    ? "admin-panels"
    : projectName.includes("usenotes")
      ? "internal-tools-automation"
      : projectName.includes("shop")
        ? "founder-mvp"
        : "technical-rescue";

  return (
    <div data-scroll-section>
      {" "}
      <Head>
        <title>{project.seo.title}</title>
        <meta name="description" content={project.seo.description} />
        <meta name="keywords" content={project.seo.keywords} />
      </Head>
      <Header header_data={header_data} />
      {/* <pre>{JSON.stringify(, null, 2)}</pre> */}
      <section className={` ${s.intro} ${index % 2 === 0 ? s.right : ""}`}>
        <h1>{project.intro.project_name}</h1>
        {/* <h3>{project.intro.description}</h3> */}
        {/* <div className={` ${s.image} `}> */}
        <Image
          className={isPortfolioScreenshot ? s.introScreenshot : ""}
          blurDataURL={project.intro.image.formats.thumbnail.url}
          placeholder="blur"
          width={project.intro.image.width}
          height={500}
          src={project.intro.image.url}
          loading="lazy"
          objectFit={isPortfolioScreenshot ? "contain" : "cover"}
          objectPosition="center"
          alt={project.intro.image.alternativeText}
        />
        {/* </div> */}
        <h3>{project.intro.intro}</h3>
      </section>
      <ProduceBlocks
        page_data={project.comps}
        preset={"project-page"}
        wrapperClass={s.blocks}
      />
      <section className={s.projectCta} data-testid="content-section">
        <h2>{projectCta.title}</h2>
        <strong>{projectCta.availability}</strong>
        <p>{projectCta.text}</p>
        <div>
          <Link href={`/${newLocale}#contact`}>{projectCta.contact}</Link>
          <Link href={`/${newLocale}/services`}>{projectCta.services}</Link>
          <Link href={`/${newLocale}/services/${relevantService}`}>
            {projectCta.caseService}
          </Link>
        </div>
      </section>
      {project.github ? (
        <Link target="_blank" href={project.github}>
          <div className={` ${s.github} `}>
            <div>
              <FaGithub />

              <Sparkles
                minSize={2}
                maxSize={10}
                count={50}
                color="yellow"
                overflowPx={30}
              />
            </div>
            <h3>View on github</h3>
          </div>
        </Link>
      ) : null}
      <Pagination current={project.intro.project_name} intros={intros} />
      <div className={s.comments}>
        {/* <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
                /> */}
      </div>
      <Footer data={footer_data} />
    </div>
  );
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
