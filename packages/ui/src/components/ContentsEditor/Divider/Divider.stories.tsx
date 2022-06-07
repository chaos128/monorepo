// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Divider from "./Divider";

export default {
  title: "ContentsEditor/Divider",
  component: Divider,
} as Meta;

const Template: ComponentStory<typeof Divider> = (args) => (
  <NosearchProvider>
    <Divider {...args} />
  </NosearchProvider>
);

export const BasicDivider = Template.bind({});
BasicDivider.args = {
  color: "#000000",
  height: 1,
};
