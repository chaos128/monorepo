import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export const generateNosearchReviewKey = (productCategoryKey: string) => {
  return ["getNosearchReview", productCategoryKey];
};

export const fetchNosearchReview = async (
  productCategoryKey: any,
  modelName: any
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/nosearchReview?categoryKey=${productCategoryKey}&modelNm=${modelName}`
  );

  return data;
};

export default function useNosearchReview(
  productCategoryKey: string | null,
  modelName: string | null
) {
  const key = generateNosearchReviewKey(productCategoryKey as string);

  const { data, isLoading } = useQuery(key, () => {
    return fetchNosearchReview(productCategoryKey, modelName);
  });

  return {
    nosearchReviewData: data ? data : null,
    isLoading: isLoading,
  };
}
