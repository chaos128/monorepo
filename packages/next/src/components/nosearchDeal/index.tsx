import {
  Button,
  Caret,
  Heading,
  NosearchDeal as NrcNosearchDeal,
  SlideWrapper,
  Text,
} from "@nosearch/ui";
import { INosearchDealData } from "@nosearch/ui/src/components/NosearchDeal/NosearchDeal.types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "../../components/Link";
import { INosearchDealRefinedProductData } from "../../hooks/api/useNosearchDeal";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";

const NosearchDealProductContentPresenter = ({
  data,
  viewType,
}: {
  data: INosearchDealRefinedProductData[];
  viewType: "home" | "pick";
}) => {
  const { isMobile } = useMobileDetect();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-1 pt-[3rem] pb-[6rem] pc:bg-white">
      <Link href={"/store/nosearchDeal"} passHref>
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
            노써치 공동구매 🌟
          </Heading>
        </div>
      </Link>
      <NosearchDealView data={data} isMobile={isMobile} viewType={viewType} />

      {isMobile && (
        <Link href={"/store/nosearchDeal"} passHref>
          <div className="mt-[3rem] flex justify-center px-[2rem]">
            <Button
              size="xl"
              type="outline"
              radius="s"
              color="blue"
              suffix={
                <div className="rotate-90">
                  <Caret size={"2.4rem"} color="#256FFF" />
                </div>
              }
              className="w-full"
            >
              공동구매 더보기
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NosearchDealProductContentPresenter;

const NosearchDealView = ({
  data,
  isMobile,
  viewType,
}: {
  data: INosearchDealRefinedProductData[];
  isMobile: boolean;
  viewType: "home" | "pick";
}) => {
  const getClickUrl = (num: number) =>
    `https://${
      isMobile ? "m." : ""
    }store.nosearch.com/goods/goods_view.php?goodsNo=${data[num]?.goodsCd}`;

  const nsDealData = (num: number): INosearchDealData => {
    const _data = { ...data[num] };
    return {
      ..._data,
      goodsNo: _data.goodsCd ?? "",
      videoThumbnail: _data.videoThumbnail ?? "",
      isComingSoon: _data.isComingSoon ?? false,
      comingSoonImg: _data.videoThumbnail ?? undefined,
      periodDiscountStart: _data.periodDiscountStart ?? "",
      periodDiscountEnd: _data.periodDiscountEnd ?? "",
      benefitUseType: _data.benefitUseType ?? "",
      soldOutFl: _data.soldOutFl === "y" ? "y" : "n",
      // 공동구매는 항상 특가 O,
      hasSpecialPrice: true,
      // TODO: 쿠폰 특가 확인 필요
      hasCouponDiscount: false,
      ImageWrapper: _data.videoThumbnail ? (
        <NextImageWrapper
          nextjsRenderer={() => (
            <Image
              src={_data.videoThumbnail ?? ""}
              alt={_data.title}
              layout="fill"
            />
          )}
        />
      ) : undefined,
    };
  };

  const MobileContent = () => {
    return (
      <LoadOnViewPort height="86rem">
        <Link href={getClickUrl(0)} passHref>
          <a>
            <NrcNosearchDeal
              viewType={viewType}
              type="nosearchDeal"
              data={nsDealData(0)}
            />
          </a>
        </Link>
        {data.length > 1 && (
          <div className="pt-[8rem]">
            <DelayLoading>
              <Link href={getClickUrl(1)} passHref>
                <a>
                  <NrcNosearchDeal
                    viewType={viewType}
                    type="nosearchDeal"
                    data={nsDealData(1)}
                  />
                </a>
              </Link>
            </DelayLoading>
          </div>
        )}
      </LoadOnViewPort>
    );
  };

  const PcContent = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="50.9rem" key={`nsDeal_${i}`}>
        {i === 0 ? (
          <div className="pc:flex-shrink-0">
            <Link href={getClickUrl(0)} passHref>
              <a>
                <NrcNosearchDeal
                  viewType={viewType}
                  type="nosearchDeal"
                  data={nsDealData(0)}
                />
              </a>
            </Link>
          </div>
        ) : (
          <div className="pc:flex-shrink-0">
            <DelayLoading>
              <Link href={getClickUrl(i)} passHref>
                <a>
                  <NrcNosearchDeal
                    viewType={viewType}
                    type="nosearchDeal"
                    data={nsDealData(i)}
                  />
                </a>
              </Link>
            </DelayLoading>
          </div>
        )}
      </LoadOnViewPort>
    );
  });

  return (
    <div className="mx-[2rem] space-y-[5rem] pc:flex pc:space-y-0 pc:space-x-[4rem]">
      {isMobile ? (
        <MobileContent />
      ) : (
        <SlideWrapper size={2}>{PcContent}</SlideWrapper>
      )}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};
