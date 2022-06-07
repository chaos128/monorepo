// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import { TitleProps } from "../BigTitle/BigTitle.types";
import MiddleTitle from "./MiddleTitle";

describe("Test Component", () => {
  let props: TitleProps;

  beforeEach(() => {
    props = {
      label: "1",
      title: "매핑성능",
      subTitle: "청소공간의 중복/누락 없이\n집안 곳곳을 깨끗하게 청소하는가?",
    };
  });

  const renderComponent = () => render(<MiddleTitle {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorMiddleTitle");
    //TODO
  });
});
