// Generated with util/create-component.js
import React from "react";
import { render } from "@testing-library/react";

import Comment from "./Comment";
import { CommentProps, ICommentData } from "./Comment.types";

describe("Test Component", () => {
  let props: CommentProps;

  beforeEach(() => {
    const CommnetData: ICommentData = {
      id: 1607,
      user: {
        nickName: "노써치",
        profileImage:
          "https://nosearch.com/static/webp/images/profile_default_image.webp",
        isAdmin: false,
      },
      content:
        "소형TV를 구매하려고 합니다. 여러 군데 발품 팔고 온라인으로 알아보는 중에 궁금한게 너무 많아서 문의드립니다.\nLG경우에 베스트샵, 하이마트, 전자랜드, 홈쇼핑, 온라인에 따라 동일한 TV가 혹시 품질의 차이가 있는지, 차이가 없다면 가격이 저렴한 온라인으로 구매하는것이 나은거 아닌지 궁금합니다. \n그리고 온라인 구매는 '온라인 공식판매점'이라고 공지한 곳과 그렇지 않은 곳의 차이가 있는지, 공식판매점이면 안심하고 사도 되는건지도 궁금합니다.\n그리고 노써치 TV 구매가이드를 보니깐 해상도 관련해서 제가 사려고 고민하는게 32인치 해상도 HD(32LM580BEND, TV전용)와 32인치 FHD(32MN58HMW,TV겸모니터)인데 어느걸 추천하시는지 마지막으로 TV전용과 TV겸모니터는 별다른 차이가 없는지도 궁금합니다.  \n너무 많은 질문을 해서 민망하네요. 여러번 묻는것보다 한번에 몰아서 물어보는게 좋을거 같았고 여러 매장 돌아다니면서 직원분께 이것저것 물어보고 그랬는데 그걸로 궁금한 점이 다 해결되지 않아서 이렇게 많은 질문을 하게 됬습니다. 부디 답변해주시면 감사하겠습니다.",
      likeStatus: false,
      createdAt: "2020-10-12T08:56:48.000Z",
      answerCommentsCount: 0,
      answerComments: [],
      onReplyComment: function reply() {
        console.log("reply 1607");
      },
      onLikeComment: function like() {
        console.log("like");
      },
    };
    props = {
      data: CommnetData,
    };
  });

  const renderComponent = () => render(<Comment {...props} />);

  it("should render foo text correctly", () => {
    const { getByTestId } = renderComponent();

    const component = getByTestId("Comment");
    //TODO
  });
});
