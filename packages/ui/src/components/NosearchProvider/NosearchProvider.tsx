// Generated with util/create-component.js

import React from "react";
import FontSizeScript from "../FontSizeStyle";
import { NosearchProviderProps } from "./NosearchProvider.types";

const NosearchProvider: React.FC<NosearchProviderProps> = ({ children }) => {
  return (
    <div data-testid="NosearchProvider">
      <FontSizeScript />
      {children}
    </div>
  );
};

export default NosearchProvider;
