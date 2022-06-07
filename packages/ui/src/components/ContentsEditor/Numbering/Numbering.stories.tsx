// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Numbering from "./Numbering";

export default {
  title: "ContentsEditor/Numbering",
  component: Numbering,
} as Meta;

const Template: ComponentStory<typeof Numbering> = (args) => (
  <NosearchProvider>
    <Numbering {...args} />
  </NosearchProvider>
);

export const BasicNumbering = Template.bind({});
BasicNumbering.args = {
  numbering: 1,
  content: "필터 세척을 락스로 한다면 완벽하게 건조시킨 뒤 장착하기",
};
