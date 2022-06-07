// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import StoreItem from "./StoreItem";
import { StoreItemProps } from "./StoreItem.types";

describe("Test Component", () => {
  let props: StoreItemProps;

  beforeEach(() => {
    let ItemDate = new Date();
    ItemDate.setHours(ItemDate.getHours() + 50);
    props = {
      isLogin: false,
      data: {
        type: "best",
        index: 1,
        goodsNo: "1000002255",
        goodsName:
          "[삼성전자] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
        brandName: "삼성전자",
        imageUrl:
          "https://m.store.nosearch.com/data/goods/22/01/03/1000002255/1000002255_detail_066.jpg",
        goodsPrice: 800000,
        fixedPrice: 1149000,
        periodDiscountStart: "2022-01-19 00:00:00",
        periodDiscountEnd: String(ItemDate),
        pickType: "best",
        benefitUseType: "periodDiscount",
        goodsAccess: "all",
      },
    };
  });

  const renderComponent = () => render(<StoreItem {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("StoreItem");
    //TODO
  });
});
