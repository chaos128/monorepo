import { useAtomValue } from "jotai/utils";
import Image from "next/image";
import { useCategories } from "../../hooks/api/useCategories";
import { useCompare } from "../../hooks/api/useCompare";
import {
  compareDeleteItemsAtom,
  compareEditModeAtom,
  useCompareTable,
} from "./compareTableHooks";
import { ICompareItemData } from "./type";

const CompareTable = ({ category }: { category: string }) => {
  const { compareItemsData } = useCompare(category);
  const { categoryMap } = useCategories();

  const compareEditMode = useAtomValue(compareEditModeAtom);
  const compareDeleteItems = useAtomValue(compareDeleteItemsAtom);

  const {
    onToggleEditMode,
    onToggleSelectItem,
    onToggleSelectAll,
    onDeleteItems,
  } = useCompareTable(category);

  if (!compareItemsData) {
    return null;
  }

  return (
    <div>
      <div>
        {categoryMap &&
          categoryMap[category] &&
          `${categoryMap[category].name} 비교함`}
      </div>
      <button onClick={() => onToggleEditMode()}>
        {compareEditMode ? "완료" : "편집"}
      </button>
      {compareEditMode && (
        <div className="flex space-x-5">
          <div>{compareDeleteItems.length}개의 콘텐츠가 선택되었습니다.</div>
          <div>
            <input
              type="checkbox"
              id="allSelectCompareItems"
              checked={
                compareDeleteItems.length === compareItemsData.length
                  ? true
                  : false
              }
              onChange={() => {
                onToggleSelectAll(compareItemsData);
              }}
            />
            <label htmlFor="allSelectCompareItems">전체 선택</label>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        {compareItemsData &&
          compareItemsData.map((item: ICompareItemData, i: number) => {
            return (
              <CompareItem
                key={`compareItem_${i}`}
                item={item}
                compareEditMode={compareEditMode}
                compareDeleteItems={compareDeleteItems}
                onToggleSelectItem={onToggleSelectItem}
              />
            );
          })}
      </div>

      {compareEditMode && compareDeleteItems.length > 0 && (
        <button onClick={onDeleteItems}>
          {compareDeleteItems.length}개의 제품 삭제
        </button>
      )}
    </div>
  );
};

export default CompareTable;

interface ICompareItemProps {
  item: ICompareItemData;
  compareEditMode: boolean;
  compareDeleteItems: number[];
  onToggleSelectItem: (productId: number) => void;
}

const CompareItem = ({
  item,
  compareEditMode,
  compareDeleteItems,
  onToggleSelectItem,
}: ICompareItemProps) => {
  return (
    <div
      key={item.modelName}
      className="border-[1px] border-solid border-black p-2"
    >
      <div
        className="relative text-center"
        onClick={() => {
          if (!compareEditMode) return;
          onToggleSelectItem(item.productId);
        }}
      >
        <Image
          src={item.imageUrl ?? ""}
          width={100}
          height={100}
          alt="compare item"
        />
        {compareEditMode && (
          <input
            type="checkbox"
            name="compareItemCheckbox"
            className="absolute top-0 right-0"
            checked={compareDeleteItems.includes(item.productId) ? true : false}
            onChange={() => {}}
          />
        )}
      </div>
      {item.sections[0].specCategories.map((info) => {
        if (info.name === "상세정보") return;

        return (
          <div key={info.symbol}>
            <span>{info.value}</span>
            {info.unit && <span>{info.unit}</span>}
          </div>
        );
      })}
    </div>
  );
};
