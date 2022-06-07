import { PurchaseGuide as NrcPurchaseGuide } from "@nosearch/ui";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "../../../components/Link";
import {
  IPurchaseGuide,
  useInfinitePurchaseGuide,
} from "../../../hooks/api/usePurchaseGuide";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import NextImageWrapper from "../../../shared/components/next-image";
import LoadOnViewPort from "../../../wrappers/LoadOnViewport";
import CategoryTab from "../category/categoryTab";

const PurchaseGuideContents = ({
  selectedCategoryTab,
  selectedCategoryItem,
}: {
  selectedCategoryTab: string;
  selectedCategoryItem: string;
}) => {
  const {
    resultData: data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfinitePurchaseGuide({
    take: 15,
    type: "content",
    productCategoryKeys: selectedCategoryItem as string,
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  }, [inView]);

  if (!data) {
    return null;
  }

  return (
    <section>
      <CategoryTab
        viewType="purchaseGuide"
        selectedCategoryTab={selectedCategoryTab}
        selectedCategoryItem={selectedCategoryItem}
      />
      {data.length > 0 && (
        <>
          <PurchaseGuideView data={data} viewType="purchaseGuide" />
          <div ref={ref}></div>
          {/* TODO: isFetching 일 때 loading 추가 */}
        </>
      )}
    </section>
  );
};

export default PurchaseGuideContents;

const PurchaseGuideView = (props: {
  viewType: "productDetail" | "pick" | "home" | "purchaseGuide";
  data: IPurchaseGuide[];
}) => {
  const { viewType, data } = props;
  const { isMobile } = useMobileDetect();
  const CONTENT_COUNT = isMobile ? 5 : 15;

  return (
    <div className="space-y-[1.6rem] p-[2rem] pc:grid pc:grid-cols-4 pc:gap-x-[2rem] pc:gap-y-[5rem] pc:space-y-0 pc:p-[3rem]">
      {data.map((_data, i: number) => {
        if (i < CONTENT_COUNT) {
          return (
            <div key={`purchaseGuide_${i}`} className="h-[23.4rem]">
              <PurchaseGuideBox viewType={viewType} data={_data} />
            </div>
          );
        }

        return (
          <LoadOnViewPort height="23.5rem" key={`purchaseGuide_${i}`}>
            <DelayLoading>
              <PurchaseGuideBox viewType={viewType} data={_data} />
            </DelayLoading>
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

const PurchaseGuideBox = (props: {
  viewType: "productDetail" | "pick" | "home" | "purchaseGuide";
  data: IPurchaseGuide;
}) => {
  const { viewType, data } = props;

  const purchaseGuideData = {
    ...data,
    categoryKey: data.key,
    categoryName: data.name,
    description: data.outline,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.thumbnail}
            alt={data.title}
            layout="fill"
            className="object-cover"
          />
        )}
      />
    ),
  };
  return (
    <Link
      href={`/contents/guide/overview/${data.parentCategoryKey}/${data.key}`}
      passHref
    >
      <a>
        <NrcPurchaseGuide viewType={viewType} data={purchaseGuideData} />
      </a>
    </Link>
  );
};
