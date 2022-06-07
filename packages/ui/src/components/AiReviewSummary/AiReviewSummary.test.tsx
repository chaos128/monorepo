// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import AiReviewSummary from "./AiReviewSummary";
import { AiReviewSummaryProps } from "./AiReviewSummary.types";

describe("Test Component", () => {
  let props: AiReviewSummaryProps;

  beforeEach(() => {
    props = {
      totalString: "+999",
      positiveNumber: 841,
      negativeNumber: 84,
      positiveRatio: 90,
      negativeRatio: 10,
    };
  });

  const renderComponent = () => render(<AiReviewSummary {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("AiReviewSummary");
    //TODO
  });
});
