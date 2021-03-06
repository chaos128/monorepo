import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo } from "react";
import CurationButton from "../../../components/curation/curationButton";
import { useCategories } from "../../../hooks/api/useCategories";
import { useModelReview } from "../../../hooks/api/useModelReview";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import { useSidebar } from "../../../shared/useSidebar";
import AiReivew from "../../aiReview/aiReivew";
import Spacing from "../../ui/spacing";
import Encyclopedia from "../contentsComponents/encyclopedia";
import Exhibition from "../contentsComponents/exhibition";
import KeySpecs from "../contentsComponents/keySpecs";
import ModificationRequest from "../contentsComponents/modificationRequest";
import NosearchDeal from "../contentsComponents/nosearchDeal";
import NosearchDealBanner from "../contentsComponents/nosearchDealBanner";
import NosearchReview from "../contentsComponents/nosearchReview";
import NosearchSpecReview from "../contentsComponents/nosearchSpecReview/nosearchSpecReview";
import ProductDescription from "../contentsComponents/productDescription";
import ProductFooter from "../contentsComponents/productFooter";
import ProductOverview from "../contentsComponents/productOverview/productOverview";
import ProductReview from "../contentsComponents/productReview/productReview";
import ProductSidebar from "../contentsComponents/productSidebar";
import ProductTabs from "../contentsComponents/productTabs/productTabs";
import useProductTabs from "../contentsComponents/productTabs/productTabsHooks";
import Purchase from "../contentsComponents/purchase/purchase";
import PurchaseGuide from "../contentsComponents/purchaseGuide";
import RecommendVideos from "../contentsComponents/recommendVideos/recommendVideos";
import SimilarProducts from "../contentsComponents/similarProducts/similarProducts";
import SpecErrorNotice from "../contentsComponents/specErrorNotice";
import StoreGoods from "../contentsComponents/storeGoods";
import Summary from "../contentsComponents/summary";
import { IProductDetailProps } from "../contentsComponents/type";
import WeeklyBest from "../contentsComponents/weeklyBest";

const ProductDetailContents = ({
  parentCategoryKey,
  productCategoryKey,
  modelName,
}: IProductDetailProps) => {
  const router = useRouter();
  const { isMobile } = useMobileDetect();
  const {
    modelReviewData,
    productOverviewData,
    keySpecsData,
    specReviewData,
    summaryData,
    similarGroupData,
  } = useModelReview(productCategoryKey, modelName);
  const { categoryMap } = useCategories();
  const cateCd = useMemo(() => {
    if (productCategoryKey && categoryMap && categoryMap[productCategoryKey]) {
      return categoryMap[productCategoryKey].godoCategoryId;
    } else {
      return null;
    }
  }, [productCategoryKey, categoryMap]);

  const { targetRef } = useSidebar();

  // get abledTab
  const { tabInfos, disabledTabSet, setDisabledTabSet } = useProductTabs();

  const onLoadUpdateProductDetailTab = useCallback(
    (params: { type: string; detailContent?: string }) => {
      const { type, detailContent } = params;
      if (disabledTabSet.has(type)) {
        const newDisabledTabSet = disabledTabSet;
        newDisabledTabSet.delete(type);
        setDisabledTabSet(new Set(newDisabledTabSet));
      }
    },
    [disabledTabSet, setDisabledTabSet]
  );

  // Tab Scroll Info
  let purchaseTabScroll = 0;
  let nosearchReviewTabScroll = 0;
  let nosearchSpecReviewTabScroll = 0;
  let productDescTabScroll = 0;
  let productReviewTabScroll = 0;
  let aiReviewTabScroll = 0;
  let recommendationTabScroll = 0;
  if (typeof document !== "undefined") {
    const purchaseTab = document.querySelector(
      `#${tabInfos[0].key}`
    ) as HTMLElement;
    purchaseTabScroll = purchaseTab && purchaseTab.offsetTop;

    const nosearchReviewTab = document.querySelector(
      `#${tabInfos[1].key}`
    ) as HTMLElement;
    nosearchReviewTabScroll = nosearchReviewTab && nosearchReviewTab.offsetTop;

    const nosearchSpecReviewTab = document.querySelector(
      `#${tabInfos[2].key}`
    ) as HTMLElement;
    nosearchSpecReviewTabScroll =
      nosearchSpecReviewTab && nosearchSpecReviewTab.offsetTop;

    const productDescTab = document.querySelector(
      `#${tabInfos[3].key}`
    ) as HTMLElement;
    productDescTabScroll = productDescTab && productDescTab.offsetTop;

    const productReviewTab = document.querySelector(
      `#${tabInfos[4].key}`
    ) as HTMLElement;
    productReviewTabScroll = productReviewTab && productReviewTab.offsetTop;

    const aiReviewTab = document.querySelector(
      `#${tabInfos[5].key}`
    ) as HTMLElement;
    aiReviewTabScroll = aiReviewTab && aiReviewTab.offsetTop;

    const recommendationTab = document.querySelector(
      `#${tabInfos[6].key}`
    ) as HTMLElement;
    recommendationTabScroll = recommendationTab && recommendationTab.offsetTop;
  }

  const tabsScroll = {
    purchaseTabScroll,
    nosearchReviewTabScroll,
    nosearchSpecReviewTabScroll,
    productDescTabScroll,
    productReviewTabScroll,
    aiReviewTabScroll,
    recommendationTabScroll,
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (router.query.purchaseFlag)
      window.scrollTo({ top: purchaseTabScroll - 50, behavior: "smooth" });
  }, [router.query]);

  if (!modelReviewData || !productOverviewData) {
    return null;
  }

  return (
    <div className="relative space-y-5 pb-[30rem]">
      {!isMobile && (
        <ProductSidebar
          modelReviewData={modelReviewData}
          productOverviewData={productOverviewData}
          parentCategoryKey={parentCategoryKey}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
        />
      )}
      <div className="pc:mx-auto pc:max-w-[80rem]">
        <ProductOverview
          modelReviewData={modelReviewData}
          productOverviewData={productOverviewData}
          parentCategoryKey={parentCategoryKey}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
          productReviewTabScroll={productReviewTabScroll}
        />
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
        {/* ?????? */}
        <Summary
          data={summaryData}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
        />
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />

        {/* ?????? ?????? */}
        <KeySpecs
          data={keySpecsData}
          parentCategoryKey={parentCategoryKey}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
        />

        {/* ?????? ????????? ?????? ?????? */}
        <RecommendVideos
          postType={"pickDetail"}
          categoryKey={productCategoryKey}
          sameGroupName={modelReviewData.sameGroup}
          model={modelName}
        />

        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      </div>
      <ProductTabs
        disabledTabSet={disabledTabSet}
        defaultTabs={tabInfos}
        tabsScroll={tabsScroll}
      />

      <div className="pc:mx-auto pc:max-w-[80rem]">
        {/* PC ?????? ???????????? ?????? ?????? ???????????? article tag */}
        {/* ?????? ?????? ????????? ???????????? ?????? ???????????? intersection ????????? ?????? ??????????????? ???????????? */}
        <div ref={targetRef}>
          {/* ?????? ?????? */}
          <article id={tabInfos[0].key}>
            <Purchase
              parentCategoryKey={parentCategoryKey}
              productCategoryKey={productCategoryKey}
              modelName={modelName}
              sameGroup={modelReviewData.sameGroup}
              modelReviewData={modelReviewData}
              onLoad={onLoadUpdateProductDetailTab}
            />
          </article>

          {/* ????????? ?????? */}
          <article id={tabInfos[1].key}>
            <NosearchReview
              productCategoryKey={productCategoryKey}
              modelName={modelName}
              onLoad={onLoadUpdateProductDetailTab}
            />
          </article>

          {/* ?????? ?????? */}
          <article id={tabInfos[2].key}>
            <NosearchSpecReview
              specReviewData={specReviewData}
              modelReviewData={modelReviewData}
              productCategoryKey={productCategoryKey}
              modelName={modelName}
              nosearchSpecReviewTabScroll={nosearchSpecReviewTabScroll}
              onLoad={onLoadUpdateProductDetailTab}
            />
          </article>

          {/* ?????? ?????? */}
          <article id={tabInfos[3].key}>
            <ProductDescription
              productCategoryKey={productCategoryKey}
              modelName={modelName}
              productDescTabScroll={productDescTabScroll}
              onLoad={onLoadUpdateProductDetailTab}
            />
          </article>

          {/* ?????? ?????? */}
          <article id={tabInfos[4].key}>
            <ProductReview
              productCategoryKey={productCategoryKey}
              modelName={modelName}
              onLoad={onLoadUpdateProductDetailTab}
            />
          </article>
        </div>

        {/* ?????? ?????? ????????? ????????? ???????????? ????????? */}

        {/* ?????? ?????? */}
        <article id={tabInfos[5].key}>
          <AiReivew
            productCategoryKey={productCategoryKey}
            modelName={modelName}
            onLoad={onLoadUpdateProductDetailTab}
          />
        </article>
        {/* ????????? ?????? */}
        <SimilarProducts
          data={similarGroupData}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
        />
      </div>

      {/* ?????? */}
      <article id={tabInfos[6].key}>
        <NosearchDeal
          productCategoryKey={productCategoryKey}
          cateCd={cateCd}
          onLoad={onLoadUpdateProductDetailTab}
        />
        <NosearchDealBanner productCategoryKey={productCategoryKey} />
        <StoreGoods
          productCategoryKey={productCategoryKey}
          onLoad={onLoadUpdateProductDetailTab}
        />
        <Exhibition cateCd={cateCd} onLoad={onLoadUpdateProductDetailTab} />
        <WeeklyBest cateCd={cateCd} onLoad={onLoadUpdateProductDetailTab} />
        <div className="pc:flex pc:justify-center pc:space-x-[3rem]">
          <PurchaseGuide
            productCategoryKey={productCategoryKey}
            onLoad={onLoadUpdateProductDetailTab}
          />
          {!isMobile && (
            <CurationButton
              viewType="productDetail"
              text="????????? ??? ?????? ??????????????? ??????????????????!"
            />
          )}
        </div>
        <Encyclopedia
          productCategoryKey={productCategoryKey}
          onLoad={onLoadUpdateProductDetailTab}
        />
        <NosearchDealBanner productCategoryKey={productCategoryKey} />
      </article>

      <ModificationRequest
        productCategoryKey={productCategoryKey}
        modelName={modelName}
      />
      <SpecErrorNotice />

      <ProductFooter
        productCategoryKey={productCategoryKey}
        modelReviewData={modelReviewData}
        productOverviewData={productOverviewData}
      />
    </div>
  );
};

export default ProductDetailContents;
