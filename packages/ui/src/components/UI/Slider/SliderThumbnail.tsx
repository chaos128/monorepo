import React, { memo, UIEvent, useEffect, useState } from "react";
import { Caret } from "../Icon";
import { updateClassInReactElement } from "./Slider.utils";

interface SliderThumbnailProps {
  autoPlay: boolean;
  showThumbnails: boolean;
  thumbnailWidth: number;
  unit: "rem" | "px";
  thumbnailElement: React.MutableRefObject<null>;
  thumbnailGap: number;
  childrenArray: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
  sliderHeight: number;
  moveToSelectedIndex: (index: number) => void;
  currentIndex: number;
  showPageIndicator: boolean;
  showThumbnailCaret: boolean;
}

const SliderThumbnail: React.FC<SliderThumbnailProps> = ({
  thumbnailWidth,
  unit,
  thumbnailElement,
  thumbnailGap,
  childrenArray,
  sliderHeight,
  moveToSelectedIndex,
  currentIndex,
  showPageIndicator,
  showThumbnailCaret,
}) => {
  const SCROLL_BUMPER_WIDTH_PX = 20;
  const [showThumbnailUpCaret, setShowThumbnailUpCaret] = useState<boolean>(
    false
  );
  const [showThumbnailDownCaret, setShowThumbnailDownCaret] = useState<boolean>(
    false
  );

  useEffect(() => {
    if (showThumbnailCaret && thumbnailElement.current) {
      const currentThumbnailElement = thumbnailElement.current as HTMLElement;

      setShowThumbnailDownCaret(
        currentThumbnailElement.offsetHeight <
          currentThumbnailElement.scrollHeight
      );
    }
  }, [showThumbnailCaret, thumbnailElement]);

  const handleScroll = (caretType: "up" | "down", show: boolean) => {
    if (showThumbnailCaret) {
      if (caretType === "up") {
        setShowThumbnailUpCaret(show);
      } else {
        setShowThumbnailDownCaret(show);
      }
    }
  };

  let thumbnailDivHeight = sliderHeight;
  if (showThumbnailUpCaret) {
    thumbnailDivHeight -= 2;
  }
  if (showThumbnailDownCaret) {
    thumbnailDivHeight -= 2;
  }

  return (
    <>
      {showThumbnailUpCaret && (
        <div
          className="flex justify-center absolute z-10"
          style={{
            width: `${thumbnailWidth}${unit}`,
          }}
        >
          <span className="-rotate-90">
            <Caret size="1.5rem" />
          </span>
        </div>
      )}

      {showThumbnailDownCaret && (
        <div
          className={`flex justify-center absolute z-10  ${
            showPageIndicator ? "bottom-[2rem]" : "bottom-0"
          }`}
          style={{
            width: `${thumbnailWidth}${unit}`,
          }}
        >
          <span className="rotate-90">
            <Caret size="1.5rem" />
          </span>
        </div>
      )}

      <div
        ref={thumbnailElement}
        className={`overflow-y-scroll scrollbar-hide transition-all duration-100 ${
          showThumbnailUpCaret ? "mt-[2.0rem]" : "mt-0"
        }`}
        style={{
          height: `${thumbnailDivHeight}${unit}`,
        }}
        onScroll={(event: UIEvent<HTMLElement>) => {
          const thumbnailDivElement = event.target as HTMLElement;
          const scrollTop = thumbnailDivElement.scrollTop;
          const scrollHeight = thumbnailDivElement.scrollHeight;
          const offsetHeight = thumbnailDivElement.offsetHeight;

          handleScroll("up", scrollTop > SCROLL_BUMPER_WIDTH_PX);
          handleScroll(
            "down",
            scrollTop + offsetHeight < scrollHeight - SCROLL_BUMPER_WIDTH_PX
          );
        }}
      >
        <div
          className="flex flex-col"
          style={{
            gap: `${thumbnailGap}${unit}`,
            marginRight: `${thumbnailGap}${unit}`,
          }}
        >
          {childrenArray.map((child, index) => {
            const clonedChild = updateClassInReactElement({
              child,
              removalClassList: ["w-", "h-"],
              additionalClass: "w-full h-full rounded",
            });

            return (
              <div
                key={index}
                onClick={() => moveToSelectedIndex(index)}
                className={`border border-solid rounded cursor-pointer  ${
                  currentIndex === index ? " border-black" : "border-gray-3"
                }`}
                style={{
                  width: `${thumbnailWidth}${unit}`,
                  height: `${thumbnailWidth}${unit}`,
                }}
              >
                {clonedChild}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default memo(SliderThumbnail);
