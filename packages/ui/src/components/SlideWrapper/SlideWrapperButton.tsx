import { motion } from "framer-motion";
import React from "react";
import { Caret } from "../UI/Icon";

const SlideWrapperButton = ({
  type,
  hideButton,
  floatButton,
  customButtonStyle,
  onClickButton,
}: {
  type: "LEFT" | "RIGHT";
  hideButton: boolean;
  floatButton: boolean;
  customButtonStyle?: React.CSSProperties;
  onClickButton: () => void;
}) => {
  const buttonStyle =
    "w-[5rem] h-[5rem] flex items-center justify-center z-[2] cursor-pointer";
  const floatButtonStyle =
    "bg-white absolute bottom-1/2 translate-y-1/2 rounded-full drop-shadow-md border-[1px] border-gray-2";

  const leftFloatButtonStyle = floatButtonStyle + " left-[-2rem]";
  const rightFloatButtonStyle = floatButtonStyle + " right-[1rem]";

  return (
    <motion.div
      transition={{
        type: "ease",
      }}
      animate={{
        opacity: hideButton ? 0 : 1,
      }}
      whileTap={{ backgroundColor: floatButton ? "#F9F9F9" : "transparent" }}
      className={`${hideButton && "hidden"} ${buttonStyle} ${floatButton &&
        (type === "LEFT" ? leftFloatButtonStyle : rightFloatButtonStyle)}`}
      style={customButtonStyle}
      onClick={onClickButton}
    >
      <div className={`${type === "LEFT" && "rotate-180"}`}>
        <Caret size={30} />
      </div>
    </motion.div>
  );
};
export default SlideWrapperButton;
