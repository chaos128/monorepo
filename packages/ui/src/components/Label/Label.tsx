// Generated with util/create-component.js
import React, { useMemo } from "react";

import { LabelProps } from "./Label.types";

const Label: React.FC<LabelProps> = ({ children, className, fluid, size }) => {
  const labelClassName = useMemo(() => {
    let cn = "";
    if (!className || className?.indexOf("bg-") === -1) {
      cn += " bg-primary";
    }
    if (!className || className?.indexOf("text-") === -1) {
      cn += " text-white";
    }

    if (fluid) {
      cn += " w-full items-center justify-center flex";
    } else {
      cn += " inline-block";
    }

    if (!size || size === "m") {
      cn += " px-[0.8rem] py-[0.4rem] text-detail-2 font-extrabold";
    } else if (size === "s") {
      cn += " px-[0.4rem] pb-[0.1rem] text-detail-3 font-bold";
    }
    return cn;
  }, [className, fluid, size]);
  return (
    <div data-testid="Label" className={`${labelClassName} ${className}`}>
      {children}
    </div>
  );
};

export default Label;
