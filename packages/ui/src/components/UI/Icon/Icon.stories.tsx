// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Text from "../../UI/Text";
import {
  Arrow,
  BookmarkDefault,
  BookmarkPressed,
  Caret,
  Cart,
  ComparisonDefault,
  ComparisonPressed,
  HeartDefault,
  HeartPressed,
  MyPageDefault,
  MyPagePressed,
  Share,
} from "./Icon";
import {
  CategoryDefault,
  CategoryPressed,
  CommunityDefault,
  CommunityPressed,
  CompassDefault,
  CompassPressed,
  HomeDefault,
  HomePressed,
  SaleDefault,
  SalePressed,
  StoreDefault,
  StorePressed,
} from "./index";
import Close from "./svgs/Close";
import PurchaseGuideDefault from "./svgs/PurchaseGuideDefault";
import PurchaseGuidePressed from "./svgs/PurchaseGuidePressed";

export default {
  title: "UI/Icon",
  component: NosearchProvider,
} as Meta;

export const Icons = () => {
  const size = "4rem";
  return (
    <NosearchProvider>
      <div className="flex space-x-3">
        <HomeDefault size={size} />
        <HomePressed size={size} />
        <CompassDefault size={size} />
        <CompassPressed size={size} />
        <SaleDefault size={size} />
        <SalePressed size={size} />
        <StoreDefault size={size} />
        <StorePressed size={size} />
        <CommunityDefault size={size} />
        <CommunityPressed size={size} />
        <CategoryDefault size={size} />
        <CategoryPressed size={size} />
        <ComparisonDefault size={size} />
        <ComparisonPressed size={size} />
        <BookmarkDefault size={size} />
        <BookmarkPressed size={size} />
        <MyPageDefault size={size} />
        <MyPagePressed size={size} />
        <PurchaseGuideDefault size={size} />
        <PurchaseGuidePressed size={size} />
        <Arrow size={size} />
        <Cart size={size} />
        <Share size={size} />
        <Close size={size} />
        <HeartDefault size={size} />
        <HeartPressed size={size} />
        <Caret size={size} />
      </div>
    </NosearchProvider>
  );
};

export const Footer = () => {
  const size = "2.7rem";
  return (
    <NosearchProvider>
      <div className="h-[10rem] bg-gray-5 flex items-center justify-center">
        <div className="flex justify-around content-around w-full h-[5.8rem] bg-white items-center">
          <div className="flex flex-col items-center">
            <HomePressed size={size} />
            <Text type="D3" className="mt-[0.1rem] text-primary select-none">
              홈
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <CategoryDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              카테고리
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <SaleDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              공동구매
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <StoreDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              스토어
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <CommunityDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none ">
              커뮤니티
            </Text>
          </div>
        </div>
      </div>
    </NosearchProvider>
  );
};

export const Footer2 = () => {
  const size = "2.7rem";
  return (
    <NosearchProvider>
      <div className="h-[10rem] bg-gray-5 flex items-center justify-center">
        <div className="flex justify-around content-around w-full h-[5.8rem] bg-white items-center">
          <div className="flex flex-col items-center">
            <HomePressed size={size} />
            <Text type="D3" className="mt-[0.1rem] text-primary select-none">
              홈
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <CategoryDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              카테고리
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <PurchaseGuideDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              구매가이드
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <StoreDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none">
              스토어
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <CommunityDefault size={size} />
            <Text type="D3" className="mt-[0.1rem] select-none ">
              커뮤니티
            </Text>
          </div>
        </div>
      </div>
    </NosearchProvider>
  );
};
