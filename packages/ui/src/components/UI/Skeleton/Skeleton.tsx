import React, { useEffect, useRef, useState } from "react";
import { SkeletonProps } from "./Skeleton.types";

const Skeleton: React.FC<SkeletonProps> = ({
  hasImage = true,
  hasText = true,
}) => {
  const defaultRow = 5;
  const lineHeight = 2;
  const skeletonImageDiv = useRef<HTMLDivElement>(null);
  const skeletonTextDiv = useRef<HTMLDivElement>(null);
  const [numberOfTextLine, setNumberOfTextLine] = useState<number>(defaultRow);
  const [numberOfImageTextLine, setNumberOfImageTextLine] = useState<number>(
    defaultRow
  );

  const getNumberOfLine = (element: HTMLDivElement) => {
    return Math.ceil(element.offsetHeight / (lineHeight + 1) / 10);
  };

  useEffect(() => {
    if (skeletonTextDiv.current) {
      setNumberOfTextLine(getNumberOfLine(skeletonTextDiv.current));
    }

    if (skeletonImageDiv.current) {
      setNumberOfImageTextLine(getNumberOfLine(skeletonImageDiv.current));
    }
  }, []);

  return (
    <div className="mx-auto h-full w-full  p-4 ">
      {hasImage && (
        <div
          ref={skeletonImageDiv}
          className={`overflow-hidden flex animate-pulse space-x-4 ${
            hasText ? "h-[40%]" : "h-full"
          }`}
        >
          <div className=" h-full aspect-square rounded-full bg-gray-3"></div>

          <div className="flex-1 mb-[1rem] ">
            {Array(numberOfImageTextLine)
              .fill(null)
              .map((_, index) => {
                return (
                  <div
                    key={`skeleton-row-${index}`}
                    className="h-5 rounded bg-gray-3 mb-[1rem]"
                    style={{ height: `${lineHeight}rem` }}
                  ></div>
                );
              })}
          </div>
        </div>
      )}
      {hasText && (
        <div
          ref={skeletonTextDiv}
          className={`overflow-hidden  flex-1 flex-col  ${
            hasImage ? "h-[60%] mt-3" : "h-full"
          } w-full`}
        >
          {Array(numberOfTextLine)
            .fill(null)
            .map((_, index) => {
              return (
                <div
                  key={`skeleton-row-${index}`}
                  className="h-5 rounded bg-gray-3 mb-[1rem]"
                  style={{ height: `${lineHeight}rem` }}
                ></div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Skeleton;
