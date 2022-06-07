// Generated with util/create-component.js

export interface StoreItemProps {
  isLogin?: boolean;
  data: IStoreItemData;
  fluid?: boolean;
}

export interface IStoreItemData {
  type?: "timedeal" | "best" | "none";
  index?: number;
  goodsNo: string;
  goodsName: string;
  brandName: string;
  imageUrl?: string;
  ImageWrapper?: JSX.Element;
  goodsPrice: number;
  fixedPrice: number;
  periodDiscountStart: string;
  periodDiscountEnd: string;
  pickType?: "none" | "best" | "plus" | "premium" | "cost_effective";
  benefitUseType: string;
  goodsAccess: "all" | "member";
}
