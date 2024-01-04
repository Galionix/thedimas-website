import s from './style.module.scss'
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useIntersection } from 'react-use';
// import Splitting from "splitting";
// import dynamic from 'next/dynamic'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

export const Paragraph = ({ text, error, iterator, types }:
	{
		text: string,
		error: string,
		iterator: number,
		types: {
			desktop: string,
			mobile: string,
			tablet: string
		}
	}) => {
    // console.log("%c 🛐: preset ", "font-size:16px;background-color:#c9affa;color:white;", types)
    const ref = useRef(null);
    const intersection = useIntersection(ref, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });
    // const [lines, setLines] = useState([])

    const show_style = iterator % 3 === 0 ? "from_bottom" : "from_side";

    useEffect(() => {
      async function work() {
        const Splitting = await import("splitting").then(
          (module) => module.default
        );
        Splitting({ target: ref.current });
      }
      if (show_style === "from_bottom" || types?.mobile === "freaky") work();
    }, [intersection?.intersectionRatio]);

    return (
      <div ref={ref} className={`${s.paragraph} ${s[types?.mobile]}`}>
        {/** @ts-ignore */}
        <motion.p
          data-splitting
          className={`${
            intersection &&
            intersection.intersectionRatio > 0.2 &&
            show_style === "from_bottom"
              ? s.showLines
              : ""
          } `}
          initial={
            show_style === "from_side"
              ? {
                  opacity: 0,
                  x: iterator % 2 !== 0 ? "-200px" : "200px",
                }
              : {}
          }
          animate={
            intersection &&
            intersection.intersectionRatio > 0.2 &&
            show_style === "from_side"
              ? {
                  transition: {
                    duration: 0.6,
                    ease: [0.6, 0, 0, 1],
                    staggerChildren: 0.5,
                  },
                  x: "0px",
                  opacity: 1,
                }
              : {}
          }
        >
          {text}
        </motion.p>
      </div>
    );
  }
