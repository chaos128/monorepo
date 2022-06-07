export interface ProductDetailTitleProps {
  data: IProductDetailTitleData;
}

export interface IProductDetailTitleData {
  goodsName: string;
  modelName: string;
  brandName: string;
  productCategory: string;
  price: string;
  images: string[];
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  reviewAvg?: number;
  reviewCnt?: number;
  colors?: string;
  likeCount?: number;
  likeStatus?: boolean;
  compareStatus?: boolean;
  PayButton: Function;
  ShareButton: Function;
  BookmarkButton: Function;
  CompareButton: Function;
  ReviewButton?: Function;
}
