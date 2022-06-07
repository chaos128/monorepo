// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Timedeal from "./Timedeal";
import { TimedealProps } from "./Timedeal.types";

describe("Timedeal Component", () => {
  let props: TimedealProps;

  beforeEach(() => {
    props = {
      data: {
        goodsNo: "1000002255",
        goodsName:
          "[삼성전자] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
        brandName: "삼성전자",
        goodsPrice: 800000,
        fixedPrice: 1149000,
        imageUrl:
          "https://m.store.nosearch.com/data/goods/22/01/03/1000002255/1000002255_detail_066.jpg",
        pickType: "best",
        periodDiscountStart: "2022-03-19 00:00:00",
        periodDiscountEnd: "2022-04-28 00:00:00",
        benefitUseType: "periodDiscount",
        goodsAccess: "member",
      },
      isLogin: false,
    };
  });

  const renderComponent = () => render(<Timedeal {...props} />);

  it("should render Timedeal correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Timedeal");
    expect(component).not.toBeNull();
  });
});
