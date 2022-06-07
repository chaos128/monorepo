// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import YoutubeVideo from "./YoutubeVideo";
import { YoutubeVideoProps } from "./YoutubeVideo.types";

describe("Test Component", () => {
  let props: YoutubeVideoProps;

  beforeEach(() => {
    props = {
      videoUrl: "https://youtu.be/p5pASLxDgzc",
    };
  });

  const renderComponent = () => render(<YoutubeVideo {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorYoutubeVideo");
    //TODO
  });
});
