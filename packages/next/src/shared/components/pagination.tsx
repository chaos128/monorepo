import { Caret } from "@nosearch/ui";
import { CSSProperties, useMemo } from "react";

interface IPaginationIndicatorProps {
  start: number;
  end: number;
  current: number;
  isPrevPart?: boolean;
  isNextPart?: boolean;
  onClick?: (value?: any) => void;
  onClickPrev?: (value?: any) => void;
  onClickNext?: (value?: any) => void;
  style?: CSSProperties;
}

const PaginationIndicator = (props: IPaginationIndicatorProps) => {
  const {
    start,
    end,
    current,
    isPrevPart = false,
    isNextPart = false,
    onClick,
    onClickNext,
    onClickPrev,
    style,
  } = props;

  const indicatorArray = useMemo(() => {
    const tempArray: number[] = [];
    for (let i = start; i <= end; i++) {
      tempArray.push(i);
    }

    return tempArray;
  }, [start, end]);

  return (
    <div className="flex justify-center space-x-3">
      {isPrevPart && (
        <button
          type="button"
          onClick={() => {
            if (onClickPrev) onClickPrev();
          }}
        >
          <div className="rotate-180">
            <Caret size="2.4rem" />
          </div>
        </button>
      )}
      <div className="flex items-center space-x-2">
        {indicatorArray.map((value, index) => {
          return (
            <div
              key={`indicator${index}`}
              onClick={() => {
                if (onClick) onClick(value);
              }}
              className={`flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center text-heading-5 font-extrabold  ${
                current === value ? "bg-gray-10 text-white" : "text-gray-10"
              }`}
            >
              {value}
            </div>
          );
        })}
      </div>
      {isNextPart && (
        <button
          type="button"
          onClick={() => {
            if (onClickNext) onClickNext();
          }}
        >
          <Caret size="2.4rem" />
        </button>
      )}
    </div>
  );
};

export default PaginationIndicator;
