// Generated with util/create-component.js
import { Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import Text from "../UI/Text";
import Label from "./Label";

export default {
  title: "Components/Label",
  component: Label,
} as Meta;

export const Sample = () => (
  <NosearchProvider>
    <div className="flex flex-col space-y-3">
      <div>
        <Label className="bg-red-4">최저가 이하 특가</Label>
      </div>
      <div>
        <Label className="bg-orange">특가</Label>
      </div>
      <div>
        <Label className="bg-violet">쿠폰적용 특가</Label>
      </div>
      <div>
        <Label className="border border-primary bg-white text-primary box-border">
          쿠폰 적용가
        </Label>
      </div>
      <div>
        <Label className="bg-blue-6" size="s">
          에어프라이어 베스트픽
        </Label>
      </div>
      <div>
        <Label className="bg-red-3" fluid>
          <Text type="B7" className="text-black">
            22:31:20
          </Text>
        </Label>
      </div>
      <div>
        <Label className="bg-gray-9" fluid>
          09:04:07
        </Label>
      </div>
    </div>
  </NosearchProvider>
);
