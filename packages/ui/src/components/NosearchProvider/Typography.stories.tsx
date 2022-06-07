// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import Heading from "../UI/Heading";
import { Caret } from "../UI/Icon";
import Text from "../UI/Text";
import NosearchProvider from "./NosearchProvider";

export default {
  title: "UI/NosearchProvider/Typography",
  component: NosearchProvider,
} as Meta;

export const Typography = () => (
  <NosearchProvider>
    <div className="flex">
      <div className="w-[10rem]">
        <Heading level={1}>Heading</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <Heading level={1} as="span" className="text-red-400">
          H1_24ExtraBold
        </Heading>
        <Heading level={2}>H2_22ExtraBold</Heading>
        <Heading level={3}>H3_20ExtraBold</Heading>
        <Heading level={4}>H4_18ExtraBold</Heading>
        <Heading level={5}>H5_16Bold</Heading>
        <Heading level={6}>H6_14Bold</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-10">
        <Heading
          level={3}
          description={"먼저 써보고 우수한 제품을 소개해드려요!"}
          suffix={<Caret size={"2.4rem"} />}
        >
          이달의 리뷰템 💯
        </Heading>
        <Heading level={3} suffix={<Caret size={"2.4rem"} />}>
          인기 구매가이드 📖
        </Heading>
      </div>
    </div>
    <div className="flex mt-10 font-normal">
      <div className="w-[10rem]">
        <Heading level={1}>Body</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <Text type="B1" as="span">
          B1_16Regular
        </Text>
        <Text type="B2">B2_15Bold</Text>
        <Text type="B3">B3_15Medium</Text>
        <Text type="B4">B4_15Regular</Text>
        <Text type="B5">B5_14Bold</Text>
        <Text type="B6">B6_14Medium</Text>
        <Text type="B7">B7_14Regular</Text>
        <Text type="B8">B8_13Bold</Text>
        <Text type="B9">B9_13Medium</Text>
        <Text type="B10">B10_13Regular</Text>
      </div>
    </div>
    <div className="flex mt-10 font-normal">
      <div className="w-[10rem]">
        <Heading level={1}>Detail</Heading>
      </div>
      <div className="flex-1 ml-10 flex-col space-y-4">
        <Text type="D1">D1_11ExtraBold</Text>
        <Text type="D2">D2_12Bold</Text>
        <Text type="D3">D3_11Medium</Text>
      </div>
    </div>
  </NosearchProvider>
);
