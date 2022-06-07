// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Table from "./Table";
import { ISection, TableProps } from "./Table.types";

describe("Test Component", () => {
  let props: TableProps;

  beforeEach(() => {
    const DummySpecData: ISection = {
      name: "제품정보",
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
    props = {
      data: DummySpecData,
    };
  });

  const renderComponent = () => render(<Table {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Table");
    //TODO
  });
});
