// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import NosearchDeal from "./NosearchDeal";
import { INosearchDealData } from "./NosearchDeal.types";

export default {
  title: "Components/NosearchDeal",
  component: NosearchDeal,
} as Meta;

const Template: ComponentStory<typeof NosearchDeal> = (args) => (
  <NosearchProvider>
    <NosearchDeal {...args} />
  </NosearchProvider>
);

let ItemDate = new Date();
ItemDate.setHours(ItemDate.getHours() + 50);
const DummyData: INosearchDealData = {
  title:
    "4K 고해상도 초고화질 빔프로젝터<br />한뼘거리만 있으면 100인치 투사가능!",
  description:
    "시네빔 HU715Q는 22년에 출시한 프리미엄 초단초점 모델로 4K UHD 해상도, 2500안시루멘, 100인치 투사거리 21.7cm 등 현재 판매되는 빔 프로젝터 중에서도 최상급의 성능을 나타내는 제품입니다. 성능 뿐 아니라 고급스러운 전면 캔버스 소재에 그레이, 핑크, 그린 3가지 컬러로\n집안의 인테리어까지 한층 높여주는 디자인까지 프리미엄인 제품입니다.",
  dealGoodsNm: "LG 초단초점 빔프로젝터 시네빔 HU715Q",
  goodsNo: "1000002390",
  discountedPrice: 709000,
  originPrice: 880000,
  video:
    "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/nosearchDeal/video/LG%EC%8B%9C%EB%84%A4%EB%B9%94_16%EB%8C%809_%EC%A0%80%EC%9A%A9%EB%9F%89_1649234722891.mp4",
  videoThumbnail:
    "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/nosearchDeal/videoThumbnail/%EC%8B%9C%EB%84%A4%EB%B9%94_1649234722474.jpg",
  isComingSoon: false,
  comingSoonImg:
    "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/nosearchDeal/videoThumbnail/KakaoTalk_20220310_163531778_1646960069047.jpg",
  periodDiscountStart: "2022-04-04 13:50:00",
  periodDiscountEnd: String(ItemDate),
  benefitUseType: "periodDiscount",
  goodsAccess: "all",
  soldOutFl: "n",
  hasSpecialPrice: false,
  hasCouponDiscount: false,
};

export const NosearchDealItem = Template.bind({});
NosearchDealItem.args = {
  data: DummyData,
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

let ItemDateLessThan1Day = new Date();
ItemDateLessThan1Day.setHours(ItemDateLessThan1Day.getHours() + 5);
export const TimerLessThan1Day = Template.bind({});
TimerLessThan1Day.args = {
  data: { ...DummyData, periodDiscountEnd: String(ItemDateLessThan1Day) },
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

export const NosearchDealComingSoonItem = Template.bind({});
NosearchDealComingSoonItem.args = {
  data: { ...DummyData, isComingSoon: true },
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

export const NosearchDealMembershipItem = Template.bind({});
NosearchDealMembershipItem.args = {
  data: { ...DummyData, goodsAccess: "member" },
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

export const NosearchDealSoldOutItem = Template.bind({});
NosearchDealSoldOutItem.args = {
  data: { ...DummyData, soldOutFl: "y" },
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

export const NosearchDealMembershipSoldoutItem = Template.bind({});
NosearchDealMembershipSoldoutItem.args = {
  data: { ...DummyData, goodsAccess: "member", soldOutFl: "y" },
  viewType: "home",
  type: "nosearchDeal",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemSpecialPrice = Template.bind({});
ReviewtemSpecialPrice.args = {
  data: { ...DummyData, hasSpecialPrice: true },
  viewType: "home",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemCouponDiscount = Template.bind({});
ReviewtemCouponDiscount.args = {
  data: { ...DummyData, hasCouponDiscount: true },
  viewType: "home",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemSoldOut = Template.bind({});
ReviewtemSoldOut.args = {
  data: { ...DummyData, soldOutFl: "y" },
  viewType: "home",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemMembership = Template.bind({});
ReviewtemMembership.args = {
  data: { ...DummyData, goodsAccess: "member" },
  viewType: "home",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemMembershipSoldOut = Template.bind({});
ReviewtemMembershipSoldOut.args = {
  data: { ...DummyData, goodsAccess: "member", soldOutFl: "y" },
  viewType: "home",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemInPickPage = Template.bind({});
ReviewtemInPickPage.args = {
  data: DummyData,
  viewType: "pick",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemCouponDiscountInPickPage = Template.bind({});
ReviewtemCouponDiscountInPickPage.args = {
  data: { ...DummyData, hasCouponDiscount: true },
  viewType: "pick",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemMembershipInPickPage = Template.bind({});
ReviewtemMembershipInPickPage.args = {
  data: { ...DummyData, goodsAccess: "member" },
  viewType: "pick",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};

export const ReviewtemSoldOutInPickPage = Template.bind({});
ReviewtemSoldOutInPickPage.args = {
  data: { ...DummyData, soldOutFl: "y" },
  viewType: "pick",
  type: "reviewTem",
  isLogin: false,
  isIOSApp: false,
};
