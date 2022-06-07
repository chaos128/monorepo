// Generated with util/create-component.js
import React from "react";
import Text from "../UI/Text";
import { ScoreProps } from "./Score.types";

const Score: React.FC<ScoreProps> = (props) => {
  const { data, type } = props;

  return (
    <div data-testid="Score" className="nrc--Score">
      {Object.keys(data).map((key) => {
        if (data[`${key}`].score < 0) return;
        return (
          <div
            key={`nsPick_score_${key}`}
            className="grid gap-y-5 auto-rows-auto"
            style={{ gridTemplateColumns: "1fr 2fr 1.5fr" }}
          >
            <Text
              type="B10"
              className="pc:text-body-9 text-gray-10 line-clamp-1 mr-[1rem]"
            >
              {data[`${key}`].name}
            </Text>
            {ScoreBar({ score: data[`${key}`].score, type: type })}
            <Text
              type="B9"
              className="pc:text-body-8 text-gray-10 line-clamp-1"
            >
              {data[`${key}`].label}
            </Text>
          </div>
        );
      })}
    </div>
  );
};

export default Score;

const ScoreBar = (props: { score: number; type?: string }) => {
  const { score, type } = props;
  let color;
  if (score < 2) color = "#FF9900";
  else if (score < 3) color = "#FFE14D";
  else if (score < 4) color = "#06DB75";
  else if (score < 5) color = "#36B7FF";
  else if (score === 5) color = "#256FFF";

  return (
    <div className="flex items-center mb-[0.5rem] pr-[0.5rem]">
      <div
        className={`flex-shrink-0 w-[6rem] bg-gray-2 rounded-full h-[0.7rem] mr-[0.5rem] ${
          type !== "pick" && "pc:w-[12rem]"
        }`}
      >
        <div
          className="h-[0.7rem] rounded-full"
          style={{ width: `${score * 20}%`, backgroundColor: `${color}` }}
        ></div>
      </div>
      <Text type="D3" className="text-gray-6">
        {score}
      </Text>
      <hr className="w-full border-dashed border-[1px] border-gray-3 mx-[0.4rem]"></hr>
    </div>
  );
};
