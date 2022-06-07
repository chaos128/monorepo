// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Numbering from "./Numbering";
import { NumberingProps } from "./Numbering.types";

describe("Test Component", () => {
  let props: NumberingProps;

  beforeEach(() => {
    props = {
      numbering: 1,
      content: "필터 세척을 락스로 한다면 완벽하게 건조시킨 뒤 장착하기",
    };
  });

  const renderComponent = () => render(<Numbering {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorNumbering");
    //TODO
  });
});
