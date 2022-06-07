import { Button, Caret, Heading, SlideWrapper, Text } from "@nosearch/ui";
import Link from "../../components/Link";
import { INosearchDealRefinedProductData } from "../../hooks/api/useNosearchDeal";
import useNosearchDealPreview from "../../hooks/api/useNosearchDealPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";
import ReviewTem from "./ReviewTem";

const ReviewTemList = ({
  parentKey,
  viewType,
}: {
  parentKey: HomeParentKey;
  viewType: "home" | "pick";
}) => {
  const { data, isLoading } = useNosearchDealPreview({
    productCategoryKey: parentKey === "all" ? undefined : parentKey,
    isBeforeEventPeriod: false,
    isFillItem: true,
    size: 8,
  });
  const { isMobile } = useMobileDetect();

  if (!isLoading && (!data || data.length === 0)) {
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
                    <span className=" cursor-pointer">
                      <Caret size={"2.4rem"} />
                    </span>
                  ) : (
                    <div className=" flex cursor-pointer items-center space-x-[0.4rem]">
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

export default ReviewTemList;

const ReviewTemView = ({
  data,
  isMobile,
  viewType,
}: {
  data: INosearchDealRefinedProductData[] | null;
  isMobile: boolean;
  viewType: "home" | "pick";
}) => {
  const NUMBER_OF_SKELETONS = 2;

  const content = (data ?? Array(NUMBER_OF_SKELETONS).fill({})).map(
    (_data, i: number) => {
      return (
        <LoadOnViewPort
          height={isMobile ? "32.5rem" : "46rem"}
          key={`reviewTem_${i}`}
        >
          <ReviewTem data={_data} isMobile={isMobile} viewType={viewType} />
        </LoadOnViewPort>
      );
    }
  );
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
