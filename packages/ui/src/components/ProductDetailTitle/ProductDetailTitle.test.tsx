// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ProductDetailTitle from "./ProductDetailTitle";
import { ProductDetailTitleProps } from "./ProductDetailTitle.types";

describe("Test Component", () => {
  let props: ProductDetailTitleProps;

  beforeEach(() => {
    props = {
      data: {
        goodsName: "드리미",
        modelName: "T20 ",
        brandName: "샤오미",
        productCategory: "무선청소기",
        price: "150~180",
        images: [
          "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
          "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
          "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_242.jpg",
        ],
        pickType: "best",
        reviewAvg: 4.5,
        reviewCnt: 110,
        colors: "실버/베이지/블루/패턴",
        likeCount: 12,
        likeStatus: false,
        compareStatus: false,
        PayButton: function PayButtonWrapper(props: any) {
          console.log("구매하기");
        },
        BookmarkButton: function BookmarkButtonWrapper(props: any) {
          console.log("bookmark");
        },
        CompareButton: function CompareButtonWrapper(props: any) {
          console.log("compare");
        },
        ShareButton: function ShareButtonWrapper(props: any) {
          console.log("share");
        },
      },
    };
  });

  const renderComponent = () => render(<ProductDetailTitle {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ProductDetailTitle");
    //TODO
  });
});
