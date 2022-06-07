import { motion } from "framer-motion";
import React from "react";
import Text from "../Text";
const Tab = (props: {
  children?: React.ReactNode;
  onClick?: () => void;
  onTabClick?: () => void;
  selected?: boolean;
  parentKey?: string;
  tabWidth?: string;
}) => {
  const {
    selected,
    onClick,
    onTabClick,
    children,
    parentKey,
    tabWidth,
  } = props;
  return (
    <li
      className={`inline-block min-w-[5.1rem] ml-[2rem] ${tabWidth}`}
      onClick={(e) => {
        onClick && onClick();
        onTabClick && onTabClick();
      }}
    >
      <div className="flex justify-center items-center h-[4.5rem] cursor-pointer select-none">
        <Text
          type={selected ? "B2" : "B6"}
          className={`${selected ? "text-primary" : ""}`}
        >
          {children}
        </Text>
      </div>
      {selected && (
        <motion.div
          layoutId={`${parentKey}-tab-border`}
          className="bg-primary h-[0.2rem]"
        ></motion.div>
      )}
    </li>
  );
};
Tab.defaultProps = {
  __TYPE: "Tab",
};

export default Tab;
