import { Button, Caret, Heading, Text } from "@nosearch/ui";
import { ISearchDocument } from "ns-ts-interfaces";
import { useMemo } from "react";
import Link from "../../components/Link";
import { useProductSearch } from "../../hooks/api/useProductSearch";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import { parentCategoryMap } from "../../shared/meta";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";
import NosearchPick from "./NosearchPick";

const NosearchPickList = ({ parentKey }: { parentKey: HomeParentKey }) => {
  const { isMobile } = useMobileDetect();
  const { productSearchData: data, isLoading } = useProductSearch({
    searchParam: {
      isPick: true,
      isRepresentative: true,
      productCategoryKey: parentKey ? parentKey : "all",
      sort: "popular",
    },
  });

  const parentCategoryKr = useMemo(() => {
    if (parentKey === "all") {
      return "인기";
    } else {
      return parentCategoryMap[parentKey];
    }
  }, [parentKey]);

  if (!isLoading && (!data || data.length === 0)) {
    return null;
  }

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="pt-[3rem] pb-[4rem]">
        <Link href={"/recommendation/item-list"} passHref>
          <div className="mx-[2rem] mb-[2rem]">
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
              {parentCategoryKr} 노써치픽 📌
            </Heading>
          </div>
        </Link>

        <NosearchPickView data={data} isMobile={isMobile} />

        {isMobile && (
          <Link href={"/recommendation/item-list"} passHref>
            <div className="flex justify-center px-[2rem]">
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                노써치픽 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default NosearchPickList;

const NosearchPickView = ({
  data,
  isMobile,
}: {
  data: ISearchDocument[] | null;
  isMobile: boolean;
}) => {
  const NUMBER_OF_SKELETONS = 6;

  return (
    <div className="mx-[2rem] mb-[2rem] space-y-[1.6rem] pc:grid pc:grid-cols-3 pc:gap-x-[2rem] pc:gap-y-[3rem] pc:space-y-0">
      {(data ?? Array(NUMBER_OF_SKELETONS).fill(null)).map(
        (_data, i: number) => {
          if ((isMobile && i > 2) || (!isMobile && i > 5)) return;
          return (
            <LoadOnViewPort
              height={isMobile ? "27.3rem" : "27.2rem"}
              key={`nosearchPick${i}`}
            >
              {_data && <NosearchPick data={_data} isMobile={isMobile} />}
            </LoadOnViewPort>
          );
        }
      )}
    </div>
  );
};
