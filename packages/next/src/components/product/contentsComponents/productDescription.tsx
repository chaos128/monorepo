/* eslint-disable @next/next/no-img-element */
import { Button, Caret, Heading } from "@nosearch/ui";
import { useEffect, useState } from "react";
import Spacing from "../../../components/ui/spacing";
import { useGoodsDescription } from "../../../hooks/api/useGoodsDescription";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import LoadOnViewPort from "../../../wrappers/LoadOnViewport";

const ProductDescription = ({
  productCategoryKey,
  modelName,
  productDescTabScroll,
  onLoad,
}: {
  productCategoryKey: any;
  modelName: any;
  productDescTabScroll: any;
  onLoad: any;
}) => {
  const { isMobile } = useMobileDetect();
  const [isDescOpened, setIsDescOpened] = useState<boolean>(false);

  const { data } = useGoodsDescription({
    categoryKey: productCategoryKey,
    modelNm: modelName,
  });

  useEffect(() => {
    if (data && data.images.length > 0 && onLoad) {
      onLoad({ type: "product-info" });
    }
  }, [data, onLoad]);

  if (!data || data.images.length === 0) {
    return null;
  }

  return (
    <div className="mt-[4rem] pb-[6rem]">
      <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      <div className="mx-[2rem] mt-[4rem] pb-[2rem] pc:mx-0 pc:pb-[3rem] pc:text-center">
        <Heading level={2} className="text-gray-10">
          상품 정보
        </Heading>
      </div>
      <div
        className={`relative  ${
          !isDescOpened && "h-[50rem] overflow-hidden pc:h-[80rem]"
        }`}
      >
        <ImagesView images={data.images} />
        {!isDescOpened && (
          <div className="absolute bottom-0 h-[25rem] w-full bg-gradient-to-t from-white"></div>
        )}
      </div>
      <div
        className={`mx-[2rem] pc:text-center ${isDescOpened && "mt-[2rem]"}`}
      >
        <Button
          size="xl"
          type="outline"
          radius={isMobile ? "xl" : "s"}
          className={`${isMobile ? "w-full" : "w-[50%]"}`}
          suffix={
            <div
              className={`${!isDescOpened ? "rotate-90" : "rotate-[270deg]"}`}
            >
              <Caret size={"2rem"} color="#256FFF" />
            </div>
          }
          onClick={() => {
            if (isDescOpened)
              window.scrollTo({ top: productDescTabScroll - 50 });
            setIsDescOpened(!isDescOpened);
          }}
        >
          상품정보 {!isDescOpened ? "펼치기" : "접기"}
        </Button>
      </div>
    </div>
  );
};

export default ProductDescription;

const ImagesView = ({ images }: { images: any }) => {
  return images.map((image: any, i: number) => {
    return (
      <LoadOnViewPort height="50rem" key={`productDescription_${i}`}>
        {i === 0 ? (
          <img
            src={image}
            alt={`productDescription_${i}`}
            width="100%"
            height="100%"
          />
        ) : (
          <DelayLoading>
            <img
              src={image}
              alt={`productDescription_${i}`}
              width="100%"
              height="100%"
            />
          </DelayLoading>
        )}
      </LoadOnViewPort>
    );
  });
};

const DelayLoading = (props: { children: React.ReactNode }) => {
  useEffect(() => {}, []);
  return <>{props.children}</>;
};
