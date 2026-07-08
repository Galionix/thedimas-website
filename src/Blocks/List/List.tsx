import s from "./List.module.scss";
import { getIcon } from "./getIcon";
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
    <li key={id} data-testid="content-list-item">
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
    </li>
  );
};
