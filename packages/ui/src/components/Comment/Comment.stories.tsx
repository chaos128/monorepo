// Generated with util/create-component.js
import { Meta, ComponentStory } from "@storybook/react";
import React from "react";
import NosearchProvider from "../NosearchProvider";
import Comment from "./Comment";
import { ICommentData } from "./Comment.types";

export default {
  title: "Components/Comment",
  component: Comment,
} as Meta;

const Template: ComponentStory<typeof Comment> = (args) => (
  <NosearchProvider>
    <Comment {...args} />
  </NosearchProvider>
);

const CommnetData: ICommentData = {
  id: 1607,
  user: {
    nickName: "aichanr***",
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

export const SingleComment = Template.bind({});
SingleComment.args = {
  isLoginedUser: true,
  data: CommnetData,
};

export const SingleCommentWithNonUser = Template.bind({});
SingleCommentWithNonUser.args = {
  isLoginedUser: false,
  data: CommnetData,
};

export const SingleCommentWithAdminUser = Template.bind({});
SingleCommentWithAdminUser.args = {
  isLoginedUser: true,
  isAdminUser: true,
  data: {
    ...CommnetData,
    onDeleteComment: function onDelete() {
      console.log("delete");
    },
  },
};

export const MyComment = Template.bind({});
MyComment.args = {
  isLoginedUser: true,
  data: {
    ...CommnetData,
    onDeleteComment: function onDelete() {
      console.log("delete");
    },
    onEditComment: function onEdit() {
      console.log("edit");
    },
  },
  isMine: true,
};

export const AdminComment = Template.bind({});
AdminComment.args = {
  isLoginedUser: true,
  data: {
    ...CommnetData,
    user: {
      ...CommnetData.user,
      isAdmin: true,
      nickName: "노써치",
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
    },
  },
};

const AnswerCommentData = [
  {
    id: 1608,
    user: {
      nickName: "노써치",
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
      isAdmin: true,
    },
    content:
      "모델코드이 동일하다면 판매처와 무관하게 제품은 동일합니다.\n다만, 비슷한 등급의 모델이 판매처에 따라 약간의 부가기능 차이를 두면서 모델코드를 한두자리 바꾸어 판매되기도 합니다.\n원하는 모델은 정하시고 가장 저렴한 곳에서 구매하시면 됩니다.\n\n공식판매점이라고 하는 곳은 제조사에서 인증해주는 판매처이니 안심하고 구매하셔도 됩니다.\n\nTV전용과 모니터 겸용은 출력되는 시간차이인데, 결론적으로는 TV로 사용하신다면 TV전용으로 구매하셔도 무방합니다.\n다만, 말씀하신 두 제품의 해상도의 차이가 있기 때문에 조금 더 좋은 화질을 찾으신다면 32인치 FHD 제품을 추천드립니다.",
    likeStatus: true,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onReplyComment: function reply() {
      console.log("reply 1608");
    },
    onLikeComment: function like() {
      console.log("like");
    },
  },
  {
    id: 1609,
    user: {
      nickName: "aichanr***",
      profileImage:
        "https://nosearch.com/static/webp/images/profile_default_image.webp",
      isAdmin: false,
    },
    content:
      "답변해주셔서 정말 감사합니다. \n죄송하지만 딱 두개만 더 질문하고 싶은데요.\n답변글을 읽다가 잘 이해가 안가는 부분 'TV전용으로 구매해도 무방하다'는 말씀이 혹 모니터 겸용이 아닌지, \n그리고 32인치 FHD 제품의 출시년월이 16년6월이고 32인치 HD 제품의 출시년월이 19년 3월인데 최신이라고 꼭 나은거 아닌거죠?",
    likeStatus: false,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onLikeComment: function like() {
      console.log("like");
    },
    onReplyComment: function reply() {
      console.log("reply 1609");
    },
  },
];
export const AnswerComments = Template.bind({});
AnswerComments.args = {
  isLoginedUser: true,
  data: {
    ...CommnetData,
    answerCommentsCount: AnswerCommentData.length,
    answerComments: AnswerCommentData,
  },
};

export const AnswerCommentsWithAdminUser = Template.bind({});
AnswerCommentsWithAdminUser.args = {
  isLoginedUser: true,
  isAdminUser: true,
  data: {
    ...CommnetData,
    answerCommentsCount: AnswerCommentData.length,
    answerComments: AnswerCommentData,
  },
};

const Answer5CommentData = [
  {
    id: 1608,
    user: {
      nickName: "노써치",
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
      isAdmin: true,
    },
    content:
      "모델코드이 동일하다면 판매처와 무관하게 제품은 동일합니다.\n다만, 비슷한 등급의 모델이 판매처에 따라 약간의 부가기능 차이를 두면서 모델코드를 한두자리 바꾸어 판매되기도 합니다.\n원하는 모델은 정하시고 가장 저렴한 곳에서 구매하시면 됩니다.",
    likeStatus: true,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onReplyComment: function reply() {
      console.log("reply 1608");
    },
    onLikeComment: function like() {
      console.log("like");
    },
  },
  {
    id: 1609,
    user: {
      nickName: "aichanr***",
      profileImage:
        "https://nosearch.com/static/webp/images/profile_default_image.webp",
      isAdmin: false,
    },
    content:
      "답변해주셔서 정말 감사합니다. \n죄송하지만 딱 두개만 더 질문하고 싶은데요.",
    likeStatus: false,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onLikeComment: function like() {
      console.log("like");
    },
    onReplyComment: function reply() {
      console.log("reply 1609");
    },
  },
  {
    id: 1608,
    user: {
      nickName: "노써치",
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
      isAdmin: true,
    },
    content:
      "모델코드이 동일하다면 판매처와 무관하게 제품은 동일합니다.\n다만, 비슷한 등급의 모델이 판매처에 따라 약간의 부가기능 차이를 두면서 모델코드를 한두자리 바꾸어 판매되기도 합니다.\n원하는 모델은 정하시고 가장 저렴한 곳에서 구매하시면 됩니다.",
    likeStatus: true,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onReplyComment: function reply() {
      console.log("reply 1608");
    },
    onLikeComment: function like() {
      console.log("like");
    },
  },
  {
    id: 1609,
    user: {
      nickName: "aichanr***",
      profileImage:
        "https://nosearch.com/static/webp/images/profile_default_image.webp",
      isAdmin: false,
    },
    content: "답변해주셔서 정말 감사합니다. ",
    likeStatus: false,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onLikeComment: function like() {
      console.log("like");
    },
    onReplyComment: function reply() {
      console.log("reply 1609");
    },
  },
  {
    id: 1608,
    user: {
      nickName: "노써치",
      profileImage: "https://v2.nosearch.com/static/images/app_logo.png",
      isAdmin: true,
    },
    content:
      "모델코드이 동일하다면 판매처와 무관하게 제품은 동일합니다.\n다만, 비슷한 등급의 모델이 판매처에 따라 약간의 부가기능 차이를 두면서 모델코드를 한두자리 바꾸어 판매되기도 합니다.\n원하는 모델은 정하시고 가장 저렴한 곳에서 구매하시면 됩니다.\n\n공식판매점이라고 하는 곳은 제조사에서 인증해주는 판매처이니 안심하고 구매하셔도 됩니다.\n\nTV전용과 모니터 겸용은 출력되는 시간차이인데, 결론적으로는 TV로 사용하신다면 TV전용으로 구매하셔도 무방합니다.\n다만, 말씀하신 두 제품의 해상도의 차이가 있기 때문에 조금 더 좋은 화질을 찾으신다면 32인치 FHD 제품을 추천드립니다.",
    likeStatus: true,
    createdAt: "2020-10-12T08:56:48.000Z",
    answerCommentsCount: 0,
    answerComments: [],
    onReplyComment: function reply() {
      console.log("reply 1608");
    },
    onLikeComment: function like() {
      console.log("like");
    },
  },
];

export const Answer5Comments = Template.bind({});
Answer5Comments.args = {
  isLoginedUser: true,
  data: {
    ...CommnetData,
    answerCommentsCount: Answer5CommentData.length,
    answerComments: Answer5CommentData,
  },
};
