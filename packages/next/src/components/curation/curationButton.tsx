import { Button, Heading } from "@nosearch/ui";
import Image from "next/image";
import Link from "../../components/Link";
import { useMobileDetect } from "../../hooks/useMobileDetect";
import Spacing from "../ui/spacing";

const CurationButton = ({
  viewType,
  text,
}: {
  viewType: string;
  text: string;
}) => {
  const { isMobile } = useMobileDetect();
  return (
    <section className={`${viewType === "productDetail" && "pc:w-[55.5rem]"}`}>
      {(isMobile || (!isMobile && viewType === "pick")) && (
        <Spacing width="100%" height="1rem" bg="#F9F9F9" shadow />
      )}
      <div
        className={`pt-[3rem] pb-[6rem] text-center pc:mx-auto pc:pb-[10rem] ${
          viewType === "productDetail" ? "pc:w-[50rem]" : "pc:w-[44rem]"
        }`}
      >
        {(viewType === "pick" || viewType === "productDetail") &&
          (isMobile ? (
            <div className="my-[2rem] text-center">
              <Heading level={5}>{text}</Heading>
            </div>
          ) : (
            <div className="mb-[2rem] text-center">
              <Heading
                level={2}
                description="나한테 딱 맞는 제품을 찾아드려요
"
              >
                맞춤추천 🎯
              </Heading>
            </div>
          ))}

        <div
          className={`${
            viewType === "productDetail" &&
            "pc:flex pc:h-[54.4rem] pc:w-[50rem] pc:flex-col pc:justify-end pc:rounded-[10px] pc:border-[1px] pc:border-gray-3 pc:p-[2rem]"
          }`}
        >
          <div
            className={`relative mx-auto ${
              viewType === "productDetail"
                ? "h-[26rem] w-[26rem]"
                : "h-[14.5rem] w-[14.5rem]"
            }`}
          >
            <Image
              src="/static/images/curation_target.png"
              layout="fill"
              alt="맞춤추천 받아보기"
            />
          </div>

          {(viewType === "home" ||
            viewType === "productDetail" ||
            (viewType === "pick" && !isMobile)) && (
            <div className="mt-[2rem] text-center">
              <Heading
                level={
                  viewType === "home" || viewType === "productDetail" ? 6 : 4
                }
              >
                {text}
              </Heading>
            </div>
          )}

          <Link href={"/recommendation/item-list"} passHref>
            <div className="mt-[2rem] flex justify-center">
              <Button
                size="xl"
                type="cta"
                radius="s"
                color="blue"
                className={`${
                  viewType === "pick" && !isMobile && "w-[40rem]"
                } ${viewType === "pick" && isMobile && "w-[22.5rem]"} ${
                  viewType === "productDetail" && "pc:mt-[6rem] pc:w-full"
                }`}
              >
                맞춤추천 받아보기
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CurationButton;
