import {
  Caret,
  Exhibition as NrcExhibition,
  Heading,
  SlideWrapper,
  Text,
} from "@nosearch/ui";
import { IExhibitionItemData } from "@nosearch/ui/src/components/Exhibition/Exhibition.types";
import Image from "next/image";
import { useEffect } from "react";
import Link from "../../components/Link";
import { IExhibitionItem } from "../../hooks/api/useExhibitionsPreview";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import NextImageWrapper from "../../shared/components/next-image";
import LoadOnViewPort from "../../wrappers/LoadOnViewport";
import Spacing from "../ui/spacing";

const ExhibitionContentPresenter = ({ data }: { data: IExhibitionItem[] }) => {
  const { isMobile } = useMobileDetect();
  if (!data || data.length === 0) return null;

  return (
    <section>
      {isMobile && <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />}
      <div className="mx-[2rem] pt-[3rem] pb-[4rem] pc:pb-[10rem]">
        <Link href={"/store/exhibition"} passHref>
          <div className="mb-[2rem]">
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
              놓치면 후회! 기획전
            </Heading>
          </div>
        </Link>
        <ExhibitionView data={data} isMobile={isMobile} />
      </div>
    </section>
  );
};

export default ExhibitionContentPresenter;

const ExhibitionView = ({
  data,
  isMobile,
}: {
  data: IExhibitionItem[];
  isMobile: boolean;
}) => {
  const isSingleExhibition = data.length === 1;
  const content = data.map((_data, i: number) => {
    return (
      <LoadOnViewPort height="26rem" key={`exhibition_${i}`}>
        {i === 0 ? (
          <ExhibitionBox
            data={_data}
            isSingleExhibition={isSingleExhibition}
            isMobile={isMobile}
          />
        ) : (
          <DelayLoading>
            <ExhibitionBox
              data={_data}
              isSingleExhibition={isSingleExhibition}
              isMobile={isMobile}
            />
          </DelayLoading>
        )}
      </LoadOnViewPort>
    );
  });

  return (
    <div
      className={`scrollbar-hide my-[2rem] flex space-x-[1.2rem] overflow-x-scroll pc:justify-between pc:pr-0 ${
        !isSingleExhibition && "pr-[2rem]"
      }`}
    >
      {isMobile ? content : <SlideWrapper size={2}>{content}</SlideWrapper>}
    </div>
  );
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};

const ExhibitionBox = ({
  data,
  isMobile,
  isSingleExhibition,
}: {
  data: IExhibitionItem;
  isMobile: boolean;
  isSingleExhibition: boolean;
}) => {
  const exhibitionData: IExhibitionItemData = {
    ...data,
    imageUrl: isMobile ? data.mImageUrl : data.pcImageUrl,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={isMobile ? data.mImageUrl : data.pcImageUrl}
            alt={data.title}
            // layout="fill"
            width={
              isMobile ? (isSingleExhibition ? "335rem" : "325rem") : "560rem"
            }
            height={isMobile ? "207rem" : "198rem"}
          />
        )}
      />
    ),
  };
  return (
    <Link href={`/store/exhibition/detail/${data.id}`} passHref>
      <a>
        <NrcExhibition data={exhibitionData} fluid />
      </a>
    </Link>
  );
};
