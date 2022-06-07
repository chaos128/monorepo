// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Skeleton from "./Skeleton";

export default {
  title: "UI/Skeleton",
  component: Skeleton,
} as Meta;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <NosearchProvider>
    <div className="w-full h-64 rounded shadow-lg">
      <Skeleton {...args} />
    </div>
  </NosearchProvider>
);

export const Basic = Template.bind({});
Basic.args = {
  hasText: true,
  hasImage: true,
};
