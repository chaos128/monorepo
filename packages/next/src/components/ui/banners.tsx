import Image from "next/image";
import { useState } from "react";
import { IBanner } from "../../hooks/api/useBanners";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import { rgbDataURL } from "../../shared/utils";

const Banners = ({ data }: { data: IBanner[] }) => {
  const banners = data;
  const { isMobile } = useMobileDetect();
  const [mount, setMount] = useState<boolean>(false);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setMount(true);
  //   }, 3000);
  // }, []);
  if (banners.length === 0) {
    return null;
  }
  const slicedBanners = mount ? banners : banners.slice(0, 1);
  return (
    <div key={`swiper${isMobile ? "mobile" : ""}`} className="overflow-hidden">
      <div
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: isMobile ? "375/250" : "1200/250",
        }}
      >
        <Image
          layout="fill"
          priority
          src={
            isMobile ? slicedBanners[0].mImageUrl : slicedBanners[0].pcImageUrl
          }
          alt={slicedBanners[0].startAt ?? undefined}
          placeholder="blur"
          blurDataURL={rgbDataURL(238, 238, 238)}
        ></Image>
      </div>
    </div>
  );
};

export default Banners;
