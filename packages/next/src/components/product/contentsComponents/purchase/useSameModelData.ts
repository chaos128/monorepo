import { IGoods, IPriceMetaData, ISearchDocument } from "ns-ts-interfaces";
import { useMemo } from "react";
import { useCategories } from "../../../../hooks/api/useCategories";
import { useProductSearch } from "../../../../hooks/api/useProductSearch";
import useStoreTotalGoodsList from "../../../../hooks/api/useStoreTotalGoodsList";
import { isValidSpecValue } from "../../../../shared/functions";
import { refineSearchDocument } from "../../../../shared/utils";

interface ISameModelDataProps {
  productCategoryKey: string;
  sameGroup: string;
  modelReview: ISearchDocument;
}
export const useSameModelData = ({
  productCategoryKey,
  sameGroup,
  modelReview,
}: ISameModelDataProps) => {
  const { productArray } = useProductSearch({
    searchParam: {
      productCategoryKey,
      sameGroup,
    },
  });
  const { categoryMap } = useCategories();
  const cateCd = useMemo(() => {
    if (productCategoryKey && categoryMap && categoryMap[productCategoryKey])
      return categoryMap[productCategoryKey].godoCategoryId;

    return null;
  }, [productCategoryKey, categoryMap]);

  // make refined product array
  const modifiedProductArray = useMemo(() => {
    const isReviewTargetModel = (modelName: string) =>
      modelReview.modelName === modelName;
    if (modelReview.sameGroup) {
      return productArray.filter(
        (product) =>
          isValidSpecValue(product.price) ||
          isReviewTargetModel(product.modelName)
      );
    } else {
      return refineSearchDocument([modelReview]);
    }
  }, [modelReview, productArray]);

  const productModelNames = useMemo(() => {
    return modifiedProductArray.map((product) => product.modelName);
  }, [modifiedProductArray]);

  const productMap = useMemo(() => {
    const result: {
      [modelName: string]: ISearchDocument & { verificationName?: string };
    } = {};
    modifiedProductArray.map((product) => {
      result[product.modelName] = product;
    });
    return result;
  }, [modifiedProductArray]);

  const storeTotalGoodsList = useStoreTotalGoodsList({
    modelNameArray: productModelNames,
    cateCd: cateCd ?? undefined,
  });

  const productGoodsMap = useMemo(() => {
    const result = new Map<string, IGoods>();
    if (storeTotalGoodsList) {
      const { goodsList } = storeTotalGoodsList;
      let goodsVal = 0;
      if (Array.isArray(goodsList) && goodsList.length > 0) {
        goodsList.forEach((goods) => {
          goodsVal = result.get(goods.goodsCd)?.goodsPrice || 0;
          if (!goodsVal || goods.goodsPrice < goodsVal) {
            result.set(goods.goodsCd, goods);
          }
        });
      }
    }
    return result;
  }, [storeTotalGoodsList]);

  const baseProduct = useMemo(() => {
    if (modifiedProductArray.length < 1) {
      return;
    }

    return modifiedProductArray
      .filter(
        (product) => product.pickType !== "none" && product.priceMetaData?.price
      )
      .sort((a, b) => {
        const aPrice = a.priceMetaData?.price ?? 0;
        const bPrice = b.priceMetaData?.price ?? 0;

        return aPrice - bPrice;
      })[0];
  }, [modifiedProductArray]);

  const sortedProductArray = useMemo(() => {
    const primaryModelMap = new Map<string, number>();
    const secondaryModels: ISearchDocument[] = [];
    const basePrice = baseProduct?.priceMetaData?.price ?? 0;
    const minPrice = roundFloatWith(basePrice * 0.8);
    const maxPrice = roundFloatWith(basePrice * 1.2);

    modifiedProductArray.forEach((product) => {
      if (product.modelName === modelReview.modelName) return;

      const validMinPrice = getValidPrice(product, minPrice, maxPrice);

      if (validMinPrice > 0) {
        primaryModelMap.set(product.modelName, validMinPrice);
      } else {
        secondaryModels.push(product);
      }
    });

    const primaryModels = [...Array.from(primaryModelMap.entries())]
      .sort((a, b) => {
        const aPrice = a[1];
        const bPrice = b[1];
        return aPrice - bPrice;
      })
      .map(([modelName]) => {
        return productMap[modelName];
      });

    const sortResult = [...primaryModels, ...secondaryModels];
    const currentModelMinPrice = getValidPrice(modelReview, minPrice, maxPrice);
    const cheapestPrice = getValidPrice(sortResult[0], minPrice, maxPrice);
    const isItemCheapeast = currentModelMinPrice <= cheapestPrice;

    // 검색 된 모델이 가장 싸지 않은 경우, 2번째 위치로 고정
    // if (!isItemCheapeast && sortResult.length > 0) {
    //   if (sortResult.length > 1) {
    //     return [sortResult[0], modelReview, ...sortResult.slice(1)];
    //   }

    //   return [sortResult[0], modelReview];
    // }
    return [modelReview, ...sortResult];
  }, [
    modifiedProductArray,
    modelReview,
    productGoodsMap,
    productMap,
    baseProduct,
  ]);

  return {
    sortedProductArray,
    productMap,
    productGoodsMap,
    isSuccess: storeTotalGoodsList ? storeTotalGoodsList.isSuccess : false,
  };

  function getValidPrice(
    product: ISearchDocument,
    minPrice: number,
    maxPrice: number
  ) {
    if (!product) {
      return 0;
    }

    const nosearchPrice =
      productGoodsMap.get(product.modelName)?.goodsPrice ?? 0;
    const coupangPrice = product.priceMetaData?.coupang.price ?? 0;
    const elevenPrice = product.priceMetaData?.eleventhStreet.price ?? 0;

    return [nosearchPrice, coupangPrice, elevenPrice]
      .filter((priceVal) => isBetween(priceVal, minPrice, maxPrice))
      .sort()[0];
  }

  function isBetween(target: number, min: number, max: number) {
    return min <= target && target <= max;
  }
};

function roundFloatWith(value: number, size: number = 1000) {
  return Math.round(value / size) * size;
}

export function checkIsCheapestPrice(
  priceMetaData: IPriceMetaData | null,
  goodsPrice = 0
) {
  if (goodsPrice && !priceMetaData) {
    return true;
  }
  if (!goodsPrice || !priceMetaData) {
    return false;
  }

  return (
    [
      priceMetaData.coupang.price,
      priceMetaData.eleventhStreet.price,
      priceMetaData.price,
    ].reduce((prev, curr) => {
      const prevVal: number = prev ?? 0;

      if (!curr || goodsPrice <= curr) {
        return prevVal + 1;
      }

      return 0;
    }, 0) === 3
  );
}

export function getDiscountState(item: IGoods) {
  const {
    benefitUseType,
    goodsDiscountFl,
    periodDiscountStart,
    periodDiscountEnd,
  } = item;
  const now = new Date(Date.now());
  const isDicounting = goodsDiscountFl === "y" && benefitUseType === "nonLimit";
  let isTimeDeal = false;
  if (benefitUseType === "periodDiscount" && goodsDiscountFl === "y") {
    if (periodDiscountEnd && periodDiscountStart) {
      const startTime = new Date(Date.parse(periodDiscountStart));
      const endTime = new Date(Date.parse(periodDiscountEnd));

      if (startTime <= now && now < endTime) {
        isTimeDeal = true;
      }
    }
  }

  return {
    isDicounting,
    isTimeDeal,
  };
}
