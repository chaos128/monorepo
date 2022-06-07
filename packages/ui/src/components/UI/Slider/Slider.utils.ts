import {
  cloneElement,
  HTMLAttributes,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

export const updateClassInReactElement = ({
  child,
  removalClassList,
  additionalClass,
}: {
  child: ReactChild | ReactFragment | ReactPortal;
  removalClassList?: Array<string>;
  additionalClass?: string;
}) => {
  const classNameList = (child as ReactElement<
    HTMLAttributes<HTMLDivElement>
  >).props.className
    ?.split(" ")
    .filter((eachClass) => {
      return removalClassList?.every(
        (removalClass) => eachClass.indexOf(removalClass) < 0
      );
    });

  const clonedChild = cloneElement(
    child as ReactElement<HTMLAttributes<HTMLDivElement>>,
    {
      className: classNameList?.join(" ") + ` ${additionalClass}`,
    }
  );

  return clonedChild;
};

export const moveElementScroll = (
  element: React.RefObject<HTMLElement>,
  top: number
) => {
  element?.current?.scroll({
    top,
    behavior: "smooth",
  });
};
