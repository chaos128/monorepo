import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useCompareOperations } from "../../../../hooks/api/useCompare";
import { useShareView } from "../../../../hooks/api/useShare";
import { useUserFavoriteOperations } from "../../../../hooks/api/useUserFavorite";

export const productCompareErrorAtom = atomWithReset<string>("");

export const useProductCompareError = () => {
  const [productCompareError, setProductCompareError] = useAtom(
    productCompareErrorAtom
  );
  const resetProductCompareErrorAtom = useResetAtom(productCompareErrorAtom);

  const onCompareError = (message: string) => {
    setProductCompareError(message);
  };

  return { onCompareError, resetProductCompareErrorAtom };
};

interface IUseProductActionProps {
  contentId: number;
  contentType: string;
  productCategoryKey: string;
  productData: any;
  onCompareError?: (value: string) => void;
}
export const useProductAction = ({
  contentId,
  contentType,
  productCategoryKey,
  productData,
  onCompareError,
}: IUseProductActionProps) => {
  const { putUserFavorite } = useUserFavoriteOperations(contentId, contentType);
  const { addCompareItem, deleteCompareItem } = useCompareOperations({
    categoryKey: productCategoryKey,
    onCompareError,
  });

  const onLikeItem = () => {
    if (!productData?.productId) {
      return;
    }
    putUserFavorite();
  };

  const { setShare } = useShareView();
  const onShareItem = () => {
    setShare();
  };

  const onCompareItem = () => {
    if (!productData?.productId) {
      return;
    }

    if (!productData.compareStatus) {
      addCompareItem(productData.productId);
    } else {
      deleteCompareItem(productData.productId);
    }
  };

  return { onLikeItem, onShareItem, onCompareItem };
};
