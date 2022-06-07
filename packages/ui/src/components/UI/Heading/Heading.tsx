// Generated with util/create-component.js
import React from "react";
import Text from "../Text";
import { HeadingProps } from "./Heading.types";

const Heading: React.FC<HeadingProps> = ({
  as,
  level,
  children,
  className,
  suffix,
  description,
}) => {
  const headingMap: { [key: number]: string } = {
    1: "text-heading-1 font-extrabold",
    2: "text-heading-2 font-extrabold",
    3: "text-heading-3 font-extrabold",
    4: "text-heading-4 font-extrabold",
    5: "text-heading-5 font-bold",
    6: "text-heading-6 font-bold",
  };
  const elementMap: { [key: number]: string } = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  };

  const element = as || elementMap[level];
  const headingElement = React.createElement(
    element,
    { className: `${headingMap[level] || headingMap[3]} ${className}` },
    children
  );

  if (!suffix && !description) return headingElement;

  return (
    <div className="flex justify-center items-center">
      <div className="flex-1 flex flex-col">
        {headingElement}
        {description && <Text type="B10">{description}</Text>}
      </div>
      {suffix}
    </div>
  );
};

export default Heading;
