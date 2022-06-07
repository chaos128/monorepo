// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import ContentSidebar from "./ContentSidebar";
import { ContentSidebarProps } from "./ContentSidebar.types";

describe("Test Component", () => {
  let props: ContentSidebarProps;

  beforeEach(() => {
    const SidebarData = {
      category: "냉장고",
      likeCount: 2,
      likeStatus: false,
      ShareButton: function ShareButtonWrapper(props: any) {
        console.log("share");
      },
      BookmarkButton: function BookmarkButtonWrapper(props: any) {
        console.log("bookmark");
      },
      CommentButton: function QnAButtonWrapper(props: any) {
        console.log("qna");
      },
      RecommendProductsButton: function RecommendProductsButtonWrapper(
        props: any
      ) {
        console.log("recommend products");
      },
    };
    props = {
      type: "encyclopedia",
      data: SidebarData,
    };
  });

  const renderComponent = () => render(<ContentSidebar {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentSidebar");
    //TODO
  });
});
