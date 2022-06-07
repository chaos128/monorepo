// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import BigTitle from "./BigTitle";
import { TitleProps } from "./BigTitle.types";

describe("Test Component", () => {
  let props: TitleProps;

  beforeEach(() => {
    props = {
      label: "Chapter 1.",
      title: "평형 선택",
      subTitle: "우리집은 몇 평 형을 사야 할까?",
    };
  });

  const renderComponent = () => render(<BigTitle {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorBigTitle");
    //TODO
  });
});
