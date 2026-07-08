import s from './style.module.scss'
import { useRef, useEffect } from 'react';
// import Splitting from "splitting";
// import dynamic from 'next/dynamic'
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Sparkles from "react-sparkle";

export const Paragraph = ({
  text,
  error,
  types,
}: {
  text: string;
  error: string;
  iterator: number;
  types: {
    desktop: string;
    mobile: string;
    tablet: string;
  };
}) => {
  // console.log("%c 🛐: preset ", "font-size:16px;background-color:#c9affa;color:white;", types)
  const ref = useRef(null);
  // const [lines, setLines] = useState([])

  useEffect(() => {
    async function work() {
      const Splitting = await import("splitting").then(
        (module) => module.default
      );
      Splitting({ target: ref.current });
    }
    if (types?.mobile === "freaky") work();
  }, [text, types?.mobile]);

  return (
    <div
      ref={ref}
      className={`${s.paragraph} ${s[types?.mobile]}`}
      data-testid="content-paragraph"
    >
      <p data-splitting>
        {text}
      </p>
      {types?.mobile === "freaky" && (
        <Sparkles
          minSize={5}
          maxSize={18}
          count={50}
          color="purple"
          overflowPx={30}
        />
      )}
    </div>
  );
};
