import s from "./List.module.scss";
import { getIcon } from "./getIcon";
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
  href?: string;
};

export const List = ({ name, items }: List) => {
  return (
    <div className={s.list} data-testid="content-list">
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
  href,
  index,
}: ListItem & {
  index: number;
}) => {
  return (
    <motion.li
      key={id}
      data-testid="content-list-item"
      initial={{ x: index % 2 !== 0 ? -28 : 28 }}
      whileInView={{ x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.6, 0, 0, 1] }}
    >
      <div>
        {getIcon(icon as any, index)}

        {href ? (
          <a href={href}>
            <h3>{name}</h3>
          </a>
        ) : (
          <h3>{name}</h3>
        )}
      </div>
      <p>{description}</p>
    </motion.li>
  );
};
