// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Encyclopedia from "./Encyclopedia";
import { EncyclopediaProps } from "./Encyclopedia.types";

describe("Test Component", () => {
  let props: EncyclopediaProps;

  beforeEach(() => {
    props = {
      type: "row",
      data: {
        categoryKr: "키보드",
        title:
          "기계식 키보드 7종 최고의 제품은?(기계식 입문하실 분들 꼭 보세요!)",
        thumbnail:
          "https://d21x3meyyr2jva.cloudfront.net/appliancesInfo/thumbnail/keyboard1.jpeg",
        isVideo: true,
      },
    };
  });

  const renderComponent = () => render(<Encyclopedia {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Encyclopedia");
    //TODO
  });
});
