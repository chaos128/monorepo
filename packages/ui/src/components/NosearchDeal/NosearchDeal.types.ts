export interface NosearchDealProps {
  data: INosearchDealData;
  viewType: "home" | "pick";
  type?: "nosearchDeal" | "reviewTem";
  fluid?: boolean;
  isLogin?: boolean;
  isIOSApp?: boolean;
}

export interface INosearchDealData {
  title: string;
  description: string;
  dealGoodsNm: string;
  goodsNo: string;
  discountedPrice: number;
  originPrice: number;
  video: string;
  videoThumbnail: string;
  isComingSoon: boolean;
  comingSoonImg?: string;
  ImageWrapper?: JSX.Element;
  periodDiscountEnd: string;
  periodDiscountStart: string;
  benefitUseType: string;
  goodsAccess: "all" | "member";
  soldOutFl: "y" | "n";
  hasSpecialPrice: boolean; // 특가
  hasCouponDiscount: boolean; // 쿠폰적용 특가
}
