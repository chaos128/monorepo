// Generated with util/create-component.js

import React from "react";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import FontSizeScript from "../FontSizeStyle";
import { NosearchProviderProps } from "./NosearchProvider.types";

const NosearchProvider: React.FC<NosearchProviderProps> = ({ children }) => {
  const { windowWidth } = useWindowWidth();
  return (
    <div data-testid="NosearchProvider">
      <FontSizeScript windowWidth={windowWidth} />
      {children}
    </div>
  );
};

export default NosearchProvider;
