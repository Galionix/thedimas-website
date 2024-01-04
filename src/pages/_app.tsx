// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import "/src/styles/globals.scss";

import type { AppProps } from "next/app";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useRef } from "react";
import { SiteIcon } from '../SiteIcon';
import { Tthemes, useStore } from '../../utils/state';
import { useScrolled } from '../../utils/hooks/useScrolled';

function MyApp({ Component, pageProps }: AppProps) {
  const containerRef = useRef(null);
  const { theme, skip_intro, doSkipIntro, setScrollDirection } = useStore();
  const scrollDirection = useScrolled();
  console.log("scrollDirection: ", scrollDirection);

  useEffect(() => {
    setScrollDirection(scrollDirection);
  }, [setScrollDirection, scrollDirection]);

  const applyTheme = (theme: Tthemes) => {
    if (theme === "Light") {
      document.documentElement.style.setProperty(
        "--main-color",
        "rgba(255, 255, 255, 0.7)"
      );
      document.documentElement.style.setProperty(
        "--main-bg-color",
        "rgba(0, 0, 0, 0.7)"
      );
    } else {
      document.documentElement.style.setProperty(
        "--main-color",
        "rgba(0, 0, 0, 0.7)"
      );
      document.documentElement.style.setProperty(
        "--main-bg-color",
        "rgba(255, 255, 255, 0.7)"
      );
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // useEffect(() => {
  //   applyTheme(theme)
  // }, [])

  return (
    <>
      <SiteIcon />
      <Head>
        <meta
          name="google-site-verification"
          content="V_sK8FtJjolZFTd5IDXRzdz-fW7bbjp8zGBlPfsj-3A"
        />
        <meta charSet="UTF-8" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
