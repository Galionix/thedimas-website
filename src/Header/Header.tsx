import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import s from "./header.module.scss";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { scrollDirections, useScrolled } from "../../utils/hooks/useScrolled";
import { useStore } from '../../utils/state';
import { getContentLocale } from "../i18n";

interface headerLink {
  __component: string;
  id: number;
  href: string;
  label: string;
  target?: any;
}

export const Header = ({
  header_data,
  preset,
}: {
  header_data: any;
  preset?: string;
}) => {
  const { theme, switchTheme, skip_intro, scrollDirection } = useStore();
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();
  const currentLocale = getContentLocale(router.locale);
  const alternateLocale = currentLocale === "en" ? "ua" : "en";
  const localizedHeader = header_data[currentLocale];

  const controls = useAnimation();
  // console.log("scrollDirection: ", scrollDirection);

  const changeTheme = (e: any) => {
    console.log(theme === "Light" ? "Dark" : "Light");

    switchTheme(theme === "Light" ? "Dark" : "Light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const routeRoot =
    router.pathname === "/hire-full-stack-developer"
      ? "/services"
      : `/${router.pathname.split("/")[1] || ""}`;
  const selected = localizedHeader.items.findIndex(
    (item: headerLink) => item.href === routeRoot
  );
  const lightLabel = currentLocale === "en" ? "Light" : "Світла";
  const darkLabel = currentLocale === "en" ? "Dark" : "Темна";

  return (
    <motion.div
      className={`${s.headerWrapper} ${s[preset ? `${preset}Wrapper` : ""]}`}
      initial={{
        y: "0px",
        // opacity: 0,
        // scale: 3,
        // x: iterator % 2 !== 0 ? "-1500px" : "1500px",
      }}
      animate={{
        y: scrollDirection === scrollDirections.DOWN ? "-100px" : "0px",
        transition: {
          duration: 0.6,
          ease: [0.6, 0, 0, 1],
        },
      }}
    >
      <header
        className={` ${s.header} ${s[preset || ""]} ${
          skip_intro ? s.skip_intro : ""
        }`}

        // animate={controls}
      >
        <ul>
          {localizedHeader.items.map(
            (item: headerLink, i: number) => (
              <li
                key={item.id}
                className={` ${selected === i ? s.selected : ""} `}
              >
                <Link legacyBehavior href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </li>
            )
          )}
          <li>
            <button
              onClick={() => {
                router.replace(router.asPath, undefined, {
                  locale: alternateLocale,
                  shallow: true,
                });
              }}
            >
              {alternateLocale}
            </button>
          </li>
          <li>
            <button onClick={changeTheme} suppressHydrationWarning>
              {isMounted ? (theme !== "Light" ? darkLabel : lightLabel) : lightLabel}
            </button>
          </li>
        </ul>
        {/* <pre>{JSON.stringify(selected, null, 2)}</pre>
            <pre>{JSON.stringify(router.pathname.split('/')[1], null, 2)}</pre>
            <pre>{JSON.stringify(header_data, null, 2)}</pre> */}
      </header>
    </motion.div>
  );
};
