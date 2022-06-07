// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import Score from "./Score";

export default {
  title: "Components/Score",
  component: Score,
} as Meta;

const Template: ComponentStory<typeof Score> = (args) => (
  <NosearchProvider>
    <Score {...args} />
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

export const item = Template.bind({});
item.args = {
  data: scoreData,
};
