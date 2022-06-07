import { ISearchDocument } from "ns-ts-interfaces";

export const usePickItemsHooks = () => {
  const getPickIndex = (
    pickType: "none" | "best" | "plus" | "premium" | "cost_effective"
  ) => {
    if (pickType === "best") return 0;
    else if (pickType === "cost_effective") return 1;
    else if (pickType === "premium") return 2;
    else if (pickType === "plus") return 3;
    else return 4;
  };

  const sortPickItems = (
    data?: ISearchDocument[]
  ): ISearchDocument[] | undefined => {
    if (!data) return;
    return data.sort(
      (a, b) => getPickIndex(a.pickType) - getPickIndex(b.pickType)
    );
  };

  return { getPickIndex, sortPickItems };
};
