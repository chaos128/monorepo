// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Link from "./Link";
import { LinkProps } from "./Link.types";

describe("Test Component", () => {
  let props: LinkProps;

  beforeEach(() => {
    props = {
      url: "https://nosearch.com/",
      text: "나선형 구조 장점 더 자세히 보기 👉",
      routeToNewPage: false,
    };
  });

  const renderComponent = () => render(<Link {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorLink");
    //TODO
  });
});
