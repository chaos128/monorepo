// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ColorChips from "./ColorChips";
import { ColorChipsProps } from "./ColorChips.types";

describe("Test Component", () => {
  let props: ColorChipsProps;

  beforeEach(() => {
    props = {
      colors: "실버",
      chipWidth: "2",
      chipHeight: "2",
    };
  });

  const renderComponent = () => render(<ColorChips {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ColorChips");
    //TODO
  });
});
