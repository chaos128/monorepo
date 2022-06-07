// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import Encyclopedia from "./Encyclopedia";

export default {
  title: "Components/Encyclopedia",
  component: Encyclopedia,
} as Meta;

const Template: ComponentStory<typeof Encyclopedia> = (args) => (
  <div>
    <Encyclopedia {...args} />
  </div>
);

const ItemData = {
  title: "기계식 키보드 <br> 7종 최고의 제품은?",
  categoryKr: "키보드",
  thumbnail:
    "https://d21x3meyyr2jva.cloudfront.net/appliancesInfo/thumbnail/keyboard1.jpeg",
  isVideo: false,
};

export const MobileItem = Template.bind({});
MobileItem.args = {
  type: "row",
  data: ItemData,
};
export const PcItem = Template.bind({});
PcItem.args = {
  type: "column",
  data: ItemData,
};

export const MobileVideoItem = Template.bind({});
MobileVideoItem.args = {
  type: "row",
  data: { ...ItemData, isVideo: true },
};
export const PcVideoItem = Template.bind({});
PcVideoItem.args = {
  type: "column",
  data: { ...ItemData, isVideo: true },
};

export const MobileItemWithNew = Template.bind({});
MobileItemWithNew.args = {
  type: "row",
  data: { ...ItemData, isNew: true },
};
export const PcItemWithNew = Template.bind({});
PcItemWithNew.args = {
  type: "column",
  data: { ...ItemData, isNew: true },
};

export const MobileItemWithLongTitle = Template.bind({});
MobileItemWithLongTitle.args = {
  type: "row",
  data: {
    ...ItemData,
    title:
      "한 뼘 거리만 있으면 100인치 가능한 빔프로젝터!(LG 시네 한 뼘 거리만 있으면 100인치 가능한 빔프로젝터!(LG 시네..",
  },
};
export const PcItemWithLongTitle = Template.bind({});
PcItemWithLongTitle.args = {
  type: "column",
  data: {
    ...ItemData,
    title:
      "한 뼘 거리만 있으면 100인치 가능한 빔프로젝터!(LG 시네 한 뼘 거리만 있으면 100인치 가능한 빔프로젝터!(LG 시네..",
  },
};
