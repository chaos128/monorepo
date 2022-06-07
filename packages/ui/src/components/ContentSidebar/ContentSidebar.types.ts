// Generated with util/create-component.js
export interface ContentSidebarProps {
  type: "purchaseGuide" | "encyclopedia";
  data: IContentSidebarData;
}

export interface IContentSidebarData {
  category: string;
  likeCount?: number;
  likeStatus?: boolean;
  ShareButton: Function;
  BookmarkButton: Function;
  commentCount?: number;
  CommentButton: Function;
  RecommendProductsButton: Function;
  indexData?: purchaseGuideIndex[];
}

export type purchaseGuideIndex = {
  title: string;
  desc: string;
  onClickIndex: Function;
};
