import { useAtomValue } from "jotai/utils";
import Image from "next/image";
import {
  nowIndexAtom,
  selectMultipleOptionStateAtom,
  selectOptionStateAtom,
} from "../store";
import { useCurationSurvey } from "../surveyHooks";

const Options = ({
  data,
  maxChoiceCount,
}: {
  data: any;
  maxChoiceCount: any;
}) => {
  const { onSelectOption } = useCurationSurvey();
  const nowIndex = useAtomValue(nowIndexAtom);
  const selectOptionState = useAtomValue(selectOptionStateAtom);
  const selectMultipleOptionState = useAtomValue(selectMultipleOptionStateAtom);

  const onClickOption = (index: number) => {
    const selectedOptionIndex = index;
    const selectedMultipleOptionIndex =
      selectMultipleOptionState.optionIndex.length < maxChoiceCount
        ? [...selectMultipleOptionState.optionIndex, index]
        : [...selectMultipleOptionState.optionIndex.slice(1), index];
    onSelectOption({
      maxChoiceCount,
      surveyIndex: nowIndex,
      optionIndex:
        maxChoiceCount === 1
          ? selectedOptionIndex
          : selectedMultipleOptionIndex,
    });
  };

  return (
    <div className="space-y-3">
      {data.map((option: any, index: any) => {
        return (
          <div
            className={`flex h-[70px] w-1/2 items-center space-x-1 ${
              (maxChoiceCount === 1
                ? index === selectOptionState.optionIndex
                : selectMultipleOptionState.optionIndex.includes(index)) &&
              "border-red-500 border-[1px] border-solid"
            }`}
            key={`option_${index}`}
            onClick={() => {
              onClickOption(index);
            }}
          >
            {option?.imageUrl && (
              <Image
                src={option.imageUrl}
                width={50}
                height={50}
                alt={option.title}
              />
            )}
            {maxChoiceCount > 1 && (
              <div>
                {selectMultipleOptionState.optionIndex.indexOf(index) >= 0 &&
                  selectMultipleOptionState.optionIndex.indexOf(index) + 1}
              </div>
            )}
            <div>
              <div>{option.title}</div>
              <div>{option.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Options;
