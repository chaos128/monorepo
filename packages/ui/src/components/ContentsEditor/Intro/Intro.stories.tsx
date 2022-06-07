// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Intro from "./Intro";

export default {
  title: "ContentsEditor/Intro",
  component: Intro,
} as Meta;

const Template: ComponentStory<typeof Intro> = (args) => (
  <NosearchProvider>
    <Intro {...args} />
  </NosearchProvider>
);

export const BasicIntro = Template.bind({});
BasicIntro.args = {
  title: "내 손에 딱 맞는 키보드\n고르는법!",
  editorContent:
    "<p>'그저 입력만 잘 되면 되는' 주변기기에서 최근엔 포털 인기검색어 1~2위를 다툴 정도로 키보드는 많은 분들이 관심 갖는 대표적인 인기 IT기기로 자리 잡았는데요.<br>일상에서 오랜 시간 내 손이 직접 맞닿는 제품인만큼, 필요한 용도나 취향에 딱 맞는 키보드를 사용하는 것이 좋습니다.<br><br>다양한 종류의 수많은 제품 중 내 손에 찰떡인 키보드 고르는 법! 노써치와 함께 알아볼까요?</p>",
};

export const IntroWithLabel = Template.bind({});
IntroWithLabel.args = {
  label: "가전백과",
  title: "내 손에 딱 맞는 키보드\n고르는법!",
  editorContent:
    "<p>'그저 입력만 잘 되면 되는' 주변기기에서 최근엔 포털 인기검색어 1~2위를 다툴 정도로 키보드는 많은 분들이 관심 갖는 대표적인 인기 IT기기로 자리 잡았는데요.<br>일상에서 오랜 시간 내 손이 직접 맞닿는 제품인만큼, 필요한 용도나 취향에 딱 맞는 키보드를 사용하는 것이 좋습니다.<br><br>다양한 종류의 수많은 제품 중 내 손에 찰떡인 키보드 고르는 법! 노써치와 함께 알아볼까요?</p>",
};
