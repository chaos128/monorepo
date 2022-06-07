// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import PickLabel from "./PickLabel";

export default {
  title: "Components/PickLabel",
  component: PickLabel,
} as Meta;

const Template: ComponentStory<typeof PickLabel> = (args) => (
  <NosearchProvider>
    <PickLabel {...args} />
  </NosearchProvider>
);

export const BestPickLabel = Template.bind({});
BestPickLabel.args = {
  pickType: "best",
};

export const PremiumPickLabelWithCategory = Template.bind({});
PremiumPickLabelWithCategory.args = {
  pickType: "premium",
  categoryKr: "무선 청소기",
};
