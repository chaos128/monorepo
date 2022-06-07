import { useScoringRule } from "../../hooks/api/useScoringRule";

const NsPickScoringRules = ({
  productCategoryKey,
}: {
  productCategoryKey: string;
}) => {
  const { data, isLoading } = useScoringRule({ productCategoryKey });

  if (!data) {
    return null;
  }
  return (
    <>
      <span>노써치의 선택 기준</span>
      <div>
        {Object.keys(data).map((key) => {
          return (
            <div key={key}>
              <div>{(data as any)[`${key}`].label}</div>
              <div>{(data as any)[`${key}`].title}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default NsPickScoringRules;
