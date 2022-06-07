import React, { Children, Fragment, useMemo } from "react";
import { CaretFilled } from "../Icon";
import useSlider from "./Slider.hooks";
import { SliderProps } from "./Slider.types";
import SliderThumbnail from "./SliderThumbnail";

const Slider: React.FC<SliderProps> = ({
  children,
  sliderWidth,
  sliderHeight,
  unit = "rem",
  autoPlay = false,
  autoPlayInterval = 3000,
  showPageIndex = false,
  showPageIndicator = true,
  showPrevNextButton = false,
  showThumbnails = false,
  thumbnailWidth = 2,
  thumbnailGap = 1,
  showThumbnailCaret = true,
}) => {
  const childrenArray = useMemo(() => {
    return Children.toArray(children);
  }, [children]);
  const numberOfSlides = childrenArray.length;
  const additionalHeightForPageIndicator = showPageIndicator ? 2 : 0;

  const {
    prev,
    next,
    moveToSelectedIndex,
    currentIndex,
    translateList,
    opacityList,
    thumbnailElement,
    sliderContainer,
  } = useSlider({
    numberOfSlides,
    autoPlay,
    sliderWidth,
    autoPlayInterval,
    unit,
  });

  return (
    <div className="flex relative">
      {!autoPlay && showThumbnails && (
        <SliderThumbnail
          autoPlay={autoPlay}
          showThumbnails={showThumbnails}
          thumbnailWidth={thumbnailWidth}
          unit={unit}
          thumbnailElement={thumbnailElement}
          thumbnailGap={thumbnailGap}
          childrenArray={childrenArray}
          sliderHeight={sliderHeight}
          moveToSelectedIndex={moveToSelectedIndex}
          currentIndex={currentIndex}
          showPageIndicator={showPageIndicator}
          showThumbnailCaret={showThumbnailCaret}
        />
      )}

      <div
        ref={sliderContainer}
        className="overflow-hidden relative"
        style={{
          width: `${sliderWidth}${unit}`,
          height: `${sliderHeight + additionalHeightForPageIndicator}${unit}`,
        }}
      >
        <ul
          id="carousel"
          className="animate"
          style={{ width: `${numberOfSlides * sliderWidth}${unit}` }}
        >
          {autoPlay && (
            <li
              className=" relative float-left transition-transform duration-500"
              style={{
                transform: "translateX(" + translateList[0] + `${unit})`,
                opacity: opacityList[0],
                width: `${sliderWidth}${unit}`,
                height: `${sliderHeight}${unit}`,
              }}
            >
              {childrenArray[numberOfSlides - 1]}
            </li>
          )}

          {childrenArray.map((eachComponent, index) => {
            if (autoPlay && index === numberOfSlides - 1) {
              return <Fragment key={index}></Fragment>;
            } else {
              const translateIndex = autoPlay ? index + 1 : index;

              return (
                <li
                  key={index}
                  className="relative float-left transition-transform duration-500"
                  style={{
                    transform:
                      "translateX(" +
                      translateList[translateIndex] +
                      `${unit})`,
                    opacity: opacityList[translateIndex],
                    width: `${sliderWidth}${unit}`,
                    height: `${sliderHeight}${unit}`,
                  }}
                >
                  {eachComponent}
                </li>
              );
            }
          })}
        </ul>

        {showPageIndex && (
          <div
            className="absolute right-3 z-10 flex rounded-full px-3 bg-opacity-50 bg-gray-4 text-white text-lg"
            style={{
              bottom: `${0.5 + additionalHeightForPageIndicator}${unit}`,
            }}
          >
            <span>
              {currentIndex + 1} / {numberOfSlides}
            </span>
          </div>
        )}

        {showPageIndicator && (
          <ul className=" absolute bottom-0 right-0 left-0 z-10 flex justify-center  list-none mt-[10px] gap-[1.5rem]">
            {childrenArray.map((_, index) => (
              <li key={index} className={`transition-all duration-500 `}>
                <span
                  className={`h-[0.8rem] w-[0.8rem] block  rounded-full  transition-all duration-500 text-[0px] ${
                    currentIndex === index
                      ? "bg-black opacity-100"
                      : "bg-gray-3"
                  }`}
                >
                  {index}
                </span>
              </li>
            ))}
          </ul>
        )}

        {showPrevNextButton && (
          <>
            <button
              className={`w-[1.3rem] text-gray-5 absolute left-3 ${
                showPageIndicator ? "top-[41%]" : "top-[45%]"
              } ${!autoPlay && currentIndex === 0 && "hidden"}`}
              onClick={() => prev()}
            >
              <CaretFilled />
            </button>

            <button
              className={`rotate-180 w-[1.3rem] text-gray-5 absolute right-3 ${
                showPageIndicator ? "top-[41%]" : "top-[45%]"
              } ${!autoPlay &&
                currentIndex === numberOfSlides - 1 &&
                "hidden"}`}
              onClick={() => next()}
            >
              <CaretFilled />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Slider;
