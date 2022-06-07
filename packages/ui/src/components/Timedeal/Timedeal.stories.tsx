// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import Timedeal from "./Timedeal";
import { ItemProps } from "./Timedeal.types";

export default {
  title: "Components/Timedeal",
  component: Timedeal,
} as Meta;

const Template: ComponentStory<typeof Timedeal> = (args) => (
  <NosearchProvider>
    <Timedeal {...args} />
  </NosearchProvider>
);

let ItemDate = new Date();
ItemDate.setHours(ItemDate.getHours() + 50);
const DummyData: ItemProps = {
  goodsNo: "1000002255",
  goodsName:
    "[삼성전자] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
  brandName: "삼성전자",
  goodsPrice: 800000,
  fixedPrice: 1149000,
  imageUrl:
    "https://m.store.nosearch.com/data/goods/22/01/03/1000002255/1000002255_detail_066.jpg",
  pickType: "best",
  periodDiscountStart: "2022-03-19 00:00:00",
  periodDiscountEnd: String(ItemDate),
  benefitUseType: "periodDiscount",
  goodsAccess: "all",
};

export const Item = Template.bind({});
Item.args = {
  data: DummyData,
  isLogin: false,
};

export const ItemNoDiscount = Template.bind({});
ItemNoDiscount.args = {
  data: { ...DummyData, goodsPrice: 1149000 },
  isLogin: false,
};

export const NoPickItem = Template.bind({});
NoPickItem.args = {
  data: { ...DummyData, pickType: "none" },
  isLogin: false,
};

let ItemDateLessThan1Day = new Date();
ItemDateLessThan1Day.setHours(ItemDateLessThan1Day.getHours() + 5);
export const TimerLessThan1Day = Template.bind({});
TimerLessThan1Day.args = {
  data: { ...DummyData, periodDiscountEnd: String(ItemDateLessThan1Day) },
  isLogin: false,
};

export const MembershipItem = Template.bind({});
MembershipItem.args = {
  data: { ...DummyData, goodsAccess: "member" },
  isLogin: false,
};
