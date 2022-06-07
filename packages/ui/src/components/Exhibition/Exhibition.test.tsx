// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Exhibition from "./Exhibition";
import { ExhibitionProps } from "./Exhibition.types";

describe("Test Component", () => {
  let props: ExhibitionProps;

  beforeEach(() => {
    props = {
      data: {
        title: "빔프로젝터로 나만의 극장 만들기",
        startAt: "2022-03-03T15:00:00.000Z",
        endAt: "2022-03-10T00:00:00.000Z",
        imageUrl:
          "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/exhibition/mobile/빔프_mo_1646728045394.png",
      },
    };
  });

  const renderComponent = () => render(<Exhibition {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Exhibition");
    //TODO
  });
});
