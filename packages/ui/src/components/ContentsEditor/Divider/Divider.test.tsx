// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Divider from "./Divider";
import { DividerProps } from "./Divider.types";

describe("Test Component", () => {
  let props: DividerProps;

  beforeEach(() => {
    props = {
      color: "#000000",
      height: 1,
    };
  });

  const renderComponent = () => render(<Divider {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorDivider");
    //TODO
  });
});
