// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import Exhibition from "./Exhibition";

export default {
  title: "Components/Exhibition",
  component: Exhibition,
} as Meta;

const Template: ComponentStory<typeof Exhibition> = (args) => (
  <div>
    <Exhibition {...args} />
  </div>
);

const ItemData = {
  title: "빔프로젝터로 나만의 극장 만들기",
  startAt: "2022-03-03T15:00:00.000Z",
  endAt: "2022-03-10T00:00:00.000Z",
  imageUrl:
    "https://d21x3meyyr2jva.cloudfront.net/exhibition/mobile/에어컨기획전_상세_mo_1652182775834.png",
};

export const MobileItem = Template.bind({});
MobileItem.args = {
  data: ItemData,
};

export const PcItem = Template.bind({});
PcItem.args = {
  data: {
    ...ItemData,
    imageUrl:
      "https://d21x3meyyr2jva.cloudfront.net/exhibition/pc/에어컨기획전_상세_1652182776299.png",
  },
};
