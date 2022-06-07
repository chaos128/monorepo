// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Spacing from "./Spacing";

export default {
  title: "ContentsEditor/Spacing",
  component: Spacing,
} as Meta;

const Template: ComponentStory<typeof Spacing> = (args) => (
  <NosearchProvider>
    <div className="bg-blue-3">
      <Spacing {...args} />
    </div>
  </NosearchProvider>
);

export const BasicSpacing = Template.bind({});
BasicSpacing.args = {
  size: "small",
};
