import { useSurveyConfigs } from "../../../hooks/api/useSurveyConfigs";
import Options from "./options";
import QuestionFooter from "./qeustionFooter";

const Question = ({
  parentCategory,
  category,
  questionNumber,
}: {
  parentCategory: string;
  category: string;
  questionNumber: string;
}) => {
  const { surveyConfigs } = useSurveyConfigs({
    param: { productCategoryKey: category, type: "survey" },
  });

  const qeustionData = surveyConfigs
    ? surveyConfigs.surveys[Number(questionNumber)]
    : undefined;

  if (!surveyConfigs || !qeustionData) {
    return null;
  }

  return (
    <div>
      <h1>{qeustionData.title}</h1>
      {qeustionData.description && <h3>{qeustionData.description}</h3>}
      <Options
        data={qeustionData.options}
        maxChoiceCount={qeustionData.maxChoiceCount}
      />
      <TipBox
        tipTitleSummary={qeustionData.tipTitleSummary}
        tipDescription={qeustionData.tipDescription}
      />
      <QuestionFooter
        parentCategory={parentCategory}
        category={category}
        data={qeustionData}
      />
    </div>
  );
};

export default Question;

const TipBox = ({
  tipTitleSummary,
  tipDescription,
}: {
  tipTitleSummary?: string;
  tipDescription?: string;
}) => {
  return (
    <div>
      <div>{tipTitleSummary}</div>
      <div>{tipDescription}</div>
    </div>
  );
};
