import axios from "axios";
import { IDocumentWithSpec } from "ns-ts-interfaces";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ICompareItemData } from "../../components/compare/type";
import { BASE_URL } from "../../shared/variables";

const generateCompareKey = (categoryKey: string) => {
  return ["getCompareItems", categoryKey];
};
const generateCompareSimilarGroupKey = (categoryKey: string) => {
  return ["getCompareSimilarGroup", categoryKey];
};

const fetchCompareItemsSpec = async (categoryKey: any) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/compare/specs?categoryKey=${categoryKey}`
  );
  return data;
};

const fetchCompareSimilarGroup = async (
  categoryKey: any,
  modelName: any,
  similarGroup: any
) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/compare/specsBySimilarGroup?categoryKey=${categoryKey}&modelName=${modelName}&similarGroup=${similarGroup}`
  );
  return data;
};

const putCompareItem = async (
  productId: number,
  onCompareError?: (value: string) => void
) => {
  try {
    const { data } = await axios.put(`${BASE_URL}/ns_api/v1/compare`, {
      productId: productId,
    });
    return data;
  } catch (error) {
    const errorRespose = (error as any).response.data;
    if (onCompareError && errorRespose.statusCode === 422) {
      onCompareError(errorRespose.message);
    }
  }
};

const deleteCompareItem = async (productId: number) => {
  const { data } = await axios.delete(`${BASE_URL}/ns_api/v1/compare`, {
    data: { productId: productId },
  });
  return data;
};

const useCompare = (categoryKey: string) => {
  const key = generateCompareKey(categoryKey);

  const { data, isLoading } = useQuery(key, () => {
    return fetchCompareItemsSpec(categoryKey);
  });

  return {
    compareItemsData: data ? (data as ICompareItemData[]) : null,
    isLoading: isLoading,
  };
};

const useCompareSimilarGroup = ({
  categoryKey,
  modelName,
  similarGroup,
}: ICompareProps) => {
  const key = generateCompareSimilarGroupKey(categoryKey);

  const { data, isLoading } = useQuery(key, () => {
    return fetchCompareSimilarGroup(categoryKey, modelName, similarGroup);
  });

  return {
    compareSimilarGroupData: data ? (data.specs as IDocumentWithSpec[]) : null,
    isLoading: isLoading,
  };
};

const useCompareOperations = ({
  categoryKey,
  onCompareError,
}: ICompareProps) => {
  const queryCache = useQueryClient();
  const key = generateCompareKey(categoryKey);

  const addCompareMutation = useMutation(
    (productId: number) => {
      if (onCompareError) return putCompareItem(productId, onCompareError);
      return putCompareItem(productId);
    },
    {
      onSuccess: (data) => {
        queryCache.invalidateQueries(key);
        return data;
      },
      onError: (error: any) => {
        const errorRespose = error.response.data;
        // TODO: 글로벌한 에러 처리
        throw errorRespose.statusCode;
      },
    }
  );

  const deleteCompareMutation = useMutation(
    (productId: number) => {
      return deleteCompareItem(productId);
    },
    {
      onSuccess: (data) => {
        queryCache.invalidateQueries(key);
        return data;
      },
    }
  );

  return {
    addCompareItem: addCompareMutation.mutateAsync,
    deleteCompareItem: deleteCompareMutation.mutate,
  };
};

interface ICompareProps {
  categoryKey: string;
  modelNames?: string | string[];
  modelName?: string;
  similarGroup?: string;
  productId?: number;
  onCompareError?: (value: string) => void;
}

export {
  generateCompareKey,
  generateCompareSimilarGroupKey,
  fetchCompareItemsSpec,
  fetchCompareSimilarGroup,
  deleteCompareItem,
  useCompare,
  useCompareSimilarGroup,
  useCompareOperations,
};
