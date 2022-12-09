import React from "react";

import { useInView } from "react-intersection-observer";

const LazyLoadPicture = React.memo(
  (props: {
    imageMobile?: string;
    imageLarge?: string;
    image: string;
    width: number;
    height: number;
    alt: string;
  }) => {
    const { ref, inView, entry } = useInView({
      threshold: 0.001,
    });

    return (
      <picture
        ref={ref}
        style={{
          width: props.width + "px",
          height: props.height + "px",
        }}
      >
        {inView && (
          <>
            {props.imageLarge && (
              <source srcSet={props.image} media="(min-width: 1440px)" />
            )}
            {props.imageMobile && (
              <source srcSet={props.image} media="(max-width: 768px)" />
            )}
            <source srcSet={props.image} />
            <img
              srcSet={props.image}
              width={props.width}
              height={props.height}
              alt={props.alt}
            />
          </>
        )}
      </picture>
    );
  }
);

export default LazyLoadPicture;
