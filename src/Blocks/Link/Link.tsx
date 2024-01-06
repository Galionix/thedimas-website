import NextLink from 'next/link';
import s from './Link.module.scss'

export const Link = ({ href, label, target, className, preset }: {
    href: string, label: string, target: string, className: string, preset: string
}) => {
    return (
      <div
        className={` ${className || ""} ${
          preset === "project-page" ? s.projectPage : ""
        } ${s.general}`}
      >
        <hr />
        <NextLink legacyBehavior href={href}>
          <a target={target}>{label}</a>
        </NextLink>
      </div>
    );
}


