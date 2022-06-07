import { Heading, Score, Text } from "@nosearch/ui";
import { IScoreMetaMap, ISearchDocumentReview } from "ns-ts-interfaces";
import { IProductDetailProps } from "./type";

interface ISummaryProps extends IProductDetailProps {
  data: {
    reviewData: ISearchDocumentReview | undefined;
    twoLineSummary: string | undefined;
    scoreData: IScoreMetaMap;
    tagsData: string[];
  } | null;
}

const Summary = ({
  data: summaryData,
  productCategoryKey,
  modelName,
}: ISummaryProps) => {
  if (!summaryData) {
    return null;
  }

  return (
    <article className="mx-[2rem] mt-[4rem] pb-[6rem] pc:mt-[3rem]">
      <Heading level={2} className="mb-[2rem] text-gray-10 pc:text-center">
        요약
      </Heading>
      <div className="pc:mx-auto pc:w-[45rem]">
        <Score data={summaryData.scoreData} />
      </div>

      {summaryData.twoLineSummary && (
        <>
          <div className="my-[2rem] h-[1px] w-full bg-gray-3 pc:my-[3rem]"></div>

          <p
            className="text-heading-4 font-extrabold text-gray-10 pc:text-center pc:text-heading-3"
            dangerouslySetInnerHTML={{
              __html: summaryData.twoLineSummary.replace(/\n/g, "<br>") ?? "",
            }}
          />
        </>
      )}

      {summaryData.reviewData && (
        <Text
          type="B4"
          className="mt-[1.2rem] whitespace-pre-line text-gray-10 pc:text-body-1"
        >
          {summaryData.reviewData.summary}
        </Text>
      )}
    </article>
  );
};

export default Summary;
