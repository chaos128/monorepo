import {
  Button,
  Caret,
  Heading,
  NosearchPick as NrcNosearchPick,
  Text,
} from "@nosearch/ui";
import {
  INosearchPickData,
  IReviewData,
} from "@nosearch/ui/src/components/NosearchPick/NosearchPick.types";
import Image from "next/image";
import { ISearchDocument } from "ns-ts-interfaces";
import { useEffect, useMemo } from "react";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { useItemReviews } from "../../hooks/api/useItemReviews";
import { useProductSearch } from "../../hooks/api/useProductSearch";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import NextImageWrapper from "../../shared/components/next-image";
import { parentCategoryMap } from "../../shared/meta";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import { useProductAction } from "../product/contentsComponents/productOverview/productOverviewHooks";
import Spacing from "../ui/spacing";
import { useMobileReivews } from "./mobileReivews/mobileReivewHooks";

const NosearchPick = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { productSearchData: data } = useProductSearch({
    searchParam: {
      isPick: true,
      isRepresentative: true,
      productCategoryKey: parentKey ? parentKey : "all",
      sort: "popular",
    },
  });

  const parentCategoryKr = useMemo(() => {
    if (parentKey === "all") {
      return "인기";
    } else {
      return parentCategoryMap[parentKey];
    }
  }, [parentKey]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="pt-[3rem] pb-[4rem]">
        <Link href={"/recommendation/item-list"} passHref>
          <div className="mx-[2rem] mb-[2rem]">
            <Heading
              level={4}
              className="pc:text-heading-3"
              suffix={
                isMobile ? (
                  <Caret size={"2.4rem"} />
                ) : (
                  <div className="flex items-center space-x-[0.4rem]">
                    <Text type="B4" className="text-black">
                      더보기
                    </Text>
                    <Caret size={"2.4rem"} />
                  </div>
                )
              }
            >
              {parentCategoryKr} 노써치픽 📌
            </Heading>
          </div>
        </Link>

        <NosearchPickView data={data} isMobile={isMobile} />

        {isMobile && (
          <Link href={"/recommendation/item-list"} passHref>
            <div className="flex justify-center px-[2rem]">
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                노써치픽 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default NosearchPick;

const NosearchPickView = ({
  data,
  isMobile,
}: {
  data: ISearchDocument[];
  isMobile: boolean;
}) => {
  return (
    <div className="mx-[2rem] mb-[2rem] space-y-[1.6rem] pc:grid pc:grid-cols-3 pc:gap-x-[2rem] pc:gap-y-[3rem] pc:space-y-0">
      {data.map((_data, i: number) => {
        if ((isMobile && i > 2) || (!isMobile && i > 5)) return;
        return (
          <LoadOnViewPort height="43rem" key={`reviewTem_${i}`}>
            {i === 0 ? (
              <NosearchPickBox data={_data} isMobile={isMobile} />
            ) : (
              <DelayLoading>
                <NosearchPickBox data={_data} isMobile={isMobile} />
              </DelayLoading>
            )}
          </LoadOnViewPort>
        );
      })}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

const NosearchPickBox = ({
  data,
  isMobile,
}: {
  data: ISearchDocument;
  isMobile: boolean;
}) => {
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
};
