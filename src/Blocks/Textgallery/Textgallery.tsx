import Image from "next/image";
import s from "./style.module.scss";
import { wrap } from "popmotion";
import { useState, useEffect, useRef } from "react";
import {
  LayoutGroup,
  motion,
  AnimatePresence,
  MotionProps,
} from "framer-motion";
import Modal from "react-modal";
import { useIntersection } from "react-use";
// import { useInView } from "framer-motion";

const getAnimationConfig = (
  animate: MotionProps["animate"],
  intersecting: boolean
) => {
  if (!intersecting) return {};
  return animate;
};

const getfigcaptionAnimation = (
  type: string,
  intersecting: boolean
): {
  initial: MotionProps["initial"];
  animate: MotionProps["animate"];
} => {
  // type = "banner"

  switch (type) {
    case "banner":
      return {
        initial: {
          //   x: "100vw",
          skewX: "5deg",
          opacity: 0,
          scale: 3,
        },
        animate: getAnimationConfig(
          {
            transition: {
              //   delay: 0.2,
              duration: 3.6,
              ease: [0.57, 0.01, 0, 1.01],
            },
            // x: "0px",
            opacity: 1,
            scale: 1,
            skewX: "-10deg",
          },
          intersecting
        ),
      };
    default:
      return {
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.6, 0, 0, 1],
          },
        },
      };
  }
};
export const Textgallery = ({
  images,
  text,
  type,
}: {
  images: any;
  text: any;
  type: any;
}) => {
  //   console.log("type: ", type);
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  const isIntersecting = intersection?.intersectionRatio
    ? intersection?.intersectionRatio > 0.2
    : false;
  console.log("isIntersecting: ", isIntersecting);

  const figcaptionProps = getfigcaptionAnimation(type, isIntersecting);

  console.log("figcaptionProps: ", figcaptionProps);
  return (
    <LayoutGroup
      // AnimatePresence
      // exitBeforeEnter
      // type="crossfade"
    >
      {/* <Partics /> */}
      <Modal
        isOpen={modalOpen}
        className={s.modal}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={() => setActive((active) => active - 1)}>Prev</button>

        {images[wrap(0, images.length, active)]?.medium ? (
          <Image
            objectFit="cover"
            onClick={() => setModalOpen(false)}
            // className={` ${s.active}`}
            key={"modal"}
            src={images[wrap(0, images.length, active)].medium.url}
            width={images[wrap(0, images.length, active)].medium.width}
            height={images[wrap(0, images.length, active)].medium.height}
            alt={images[wrap(0, images.length, active)].alternativeText}
          />
        ) : (
          <Image
            onClick={() => setModalOpen(false)}
            alt={images[wrap(0, images.length, active)].alternativeText}
            objectFit="cover"
            // className={` ${s.active}`}
            key={"modal"}
            src={images[wrap(0, images.length, active)].url}
            width={images[wrap(0, images.length, active)].width}
            height={images[wrap(0, images.length, active)].height}
          />
        )}
        <button
          onClick={() => {
            console.log("setting " + (active + 1));
            console.log("wrap will be  " + wrap(0, images.length, active + 1));
            console.log("image  " + images[wrap(1, images.length, active)]);
            setActive((active) => active + 1);
          }}
        >
          Next
        </button>
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
				<button onClick={closeModal}>close</button>
				<div>I am a modal</div>
				<form>
					<input />
					<button>tab navigation</button>
					<button>stays</button>
					<button>inside</button>
					<button>the modal</button>
				</form> */}
      </Modal>
      <figure
        ref={ref}
        className={` ${s.textgallery} ${s[type]} cols ${
          text ? s.withText : ""
        } ${s[`images_${images.length}`] || ""} ${
          images.length > 3 ? s.slider : ""
        }`}
      >
        {images.length <= 3 ? (
          images.map((image: any, i: number) =>
            image.medium ? (
              <Image
                onClick={() => {
                  setActive(i);
                  setModalOpen(true);
                }}
                objectFit="cover"
                className={` ${s.image} ${images.length > 3 ? s.slide : ""}`}
                key={i}
                src={image.medium.url}
                width={image.medium.width}
                height={image.medium.height}
                alt={image.alternativeText}
              />
            ) : (
              <Image
                onClick={() => {
                  if (type === "banner") {
                    return;
                  }
                  setActive(i);
                  setModalOpen(true);
                }}
                alt={image.alternativeText}
                // layout="fill"
                /*
						              blurDataURL={image.formats.thumbnail.url}
            layout="intrinsic"
            draggable={false}
            placeholder="blur"
            width={image.width}
            height={image.height}
            src={image.url}
            loading="lazy"
            alt={image.alternativeText}
          />
						  */
                // layout="intrinsic"
                objectFit="cover"
                className={` ${s.image} ${s[type]}`}
                key={i}
                src={image.url}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            )
          )
        ) : (
          <>
            {/* <pre>{JSON.stringify(wrap(0, images.length, active), null, 2)}</pre> */}
            <motion.div className={` ${s.active} `} layout>
              {images[active].medium ? (
                <Image
                  objectFit="cover"
                  onClick={() => setModalOpen(true)}
                  // className={` ${s.active}`}
                  // key={wrap(0, images.length, active)}
                  src={images[active].medium.url}
                  width={images[active].medium.width}
                  height={images[active].medium.height}
                  alt={images[active].alternativeText}
                />
              ) : (
                <Image
                  onClick={() => setModalOpen(true)}
                  alt={images[active].alternativeText}
                  objectFit="cover"
                  // className={` ${s.active}`}
                  key={wrap(0, images.length, active) + "_active"}
                  src={images[active].url}
                  width={images[active].width}
                  height={images[active].height}
                />
              )}
            </motion.div>

            <motion.div layout className={` ${s.mins} `}>
              {images.map((image: any, i: number) =>
                image.medium && i !== wrap(0, images.length, active) ? (
                  <motion.div layout>
                    <Image
                      onClick={() => {
                        setActive(i);
                      }}
                      objectFit="contain"
                      className={` ${s.image} ${
                        images.length > 3 ? s.slide : ""
                      }`}
                      key={i + "_min"}
                      src={image.medium.url}
                      width={image.medium.width}
                      height={image.medium.height}
                      alt={image.alternativeText}
                    />
                  </motion.div>
                ) : (
                  <motion.div layout>
                    <Image
                      onClick={() => {
                        setActive(i);
                      }}
                      alt={image.alternativeText}
                      objectFit="contain"
                      className={` ${s.image} `}
                      key={i + "_min"}
                      src={image.url}
                      width={image.width}
                      height={image.height}
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          </>
        )}
        {text && (
          <motion.figcaption {...figcaptionProps}>{text}</motion.figcaption>
        )}
      </figure>
    </LayoutGroup>
  );
};
// <>
{
  /* <pre>{JSON.stringify(image.formats, null, 2)}</pre> */
}
