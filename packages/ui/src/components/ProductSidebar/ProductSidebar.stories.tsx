// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ProductSidebar from "./ProductSidebar";
import { IProductSidebarData } from "./ProductSidebar.types";

export default {
  title: "Components/ProductSidebar",
  component: ProductSidebar,
} as Meta;

const Template: ComponentStory<typeof ProductSidebar> = (args) => (
  <NosearchProvider>
    <ProductSidebar {...args} />
  </NosearchProvider>
);

const DummyData: IProductSidebarData = {
  goodsName: "드리미",
  modelName: "T20",
  brandName: "샤오미",
  image:
    "https://api.nosearch.com/ns_api/v1/product/storeImage?imageUrl=https://ns-curation.s3.ap-northeast-2.amazonaws.com/watermark/냉장고_LG전자_F534S35.png",
  pickType: "best",
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
  SpecButton: function SpecButtonWrapper(props: any) {
    console.log("spec");
  },
};

export const Item = Template.bind({});
Item.args = { data: DummyData };
