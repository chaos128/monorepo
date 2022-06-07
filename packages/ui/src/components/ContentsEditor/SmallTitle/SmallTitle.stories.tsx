// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import SmallTitle from "./SmallTitle";

export default {
  title: "ContentsEditor/SmallTitle",
  component: SmallTitle,
} as Meta;

const Template: ComponentStory<typeof SmallTitle> = (args) => (
  <NosearchProvider>
    <SmallTitle {...args} />
  </NosearchProvider>
);

export const BasicSmallTitle = Template.bind({});
BasicSmallTitle.args = {
  title: "냉방능력(=평형)은 효과적으로\n냉방할 수 있는 면적을 의미",
};
