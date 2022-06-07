// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";
import SlideWrapper from "./SlideWrapper";
import { SlideWrapperProps } from "./SlideWrapper.types";

describe("Test Component", () => {
  let props: SlideWrapperProps;

  const renderComponent = () => render(<SlideWrapper {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("SlideWrapper");
    //TODO
  });
});
