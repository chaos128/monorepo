// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import TwoImage from "./TwoImage";
import { TwoImageProps } from "./TwoImage.types";

describe("Test Component", () => {
  let props: TwoImageProps;

  beforeEach(() => {
    const FirstImageData = {
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

    const SecondImageData = {
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
    props = {
      firstImage: FirstImageData,
      secondImage: SecondImageData,
    };
  });

  const renderComponent = () => render(<TwoImage {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorTwoImage");
    //TODO
  });
});
