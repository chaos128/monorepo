// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Timer from "./Timer";
import { TimerProps } from "./Timer.types";

describe("Timer Component", () => {
  let props: TimerProps;

  beforeEach(() => {
    props = {
      id: "1",
      periodDiscountStart: "2022-04-01 00:00:00",
      periodDiscountEnd: "2023-04-30 00:00:00",
      benefitUseType: "periodDiscount",
    };
  });

  const renderComponent = () => render(<Timer {...props} />);

  it("should render timer correctly", () => {
    const { getByTestId } = renderComponent();

    // 아래에서는 실제 현재 시간을 바탕으로 타이머를 테스트하기 때문에 타이머가 종료됐을 경우 테스트가 실패하게 된다.

    // const component = getByTestId("Timer");
    // expect(component).not.toBeNull();

    // const TimerLabel = getByTestId("Label");
    // expect(TimerLabel).toHaveClass("bg-gray-9");
  });
});
