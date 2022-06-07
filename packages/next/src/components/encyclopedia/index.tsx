import {
  Button,
  Caret,
  Encyclopedia as NrcEncyclopedia,
  Heading,
  Text,
} from "@nosearch/ui";
import { IEncyclopediaItemData } from "@nosearch/ui/src/components/Encyclopedia/Encyclopedia.types";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import Link from "../../components/Link";
import { IAppliancesInfoData } from "../../hooks/api/useAppliancesInfo";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { HomeParentKey } from "../../pageComponents/Home";
import NextImageWrapper from "../../shared/components/next-image";
import { parentCategoryMap } from "../../shared/meta";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";

const EncyclopediaContentPresenter = ({
  data,
  parentKey,
}: {
  data: IAppliancesInfoData[] | null;
  parentKey?: HomeParentKey;
}) => {
  const { isMobile } = useMobileDetect();

  const parentCategoryKr = useMemo(() => {
    if (!parentKey) {
      return "";
    }

    if (parentKey === "all") {
      return "인기";
    } else {
      return parentCategoryMap[parentKey];
    }
  }, [parentKey]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="pt-[3rem] pb-[4rem]">
        <Link href={"/contents/encyclopedia"} passHref>
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
              {parentCategoryKr + " "}가전백과 📚
            </Heading>
          </div>
        </Link>

        <EncyclopediaView data={data} isMobile={isMobile} />

        {isMobile && (
          <Link href={"/contents/encyclopedia"} passHref>
            <div className="flex justify-center px-[2rem]">
              <Button
                size="xl"
                type="primary"
                radius="s"
                color="gray"
                suffix={<Caret size={"2.4rem"} color="#1A1A1A" />}
                className="w-full"
              >
                가전백과 더보기
              </Button>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
};

export default EncyclopediaContentPresenter;

const EncyclopediaView = (props: {
  data: IAppliancesInfoData[];
  isMobile: boolean;
}) => {
  const { data, isMobile } = props;

  return (
    <div className="mx-[2rem] mb-[2rem] space-y-[1.6rem] pc:grid pc:grid-cols-4 pc:gap-[2rem] pc:space-y-0">
      {data.map((_data, i: number) => {
        return (
          <LoadOnViewPort height="26rem" key={`encyclopedia_${i}`}>
            {i === 0 ? (
              <EncyclopediaBox data={_data} isMobile={isMobile} />
            ) : (
              <DelayLoading>
                <EncyclopediaBox data={_data} isMobile={isMobile} />
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

const EncyclopediaBox = (props: {
  data: IAppliancesInfoData;
  isMobile: boolean;
}) => {
  const { data, isMobile } = props;

  const parentCategory = data.category.parentCategoryKey;
  const category = data.category.key;
  const isVideo = data.contentType === "video";
  const encyclopediaData: IEncyclopediaItemData = {
    ...data,
    isVideo,
    categoryKr: data.category.name,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.thumbnail}
            alt={data.title}
            layout="fill"
            objectFit="cover"
          />
        )}
      />
    ),
  };
  return (
    <Link
      href={
        isVideo && data.videoUrl
          ? data.videoUrl
          : `/contents/encyclopedia/${parentCategory}/${category}/${data.id}`
      }
      passHref
    >
      <a>
        <NrcEncyclopedia
          data={encyclopediaData}
          fluid
          type={isMobile ? "row" : "column"}
        />
      </a>
    </Link>
  );
};
