// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ProductDetailTitle from "./ProductDetailTitle";
import { IProductDetailTitleData } from "./ProductDetailTitle.types";

export default {
  title: "Components/ProductDetailTitle",
  component: ProductDetailTitle,
} as Meta;

const Template: ComponentStory<typeof ProductDetailTitle> = (args) => (
  <NosearchProvider>
    <ProductDetailTitle {...args} />
  </NosearchProvider>
);

const DummyData: IProductDetailTitleData = {
  goodsName: "드리미",
  modelName: "T20 ",
  brandName: "샤오미",
  productCategory: "무선청소기",
  price: "150~180",
  images: [
    "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
    "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
    "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_242.jpg",
  ],
  pickType: "best",
  reviewAvg: 4.5,
  reviewCnt: 110,
  colors: "실버/베이지/블루/패턴/화이트",
  likeCount: 12,
  likeStatus: false,
  compareStatus: false,
  PayButton: function PayButtonWrapper(props: any) {
    console.log("구매하기");
  },
  BookmarkButton: function BookmarkButtonWrapper(props: any) {
    console.log("bookmark");
  },
  CompareButton: function CompareButtonWrapper(props: any) {
    console.log("compare");
  },
  ShareButton: function ShareButtonWrapper(props: any) {
    console.log("share");
  },
  ReviewButton: function ReviewButtonWrapper(props: any) {
    console.log("review");
  },
};

export const Item = Template.bind({});
Item.args = { data: DummyData };

export const ItemWithMoreImages = Template.bind({});
ItemWithMoreImages.args = {
  data: {
    ...DummyData,
    images: [
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_242.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_026.jpg",
      "https://store.nosearch.com/data/goods/21/09/36/1000000999/t50_1000000999_detail_135.jpg",
    ],
  },
};

export const ItemWithNoPick = Template.bind({});
ItemWithNoPick.args = {
  data: {
    ...DummyData,
    pickType: "none",
  },
};

export const ItemWithMoreColors = Template.bind({});
ItemWithMoreColors.args = {
  data: {
    ...DummyData,
    colors:
      "실버/베이지/블루/패턴/블랙+골드/블루/패턴/퍼플/실버+베이지/화이트/블루",
  },
};
