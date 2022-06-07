import { AiReviewType } from "../../../hooks/api/useAiReview";
import { useAiReviewHooks } from "../aiReviewHooks";

const ReviewFilter = ({
  filterType,
  onSetReviewFilterType,
}: {
  filterType: any;
  onSetReviewFilterType: any;
}) => {
  const { onResetReviewAtoms } = useAiReviewHooks();
  const onSetReviewType = (type: AiReviewType) => {
    onSetReviewFilterType(type);
    onResetReviewAtoms();
  };

  return (
    <div className="border-b-[1px] border-gray-3 pb-[2rem] pc:pb-[3rem]">
      <div className="flex justify-between pc:justify-center pc:space-x-[7rem]">
        <FilterButton
          filterType={filterType}
          onSetReviewType={onSetReviewType}
          filterButtonType="all"
        />
        <FilterButton
          filterType={filterType}
          onSetReviewType={onSetReviewType}
          filterButtonType="positive"
        />
        <FilterButton
          filterType={filterType}
          onSetReviewType={onSetReviewType}
          filterButtonType="negative"
        />
      </div>
    </div>
  );
};
export default ReviewFilter;

const FilterButton = ({
  filterType,
  onSetReviewType,
  filterButtonType,
}: {
  filterType: any;
  onSetReviewType: any;
  filterButtonType: any;
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        onSetReviewType(filterButtonType);
      }}
    >
      <input
        id={filterButtonType}
        className={`mr-[1.5rem] h-[1.2rem] w-[1.2rem] cursor-pointer rounded-full ring-2 ring-gray-3 ring-offset-[0.5rem] transition focus:outline-none ${
          filterType === filterButtonType ? "bg-gray-10" : ""
        }`}
      />
      <label
        htmlFor={filterButtonType}
        className="cursor-pointer pr-[1.5rem] text-body-2 font-bold"
      >
        {filterButtonType === "all"
          ? "모든 "
          : filterButtonType === "positive"
          ? "긍정 "
          : "부정 "}
        리뷰
      </label>
    </button>
  );
};
