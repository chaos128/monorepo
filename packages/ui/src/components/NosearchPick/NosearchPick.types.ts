export interface NosearchPickProps {
  viewType: "home" | "pick";
  index?: number;
  data: INosearchPickData;
}

export interface INosearchPickData {
  goodsName: string;
  modelName: string;
  brandName: string;
  productCategoryName: string;
  price: string;
  imageUrl: string;
  ImageWrapper?: JSX.Element;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  likeStatus?: boolean;
  compareStatus?: boolean;
  reviewAvg?: number;
  reviewCnt?: number;
  reviews?: IReviewData[];
  colors?: string;
  scoreMetaMap?: { [key: string]: IScoreMetaMap };
  BookmarkButton: Function;
  CompareButton: Function;
  AllReviewsButton?: Function;
}

export interface IReviewData {
  type: "nosearch" | "user";
  content: string;
  createdAt?: string;
  images?: string[];
  point?: number;
  writer?: string;
}

export interface IScoreMetaMap {
  score: number;
  name: string;
  label: string;
}
