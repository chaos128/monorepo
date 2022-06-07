import React from "react";
import { PC_BREAKPOINT } from "../constants";
import { useWindowWidth } from "../hooks/useWindowWidth";

function FontSizeScript() {
  const { windowWidth } = useWindowWidth();

  let fontSize;
  if (windowWidth < PC_BREAKPOINT) {
    fontSize = Math.round(1000 * (windowWidth / 375)) / 100;
  } else {
    fontSize =
      Math.round(1000 * (windowWidth / 1200)) / 100 > 10
        ? 10
        : Math.round(1000 * (windowWidth / 1200)) / 100;
  }

  return <style>{`html{ font-size: ${fontSize}px}`}</style>;
}

export default FontSizeScript;
