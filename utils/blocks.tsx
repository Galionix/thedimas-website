// import Blocks from '../src/Blocks'

// @index('../src/Blocks/**/*.tsx', f => `import {${f.name} } from '${f.path}'`)
import { Error } from "../src/Blocks/Error/Error";
import { Link } from "../src/Blocks/Link/Link";
import { Paragraph } from "../src/Blocks/Paragraph/Paragraph";
import { Textgallery } from "../src/Blocks/Textgallery/Textgallery";
//@endindex

const trimCapitalize = (s: string) => {
  const trimmed = s
    .replace("molecules.", "")
    .replace("atoms.", "")
    .replace("-", "");
  if (typeof trimmed !== "string") return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

export const ProduceBlocks = ({
  page_data,
  preset,
  wrapperClass,
}: {
  page_data: any;
  preset?: string;
  wrapperClass?: string;
}) => {
  return (
    <section className={` ${wrapperClass || ""} `}>
      {page_data.map((comp: any, i: number) => {
        const compName = trimCapitalize(comp.__component || comp.__typename);
        // if (compName === 'Paragraph') return <Paragraph {...comp} />
        // @index('../src/Blocks/**/*.tsx', f => `if (compName === '${f.name}') return <${f.name}  {...comp}  key={i} preset={preset}  iterator={i}/>`)
        if (compName === "Error")
          return <Error {...comp} key={i} preset={preset} iterator={i} />;
        if (compName === "Link")
          return (
            <Link
              {...comp}
              legacyBehavior
              key={i}
              preset={preset}
              iterator={i}
            />
          );
        if (compName === "Paragraph")
          return (
            <Paragraph
              {...comp}
              key={i}
              preset={preset}
              iterator={i}
              // types={[types.mobile, types.tablet, types.desktop]}
            />
          );
        if (compName === "Textgallery")
          return <Textgallery {...comp} key={i} preset={preset} iterator={i} />;
        //@endindex
        return <Error {...comp} key={i} parsedName={compName} />;
      })}
    </section>
  );
};
