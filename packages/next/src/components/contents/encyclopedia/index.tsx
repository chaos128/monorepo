import { Encyclopedia as NrcEncyclopedia } from "@nosearch/ui";
import { IEncyclopediaItemData } from "@nosearch/ui/src/components/Encyclopedia/Encyclopedia.types";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "../../../components/Link";
import {
  IAppliancesInfoData,
  useInfiniteAppliancesInfo,
} from "../../../hooks/api/useAppliancesInfo";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import NextImageWrapper from "../../../shared/components/next-image";
import LoadOnViewPort from "../../../wrappers/LoadOnViewport";
import CategoryTab from "../category/categoryTab";

const EncyclopediaContents = ({
  selectedCategoryTab,
  selectedCategoryItem,
}: {
  selectedCategoryTab: string;
  selectedCategoryItem: string;
}) => {
  const {
    encyclopediaList: data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteAppliancesInfo({
    take: 15,
    productCategoryKeys: selectedCategoryItem as string,
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) {
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
        viewType="encyclopedia"
        selectedCategoryTab={selectedCategoryTab}
        selectedCategoryItem={selectedCategoryItem}
      />
      {data.length > 0 && (
        <>
          <EncyclopediaView data={data} />
          <div ref={ref}></div>
          {/* TODO: isFetching 일 때 loading 추가 */}
        </>
      )}
    </section>
  );
};

export default EncyclopediaContents;

const EncyclopediaView = (props: { data: IAppliancesInfoData[] }) => {
  const { data } = props;
  const { isMobile } = useMobileDetect();
  const CONTENT_COUNT = isMobile ? 5 : 15;

  return (
    <div className="space-y-[1.6rem] p-[2rem] pc:grid pc:grid-cols-4 pc:gap-x-[2rem] pc:gap-y-[5rem] pc:space-y-0 pc:p-[3rem]">
      {data.map((_data, i: number) => {
        if (i < CONTENT_COUNT) {
          return (
            <div key={`encyclopedia_${i}`}>
              <EncyclopediaBox data={_data} isMobile={isMobile} />
            </div>
          );
        }

        return (
          <LoadOnViewPort height="50rem" key={`encyclopedia_${i}`}>
            <DelayLoading>
              <EncyclopediaBox data={_data} isMobile={isMobile} />
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

const EncyclopediaBox = (props: {
  data: IAppliancesInfoData;
  isMobile: boolean;
}) => {
  const { data, isMobile } = props;

  const parentCategory = data.category.parentCategoryKey;
  const category = data.category.key;
  const isVideo = data.contentType === "video";
  const encyclopediaData: IEncyclopediaItemData = {
    ...data,
    isVideo,
    categoryKr: data.category.name,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image src={data.thumbnail} alt={data.title} layout="fill" />
        )}
      />
    ),
  };
  return (
    <Link
      href={
        isVideo && data.videoUrl
          ? data.videoUrl
          : `/contents/encyclopedia/${parentCategory}/${category}/${data.id}`
      }
      passHref
    >
      <a>
        <NrcEncyclopedia
          data={encyclopediaData}
          fluid
          type={isMobile ? "row" : "column"}
        />
      </a>
    </Link>
  );
};
