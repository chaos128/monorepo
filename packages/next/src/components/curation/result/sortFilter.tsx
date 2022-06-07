import { SurveyResultSortType } from "../type";

const SortFilter = ({
  sortType,
  onSetSortType,
}: {
  sortType: SurveyResultSortType;
  onSetSortType: (type: SurveyResultSortType) => void;
}) => {
  const onSort = (type: SurveyResultSortType) => {
    onSetSortType(type);
  };

  return (
    <div>
      <div
        className={`${
          sortType === "recommendation" && "text-blue-500 font-bold"
        }`}
        onClick={() => {
          onSort("recommendation");
        }}
      >
        추천순
      </div>
      <div
        className={`${
          sortType === "recommendation_without_price" &&
          "text-blue-500 font-bold"
        }`}
        onClick={() => {
          onSort("recommendation_without_price");
        }}
      >
        성능순
      </div>
      <div
        className={`${sortType === "cheap" && "text-blue-500 font-bold"}`}
        onClick={() => {
          onSort("cheap");
        }}
      >
        낮은 가격순
      </div>
      <div
        className={`${sortType === "expensive" && "text-blue-500 font-bold"}`}
        onClick={() => {
          onSort("expensive");
        }}
      >
        높은 가격순
      </div>
    </div>
  );
};

export default SortFilter;
