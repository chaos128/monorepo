export interface ProductSidebarProps {
  data: IProductSidebarData;
}

export interface IProductSidebarData {
  goodsName: string;
  modelName: string;
  brandName: string;
  image: string;
  ImageWrapper?: ImageWrapper;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  likeCount?: number;
  likeStatus?: boolean;
  compareStatus?: boolean;
  PayButton: Function;
  ShareButton: Function;
  BookmarkButton: Function;
  CompareButton: Function;
  SpecButton: Function;
}
