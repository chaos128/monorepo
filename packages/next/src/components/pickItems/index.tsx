import {
  Button,
  Heading,
  NosearchPick,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@nosearch/ui";
import {
  INosearchPickData,
  IReviewData,
} from "@nosearch/ui/src/components/NosearchPick/NosearchPick.types";
import Image from "next/image";
import { useRouter } from "next/router";
import { ISearchDocument } from "ns-ts-interfaces";
import { useEffect, useMemo } from "react";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { useItemReviews } from "../../hooks/api/useItemReviews";
import usePickItems from "../../hooks/api/usePickItems";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import { useMobileReivews } from "../home/mobileReivews/mobileReivewHooks";
import { useProductAction } from "../product/contentsComponents/productOverview/productOverviewHooks";
import { usePickItemsHooks } from "./pickItemsHooks";

const PickItems = ({
  productCategoryKey,
  parentKey,
  groupType,
}: {
  parentKey: HomeParentKey;
  productCategoryKey: string;
  groupType: string;
}) => {
  const router = useRouter();

  const currentUrl = `/recommendation/pick/${parentKey}/${productCategoryKey}`;

  const { pickItemsData, pickItemsGroupData } = usePickItems({
    isPick: true,
    isRepresentative: true,
    productCategoryKey,
    size: 100,
  });
  const { sortPickItems } = usePickItemsHooks();

  const hasGroups =
    pickItemsData?.groups && pickItemsData.groups.length > 1 ? true : false;

  const getPickItemsData = () => {
    if (!pickItemsData) {
      return;
    }
    if (!hasGroups) {
      return pickItemsData.documents;
    }

    const data = pickItemsGroupData.get(groupType);
    if (data) {
      return data;
    } else {
      return pickItemsGroupData.get(pickItemsData.groups[0]);
    }
  };

  useEffect(() => {
    if (pickItemsData?.groups[0] === undefined) {
      return;
    }
    router.replace(`${currentUrl}/${pickItemsData?.groups[0]}`, undefined, {
      scroll: false,
      shallow: true,
    });
  }, []);

  const tabWidthString = () => {
    if (!pickItemsData) {
      return "";
    }
    const numOfGroups = pickItemsData.groups.length;

    return `w-[${33.5 / numOfGroups}rem] pc:w-[${74 / numOfGroups}rem]`;
  };

  if (!pickItemsData || sortPickItems(getPickItemsData())?.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="mt-[4rem] pb-[6rem] pc:mx-auto pc:max-w-[80rem] pc:pb-[10rem]">
        <div className="mx-[2rem] pc:mx-0 pc:text-center">
          <Heading
            level={4}
            description={`엄선하여 고른 최고의 ${pickItemsData.documents[0].productCategoryName} 추천 제품`}
          >
            노써치픽 📌
          </Heading>
          <Button
            size="m"
            type="outline"
            radius="s"
            className="my-[2rem] w-full pc:w-[24rem]"
          >
            노써치픽은 어떻게 선정되나요?
          </Button>
          {/* TODO: 노써치픽 선정 내용 */}
          {/* <NsPickScoringRules productCategoryKey={productCategoryKey} />
      <NSPickHow /> */}
        </div>
        {hasGroups ? (
          <Tabs
            uniqueKey="pickGroup-tabs"
            defaultIndex={
              groupType ? pickItemsData.groups.indexOf(groupType) : 0
            }
          >
            <TabList sticky tabWidth={tabWidthString()}>
              {pickItemsData.groups.map((group, index) => {
                return (
                  <Tab
                    key={`nsPick_tabList_${index}`}
                    onTabClick={() => {
                      router.replace(`${currentUrl}/${group}`, undefined, {
                        scroll: false,
                        shallow: true,
                      });
                    }}
                  >
                    {group}
                  </Tab>
                );
              })}
            </TabList>
            <TabPanels>
              {pickItemsData.groups.map((index) => {
                return (
                  <TabPanel key={`nsPick_tabPanel_${index}`}>
                    {sortPickItems(getPickItemsData()) && (
                      <PickItemsView data={sortPickItems(getPickItemsData())} />
                    )}
                  </TabPanel>
                );
              })}
            </TabPanels>
          </Tabs>
        ) : (
          <div>
            {sortPickItems(getPickItemsData()) && (
              <PickItemsView data={sortPickItems(getPickItemsData())} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
export default PickItems;

const PickItemsView = ({ data }: { data: ISearchDocument[] | undefined }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="m-[2rem] space-y-[1.6rem] pc:mx-0">
      {data.length > 0 &&
        data.map((_data, i: number) => {
          return (
            // eslint-disable-next-line react/jsx-no-undef
            <LoadOnViewPort height="44rem" key={`pickItem_${i}`}>
              {i === 0 ? (
                <PickItemBox data={_data} />
              ) : (
                <DelayLoading>
                  <PickItemBox data={_data} />
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

const PickItemBox = ({ data }: { data: ISearchDocument }) => {
  const { isMobile } = useMobileDetect();
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
    goodsName: data.name,
    brandName: data.brand,
    BookmarkButton: () => {
      onLikeItem();
    },
    CompareButton: () => {
      onCompareItem();
    },
    reviews: parseReviews,
    ImageWrapper: data.imageUrl ? (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.imageUrl}
            alt={data.name}
            width={isMobile ? "120rem" : "180rem"}
            height={isMobile ? "120rem" : "180rem"}
            layout="responsive"
            objectFit="contain"
          />
        )}
      />
    ) : undefined,
  };

  return (
    <Link
      href={`/product/${parentCategory}/${data.productCategoryKey}/detail/${data.modelName}`}
      passHref
    >
      <a>
        <NosearchPick viewType="pick" data={nosearchPickData} />
      </a>
    </Link>
  );
};
