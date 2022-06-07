// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import NosearchPick from "./NosearchPick";
import { INosearchPickData, IReviewData } from "./NosearchPick.types";

export default {
  title: "Components/NosearchPick",
  component: NosearchPick,
} as Meta;

const Template: ComponentStory<typeof NosearchPick> = (args) => (
  <NosearchProvider>
    <NosearchPick {...args} />
  </NosearchProvider>
);

const scoreData = {
  score_price: {
    score: 5,
    label: "24~29만원",
    name: "가격",
    review: {
      default: "매우저렴",
      summary: "매우저렴",
    },
  },
  score_cap: {
    score: 1,
    label: "3kg",
    name: "용량",
    review: {
      default: "매우작음",
      summary: "매우작음",
    },
  },
  score_dry: {
    score: 2,
    label: "전기히터",
    name: "건조성능",
    review: {
      default: "수축심한편",
      summary: "수축심한편",
    },
  },
  score_install: {
    score: 4,
    label: "불편",
    name: "설치편의",
    review: {
      default: "불편",
      summary: "불편",
    },
  },
  score_function: {
    score: 3,
    label: "1개",
    name: "편의기능",
    review: {
      default: "적음",
      summary: "적음",
    },
  },
};

const reviewsData: IReviewData[] = [
  {
    type: "nosearch",
    content:
      "20~30만원대 중저가 제품 <br/> 최고의 성능 흡입력/구성품/편의성 모두 뛰어남",
  },
  {
    type: "user",
    content:
      "이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느 이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느",
    images: [
      "https://phinf.pstatic.net/checkout.phinf/20211110_220/1636537717075cpn1l_JPEG/review-attachment-20e2ff6a-37c1-4a9a-88a1-628a25b5158d.jpeg?type=w640",
    ],
  },
  {
    type: "user",
    content: "이전에 다이슨을 계속 쓰다가 ",
  },
  {
    type: "user",
    content:
      "이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느 이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느",
    images: [
      "https://phinf.pstatic.net/checkout.phinf/20211110_220/1636537717075cpn1l_JPEG/review-attachment-20e2ff6a-37c1-4a9a-88a1-628a25b5158d.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20211110_220/1636537717075cpn1l_JPEG/review-attachment-20e2ff6a-37c1-4a9a-88a1-628a25b5158d.jpeg?type=w640",
    ],
  },
  {
    type: "user",
    content:
      "이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느 이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느",
  },
];

const DummyData: INosearchPickData = {
  goodsName: "드리미",
  modelName: "T20 ",
  brandName: "샤오미",
  productCategoryName: "무선청소기",
  price: "34.9~42만원",
  imageUrl:
    "https://ns-curation.s3.ap-northeast-2.amazonaws.com/watermark/무선청소기_샤오미_T20.png",
  pickType: "best",
  likeStatus: false,
  compareStatus: false,
  reviewAvg: 4.5,
  reviewCnt: 110,
  reviews: reviewsData,
  colors: "실버/베이지/블루/패턴",
  scoreMetaMap: {},
  BookmarkButton: function BookmarkButtonWrapper(props: any) {
    console.log("bookmark");
  },
  CompareButton: function CompareButtonWrapper(props: any) {
    console.log("compare");
  },
  AllReviewsButton: function AllReviewsButton() {
    console.log("all reviews");
  },
};

export const NosearchPickItem = Template.bind({});
NosearchPickItem.args = {
  viewType: "home",
  data: DummyData,
};

export const NosearchPickItemWithLongNames = Template.bind({});
NosearchPickItemWithLongNames.args = {
  viewType: "home",
  data: {
    ...DummyData,
    goodsName: "드리미 드리미 드리미 드리미 드리미",
    modelName: "T20 T20 T20 T20 T20 T20",
  },
};

export const NosearchPickItemWithoutPick = Template.bind({});
NosearchPickItemWithoutPick.args = {
  viewType: "home",
  data: { ...DummyData, pickType: "none" },
};

export const NosearchPickItemWithoutColor = Template.bind({});
NosearchPickItemWithoutColor.args = {
  viewType: "home",
  data: { ...DummyData, colors: "" },
};

export const NosearchPickItemWithoutRating = Template.bind({});
NosearchPickItemWithoutRating.args = {
  viewType: "home",
  data: { ...DummyData, reviewAvg: 0, reviewCnt: 0 },
};

export const NosearchPickItemWithoutPickColor = Template.bind({});
NosearchPickItemWithoutPickColor.args = {
  viewType: "home",
  data: { ...DummyData, pickType: "none", colors: "" },
};

export const NosearchPickItemWithoutPickColorRating = Template.bind({});
NosearchPickItemWithoutPickColorRating.args = {
  viewType: "home",
  data: {
    ...DummyData,
    pickType: "none",
    colors: "",
    reviewAvg: 0,
    reviewCnt: 0,
  },
};

export const NosearchPickItemWithoutReviews = Template.bind({});
NosearchPickItemWithoutReviews.args = {
  viewType: "home",
  data: { ...DummyData, reviews: [] },
};

export const NosearchPickItemWithScore = Template.bind({});
NosearchPickItemWithScore.args = {
  viewType: "pick",
  data: { ...DummyData, scoreMetaMap: scoreData },
};

export const NosearchPickItemWithIndex = Template.bind({});
NosearchPickItemWithIndex.args = {
  viewType: "pick",
  index: 1,
  data: { ...DummyData, scoreMetaMap: scoreData },
};
