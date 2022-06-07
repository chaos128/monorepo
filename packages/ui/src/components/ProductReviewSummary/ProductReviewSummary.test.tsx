// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ProductReviewSummary from "./ProductReviewSummary";
import { ProductReviewSummaryProps } from "./ProductReviewSummary.types";

describe("Test Component", () => {
  let props: ProductReviewSummaryProps;

  beforeEach(() => {
    props = {
      avgScore: 4.5,
      scoreCount: [75, 20, 5, 0, 0],
      reviewCountSum: 100,
    };
  });

  const renderComponent = () => render(<ProductReviewSummary {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ProductReviewSummary");
    //TODO
  });
});
