import { Encyclopedia as NrcEncyclopedia, Heading } from "@nosearch/ui";
import { IEncyclopediaItemData } from "@nosearch/ui/src/components/Encyclopedia/Encyclopedia.types";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { IPurchaseGuideOverviewProps } from ".";
import Spacing from "../../../../components/ui/spacing";
import {
  IAppliancesInfoData,
  useAppliancesInfo,
  useInfiniteAppliancesInfo,
} from "../../../../hooks/api/useAppliancesInfo";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import NextImageWrapper from "../../../../shared/components/next-image";
import LoadOnViewPort from "../../../../wrappers/LoadOnViewport";

interface IEncyclopediaProps extends IPurchaseGuideOverviewProps {
  type: "videoEncyclopedia" | "encyclopedia";
}

const RelatedEncyclopedia = (props: IEncyclopediaProps) => {
  const { isMobile } = useMobileDetect();
  const { type, parentCategory, category } = props;

  // pc : all - infinite scroll
  const {
    encyclopediaList: encyclopediaAllList,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteAppliancesInfo({
    take: 8,
    productCategoryKeys: category,
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return;
    }
    fetchNextPage();
  }, [inView]);

  // mobile: only video
  const { encyclopediaList: encyclopediaVideoList } = useAppliancesInfo(
    "encyclopedia",
    {
      productCategoryKeys: category,
      contentType: "video",
      take: 4,
    }
  );
  if (
    !encyclopediaAllList ||
    encyclopediaAllList.length === 0 ||
    !encyclopediaVideoList ||
    encyclopediaVideoList.length === 0
  ) {
    return null;
  }

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="pt-[3rem] pb-[6rem]">
        <div className="mx-[2rem] mb-[2rem]">
          <Heading level={2} className="text-gray-10">
            {type === "videoEncyclopedia"
              ? "생생한 성능테스트 🎬"
              : "가전백과 📚"}
          </Heading>
        </div>

        <EncyclopediaView
          type={type}
          isMobile={isMobile}
          data={
            isMobile && type === "videoEncyclopedia"
              ? encyclopediaVideoList
              : encyclopediaAllList
          }
        />
        <div ref={ref}></div>
      </div>
    </section>
  );
};

export default RelatedEncyclopedia;

const EncyclopediaView = (props: {
  type: "videoEncyclopedia" | "encyclopedia";
  isMobile: boolean;
  data: IAppliancesInfoData[];
}) => {
  const { type, isMobile, data } = props;
  return (
    <div
      className={`mx-[2rem]  ${
        isMobile && type === "videoEncyclopedia"
          ? "grid grid-cols-2 gap-x-[1.5rem] gap-y-[2rem]"
          : "space-y-[1.6rem]"
      } pcgap-x-[1.5rem] pc:grid pc:grid-cols-4 pc:gap-y-[2rem] pc:space-y-0`}
    >
      {data.map((_data, i: number) => {
        return (
          <LoadOnViewPort height="14.6rem" key={`encyclopedia_${i}`}>
            {i === 0 ? (
              <EncyclopediaBox type={type} isMobile={isMobile} data={_data} />
            ) : (
              <DelayLoading>
                <EncyclopediaBox type={type} isMobile={isMobile} data={_data} />
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

const EncyclopediaBox = (props: {
  type: "videoEncyclopedia" | "encyclopedia";
  isMobile: boolean;
  data: IAppliancesInfoData;
}) => {
  const { type, isMobile, data } = props;
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
          type={
            isMobile
              ? type === "videoEncyclopedia"
                ? "column"
                : "row"
              : "column"
          }
          data={encyclopediaData}
        />
      </a>
    </Link>
  );
};
