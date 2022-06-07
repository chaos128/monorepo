// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ContentSidebar from "./ContentSidebar";

export default {
  title: "Components/ContentSidebar",
  component: ContentSidebar,
} as Meta;

const Template: ComponentStory<typeof ContentSidebar> = (args) => (
  <NosearchProvider>
    <ContentSidebar {...args} />
  </NosearchProvider>
);

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
  commentCount: 152,
  CommentButton: function QnAButtonWrapper(props: any) {
    console.log("qna");
  },
  RecommendProductsButton: function RecommendProductsButtonWrapper(props: any) {
    console.log("recommend products");
  },
};

export const EncyclopediaSidebar = Template.bind({});
EncyclopediaSidebar.args = {
  type: "encyclopedia",
  data: SidebarData,
};

export const PurchaseGuideSidebar = Template.bind({});
PurchaseGuideSidebar.args = {
  type: "purchaseGuide",
  data: {
    ...SidebarData,
    indexData: [
      {
        title: "타입 고르기",
        desc: "타입에 따른 장단점 비교",
        onClickIndex: function IndexButtonWrapper(props: any) {
          console.log("index1");
        },
      },
      {
        title: "용량 선택하기",
        desc: "설치 공간과 저장 패턴에 따라 고르세요",
        onClickIndex: function IndexButtonWrapper(props: any) {
          console.log("index2");
        },
      },
      {
        title: "재료의 신선도를 살려주는 냉각 기능",
        desc: "모터, 냉각 방식, 냉각기 갯수",
        onClickIndex: function IndexButtonWrapper(props: any) {
          console.log("index3");
        },
      },
      {
        title: "효율적인 공간 활용을 위한 수납편의 기능",
        desc: "홈바, 도어수납 포켓, 아이스메이커 등",
        onClickIndex: function IndexButtonWrapper(props: any) {
          console.log("index4");
        },
      },
      {
        title: "편리한 사용을 위한 부가기능",
        desc: "필수는 아니지만 편리한 기능들",
        onClickIndex: function IndexButtonWrapper(props: any) {
          console.log("index5");
        },
      },
    ],
  },
};
