// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Tabs from "./Tabs";
import { TabsProps } from "./Tabs.types";

describe("Test Component", () => {
  let props: TabsProps;

  const renderComponent = () => render(<Tabs {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Tabs");
    //TODO
  });
});
