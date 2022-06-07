import { Button, Caret, Heading, SlideWrapper, Text } from "@nosearch/ui";
import { memo } from "react";
import Link from "../../components/Link";
import { IStoreGoods } from "../../hooks/api/useStoreGoodsList";
import useTimedealPreview from "../../hooks/api/useTimedealPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Timedeal from "./Timedeal";

const TimedealList = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { data, isLoading } = useTimedealPreview({
    relationCategoryKey: parentKey ? parentKey : "all",
    relationViewType: "home",
    size: 8,
  });
  const { isMobile } = useMobileDetect();

  if (!isLoading && (!data || data.length === 0)) {
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
            최저가 도전! 타임딜 ⏰
          </Heading>
        </div>
      </Link>

      <TimedealView data={data} isMobile={isMobile} isLoading={isLoading} />

      <div className="pc: hidden">
        <Link href={"/store/timedeal"} passHref>
          <div className="flex justify-center px-[2rem]">
            <Button
              size="xl"
              type="primary"
              radius="s"
              color="gray"
              suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
              className="w-full cursor-pointer"
            >
              타임딜 더보기
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default memo(TimedealList);

const TimedealView = ({
  data,
  isMobile,
  isLoading,
}: {
  data?: IStoreGoods[];
  isMobile: boolean;
  isLoading: boolean;
}) => {
  const NUMBER_OF_SKELETONS = 4;
  const content = (data ?? Array(NUMBER_OF_SKELETONS).fill({})).map(
    (_data, i: number) => {
      return (
        <LoadOnViewPort
          height={isMobile ? "14.4rem" : "38.8rem"}
          key={`timedeal_${i}`}
        >
          <Timedeal data={_data} isMobile={isMobile} isLoading={isLoading} />
        </LoadOnViewPort>
      );
    }
  );

  return (
    <div className="scrollbar-hide m-[2rem] mr-0 flex w-full space-x-[1.2rem] overflow-x-scroll pr-[2rem]">
      {isMobile ? content : <SlideWrapper size={4}>{content}</SlideWrapper>}
    </div>
  );
};
