import {
  Button,
  Caret,
  Heading,
  SlideWrapper,
  StoreItem as NrcStoreItem,
  Text,
} from "@nosearch/ui";
import { IStoreItemData } from "@nosearch/ui/src/components/StoreItem/StoreItem.types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "../../components/Link";
import { IBestGoods } from "../../hooks/api/useBestGoodsPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";

const WeeklyBestContentPresenter = ({ data }: { data: IBestGoods[] }) => {
  const { isMobile } = useMobileDetect();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="pt-[3rem] pb-[4rem]">
        <Link href={"/store/best"} passHref>
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
              이번주 인기 상품 🛒
            </Heading>
          </div>
        </Link>

        <BestGoodsView data={data} isMobile={isMobile} />

        {isMobile && (
          <Link href={"/store/best"} passHref>
            <div className="flex justify-center px-[2rem]">
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                스토어 제품 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default WeeklyBestContentPresenter;

const BestGoodsView = ({
  data,
  isMobile,
}: {
  data: IBestGoods[];
  isMobile: boolean;
}) => {
  const content = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="14.4rem" key={`timedeal_${i}`}>
        {i === 0 ? (
          <BestGoodsBox data={_data} index={1} isMobile={isMobile} />
        ) : (
          <DelayLoading>
            <BestGoodsBox data={_data} index={i + 1} isMobile={isMobile} />
          </DelayLoading>
        )}
      </LoadOnViewPort>
    );
  });
  return (
    <div className="mx-[2rem] mb-[2rem] grid grid-cols-2 gap-[1.5rem] pc:flex">
      {isMobile ? content : <SlideWrapper size={4}>{content}</SlideWrapper>}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

const BestGoodsBox = ({
  data,
  index,
  isMobile,
}: {
  data: IBestGoods;
  index: number;
  isMobile: boolean;
}) => {
  const bestGoodsData: IStoreItemData = {
    ...data,
    type: "best",
    index,
    goodsName: data.goodsNm,
    brandName: data.brandName,
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    goodsAccess: data.goodsAccess === "member" ? "member" : "all",
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.imageUrl}
            alt={data.goodsNm}
            width={isMobile ? "160rem" : "270rem"}
            height={isMobile ? "160rem" : "270rem"}
            //layout="fill"
          />
        )}
      />
    ),
  };
  return (
    <Link
      href={`https://${
        isMobile ? "m." : ""
      }store.nosearch.com/goods/goods_view.php?goodsNo=${data.goodsNo}`}
      passHref
    >
      <a>
        <NrcStoreItem data={bestGoodsData} fluid />
      </a>
    </Link>
  );
};
