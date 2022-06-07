// Generated with util/create-component.js
import { ComponentStory, Meta } from "@storybook/react";
import React from "react";
import NosearchProvider from "../../NosearchProvider";
import Table from "./Table";
import { ISection } from "./Table.types";

export default {
  title: "UI/Table",
  component: Table,
} as Meta;

const Template: ComponentStory<typeof Table> = (args) => (
  <NosearchProvider>
    <Table {...args} />
  </NosearchProvider>
);

const DummySpecData: ISection = {
  specCategories: [
    {
      name: "브랜드",
      value: "삼성전자",
      unit: null,
    },
    {
      name: "제품명",
      value: "그랑데 AI",
      unit: null,
    },
    {
      name: "모델명",
      value: "DV16T8740BW",
      unit: null,
    },
    {
      name: "상세정보",
      value: "화이트",
      unit: null,
    },
    {
      name: "가격대",
      value: 77,
      unit: "만원",
    },
  ],
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  data: DummySpecData,
};

export const TableWithTitle = Template.bind({});
TableWithTitle.args = {
  data: { ...DummySpecData, name: "제품정보" },
};

export const TableWithLongValue = Template.bind({});
TableWithLongValue.args = {
  data: {
    ...DummySpecData,
    specCategories: [
      {
        name: "건조단계",
        value: "4단계",
        unit: null,
      },
      {
        name: "건조온도조절",
        value: "X",
        unit: null,
      },
      {
        name: "건조코스",
        value:
          "표준,쾌속,셔츠,내부케어,시간건조,AI맞춤건조,섬세의류,울,이불건조,타월,합성섬유,에어살균+,이불/먼지털기,패딩케어,아웃도어발수케어,선반건조,송풍건조",
        unit: null,
      },
    ],
  },
};
