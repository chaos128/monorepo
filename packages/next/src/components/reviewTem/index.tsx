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
import Spacing from "../ui/spacing";

const ReviewTemPresenter = ({
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
    <section className={`${viewType === "pick" && "bg-blue-1 pc:bg-white"}`}>
      {isMobile && viewType === "home" && (
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      )}
      <div
        className={`pt-[3rem] pb-[6rem] ${
          viewType !== "home" && "pc:mx-auto pc:max-w-[80rem]"
        }`}
      >
        {viewType === "pick" && !isMobile ? (
          <div className="mb-[3rem] text-center">
            <Heading
              level={2}
              description={"먼저 써보고 우수한 제품을 소개해드려요!"}
            >
              이달의 리뷰템 💯
            </Heading>
          </div>
        ) : (
          <Link href={"/store/reviewTem"} passHref>
            <div className="mx-[2rem]">
              <Heading
                level={4}
                className="pc:text-heading-3"
                description={"먼저 써보고 우수한 제품을 소개해드려요!"}
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
                이달의 리뷰템 💯
              </Heading>
            </div>
          </Link>
        )}

        <ReviewTemView data={data} isMobile={isMobile} viewType={viewType} />

        {((isMobile && viewType === "home") ||
          (!isMobile && viewType === "pick")) && (
          <Link href={"/store/reviewTem"} passHref>
            <div
              className={`flex justify-center px-[2rem] ${
                !isMobile && viewType === "pick" && "mt-[3rem] mb-[10rem]"
              }`}
            >
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                이달의 리뷰템 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
      {!isMobile && viewType === "pick" && (
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      )}
    </section>
  );
};

export default ReviewTemPresenter;

const ReviewTemView = ({
  data,
  isMobile,
  viewType,
}: {
  data: INosearchDealRefinedProductData[];
  isMobile: boolean;
  viewType: "home" | "pick";
}) => {
  const content = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="43rem" key={`reviewTem_${i}`}>
        {i === 0 ? (
          <ReviewTemBox data={_data} isMobile={isMobile} viewType={viewType} />
        ) : (
          <DelayLoading>
            <ReviewTemBox
              data={_data}
              isMobile={isMobile}
              viewType={viewType}
            />
          </DelayLoading>
        )}
      </LoadOnViewPort>
    );
  });
  return (
    <div
      className={`scrollbar-hide m-[2rem] mr-0 flex space-x-[1.2rem] overflow-x-scroll pr-[2rem] ${
        viewType === "pick" &&
        "pc:m-0 pc:flex-col pc:space-x-0 pc:space-y-[3rem] pc:pr-0"
      }`}
    >
      {isMobile || viewType !== "home" ? (
        content
      ) : (
        <SlideWrapper size={2}>{content}</SlideWrapper>
      )}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

const ReviewTemBox = ({
  data,
  isMobile,
  viewType,
}: {
  data: INosearchDealRefinedProductData;
  isMobile: boolean;
  viewType: "home" | "pick";
}) => {
  const clickUrl = `https://${
    isMobile ? "m." : ""
  }store.nosearch.com/goods/goods_view.php?goodsNo=${data.goodsCd}`;
  const reviewTemData: INosearchDealData = {
    ...data,
    goodsNo: data.goodsCd ?? "",
    videoThumbnail: data.videoThumbnail ?? "",
    isComingSoon: data.isComingSoon ?? false,
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    soldOutFl: data.soldOutFl === "y" ? "y" : "n",
    // 리뷰템이므로 공동구매가 끝나서 특가 X,
    hasSpecialPrice: false,
    // TODO: 쿠폰 특가 확인 필요
    hasCouponDiscount: false,
    ImageWrapper: data.videoThumbnail ? (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.videoThumbnail ?? ""}
            alt={data.title}
            layout="fill"
            priority={viewType === "pick"}
          />
        )}
      />
    ) : undefined,
  };
  return (
    <Link href={clickUrl} passHref>
      <a>
        <NrcNosearchDeal
          viewType={viewType}
          data={reviewTemData}
          type="reviewTem"
        />
      </a>
    </Link>
  );
};
