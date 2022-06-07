// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import AiReview from "./AiReview";
import { AiReviewProps } from "./AiReview.types";

describe("Test Component", () => {
  let props: AiReviewProps;

  beforeEach(() => {
    props = {
      type: "positive",
      date: "2021.05.17.",
      text: "어버이날 시어머니 선물로 사드렸네요. 단독주택이라 세탁기가 들어가는데 힘이 들었을 건데 친절하게 잘 마무리해 주셨다고 들었어요 아무래도 기존에 쓰던 통돌이 방식이랑 달라 어머니가 많이 공부 중이세요",
    };
  });

  const renderComponent = () => render(<AiReview {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("AiReview");
    //TODO
  });
});
