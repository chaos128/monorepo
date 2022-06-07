// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Spacing from "./Spacing";
import { SpacingProps } from "./Spacing.types";

describe("Test Component", () => {
  let props: SpacingProps;

  beforeEach(() => {
    props = {
      size: "small",
    };
  });

  const renderComponent = () => render(<Spacing {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorSpacing");
    //TODO
  });
});
