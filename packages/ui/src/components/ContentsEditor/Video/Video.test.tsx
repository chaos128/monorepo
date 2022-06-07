// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Video from "./Video";
import { VideoProps } from "./Video.types";

describe("Test Component", () => {
  let props: VideoProps;

  beforeEach(() => {
    props = {
      src:
        "https://d21x3meyyr2jva.cloudfront.net/image_temp/1645711034865_03 공동구매_로이드미이브플러스_16대9 용량다운.mp4",
      poster:
        "https://d21x3meyyr2jva.cloudfront.net/image_temp/1645711074829_03 공동구매_로이드미이브플러스_16대9 용량다운 0000002324ms.png",
      muted: true,
      loop: true,
      controls: false,
      autoplay: true,
      widthRatio: 16,
      heightRatio: 9,
    };
  });

  const renderComponent = () => render(<Video {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorVideo");
    //TODO
  });
});
