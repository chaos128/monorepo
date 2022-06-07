import { ISection } from "ns-ts-interfaces";

export interface ICompareItemData {
  imageUrl: string | null;
  productCategoryKey: string;
  modelName: string;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  sections: ISection[];
  productId: number;
}

export enum CategoryItem {
  LIVING = "living",
  KITCHEN = "kitchen",
  SEASON = "season",
  DIGITAL = "digitalit",
  ALL = "all",
  RECOMMEND = "recommend",
}

export interface ICategoryData {
  id: string;
  key: CategoryItem;
  name: string;
  itemList: IItemData[] | null;
  godoCategoryId: string;
}

export interface IItemData {
  id: string;
  key: string;
  name: string;
  isComingSoon: boolean;
  isNew: boolean;
  isUse: boolean;
  isFilterActivate: boolean;
  isPickActivate: boolean;
  isRecommendActivate: boolean;
  godoCategoryId: string;
  href?: string;
}
