import {
  Button,
  Caret,
  // Close,
  Heading,
  /*  Modal,
     ModalBody,
     ModalHeader, */
  Text,
} from "@nosearch/ui";
import { IReview, ISearchDocument, ISpecReview } from "ns-ts-interfaces";
import { useEffect, useState } from "react";
import Spacing from "../../../../components/ui/spacing";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import { IProductDetailProps } from "../type";
import ScoreReview from "./scoreReview";

interface INosearchSpecReviewProps extends IProductDetailProps {
  specReviewData:
    | {
        [scoringRuleKey: string]: IReview;
      }
    | null
    | undefined;
  modelReviewData: ISearchDocument;
  nosearchSpecReviewTabScroll: number;
}

const NosearchSpecReview = ({
  specReviewData,
  modelReviewData,
  productCategoryKey,
  modelName,
  nosearchSpecReviewTabScroll,
  onLoad,
}: INosearchSpecReviewProps) => {
  const { isMobile } = useMobileDetect();

  useEffect(() => {
    if (specReviewData && onLoad)
      onLoad({
        type: "spec-analysis",
      });
  }, [specReviewData, onLoad]);

  const [isSpecOpened, setIsSpecOpened] = useState<boolean>(false);

  const [guideHeader, setGuideHeader] = useState<string>("");
  const [guideBody, setGuideBody] = useState<any[]>();
  const onClickPcModal = (bySymbol: ISpecReview, type: string) => {
    if (!bySymbol) {
      return;
    }

    if (type === "guide" && bySymbol.guide) {
      setGuideHeader(bySymbol.guide.title);
      setGuideBody(textToParagraph(bySymbol.guide.content));
    } else if (type === "issue" && bySymbol.issue) {
      setGuideHeader(bySymbol.issue.title);
      setGuideBody(textToParagraph(bySymbol.issue.content));
    }

    open();
  };

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  if (!specReviewData || !modelReviewData) {
    return null;
  }

  return (
    <div className="mt-[4rem] pb-[6rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[2rem] pc:mx-0 pc:pb-[3rem] pc:text-center">
        <Heading level={2} className="text-gray-10">
          스펙분석
        </Heading>
      </div>

      <div
        className={`relative space-y-[6rem] px-[2rem] ${
          !isSpecOpened && isMobile && "h-[80rem] overflow-hidden"
        }`}
      >
        {modelReviewData.scoringRules.map((scoringRuleKey: any, i: number) => {
          return (
            <ScoreReview
              index={i}
              key={scoringRuleKey}
              scoringRuleKey={scoringRuleKey}
              modelReviewData={modelReviewData}
              onClickPcModal={onClickPcModal}
            />
          );
        })}
        {!isSpecOpened && isMobile && (
          <div className="absolute bottom-0 h-[25rem] w-full bg-gradient-to-t from-white"></div>
        )}
      </div>

      {isMobile && (
        <div
          className={`mx-[2rem] pc:text-center ${isSpecOpened && "mt-[2rem]"}`}
        >
          <Button
            size="xl"
            type="outline"
            radius={isMobile ? "xl" : "s"}
            className={`${isMobile ? "w-full" : "w-[50%]"}`}
            suffix={
              <div
                className={`${!isSpecOpened ? "rotate-90" : "rotate-[270deg]"}`}
              >
                <Caret size={"2rem"} color="#256FFF" />
              </div>
            }
            onClick={() => {
              if (isSpecOpened)
                window.scrollTo({ top: nosearchSpecReviewTabScroll - 50 });
              setIsSpecOpened(!isSpecOpened);
            }}
          >
            스펙분석 {!isSpecOpened ? "펼치기" : "접기"}
          </Button>
        </div>
      )}

      {/* {guideHeader !== "" && (
        <Modal
          visible={false}
          onClose={() => {}}
          drawer={isMobile}
          styleFor={{
            modalWidth: "max-w-[80rem]",
            modalHeight: "h-[50rem]",
            showScroll: true,
            radius: `${isMobile ? "rounded-t-[10px]" : "rounded-[10px]"}`,
          }}
        >
          <ModalHeader>
            <div className="p-[2rem] pt-[4rem] pc:p-[3rem]">
              <Heading
                level={4}
                suffix={
                  <div
                    className="hidden cursor-pointer pc:block"
                    onClick={() => {
                      close();
                    }}
                  >
                    <Close size="2.4rem" />
                  </div>
                }
                className="pc:text-center pc:text-heading-1 pc:font-extrabold"
              >
                {guideHeader}
              </Heading>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="p-[2rem] pt-0 pc:p-[3rem] pc:pt-0">{guideBody}</div>
          </ModalBody>
        </Modal> 
      )} */}
    </div>
  );
};

export default NosearchSpecReview;

export const textToParagraph = (str: string) => {
  const divs: any[] = [];
  if (!str) return;

  str.split("\n").map((line, i) => {
    if (line.startsWith("$")) {
      const imageUrl = line.replace("$[", "").replace("]", "");
      divs.push(
        <div key={i}>
          {/* <div className="w-1/2 h-auto relative">
            <Image
              src={imageUrl}
              alt={`reviewContent_${i}`}
              layout="fill"
              objectFit="contain"
            />
          </div> */}
          <img
            src={imageUrl}
            alt=""
            className="mb-[2rem] h-auto w-full pc:w-2/3"
          />
        </div>
      );
    } else {
      divs.push(
        <Text
          key={i}
          type="B4"
          className="whitespace-pre-wrap text-gray-10 pc:text-body-1"
        >
          {line.length === 0 ? <span>&nbsp;</span> : line}
        </Text>
      );
    }
  });

  return divs;
};
