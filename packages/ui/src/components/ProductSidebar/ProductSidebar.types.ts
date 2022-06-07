export interface ProductSidebarProps {
  data: IProductSidebarData;
}

export interface IProductSidebarData {
  goodsName: string;
  modelName: string;
  brandName: string;
  image: string;
  ImageWrapper?: JSX.Element;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  likeCount?: number;
  likeStatus?: boolean;
  compareStatus?: boolean;
  PayButton: () => void;
  ShareButton: () => void;
  BookmarkButton: () => void;
  CompareButton: () => void;
  SpecButton: () => void;
}
