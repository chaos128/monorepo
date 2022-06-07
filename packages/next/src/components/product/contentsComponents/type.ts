export interface IProductDetailProps {
  parentCategoryKey?: string;
  productCategoryKey: string;
  modelName: string;
  onLoad?: (params: { type: string; detailContent?: string }) => void;
}
