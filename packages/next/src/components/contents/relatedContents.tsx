import WeeklyBestContentPresenter from "../../components/weeklyBest";
import { useAppliancesInfo } from "../../hooks/api/useAppliancesInfo";
import { useBanners } from "../../hooks/api/useBanners";
import useBestGoodsPreview from "../../hooks/api/useBestGoodsPreview";
import useExhibitionsPreview from "../../hooks/api/useExhibitionsPreview";
import { NosearchDealBannerPostLocation } from "../../hooks/api/useNosearchDealBanner";
import useNosearchDealPreview from "../../hooks/api/useNosearchDealPreview";
import useTimedealPreview from "../../hooks/api/useTimedealPreview";
import BannerPresenter from "../banner";
import EncyclopediaContentPresenter from "../encyclopedia";
import ExhibitionContentPresenter from "../exhibition";
import NosearchDealProductContentPresenter from "../nosearchDeal";
import ReviewTemPresenter from "../reviewTem";
import TimedealContentPresenter from "../timedeal";
import { IPurchaseGuideDetailProps } from "./purchaseGuide/detail";

type RelatedContentsViewType = "purchaseGuideDetail" | "appliancesInfoDetail";

interface IRelatedContents extends IPurchaseGuideDetailProps {
  viewType: RelatedContentsViewType;
  isMobile: boolean;
  cateCd: string | null;
  applianceInfoId?: number;
}

const RelatedContents = ({
  viewType,
  isMobile,
  parentCategory,
  category,
  cateCd,
  applianceInfoId,
}: IRelatedContents) => {
  return (
    <section>
      <RelatedBanner
        isMobile={isMobile}
        viewType={viewType}
        category={category}
      />
      <RelatedReviewTem category={category} cateCd={cateCd} />
      <RelatedTimedeal
        viewType={viewType}
        isMobile={isMobile}
        cateCd={cateCd}
      />
      <RelatedNsDealItems category={category} cateCd={cateCd} />
      <RelatedExhibitions viewType={viewType} cateCd={cateCd} />
      <RelatedBestItems
        viewType={viewType}
        isMobile={isMobile}
        cateCd={cateCd}
      />
      <RelatedEncyclopeida
        viewType={viewType}
        category={category}
        applianceInfoId={applianceInfoId}
      />
      <RelatedBanner
        isMobile={isMobile}
        viewType={viewType}
        category={category}
      />
    </section>
  );
};

export default RelatedContents;

const RelatedReviewTem = ({
  category,
  cateCd,
}: {
  category: string;
  cateCd: string | null;
}) => {
  const { data } = useNosearchDealPreview({
    productCategoryKey: category,
    cateCd: cateCd ?? "",
    isValidEventPeriod: false,
    isFillItem: false,
    sort: "order",
    size: 8,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <ReviewTemPresenter data={data} viewType="home" />;
};

const RelatedNsDealItems = ({
  category,
  cateCd,
}: {
  category: string;
  cateCd: string | null;
}) => {
  const { data } = useNosearchDealPreview({
    productCategoryKey: category,
    cateCd: cateCd ?? "",
    isValidEventPeriod: true,
    isFillItem: true,
    sort: "order",
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <NosearchDealProductContentPresenter data={data} viewType="home" />;
};

const RelatedTimedeal = ({
  viewType,
  isMobile,
  cateCd,
}: {
  viewType: RelatedContentsViewType;
  isMobile: boolean;
  cateCd: string | null;
}) => {
  const { data } = useTimedealPreview({
    relationViewType: viewType,
    relationCateCd: cateCd ?? "",
    size: isMobile ? 6 : 12,
    isFillItem: false,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <TimedealContentPresenter data={data} />;
};

const RelatedBestItems = ({
  viewType,
  isMobile,
  cateCd,
}: {
  viewType: RelatedContentsViewType;
  isMobile: boolean;
  cateCd: string | null;
}) => {
  const { data } = useBestGoodsPreview({
    relationViewType: viewType,
    relationCateCd: cateCd ?? "",
    size: isMobile ? 6 : 12,
    isFillItem: false,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <WeeklyBestContentPresenter data={data} />;
};

const RelatedExhibitions = ({
  viewType,
  cateCd,
}: {
  viewType: RelatedContentsViewType;
  cateCd: string | null;
}) => {
  const { data } = useExhibitionsPreview({
    relationViewType:
      viewType === "purchaseGuideDetail"
        ? "purchaseGuideDetail"
        : "applianceInfoDetail",
    cateCd: cateCd ?? "",
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <ExhibitionContentPresenter data={data} />;
};

const RelatedEncyclopeida = ({
  viewType,
  category,
  applianceInfoId,
}: {
  viewType: RelatedContentsViewType;
  category: string;
  applianceInfoId?: number;
}) => {
  const { encyclopediaList: data } = useAppliancesInfo(
    "encyclopediaRelatedContents",
    {
      take: 4,
      relationCategoryKey: category,
      relationViewType:
        viewType === "purchaseGuideDetail"
          ? "purchaseGuideDetail"
          : "applianceInfoDetail",
      applianceInfoId: String(applianceInfoId),
    }
  );

  if (!data || data.length === 0) {
    return null;
  }

  return <EncyclopediaContentPresenter data={data} />;
};

const RelatedBanner = ({
  isMobile,
  viewType,
  category,
}: {
  isMobile: boolean;
  viewType: RelatedContentsViewType;
  category: string;
}) => {
  const { banners: data } = useBanners({
    type: "advertise",
    categoryKey: category,
    postLocation:
      viewType === "purchaseGuideDetail"
        ? NosearchDealBannerPostLocation.GUIDE
        : NosearchDealBannerPostLocation.INFO,
  });

  if (!data || data.length === 0) {
    return null;
  }

  return <BannerPresenter isMobile={isMobile} data={data[0]} />;
};
