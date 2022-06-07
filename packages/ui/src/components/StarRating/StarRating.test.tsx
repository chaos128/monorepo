// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import StarRating from "./StarRating";
import { StarRatingProps } from "./StarRating.types";

describe("Test Component", () => {
  let props: StarRatingProps;

  beforeEach(() => {
    props = {
      rating: 5,
      text: <div>(10)</div>,
    };
  });

  const renderComponent = () => render(<StarRating {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("StarRating");
    //TODO
  });
});
