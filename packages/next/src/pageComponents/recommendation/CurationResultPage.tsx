import { useAtomValue } from "jotai/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Result from "../../components/curation/result";
import { timeStampAtom } from "../../components/curation/store";
import { useCurationSurvey } from "../../components/curation/surveyHooks";

const CurationResultPage = () => {
  const router = useRouter();
  const { parentCategory, category, timestamp } = router.query;
  const _timeStamp = useAtomValue(timeStampAtom);
  const { onSetTimeStamp, onResetSortType } = useCurationSurvey();

  useEffect(() => {
    if (_timeStamp === "") return;
    if (timestamp) onSetTimeStamp(timestamp as string);
    router.replace(
      `/curation/${parentCategory}/${category}/result?timestamp=${_timeStamp}`
    );
  }, [_timeStamp]);

  useEffect(() => {
    onResetSortType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Result
        parentCategory={parentCategory as string}
        category={category as string}
        timestamp={timestamp as string}
      />
    </div>
  );
};

export default CurationResultPage;
