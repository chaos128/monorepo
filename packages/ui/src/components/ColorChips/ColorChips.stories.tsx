// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ColorChips from "./ColorChips";

export default {
  title: "Components/ColorChips",
  component: ColorChips,
} as Meta;

const Template: ComponentStory<typeof ColorChips> = (args) => (
  <NosearchProvider>
    <ColorChips {...args} />
  </NosearchProvider>
);

export const ColorChipSingle = Template.bind({});
ColorChipSingle.args = {
  colors: "다크그린",
  chipWidth: "2",
  chipHeight: "2",
};

export const ColorChipMultiple = Template.bind({});
ColorChipMultiple.args = {
  colors: "실버/옐로우/패턴/다크그린/퍼플/블랙+골드/화이트/오렌지/블루",
  chipWidth: "2",
  chipHeight: "2",
};

export const ColorChipPattern = Template.bind({});
ColorChipPattern.args = {
  colors: "패턴",
  chipWidth: "2",
  chipHeight: "2",
};

export const ColorChipCombination = Template.bind({});
ColorChipCombination.args = {
  colors: "블루+베이지",
  chipWidth: "2",
  chipHeight: "2",
};
