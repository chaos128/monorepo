import Image from "next/image";
import { IBanner } from "../../hooks/api/useBanners";
import { INosearchBanner } from "../../hooks/api/useNosearchDealBanner";

const BannerPresenter = ({
  isMobile,
  data,
}: {
  isMobile: boolean;
  data: IBanner | INosearchBanner;
}) => {
  const { categoryKey, videoFirst, videoUrl, mImageUrl, pcImageUrl } = data;
  if (!data) {
    return null;
  }

  return (
    <div className="my-[5rem]">
      {videoFirst && videoUrl && isMobile ? (
        <video
          loop
          autoPlay
          muted
          width="100%"
          max-width="800px"
          height="auto"
          playsInline
        >
          <source src={videoUrl} width="100%" height="100%" />
        </video>
      ) : (
        <div className="relative h-[15rem] w-[120rem]">
          <Image
            src={isMobile ? mImageUrl : pcImageUrl}
            alt={categoryKey ?? ""}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};

export default BannerPresenter;
