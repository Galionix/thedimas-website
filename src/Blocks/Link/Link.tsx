import NextLink from 'next/link';
import s from './Link.module.scss'
import { FaGithub } from "react-icons/fa";

export const Link = ({
  href,
  label,
  target,
  className,
  preset,
}: {
  href: string;
  label: string;
  target: string;
  className: string;
  preset: string;
}) => {
  return (
    <div
      className={` ${className || ""} ${
        preset === "project-page" ? s.projectPage : ""
      } ${s.general}`}
    >
      <span className={` ${s.line} `}>
        <hr />
      </span>
      <NextLink legacyBehavior href={href}>
        <a target={target}>{label}</a>
      </NextLink>
    </div>
  );
};


