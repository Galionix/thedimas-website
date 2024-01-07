import { useRouter } from "next/dist/client/router";
import Link from "next/link";

import s from "./header.module.scss";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { scrollDirections, useScrolled } from "../../utils/hooks/useScrolled";
import { useStore } from '../../utils/state';

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

  const router = useRouter();

  const controls = useAnimation();
  // console.log("scrollDirection: ", scrollDirection);

  const changeTheme = (e: any) => {
    console.log(theme === "Light" ? "Dark" : "Light");

    switchTheme(theme === "Light" ? "Dark" : "Light");
  };

  const selected = header_data[router.locale || 0].items.findIndex(
    (item: headerLink) => item.href === `/${router.pathname.split("/")[1]}`
  );

  return (
    <motion.div
      className={s.headerWrapper}
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
          {header_data[router.locale || 0].items.map(
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
                  locale: router.locales!.find(
                    (item) => item !== router.locale
                  ),
                  shallow: true,
                });
              }}
            >
              {
                router
                  .locales!.find((item) => item !== router.locale)
                  ?.split("-")[0]
              }
            </button>
          </li>
          <li>
            <button onClick={changeTheme}>
              {theme !== "Light" ? "Dark" : "Light"}
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
