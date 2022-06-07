// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import CommentInput from "./CommentInput";
import { CommentInputProps } from "./CommentInput.types";

describe("Test Component", () => {
  let props: CommentInputProps;

  beforeEach(() => {
    props = {
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
      onSubmitContent: function onSubmitContent(comment: string) {
        console.log(comment);
      },
    };
  });

  const renderComponent = () => render(<CommentInput {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("CommentInput");
    //TODO
  });
});
