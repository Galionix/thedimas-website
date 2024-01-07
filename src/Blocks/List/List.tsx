import { useEffect, useRef } from "react";
import s from "./List.module.scss";
import { getIcon } from "./getIcon";
import { useIntersection } from "react-use";
import { motion } from "framer-motion";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
export type List = {
  name: string;
  id: number;
  items: ListItem[];
};

export type ListItem = {
  name: string;
  id: number;
  icon: string;
  description: string;
};

export const List = ({ name, items }: List) => {
  return (
    <div className={s.list}>
      <h2>{name}</h2>
      <ul>
        {items.map((item, index) => {
          return <ListItem {...item} key={item.id} index={index} />;
        })}
      </ul>
    </div>
  );
};

const ListItem = ({
  id,
  name,
  icon,
  description,
  index,
}: ListItem & {
  index: number;
}) => {
  const ref = useRef(null);
  const splittingRef = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  return (
    <motion.li
      ref={ref}
      key={id}
      initial={{
        opacity: 0,
        x: index % 2 !== 0 ? "-200px" : "200px",
      }}
      animate={
        intersection && intersection.intersectionRatio > 0.2
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
      <div>
        {getIcon(icon as any, index)}

        <h3>{name}</h3>
      </div>
      <p ref={splittingRef}>{description}</p>
    </motion.li>
  );
};
