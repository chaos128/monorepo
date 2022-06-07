export interface PurchaseGuideProps {
  viewType:
    | "home"
    | "pick"
    | "productDetail"
    | "purchaseGuideOverview"
    | "purchaseGuide";
  data: IPurchaseGuideData;
}
export interface IPurchaseGuideData {
  thumbnail: string;
  ImageWrapper?: JSX.Element;
  parentCategoryKey: string;
  categoryKey: string;
  categoryName: string;
  title: string;
  description?: string;
}
