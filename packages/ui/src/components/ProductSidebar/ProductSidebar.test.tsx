// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ProductSidebar from "./ProductSidebar";
import {
  IProductSidebarData,
  ProductSidebarProps,
} from "./ProductSidebar.types";

describe("Test Component", () => {
  let props: ProductSidebarProps;

  beforeEach(() => {
    const DummyData: IProductSidebarData = {
      goodsName: "드리미",
      modelName: "T20 ",
      brandName: "샤오미",
      image:
        "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
      pickType: "best",
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
      SpecButton: function SpecButtonWrapper(props: any) {
        console.log("spec");
      },
    };
    props = {
      data: DummyData,
    };
  });

  const renderComponent = () => render(<ProductSidebar {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ProductSidebar");
    //TODO
  });
});
