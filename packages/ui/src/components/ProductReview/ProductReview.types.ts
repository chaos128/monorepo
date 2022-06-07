// Generated with util/create-component.js
export interface ProductReviewProps {
  data: IReviewData;
}

interface IReviewData {
  writerNm: string;
  goodsPt: number;
  regDt: string;
  content: string;
  imageUrls: string[];
  isUseful?: boolean;
  onClickUseful: Function;
}
