import { useAtomValue } from "jotai/utils";
import { SurveyConfig } from "ns-ts-interfaces";
import { useState } from "react";
import { useSurveyConfigs } from "../../../hooks/api/useSurveyConfigs";
import { nowIndexAtom } from "../store";
import { useCurationSurvey } from "../surveyHooks";

const QuestionFooter = ({
  parentCategory,
  category,
  data,
}: {
  parentCategory: string;
  category: string;
  data: SurveyConfig;
}) => {
  const {
    onRestSurvey,
    onResetSelectOptions,
    onClickNextQuestion,
    onGetSelectOption,
  } = useCurationSurvey();
  const nowIndex = useAtomValue(nowIndexAtom);

  const [hasItems, setHasItems] = useState<boolean>(true);

  const { fetchCuration, isLoading } = useSurveyConfigs({
    param: {
      productCategoryKey: category,
      type: "survey",
    },
    onCurationSuccess: (data) => {
      const { documents, total, allItemCount } = data;
      if (documents.length <= 0) {
        alert("선택하신 조건에 해당되는 제품이 없습니다.");
        setHasItems(false);
        onResetSelectOptions();
      }
    },
  });

  const onClickNextButton = () => {
    if (isLoading) {
      return;
    }

    const selected = onGetSelectOption({ data });
    fetchCuration({
      type: "survey",
      productCategoryKey: category,
      selected,
      size: 10,
    });
    if (hasItems) {
      onClickNextQuestion({ data, selectedOption: selected });
    }
  };

  return (
    <div className="space-x-3">
      {nowIndex > 0 && (
        <button
          type="button"
          onClick={() => {
            onRestSurvey(parentCategory, category);
          }}
        >
          다시하기
        </button>
      )}
      <button type="button" onClick={onClickNextButton}>
        다음
      </button>
    </div>
  );
};

export default QuestionFooter;
