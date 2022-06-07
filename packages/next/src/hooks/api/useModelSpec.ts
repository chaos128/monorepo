import axios from "axios";
import { ISection } from "ns-ts-interfaces";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export interface IModelSpec {
  imageUrl: string | null;
  productCategoryKey: string;
  modelName: string;
  pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
  sections: ISection[];
}

export const generateModelSpecKey = (productCategoryKey: string) => {
  return ["getModelSpec", productCategoryKey];
};

export const fetchModelSpec = async (
  productCategoryKey: any,
  modelName: any
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/product/modelSpec?productCategoryKey=${productCategoryKey}&modelName=${modelName}`
  );
  return data;
};

export default function useModelSpec(
  productCategoryKey: string | null,
  modelName: string | null
) {
  const key = generateModelSpecKey(productCategoryKey as string);

  const { data, isLoading } = useQuery(key, () => {
    return fetchModelSpec(productCategoryKey, modelName);
  });

  return {
    modelSpecData: data ? (data.data as IModelSpec) : null,
    isLoading: isLoading,
  };
}
