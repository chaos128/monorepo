// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import EmphasizeContent from "./EmphasizeContent";
import { EmphasizeContentProps } from "./EmphasizeContent.types";

describe("Test Component", () => {
  let props: EmphasizeContentProps;

  beforeEach(() => {
    props = {
      content: "5~7월이 대부분 최저가\n(판매 경쟁이 가장 심한 시기)",
    };
  });

  const renderComponent = () => render(<EmphasizeContent {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorEmphasizeContent");
    //TODO
  });
});
