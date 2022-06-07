// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ProductReview from "./ProductReview";
import { ProductReviewProps } from "./ProductReview.types";

describe("Test Component", () => {
  let props: ProductReviewProps;

  beforeEach(() => {
    const DummyData = {
      writerNm: "shoa****",
      goodsPt: 5,
      regDt: "2022-04-11 20:58:03",
      content: "동작 잘되고 사용하기 편해요",
      imageUrls: [],
      isUseful: false,
      onClickUseful: () => {
        console.log("도움이 돼요");
      },
    };
    props = {
      data: DummyData,
    };
  });

  const renderComponent = () => render(<ProductReview {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ProductReview");
    //TODO
  });
});
