import { ProductDetailTitle as NrcProductDetailOverview } from "@nosearch/ui";
import { useAtomValue } from "jotai/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { ISearchDocument } from "ns-ts-interfaces";
import useProductThumbnail from "../../../../hooks/api/useProductThumbnail";
import {
  shareCustomUrlAtom,
  shareTypeAtom,
} from "../../../../hooks/api/useShare";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import NextImageWrapper from "../../../../shared/components/next-image";
import { Share } from "../../../../shared/components/share";
import { IProductDetailProps } from "../type";
import {
  productCompareErrorAtom,
  useProductAction,
  useProductCompareError,
} from "./productOverviewHooks";

interface IProductOverviewProps extends IProductDetailProps {
  modelReviewData: ISearchDocument | null;
  productOverviewData: {
    brand: string;
    name: string;
    modelName: string;
    pickType: "none" | "best" | "plus" | "premium" | "cost_effective";
    imageUrl: string;
    likeCount: number | undefined;
    productId: number | undefined;
  };
  productReviewTabScroll?: number;
}

const ProductOverview = ({
  modelReviewData,
  productOverviewData,
  parentCategoryKey: storeCategoryKey,
  productCategoryKey,
  modelName,
  productReviewTabScroll,
}: IProductOverviewProps) => {
  const router = useRouter();
  const { isMobile } = useMobileDetect();

  const { data: productThumbnails } = useProductThumbnail({
    productCategoryKey: productCategoryKey,
    modelName: modelName,
    sameGroup: modelReviewData?.sameGroup ?? undefined,
  });

  const productCompareError = useAtomValue(productCompareErrorAtom);
  const shareType = useAtomValue(shareTypeAtom);
  const shareCustomUrl = useAtomValue(shareCustomUrlAtom);

  const { onCompareError } = useProductCompareError();

  const { onLikeItem, onShareItem, onCompareItem } = useProductAction({
    contentId: productOverviewData?.productId || 0,
    contentType: "product",
    productCategoryKey,
    productData: productOverviewData,
    onCompareError,
  });

  if (!modelReviewData || !productOverviewData || !productThumbnails) {
    return null;
  }
  const getImageWrappersForProductThumbnail: JSX.Element[] =
    productThumbnails.map((image: any, i: number) => (
      <NextImageWrapper
        key={`productThumbnail_${i}`}
        nextjsRenderer={() => (
          <Image
            src={image}
            alt={`productThumbnail_${i}`}
            width={isMobile ? "255rem" : "400rem"}
            height={isMobile ? "255rem" : "400rem"}
            //layout="fill"
            objectFit="contain"
            priority
          />
        )}
      />
    ));

  const productDetailTitleData: any /* IProductDetailTitleData */ = {
    ...modelReviewData,
    colors: modelReviewData.colors ?? undefined,
    goodsName: modelReviewData.name,
    brandName: modelReviewData.brand,
    productCategory: modelReviewData.group
      ? `${modelReviewData.group} ${modelReviewData.productCategoryName}`
      : modelReviewData.productCategoryName,
    images: [...productThumbnails],
    ImageWrappers: getImageWrappersForProductThumbnail,
    PayButton: function pay() {
      router.replace(
        `/product/${storeCategoryKey}/${productCategoryKey}/detail/${modelName}?purchaseFlag=true`,
        undefined,
        {
          scroll: false,
          shallow: true,
        }
      );
    },
    ShareButton: onShareItem,
    BookmarkButton: onLikeItem,
    CompareButton: onCompareItem,
    ReviewButton: function goProductReview() {
      productReviewTabScroll &&
        window.scrollTo({ top: productReviewTabScroll, behavior: "smooth" });
    },
  };

  return (
    <article className="mx-[2rem] mb-[3.2rem]">
      <NrcProductDetailOverview data={productDetailTitleData} />
      {productCompareError !== "" && <div>{productCompareError}</div>}
      {shareType !== "" && (
        <Share type={shareType} customUrl={shareCustomUrl} />
      )}
    </article>
  );
};

export default ProductOverview;
