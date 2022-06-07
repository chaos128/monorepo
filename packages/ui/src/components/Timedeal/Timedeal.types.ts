// Generated with util/create-component.js
export interface TimedealProps {
  data: ItemProps;
  isLogin?: boolean;
}

export interface ItemProps {
  goodsNo: string;
  goodsName: string;
  brandName: string;
  goodsPrice: number;
  fixedPrice: number;
  imageUrl?: string;
  ImageWrapper?: JSX.Element;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  periodDiscountStart: string;
  periodDiscountEnd: string;
  benefitUseType: string;
  goodsAccess: "all" | "member";
}
