// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import PurchaseGuide from "./PurchaseGuide";
import { IPurchaseGuideData } from "./PurchaseGuide.types";

export default {
  title: "Components/PurchaseGuide",
  component: PurchaseGuide,
} as Meta;

const Template: ComponentStory<typeof PurchaseGuide> = (args) => (
  <NosearchProvider>
    <PurchaseGuide {...args} />
  </NosearchProvider>
);

const DummyData: IPurchaseGuideData = {
  thumbnail: "https://nosearch.com/static/images/real_washing_machine.png",
  parentCategoryKey: "kitchen",
  categoryKey: "refrigerator",
  categoryName: "냉장고",
  title: "가격도 성능도 천차만별! <BR>냉장고 고르는 법",
  description:
    "한 번 구입하면 최소 몇 년, 길게는 10년 이상 사용하는 냉장고! 하지만 종류도 많고 신제품도 빠르게 쏟아져 선택하기 어려운데요, 필수 대형가전인만큼 내 라이프 스타일에 맞게 선택하는 게 제일 중요합니다. <br> 나에게 딱 맞는 냉장고, 어떻게 골라야 할까요? 한 번 구입하면 최소 몇 년, 길게는 10년 이상 사용하는 냉장고! 하지만 종류도 많고 신제품도 빠르게 쏟아져 선택하기 어려운데요, 필수 대형가전인만큼 내 라이프 스타일에 맞게 선택하는 게 제일 중요합니다. <br> 나에게 딱 맞는 냉장고, 어떻게 골라야 할까요?",
};

export const Item = Template.bind({});
Item.args = {
  viewType: "home",
  data: DummyData,
};

export const ItemWithRectangleImg = Template.bind({});
ItemWithRectangleImg.args = {
  viewType: "home",
  data: {
    ...DummyData,
    thumbnail:
      "https://dfcwlq4sk5y81.cloudfront.net/uploads/selection_attachment/refrigerator_guide.png",
  },
};

export const ItemInPickPage = Template.bind({});
ItemInPickPage.args = {
  viewType: "pick",
  data: {
    ...DummyData,
    thumbnail:
      "https://dfcwlq4sk5y81.cloudfront.net/uploads/selection_attachment/refrigerator_guide.png",
  },
};

export const ItemInProductDetailPage = Template.bind({});
ItemInProductDetailPage.args = {
  viewType: "productDetail",
  data: {
    ...DummyData,
    thumbnail:
      "https://dfcwlq4sk5y81.cloudfront.net/uploads/selection_attachment/refrigerator_guide.png",
  },
};

export const ItemInOverviewPage = Template.bind({});
ItemInOverviewPage.args = {
  viewType: "purchaseGuideOverview",
  data: {
    ...DummyData,
    thumbnail:
      "https://dfcwlq4sk5y81.cloudfront.net/uploads/selection_attachment/refrigerator_guide.png",
  },
};

export const ItemInPurchaseGuidePage = Template.bind({});
ItemInPurchaseGuidePage.args = {
  viewType: "purchaseGuide",
  data: {
    ...DummyData,
    thumbnail:
      "https://dfcwlq4sk5y81.cloudfront.net/uploads/selection_attachment/refrigerator_guide.png",
  },
};
