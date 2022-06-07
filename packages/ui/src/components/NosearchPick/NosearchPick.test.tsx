// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import NosearchPick from "./NosearchPick";
import {
  INosearchPickData,
  IReviewData,
  IScoreMetaMap,
  NosearchPickProps,
} from "./NosearchPick.types";

describe("Test Component", () => {
  let props: NosearchPickProps;

  beforeEach(() => {
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
      },
      {
        type: "user",
        content: "이전에 다이슨을 계속 쓰다가 ",
      },
      {
        type: "user",
        content:
          "이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느 이전에 다이슨을 계속 쓰다가 후기가 좋길래 주문 해봤어요 근데 정말 아쉬움 하나 안느",
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
      scoreMetaMap: scoreData,
      BookmarkButton: function BookmarkButtonWrapper(props: any) {
        console.log("bookmark");
      },
      CompareButton: function CompareButtonWrapper(props: any) {
        console.log("compare");
      },
    };
    props = {
      viewType: "home",
      data: DummyData,
    };
  });

  const renderComponent = () => render(<NosearchPick {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("NosearchPick");
    //TODO
  });
});
