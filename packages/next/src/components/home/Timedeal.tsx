import {
  Button,
  Caret,
  Heading,
  SlideWrapper,
  StoreItem,
  Text,
  Timedeal as NrcTimedeal,
} from "@nosearch/ui";
import { ItemProps } from "@nosearch/ui/src/components/Timedeal/Timedeal.types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "../../components/Link";
import { IStoreGoods } from "../../hooks/api/useStoreGoodsList";
import useTimedealPreview from "../../hooks/api/useTimedealPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";

const Timedeal = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { data } = useTimedealPreview({
    relationCategoryKey: parentKey ? parentKey : "all",
    relationViewType: "home",
    size: 8,
  });
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="pt-[3rem] pb-[4rem]">
      <Link href={"/store/timedeal"} passHref>
        <div className="mx-[2rem]">
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
            최저가 도전! 타임딜 ⏰
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
              타임딜 더보기
            </Button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Timedeal;

const TimedealView = ({
  data,
  isMobile,
}: {
  data: IStoreGoods[];
  isMobile: boolean;
}) => {
  const content = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="14.4" key={`timedeal_${i}`}>
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
    <div className="scrollbar-hide m-[2rem] mr-0 flex space-x-[1.2rem] overflow-x-scroll pr-[2rem]">
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
    goodsName: data.goodsNm,
    brandName: data.brandName,
    periodDiscountStart: data.periodDiscountStart ?? "",
    periodDiscountEnd: data.periodDiscountEnd ?? "",
    benefitUseType: data.benefitUseType ?? "",
    goodsAccess: data.goodsAccess === "member" ? "member" : "all",
    pickType: data.pickType ? data.pickType : "none",
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

  if (isMobile) {
    return <NrcTimedeal data={timedealData} />;
  }

  return (
    <Link
      href={`https://${
        isMobile ? "m." : ""
      }store.nosearch.com/goods/goods_view.php?goodsNo=${data.goodsNo}`}
      passHref
    >
      <a>
        <StoreItem data={{ ...timedealData, type: "timedeal" }} fluid />
      </a>
    </Link>
  );
};
