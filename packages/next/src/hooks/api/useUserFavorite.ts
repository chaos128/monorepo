import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../shared/variables";

export const generateUserFavoriteKey = (
  contentId: number,
  contentType: string
) => {
  return ["getFavoriteItems", contentId, contentType];
};

export const putUserFavorite = async (
  contentId: number,
  contentType: string
) => {
  const { data } = await axios.put(`${BASE_URL}/ns_api/v1/userFavorite`, {
    contentType,
    contentId,
  });
  return data;
};

const useUserFavoriteOperations = (contentId: number, contentType: string) => {
  const queryCache = useQueryClient();
  const key = generateUserFavoriteKey(contentId, contentType);

  const putUserFavoriteMutation = useMutation(
    () => {
      return putUserFavorite(contentId, contentType);
    },
    {
      onSuccess: (data) => {
        queryCache.invalidateQueries(key);
        return data;
      },
    }
  );

  return {
    putUserFavorite: putUserFavoriteMutation.mutateAsync,
  };
};

export { useUserFavoriteOperations };
