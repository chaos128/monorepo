// Generated with util/create-component.js
import { render } from "@testing-library/react";
import React from "react";
import Text from "./Text";
import { TextProps } from "./Text.types";

describe("Test Component", () => {
  let props: TextProps;

  beforeEach(() => {
    props = {
      editorContent:
        '<p>사람이 힘을 들이지 않고 스스로 집안 곳곳을 청소해주는 로봇청소기가 정말 대세가 되었는데요.<br><br>2~3년 전부터 로봇청소기에 매핑센서로 LDS가 탑재되고, 똑똑한 움직임이 가능해지면서 많은 분들이 구매하기 시작했습니다.<br><br>요즘은 LDS를 포함한 똑똑한 움직임은 기본이고, <span style="color: rgb(235,107,86);"><strong>먼지통을 스스로 비워주는 클린스테이션이 포함된 제품이 인기</strong></span>입니다.<br><br>많은 분들이 편리함을 느끼지만, 기능이 추가된 제품은 최소 50만원이 넘어가면서 가격이 부담스러워졌는데요.<br><br>오늘은 <span style="color: rgb(235,107,86);"><strong>40만원대에 구매할 수 있는 클린스테이션 포함 로봇청소기 </strong></span>리뷰를 해보았습니다.</p>',
    };
  });

  const renderComponent = () => render(<Text {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("ContentsEditorText");
    //TODO
  });
});
