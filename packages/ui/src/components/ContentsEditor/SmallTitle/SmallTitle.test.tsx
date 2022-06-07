// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import { TitleProps } from "../BigTitle/BigTitle.types";
import SmallTitle from "./SmallTitle";

describe("Test Component", () => {
  let props: TitleProps;

  beforeEach(() => {
    props = {
      title: "냉방능력(=평형)은 효과적으로\n냉방할 수 있는 면적을 의미",
    };
  });

  const renderComponent = () => render(<SmallTitle {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorSmallTitle");
    //TODO
  });
});
