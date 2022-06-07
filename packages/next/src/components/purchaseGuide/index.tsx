import {
  Button,
  Caret,
  Heading,
  PurchaseGuide as NrcPurchaseGuide,
} from "@nosearch/ui";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { IPurchaseGuide } from "../../hooks/api/usePurchaseGuide";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import NextImageWrapper from "../../shared/components/next-image";
import { parentCategoryMap } from "../../shared/meta";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";

const PurchaseGuideContentPresenter = ({
  viewType,
  parentKey,
  data,
}: {
  viewType: "productDetail" | "pick" | "home";
  parentKey: string;
  data: IPurchaseGuide[];
}) => {
  const { isMobile } = useMobileDetect();
  const { categoryMap } = useCategories();

  const parentCategoryKr = useMemo(() => {
    if (parentKey === "all") {
      return "인기";
    } else {
      return (parentCategoryMap as any)[parentKey];
    }
  }, [parentKey]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className={`${viewType === "productDetail" && "pc:w-[55.5rem]"}`}>
      {((isMobile && viewType === "productDetail") || viewType === "pick") && (
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      )}
      <div className="pt-[3rem] pb-[6rem] pc:mx-auto pc:max-w-[80rem] pc:pb-[10rem]">
        {viewType === "home" && (
          <Link href={"/contents/guide"} passHref>
            <div className="mx-[2rem] mb-[2rem]">
              <Heading
                level={4}
                className="pc:text-heading-3"
                suffix={
                  isMobile ? (
                    <Caret size={"2.4rem"} />
                  ) : (
                    <Button size="s" type="primary" radius="s" color="blue">
                      구매가이드 모두 보기
                    </Button>
                  )
                }
              >
                {parentCategoryKr} 구매가이드 📖
              </Heading>
            </div>
          </Link>
        )}
        {(viewType === "pick" || viewType === "productDetail") && (
          <div className="mx-[2rem] mb-[2rem] pc:text-center">
            <Heading
              level={isMobile ? 4 : 2}
              description={`${categoryMap[parentKey]?.name} 살 때 이것만큼은 꼭 기억하세요!`}
            >
              구매가이드 📖
            </Heading>
          </div>
        )}

        <PurchaseGuideView viewType={viewType} data={data} />

        {isMobile && viewType === "home" && (
          <Link href={"/contents/guide"} passHref>
            <div className="flex justify-center px-[2rem]">
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                구매가이드 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default PurchaseGuideContentPresenter;

const PurchaseGuideView = ({
  viewType,
  data,
}: {
  viewType: "productDetail" | "pick" | "home";
  data: IPurchaseGuide[];
}) => {
  return (
    <div
      className={`mx-[2rem] mb-[2rem] space-y-[1.6rem] ${
        viewType === "pick" && "space-y-0 pc:mx-0"
      }`}
    >
      {data.map((_data, i: number) => {
        return (
          <LoadOnViewPort height="26rem" key={`purchaseGuide_${i}`}>
            {i === 0 ? (
              <PurchaseGuideBox viewType={viewType} data={_data} />
            ) : (
              <DelayLoading>
                <PurchaseGuideBox viewType={viewType} data={_data} />
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

const PurchaseGuideBox = ({
  viewType,
  data,
}: {
  viewType: "productDetail" | "pick" | "home";
  data: IPurchaseGuide;
}) => {
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
