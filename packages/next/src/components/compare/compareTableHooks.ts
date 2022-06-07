import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { useCompareOperations } from "../../hooks/api/useCompare";
import { ICompareItemData } from "./type";

export const compareEditModeAtom = atomWithReset<boolean>(false);
export const compareDeleteItemsAtom = atomWithReset<number[]>([]);

export const useCompareTable = (categoryKey: string) => {
  const [compareEditMode, setCompareEditMode] = useAtom(compareEditModeAtom);
  const [compareDeleteItems, setCompareDeleteItems] = useAtom(
    compareDeleteItemsAtom
  );

  const resetCompareEditMode = useResetAtom(compareEditModeAtom);
  const resetCompareDeleteItems = useResetAtom(compareDeleteItemsAtom);

  const onResetCompareAtoms = () => {
    resetCompareEditMode();
    resetCompareDeleteItems();
  };

  const onToggleEditMode = () => {
    setCompareEditMode(!compareEditMode);
  };

  const onToggleSelectItem = (targetProductId: number) => {
    if (compareDeleteItems.includes(targetProductId)) {
      setCompareDeleteItems(
        compareDeleteItems.filter((id) => id !== targetProductId)
      );
    } else {
      setCompareDeleteItems([...compareDeleteItems, targetProductId]);
    }
  };

  const onToggleSelectAll = (compareItemsData: ICompareItemData[]) => {
    if (!compareItemsData) {
      return;
    }

    if (compareDeleteItems.length === compareItemsData.length) {
      setCompareDeleteItems([]);
    } else {
      setCompareDeleteItems(
        compareItemsData.map((item) => {
          return item.productId;
        })
      );
    }
  };

  const { deleteCompareItem } = useCompareOperations({ categoryKey });
  const onDeleteItems = () => {
    compareDeleteItems.map((item) => deleteCompareItem(item));
    onResetCompareAtoms();
  };

  return {
    onResetCompareAtoms,
    onToggleEditMode,
    onToggleSelectItem,
    onToggleSelectAll,
    onDeleteItems,
  };
};
