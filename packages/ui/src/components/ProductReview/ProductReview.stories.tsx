// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import ProductReview from "./ProductReview";

export default {
  title: "Components/ProductReview",
  component: ProductReview,
} as Meta;

const Template: ComponentStory<typeof ProductReview> = (args) => (
  <NosearchProvider>
    <ProductReview {...args} />
  </NosearchProvider>
);
const DummyData = {
  writerNm: "shoa****",
  goodsPt: 5,
  regDt: "2022-04-11 20:58:03",
  content: "동작 잘되고 사용하기 편해요.\n동작 잘되고 사용하기 편해요",
  imageUrls: [],
  isUseful: false,
  onClickUseful: () => {
    console.log("도움이 돼요");
  },
};

export const BasicReview = Template.bind({});
BasicReview.args = {
  data: DummyData,
};

export const BasicReviewWithLongText = Template.bind({});
BasicReviewWithLongText.args = {
  data: {
    ...DummyData,
    content:
      "배송 빠르고 포장 상태 매우 만족해요 \n제품은 가성비가 너무 좋습니다 비슷한 스펙 + 클린스테이션 제품군 중이만한 가격대가 드물어요 맵핑 잘하고 청소도 꼼꼼히 하고 물걸래 청소도 앞뒤 왕복으로 닦아서 꽤 만족합니다 배터리도 넉넉해서 청소도중 충전할 일은 없네요 방3개, 거실, 주방을 물걸래 모드로 70분 돌려도 배터리가 반 이상 남았어요 먼지필터는 헤파14로 꽤 높은 등급이고 세척도 가능해서 좋습니다다만 클린스테이션 먼지 수거는 먼지 전용통일때만 사용이 가능한데 먼지흡입+물걸래를 주로 사용한다면 큰 단점이 아닐수 없습니다또 한가지 앱에서 청소설정 부분인데 흡입강도나 물분사 정도를 설정하는 곳이예요근데 설정을 꼭 청소중에만 가능하게 되어있더라구요 고객센터 문의 결과입니다한번 설정해 놓으면 만지지 않게 되긴 하겠지만이건 업데이트로 가능한 문제 같아서 꼭 개선해줬으면 하네요추가) 테스트해보니 충전중엔 설정이 불가능하고 완충되면 설정이 가능해집니다근데 고객센터에서 조차 이런 내용을 모르다니 자사 모델에 대한 기본 기능은 알고 응대했으면 하네요",
  },
};

export const PhotoReview = Template.bind({});
PhotoReview.args = {
  data: {
    ...DummyData,
    content:
      "배송 빠르고 포장 상태 매우 만족해요 \n제품은 가성비가 너무 좋습니다 비슷한 스펙 + 클린스테이션 제품군 중이만한 가격대가 드물어요 맵핑 잘하고 청소도 꼼꼼히 하고 물걸래 청소도 앞뒤 왕복으로 닦아서 꽤 만족합니다 배터리도 넉넉해서 청소도중 충전할 일은 없네요 방3개, 거실, 주방을 물걸래 모드로 70분 돌려도 배터리가 반 이상 남았어요 먼지필터는 헤파14로 꽤 높은 등급이고 세척도 가능해서 좋습니다다만 클린스테이션 먼지 수거는 먼지 전용통일때만 사용이 가능한데 먼지흡입+물걸래를 주로 사용한다면 큰 단점이 아닐수 없습니다또 한가지 앱에서 청소설정 부분인데 흡입강도나 물분사 정도를 설정하는 곳이예요근데 설정을 꼭 청소중에만 가능하게 되어있더라구요 고객센터 문의 결과입니다한번 설정해 놓으면 만지지 않게 되긴 하겠지만이건 업데이트로 가능한 문제 같아서 꼭 개선해줬으면 하네요추가) 테스트해보니 충전중엔 설정이 불가능하고 완충되면 설정이 가능해집니다근데 고객센터에서 조차 이런 내용을 모르다니 자사 모델에 대한 기본 기능은 알고 응대했으면 하네요",
    imageUrls: [
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
    ],
  },
};

export const MultiplePhotoReview = Template.bind({});
MultiplePhotoReview.args = {
  data: {
    ...DummyData,
    imageUrls: [
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_249/1646440903185SQh5B_JPEG/review-attachment-495a7cbb-23d6-4e12-b7bc-468f087865b8.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_273/1646440913307nPBqI_JPEG/review-attachment-dd90f384-5db6-4064-8494-908cdda4cf90.jpeg?type=w640",
    ],
  },
};

export const MultiplePhotoReviewMore5 = Template.bind({});
MultiplePhotoReviewMore5.args = {
  data: {
    ...DummyData,
    imageUrls: [
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_249/1646440903185SQh5B_JPEG/review-attachment-495a7cbb-23d6-4e12-b7bc-468f087865b8.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_273/1646440913307nPBqI_JPEG/review-attachment-dd90f384-5db6-4064-8494-908cdda4cf90.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_249/1646440903185SQh5B_JPEG/review-attachment-495a7cbb-23d6-4e12-b7bc-468f087865b8.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_249/1646440903185SQh5B_JPEG/review-attachment-495a7cbb-23d6-4e12-b7bc-468f087865b8.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_273/1646440913307nPBqI_JPEG/review-attachment-dd90f384-5db6-4064-8494-908cdda4cf90.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20211025_259/1635093367941sb0M4_JPEG/review-attachment-2fd91c62-ca82-43ee-a258-5362efeb9324.jpeg?type=w640",
      "https://phinf.pstatic.net/checkout.phinf/20220305_249/1646440903185SQh5B_JPEG/review-attachment-495a7cbb-23d6-4e12-b7bc-468f087865b8.jpeg?type=w640",
    ],
  },
};
