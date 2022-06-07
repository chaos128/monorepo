// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import BigTitle from "./BigTitle";

export default {
  title: "ContentsEditor/BigTitle",
  component: BigTitle,
} as Meta;

const Template: ComponentStory<typeof BigTitle> = (args) => (
  <NosearchProvider>
    <BigTitle {...args} />
  </NosearchProvider>
);

export const BasicBigTitle = Template.bind({});
BasicBigTitle.args = {
  label: "Chapter 1.",
  title: "평형 선택",
  subTitle: "우리집은 몇 평 형을 사야 할까?",
};

export const BigTitleWithIntro = Template.bind({});
BigTitleWithIntro.args = {
  label: "Chapter 1.",
  title: "종류",
  subTitle: "멤브레인 / 펜타그래프 / 기계식 / 무접점",
  editorContent:
    "<p>키보드의 생김새는 대부분 비슷하지만, 키가 입력되는 방식(접점방식)에 따라 다양한 종류로 구분됩니다.<br>그 중 현재 가장 일반적으로 사용되는 대표적인 키보드와 각각의 장/단점에 대해 알아보겠습니다.</p>",
};
