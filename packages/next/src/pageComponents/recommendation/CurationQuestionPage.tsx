import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Question from "../../components/curation/question";
import { nowIndexAtom } from "../../components/curation/store";
import { useCurationSurvey } from "../../components/curation/surveyHooks";

const CurationQuestionPage = () => {
  const router = useRouter();
  const { parentCategory, category, questionNumber } = router.query;

  const { onResetCurationAtoms } = useCurationSurvey();
  const nowIndex = useAtomValue(nowIndexAtom);

  useEffect(() => {
    onResetCurationAtoms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (nowIndex === -2) {
      router.replace(`/curation/${parentCategory}/${category}/result?`);
    } else {
      router.replace(
        `/curation/${parentCategory}/${category}/question?questionNumber=${nowIndex}`
      );
    }
  }, [nowIndex]);

  return (
    <div>
      <Question
        parentCategory={parentCategory as string}
        category={category as string}
        questionNumber={questionNumber as string}
      />
    </div>
  );
};

export default CurationQuestionPage;
