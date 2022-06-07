import { Caret, Heading } from "@nosearch/ui";
import { IDocumentWithSpec } from "ns-ts-interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Spacing from "../../../../components/ui/spacing";
import { useCompareSimilarGroup } from "../../../../hooks/api/useCompare";
import { useMobileDetect } from "../../../../hooks/useMobileDetect";
import { isValidSpecValue } from "../../../../shared/functions";
import { IProductDetailProps } from "../type";
import CompareProductTable from "./compareProductTable";
import IndexIndicator from "./indexIndicator";

export const COMPARE_TABLE_WIDTH = 13; // rem
export const COMPARE_TABLE_WIDTH_PC = 20; // rem

interface ISimilarProductsProps extends IProductDetailProps {
  data: string;
}

const SimilarProducts = ({
  data: similarGroupData,
  productCategoryKey,
  modelName,
}: ISimilarProductsProps) => {
  const { isMobile } = useMobileDetect();

  const { compareSimilarGroupData: modelSpecData, isLoading } =
    useCompareSimilarGroup({
      categoryKey: productCategoryKey,
      modelName,
      similarGroup: similarGroupData,
    });
  const bannedCategoryMap = getSameSpecNames(modelSpecData);

  const [scrollIndex, setScrollIndex] = useState<number>(0);
  const tableRef = useRef<HTMLDivElement>(null);

  const swipeableHandler = useSwipeable({
    onSwipedRight: () => {
      setScrollIndex(scrollIndex > 0 ? scrollIndex - 1 : 0);
    },
    onSwipedLeft: () => {
      if (modelSpecData) {
        setScrollIndex(
          scrollIndex < modelSpecData.length - 2
            ? scrollIndex + 1
            : modelSpecData.length - 2 // there is no room for last index
        );
      }
    },
    trackMouse: true,
  });

  const handleClickIndicator = useCallback(
    (index: number) => {
      setScrollIndex(index);
    },
    [setScrollIndex]
  );

  useEffect(() => {
    tableRef.current &&
      tableRef.current.scrollTo({
        left:
          scrollIndex *
          ((isMobile ? COMPARE_TABLE_WIDTH * 10 : COMPARE_TABLE_WIDTH_PC * 10) +
            1),
        behavior: "smooth",
      });
  }, [tableRef, scrollIndex, isMobile]);

  useEffect(() => {
    setScrollIndex(0);

    return () => {
      setScrollIndex(0);
    };
  }, []);

  if (!modelSpecData || modelSpecData?.length < 2) {
    return null;
  }

  return (
    <article className="mt-[4rem] pb-[6rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <Heading level={2} className="mt-[4rem] ml-[2rem] mb-[2rem]">
        비슷한 제품
      </Heading>
      <div
        className="relative"
        ref={swipeableHandler.ref}
        onMouseDown={isMobile ? swipeableHandler.onMouseDown : () => {}}
      >
        <div
          className="absolute isolate z-10 w-[13rem] overflow-hidden pc:w-[20rem]"
          style={{
            width: `${
              isMobile ? COMPARE_TABLE_WIDTH : COMPARE_TABLE_WIDTH_PC
            }rem`,
          }}
        >
          <CompareProductTable
            currentModelName={modelName}
            categoryKey={productCategoryKey}
            bannedCategoryMap={bannedCategoryMap}
            modelSpecData={modelSpecData}
          />
        </div>
        <div className="overflow-hidden" ref={tableRef}>
          <CompareProductTable
            currentModelName={modelName}
            categoryKey={productCategoryKey}
            bannedCategoryMap={bannedCategoryMap}
            modelSpecData={modelSpecData}
          />
        </div>
        {!isMobile && (
          <PcSlideButtons
            modelSpecData={modelSpecData}
            scrollIndex={scrollIndex}
            setScrollIndex={setScrollIndex}
          />
        )}
      </div>
      {isMobile && modelSpecData.length > 2 && (
        <IndexIndicator
          fixedIndex={0}
          scrollIndex={scrollIndex}
          setScrollIndex={handleClickIndicator}
          modelSpecData={modelSpecData}
        />
      )}
    </article>
  );
};

export default SimilarProducts;

export function getSameSpecNames(modelSpecData: IDocumentWithSpec[] | null) {
  const bannedModelNameMap = new Map<string, boolean>();
  const modelSpecMap: {
    [key: string]: { sameCount: number; compareVal: any; name: string };
  } = {};

  const modelSpecLength = modelSpecData?.length ?? 0;
  if (!modelSpecData || modelSpecLength < 1) return bannedModelNameMap;

  modelSpecData?.forEach((data) =>
    data.sections?.forEach((section) =>
      section.specCategories.forEach((specCategory) => {
        const { symbol, name, value } = specCategory;
        const currentSpec = modelSpecMap[symbol];
        if (currentSpec === undefined) {
          modelSpecMap[symbol] = {
            sameCount: 1,
            compareVal: value,
            name: name,
          };
        } else if (modelSpecMap[specCategory.symbol].compareVal === value) {
          modelSpecMap[specCategory.symbol].sameCount += 1;
        }
      })
    )
  );

  if (modelSpecLength > 1) {
    for (const value of Object.values(modelSpecMap)) {
      if (value.sameCount >= modelSpecLength) {
        bannedModelNameMap.set(value.name, true);
      }
    }
  }

  if (modelSpecLength === 1) {
    for (const spec of Object.values(modelSpecMap)) {
      if (!isValidSpecValue(spec.compareVal)) {
        bannedModelNameMap.set(spec.name, true);
      }
    }
  }

  return bannedModelNameMap;
}

const PcSlideButtons = ({
  modelSpecData,
  scrollIndex,
  setScrollIndex,
}: {
  modelSpecData: any;
  scrollIndex: any;
  setScrollIndex: any;
}) => {
  const sliderButtonStyle =
    "w-[5rem] h-[5rem] bg-white absolute top-1/2 translate-y-1/2 rounded-full flex items-center justify-center drop-shadow-md cursor-pointer border-[1px] border-gray-2 z-10";

  return (
    <div>
      <button
        className={`${sliderButtonStyle} -left-10 ${
          scrollIndex === 0 && "hidden"
        }`}
        disabled={scrollIndex === 0}
        onClick={() => {
          setScrollIndex(scrollIndex > 0 ? scrollIndex - 1 : 0);
        }}
      >
        <div className="rotate-180">
          <Caret size="2rem" />
        </div>
      </button>
      <button
        className={`${sliderButtonStyle} -right-10 ${
          scrollIndex >= modelSpecData.length - 4 && "hidden"
        }`}
        disabled={modelSpecData.length - 2 === scrollIndex}
        onClick={() => {
          setScrollIndex(
            scrollIndex < modelSpecData.length - 2
              ? scrollIndex + 1
              : modelSpecData.length - 2
          );
        }}
      >
        <Caret size="2rem" />
      </button>
    </div>
  );
};
