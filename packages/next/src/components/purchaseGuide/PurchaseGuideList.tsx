import { Button, Caret, Heading } from "@nosearch/ui";
import { useMemo } from "react";
import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { usePurchaseGuide } from "../../hooks/api/usePurchaseGuide";
import { HomeParentKey } from "../../pageComponents/Home";
import { parentCategoryMap } from "../../shared/meta";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";
import NewPurchaseGuide, {
  PurchaseGuideLocationType,
} from "./NewPurchaseGuide";

const PurchaseGuideList = ({
  parentKey,
  viewType,
}: {
  parentKey: HomeParentKey;
  viewType: PurchaseGuideLocationType;
}) => {
  const { resultData: data, isLoading } = usePurchaseGuide({
    type: "home_true",
    productCategoryKeys: parentKey ? parentKey : "all",
    take: 4,
    sort: "popular",
  });

  const parentCategoryKr = useMemo(() => {
    if (parentKey === "all") {
      return "인기";
    } else {
      return parentCategoryMap[parentKey];
    }
  }, [parentKey]);

  const { categoryMap } = useCategories();

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className={`${viewType === "productDetail" && "pc:w-[55.5rem]"}`}>
      {(viewType === "productDetail" || viewType === "pick") && (
        <Spacing
          className="pc:hidden"
          width="100%"
          height="1rem"
          bg="#F9F9F9"
          shadow
        />
      )}
      <div className="pt-[3rem] pb-[6rem] pc:mx-auto pc:max-w-[80rem] pc:pb-[10rem]">
        {viewType === "home" && (
          <Link href={"/contents/guide"} passHref>
            <div className="mx-[2rem] mb-[2rem]">
              <Heading
                level={4}
                className="pc:text-heading-3"
                suffix={
                  <div>
                    <span className="pc:hidden">
                      <Caret size={"2.4rem"} />
                    </span>
                    <Button
                      size="s"
                      type="primary"
                      radius="s"
                      color="blue"
                      className="mobile:hidden"
                    >
                      구매가이드 모두 보기
                    </Button>
                  </div>
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
              level={4}
              className={"pc:text-heading-2 mobile:text-heading-4"}
              description={`${categoryMap[parentKey]?.name} 살 때 이것만큼은 꼭 기억하세요!`}
            >
              구매가이드 📖
            </Heading>
          </div>
        )}

        <div
          className={`mx-[2rem] mb-[2rem] space-y-[1.6rem] ${
            viewType === "pick" && "space-y-0 pc:mx-0"
          }`}
        >
          {data.map((_data, i: number) => {
            return (
              <LoadOnViewPort height="10rem" key={`purchaseGuide_${i}`}>
                <NewPurchaseGuide viewType={viewType} data={_data} />
              </LoadOnViewPort>
            );
          })}
        </div>

        {viewType === "home" && (
          <div className="pc:hidden">
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
          </div>
        )}
      </div>
    </section>
  );
};

export default PurchaseGuideList;
