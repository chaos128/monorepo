// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import StoreItem from "./StoreItem";
import { IStoreItemData } from "./StoreItem.types";

export default {
  title: "Components/StoreItem",
  component: StoreItem,
} as Meta;

const Template: ComponentStory<typeof StoreItem> = (args) => (
  <NosearchProvider>
    <StoreItem {...args} />
  </NosearchProvider>
);

let ItemDate = new Date();
ItemDate.setHours(ItemDate.getHours() + 50);
const DummyData: IStoreItemData = {
  type: "best",
  index: 1,
  goodsNo: "1000002255",
  goodsName:
    "[삼성전자] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
  brandName: "삼성전자",
  imageUrl:
    "https://m.store.nosearch.com/data/goods/22/01/03/1000002255/1000002255_detail_066.jpg",
  goodsPrice: 800000,
  fixedPrice: 1149000,
  periodDiscountStart: "2022-01-19 00:00:00",
  periodDiscountEnd: String(ItemDate),
  pickType: "best",
  benefitUseType: "periodDiscount",
  goodsAccess: "all",
};

export const BestItem = Template.bind({});
BestItem.args = {
  isLogin: false,
  data: DummyData,
};

export const BestItemNoDiscount = Template.bind({});
BestItemNoDiscount.args = {
  isLogin: false,
  data: { ...DummyData, goodsPrice: 1149000 },
};

export const BestMembershipItem = Template.bind({});
BestMembershipItem.args = {
  isLogin: false,
  data: { ...DummyData, goodsAccess: "member" },
};

export const TimedealItem = Template.bind({});
TimedealItem.args = {
  isLogin: false,
  data: { ...DummyData, type: "timedeal" },
};

let ItemDateLessThan1Day = new Date();
ItemDateLessThan1Day.setHours(ItemDateLessThan1Day.getHours() + 5);
export const TimerLessThan1Day = Template.bind({});
TimerLessThan1Day.args = {
  isLogin: false,
  data: {
    ...DummyData,
    type: "timedeal",
    periodDiscountEnd: String(ItemDateLessThan1Day),
  },
};

export const TimedealMembershipItem = Template.bind({});
TimedealMembershipItem.args = {
  isLogin: false,
  data: { ...DummyData, type: "timedeal", goodsAccess: "member" },
};

export const nsPickItem = Template.bind({});
nsPickItem.args = {
  isLogin: false,
  data: { ...DummyData, type: "none" },
};
