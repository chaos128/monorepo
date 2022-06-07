// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import MiddleTitle from "./MiddleTitle";

export default {
  title: "ContentsEditor/MiddleTitle",
  component: MiddleTitle,
} as Meta;

const Template: ComponentStory<typeof MiddleTitle> = (args) => (
  <NosearchProvider>
    <MiddleTitle {...args} />
  </NosearchProvider>
);

export const BasicMiddleTitle = Template.bind({});
BasicMiddleTitle.args = {
  label: "1",
  title: "매핑성능",
  subTitle: "청소공간의 중복/누락 없이\n집안 곳곳을 깨끗하게 청소하는가?",
};
