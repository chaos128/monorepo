// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import PurchaseGuide from "./PurchaseGuide";
import { PurchaseGuideProps } from "./PurchaseGuide.types";

describe("Test Component", () => {
  let props: PurchaseGuideProps;

  beforeEach(() => {
    props = {
      viewType: "home",
      data: {
        thumbnail:
          "https://nosearch-cdn-1.s3.ap-northeast-2.amazonaws.com/uploads/selection_attachment/refrigerator_guide.png",
        parentCategoryKey: "kitchen",
        categoryKey: "refrigerator",
        categoryName: "냉장고",
        title: "가격도 성능도 천차만별! <BR>냉장고 고르는 법",
      },
    };
  });

  const renderComponent = () => render(<PurchaseGuide {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("PurchaseGuide");
    //TODO
  });
});
