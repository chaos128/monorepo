import { motion } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";
import { SlideWrapperProps } from "./SlideWrapper.types";
import SlideWrapperButton from "./SlideWrapperButton";

const SlideWrapper: React.FC<SlideWrapperProps> = ({
  children,
  size,
  buttonStyle,
  floatButton = true,
}: SlideWrapperProps) => {
  const [prevSlideCount, setPrevSlideCount] = useState<number>(0);

  const slideRef = useRef<HTMLDivElement>(null);
  const childrenCount = children ? children.length : 0;

  const slideRight = useCallback(() => {
    setPrevSlideCount(prevSlideCount + size);
  }, [prevSlideCount]);

  const slideLeft = useCallback(() => {
    if (prevSlideCount >= size) {
      setPrevSlideCount(prevSlideCount - size);
    } else {
      setPrevSlideCount(0);
    }
  }, [prevSlideCount]);

  return (
    <div
      data-testid="SlideWrapper"
      className="relative flex items-center w-full h-full overflow-hidden nrc--SlideWrapper"
    >
      <SlideWrapperButton
        type="LEFT"
        hideButton={prevSlideCount === 0}
        floatButton={floatButton}
        customButtonStyle={buttonStyle}
        onClickButton={slideLeft}
      />

      <div className="w-full overflow-hidden">
        <motion.div
          ref={slideRef}
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${childrenCount}, calc(100% /${size}))`,
          }}
          transition={{
            type: "ease",
          }}
          animate={{ x: `${(-1 * prevSlideCount * 100) / size}%` }}
        >
          {children}
        </motion.div>
      </div>

      <SlideWrapperButton
        type="RIGHT"
        hideButton={childrenCount - prevSlideCount - size <= 0}
        floatButton={floatButton}
        customButtonStyle={buttonStyle}
        onClickButton={slideRight}
      />
    </div>
  );
};

export default SlideWrapper;
