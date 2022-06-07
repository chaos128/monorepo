// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Label from "./Label";
import { LabelProps } from "./Label.types";

describe("Test Component", () => {
  let props: LabelProps;

  beforeEach(() => {
    props = {
    };
  });

  const renderComponent = () => render(<Label {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Label");
    //TODO
  });
});
