import { Button, Heading, Text } from "@nosearch/ui";
import { ISearchDocument, ISpecReview } from "ns-ts-interfaces";
import { textToParagraph } from "./nosearchSpecReview";

interface IScoreReviewProps {
  index: number;
  scoringRuleKey: string;
  modelReviewData: ISearchDocument | null;
  onClickPcModal?: (bySymbol: ISpecReview, type: string) => void;
}

const ScoreReview = ({
  modelReviewData: modelReview,
  index,
  scoringRuleKey,
  onClickPcModal,
}: IScoreReviewProps) => {
  if (!modelReview) {
    return null;
  }

  const reviewData = modelReview.reviewData;
  if (!reviewData) {
    return null;
  }

  const scoreMetaMap = modelReview.scoreMetaMap[scoringRuleKey];
  if (!scoreMetaMap) {
    return null;
  }

  const scoreReview = reviewData.reviewByScoringRuleMap[scoringRuleKey];
  if (!scoreReview) {
    return null;
  }

  return (
    <div>
      <div className="relative mb-[2rem] flex">
        <div className="mr-[1.2rem] flex h-[2.7rem] w-[2.7rem] items-center justify-center bg-gray-10">
          <Heading level={5} className="text-white">
            {index + 1}
          </Heading>
        </div>
        <Heading level={4} className="text-gray-10">
          {scoreMetaMap.name}
        </Heading>
      </div>

      <div>
        {scoreMetaMap.score > 0 && (
          <>
            <NSPointGauge point={scoreMetaMap.score} />
            <div className="relative border-b-[1px] border-gray-3 pt-[0.5rem] pb-[4rem]">
              {scoreReview.scoreIndexTextArray.map((text: any, i: number) => {
                const scoreIndex = Math.floor(scoreMetaMap.score / 1);
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ right: `${19 * (4 - i)}%` }}
                  >
                    <Text
                      type="B10"
                      className={`whitespace-nowrap p-[0.5rem] ${
                        i + 1 === scoreIndex
                          ? "font-[700] text-gray-10"
                          : "text-gray-6"
                      }`}
                    >
                      {text}
                    </Text>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="mt-[2rem]">
        {Object.keys(scoreReview.reviewBySpecMap)
          .sort((a, b) => {
            const aSortIndex = scoreReview.reviewBySpecMap[a].sortIndex;
            const bSortIndex = scoreReview.reviewBySpecMap[b].sortIndex;
            const aIndex =
              aSortIndex != undefined && aSortIndex > -1 ? aSortIndex : 100;
            const bIndex =
              bSortIndex != undefined && bSortIndex > -1 ? bSortIndex : 100;

            return aIndex - bIndex;
          })
          .map((symbol) => {
            const bySymbol = scoreReview.reviewBySpecMap[symbol];

            const hasContent =
              (bySymbol.title && bySymbol.title.length > 0) ||
              (bySymbol.content && bySymbol.content.length > 0) ||
              (bySymbol.summary && bySymbol.summary.length > 0) ||
              (bySymbol.guide &&
                bySymbol.guide.title &&
                bySymbol.guide.title.length > 0) ||
              (bySymbol.issue &&
                bySymbol.issue.title &&
                bySymbol.issue.title.length > 0);

            if (!hasContent) return null;
            const display =
              (bySymbol.summary && bySymbol.summary.length > 0) ||
              (bySymbol.content && bySymbol.content.length > 0);
            return (
              <div key={symbol}>
                {display && (
                  <div className="mt-[3rem]">
                    <div className="pc:flex pc:items-center pc:space-x-[1.2rem]">
                      <Heading level={5} className="mb-[1.2rem] text-gray-10">
                        {bySymbol.title}
                      </Heading>

                      {bySymbol.loadingRate && bySymbol.loadingRate > 0
                        ? !bySymbol.summary.startsWith("X") && (
                            <Text type="D1" className="mb-[1.2rem] text-gray-6">
                              {Math.round(bySymbol.loadingRate * 100)}% 제품에
                              탑재됨
                            </Text>
                          )
                        : null}
                    </div>

                    {bySymbol.summary && bySymbol.summary.length > 0 && (
                      <Heading level={6} className="text-gray-10">
                        {bySymbol.summary.startsWith("X")
                          ? bySymbol.summary.slice(1, bySymbol.summary.length)
                          : bySymbol.summary}
                      </Heading>
                    )}

                    {bySymbol.content && bySymbol.content.length > 0 && (
                      <div>{textToParagraph(bySymbol.content)}</div>
                    )}
                  </div>
                )}

                {bySymbol.guide &&
                  bySymbol.guide.title &&
                  bySymbol.guide.title.length > 0 && (
                    <Button
                      size="m"
                      type="outline"
                      radius="s"
                      className="mt-[3rem] w-full"
                      onClick={() => {
                        onClickPcModal && onClickPcModal(bySymbol, "guide");
                      }}
                    >
                      <Text type="B8">{bySymbol.guide.title}</Text>
                    </Button>
                  )}

                {bySymbol.issue &&
                  bySymbol.issue.title &&
                  bySymbol.issue.title.length > 0 && (
                    <Button
                      size="m"
                      type="outline"
                      color="gray"
                      radius="s"
                      className="mt-[1.2rem] w-full"
                      onClick={() => {
                        onClickPcModal && onClickPcModal(bySymbol, "issue");
                      }}
                    >
                      <Text type="B8" className="text-gray-10">
                        {bySymbol.issue.title}
                      </Text>
                    </Button>
                  )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ScoreReview;

const NSPointGauge = ({ point }: { point: any }) => {
  const getGraphColor = (value: number): string => {
    const integerValue = Math.floor(value / 1);
    const pointDotColor = [
      "#FF9900",
      "#FFE14D",
      "#06DB75",
      "#36B7FF",
      "#256FFF",
    ];
    return pointDotColor[integerValue - 1];
  };

  return (
    <div className="relative h-[1rem] w-full bg-gray-1">
      <div
        className="absolute top-0 left-0 h-[1rem]"
        style={{
          width: `${20 * point}%`,
          backgroundColor: getGraphColor(point),
        }}
      ></div>
    </div>
  );
};
