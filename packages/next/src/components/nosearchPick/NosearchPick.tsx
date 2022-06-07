import { NosearchPick as NrcNosearchPick } from "@nosearch/ui";
import {
  INosearchPickData,
  IReviewData,
} from "@nosearch/ui/src/components/NosearchPick/NosearchPick.types";
import Image from "next/image";
import { ISearchDocument } from "ns-ts-interfaces";
import { useMemo } from "react";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { useItemReviews } from "../../hooks/api/useItemReviews";
import NextImageWrapper from "../../shared/components/next-image";
import { useMobileReivews } from "../home/mobileReivews/mobileReivewHooks";
import { useProductAction } from "../product/contentsComponents/productOverview/productOverviewHooks";

function NosearchPick({
  data,
  isMobile,
}: {
  data: ISearchDocument;
  isMobile: boolean;
}) {
  const { mainCategoryHintMap } = useCategories();
  const { onClickReivewModal, onSetClickedReview } = useMobileReivews();

  const { reviewList } = useItemReviews({
    ...data,
    dataSize: isMobile ? 4 : 6,
  });

  const parseReviews: IReviewData[] | undefined = useMemo(() => {
    if (reviewList) {
      return reviewList.map((review, index) => {
        return {
          type: review.reviewType,
          content:
            (review.description &&
              review.description.replace(/\n/g, "<br/>")) ||
            (review.title && review.title.replace(/\n/g, "<br/>")),
          onClickReview: () => {
            if (review.reviewType === "nosearch") return;
            onClickReivewModal();
            onSetClickedReview({
              type: review.reviewType,
              content:
                (review.description &&
                  review.description.replace(/\n/g, "<br/>")) ||
                (review.title && review.title.replace(/\n/g, "<br/>")),
              createdAt: review.createdAt,
              images: review.images,
              point: review.point,
              writer: review.writer,
            });
          },
        };
      });
    }
    return undefined;
  }, [reviewList]);

  const { onLikeItem, onCompareItem } = useProductAction({
    contentId: data.productId ?? 0,
    contentType: "product",
    productCategoryKey: data.productCategoryKey,
    productData: data,
  });
  const parentCategory = mainCategoryHintMap[data.productCategoryKey];
  const nosearchPickData: INosearchPickData = {
    ...data,
    colors: data.colors ?? undefined,
    goodsName: data.modelName,
    brandName: data.brand,
    BookmarkButton: () => {
      onLikeItem();
    },
    CompareButton: () => {
      onCompareItem();
    },
    reviews: parseReviews,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image src={data.imageUrl} alt={data.modelName} layout="fill" />
        )}
      />
    ),
  };

  return (
    <Link
      href={`/product/${parentCategory}/${data.productCategoryKey}/detail/${data.modelName}`}
      passHref
    >
      <a>
        <NrcNosearchPick viewType="home" data={nosearchPickData} />
      </a>
    </Link>
  );
}

export default NosearchPick;
