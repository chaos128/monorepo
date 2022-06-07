// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import Exhibition from "../Exhibition";
import NosearchDeal from "../NosearchDeal";
import { INosearchDealData } from "../NosearchDeal/NosearchDeal.types";
import NosearchProvider from "../NosearchProvider";
import StoreItem from "../StoreItem";
import { IStoreItemData } from "../StoreItem/StoreItem.types";
import SlideWrapper from "./SlideWrapper";

export default {
  title: "Components/SlideWrapper",
  component: SlideWrapper,
} as Meta;

export const StoreItemsSlider = () => (
  <NosearchProvider>
    <SlideWrapper
      size={4}
      // buttonStyle={{ backgroundColor: "black" }}
    >
      <StoreItemContent />
      <StoreItemContent2 />
      <StoreItemContent />
      <StoreItemContent2 />
      <StoreItemContent />
      <StoreItemContent2 />
      <StoreItemContent />
      <StoreItemContent2 />
      <StoreItemContent />
      <StoreItemContent2 />
      <StoreItemContent />
      <StoreItemContent2 />
    </SlideWrapper>
  </NosearchProvider>
);

const data: IStoreItemData = {
  brandName: "삼성전자",
  goodsName:
    "[삼성전자] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
  goodsNo: "1000002255",
  fixedPrice: 1149000,
  goodsPrice: 800000,
  imageUrl:
    "https://m.store.nosearch.com/data/goods/22/01/03/1000002255/1000002255_detail_066.jpg",
  periodDiscountStart: "2022-01-19 00:00:00",
  periodDiscountEnd: "2022-02-28 00:00:00",
  pickType: "none",
  benefitUseType: "periodDiscount",
  goodsAccess: "all",
};

const StoreItemContent = () => {
  return <StoreItem isLogin={false} data={data} fluid />;
};

const StoreItemContent2 = () => {
  return (
    <StoreItem
      isLogin={false}
      data={{
        ...data,
        brandName: "LG",
        goodsName:
          "[LG] BESPOKE 제트 미드나잇블루 VS20A956E3B(청정스테이션 일체형)",
        goodsPrice: 100000,
        imageUrl:
          "https://m.store.nosearch.com/data/goods/22/02/08/1000002467/1000002467_detail_05.jpg",
      }}
      fluid
    />
  );
};

export const NSDealSlider = () => (
  <NosearchProvider>
    <SlideWrapper size={2}>
      <NSDealContent />
      <NSDealContent2 />
      <NSDealContent />
      <NSDealContent2 />
      <NSDealContent />
      <NSDealContent2 />
      <NSDealContent />
    </SlideWrapper>
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

const NSDealContent = () => {
  return (
    <NosearchDeal
      data={DummyData}
      viewType="home"
      type="nosearchDeal"
      fluid
      isLogin={false}
      isIOSApp={false}
    />
  );
};

let ItemDateLessThan1Day = new Date();
ItemDateLessThan1Day.setHours(ItemDateLessThan1Day.getHours() + 5);
const NSDealContent2 = () => {
  return (
    <NosearchDeal
      data={{ ...DummyData, periodDiscountEnd: String(ItemDateLessThan1Day) }}
      viewType="home"
      type="nosearchDeal"
      fluid
      isLogin={false}
      isIOSApp={false}
    />
  );
};

export const ExhibitionSlider = () => (
  <NosearchProvider>
    <SlideWrapper size={2}>
      <ExhibitionContent />
      <ExhibitionContent2 />
      <ExhibitionContent />
      <ExhibitionContent2 />
      <ExhibitionContent />
    </SlideWrapper>
  </NosearchProvider>
);

const ExhibitionData = {
  id: 4,
  title: "빔프로젝터로 나만의 극장 만들기",
  startAt: "2022-03-03T15:00:00.000Z",
  endAt: "2022-03-10T00:00:00.000Z",
  imageUrl:
    "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/exhibition/pc/빔프 pc상세_1646728045637.png",
};

const ExhibitionContent = () => {
  return <Exhibition data={ExhibitionData} fluid />;
};
const ExhibitionContent2 = () => {
  return (
    <Exhibition
      data={{
        ...ExhibitionData,
        imageUrl:
          "https://ns-api-server.s3.ap-northeast-2.amazonaws.com/exhibition/pc/에어컨기획전_상세_1650619782685.png",
      }}
      fluid
    />
  );
};
