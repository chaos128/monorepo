// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import EmphasizeContent from "./EmphasizeContent";

export default {
  title: "ContentsEditor/EmphasizeContent",
  component: EmphasizeContent,
} as Meta;

const Template: ComponentStory<typeof EmphasizeContent> = (args) => (
  <NosearchProvider>
    <EmphasizeContent {...args} />
  </NosearchProvider>
);

export const BasicEmphasizeContent = Template.bind({});
BasicEmphasizeContent.args = {
  content: "5~7월이 대부분 최저가\n(판매 경쟁이 가장 심한 시기)",
};
