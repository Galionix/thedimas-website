import Head from 'next/head'
import Image from 'next/image'
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
import { useEffect } from 'react'
import { get_endpoint_data } from '../../utils/content_fetching'
import { useStore } from '../../utils/state'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { ProduceBlocks } from '../../utils/blocks'


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
  const content = page_content[locale || "ua"];

  const { theme, skip_intro, doSkipIntro } = useStore();
  useEffect(() => {
    setTimeout(() => {
      // console.log("doSkipIntro")
      doSkipIntro();
    }, 5000);
  }, [doSkipIntro]);

  return (
    <div className={s.container}>
      <Head>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
      </Head>
      <Header header_data={header_data} preset="main_page" />
      <div className={`${s.wrapper_wrapper} ${skip_intro ? s.skip_intro : ""}`}>
        <div className={s.wrapper}>
          <h1>{content.intro.project_name}</h1>
          <h2 data-text={content.intro.project_name} />
        </div>
        <section>
          <a href="whatsapp://send?phone=380637637726">
            <RiWhatsappFill />
          </a>
          <a href="tg://resolve?domain=galionix">
            <RiTelegramFill />
          </a>
          <a href="mailto:galionix2@gmail.com">
            <RiMailSendFill />
          </a>
        </section>
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
