// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Image from "./Image";
import { ImageProps } from "./Image.types";

describe("Test Component", () => {
  let props: ImageProps;

  beforeEach(() => {
    props = {
      url:
        "https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png",
      ImageWrapper: (
        <img src="https://d21x3meyyr2jva.cloudfront.net/image_temp/1644395972000_keyboard1.png"></img>
      ),
      title: "",
      description: "",
      alt: "",
      routeToNewPage: false,
    };
  });

  const renderComponent = () => render(<Image {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorImage");
    //TODO
  });
});
