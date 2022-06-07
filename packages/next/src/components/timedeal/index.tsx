import {
  Button,
  Caret,
  Heading,
  SlideWrapper,
  StoreItem as NrcStoreItem,
  Text,
} from "@nosearch/ui";
import { ItemProps } from "@nosearch/ui/src/components/Timedeal/Timedeal.types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "../../components/Link";
import { IStoreGoods } from "../../hooks/api/useStoreGoodsList";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";

interface ITimedealContentPresenterProps {
  data: IStoreGoods[];
  viewType?: "productDetail";
}

const TimedealContentPresenter = ({
  data,
  viewType,
}: ITimedealContentPresenterProps) => {
  const { isMobile } = useMobileDetect();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section>
      {viewType !== "productDetail" && (
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      )}
      <div className="pc:pb-[10rem pt-[3rem] pb-[6rem] pc:mx-[2rem]">
        <Link href={"/store/timedeal"} passHref>
          <div className="mx-[2rem] pc:mx-0">
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
              지금 할인 중이에요 🛒
            </Heading>
          </div>
        </Link>

        <TimedealView data={data} isMobile={isMobile} />

        {isMobile && (
          <Link href={"/store/timedeal"} passHref>
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

export default TimedealContentPresenter;

const TimedealView = ({
  data,
  isMobile,
}: {
  data: IStoreGoods[];
  isMobile: boolean;
}) => {
  const content = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="14.4rem" key={`timedeal_${i}`}>
        {i === 0 ? (
          <TimdealBox data={_data} isMobile={isMobile} />
        ) : (
          <DelayLoading>
            <TimdealBox data={_data} isMobile={isMobile} />
          </DelayLoading>
        )}
      </LoadOnViewPort>
    );
  });
  return (
    <div className="pc:scrollbar-hide m-[2rem] grid grid-cols-2 gap-y-[3rem] pc:mx-0 pc:mr-0 pc:flex pc:space-x-[1.2rem] pc:overflow-x-scroll pc:pr-[2rem]">
      {isMobile ? content : <SlideWrapper size={4}>{content}</SlideWrapper>}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

const TimdealBox = ({
  data,
  isMobile,
}: {
  data: IStoreGoods;
  isMobile: boolean;
}) => {
  const timedealData: ItemProps = {
    ...data,
    brandName: data.brandName,
    pickType: data.pickType ?? "none",
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    goodsAccess: data.goodsAccess === "member" ? "member" : "all",
    goodsName: data.goodsNm,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={`https://api.nosearch.com/ns_api/v1/product/storeImage?imageUrl=${data.imageUrl}`}
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
        <NrcStoreItem data={{ ...timedealData, type: "timedeal" }} fluid />
      </a>
    </Link>
  );
};
