import { Heading, Text } from "@nosearch/ui";
import Image from "next/image";

const PurchaseGuideThumbnail = (props: {
  isMobile: boolean;
  thumbnail: string;
  title: string;
}) => {
  const { isMobile, thumbnail, title } = props;
  return (
    <div className="relative">
      <div className="relative h-[25rem] w-[37.5rem] pc:h-[40rem] pc:w-[120rem]">
        <Image src={thumbnail} alt={title} layout="fill" objectFit="cover" />
        <div className="absolute top-0 left-0 h-[25rem] w-[37.5rem] bg-black opacity-30 pc:h-[40rem] pc:w-[120rem]"></div>
      </div>

      {isMobile ? (
        <p
          className="absolute bottom-[2rem] left-[2rem] whitespace-pre-wrap text-heading-3 font-extrabold text-white"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
      ) : (
        <div className="absolute bottom-[3rem] left-1/2 w-[80rem] -translate-x-1/2">
          <div className="mb-[1rem] flex w-[9rem] items-center justify-center rounded-full border-[1px] border-white px-[1rem] py-[0.2rem]">
            <Text type="B7" className="text-white">
              구매가이드
            </Text>
          </div>
          <Heading level={1} className="text-white">
            {title.replace("<BR>", "")}
          </Heading>
        </div>
      )}
    </div>
  );
};

export default PurchaseGuideThumbnail;
