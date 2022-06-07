import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import Timer from "./Timer";

export default {
  title: "Components/Timer",
  component: Timer,
} as Meta;

const Template: ComponentStory<typeof Timer> = (args) => (
  <div>
    <Timer {...args} />
  </div>
);

let ItemDate = new Date();
ItemDate.setHours(ItemDate.getHours() + 50);
export const Item = Template.bind({});
Item.args = {
  id: "1",
  periodDiscountStart: "2022-03-19 00:00:00",
  periodDiscountEnd: String(ItemDate),
  benefitUseType: "periodDiscount",
};
