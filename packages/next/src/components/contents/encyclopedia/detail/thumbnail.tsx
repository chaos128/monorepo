import { Heading, Text } from "@nosearch/ui";
import Image from "next/image";
import { IEncyclopediaDetail } from "../../../../hooks/api/useAppliancesDetailInfo";

const EncyclopediaThumbnail = ({ data }: { data: IEncyclopediaDetail }) => {
  return (
    <div className="relative h-[25rem] w-[37.5rem] pc:h-[40rem] pc:w-[120rem]">
      <Image
        src={data.thumbnail}
        alt={data.title}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-0 left-0 h-[25rem] w-[37.5rem] bg-black opacity-30 pc:h-[40rem] pc:w-[120rem]"></div>
      <div className="absolute bottom-[2rem] left-[2rem] pc:left-1/2 pc:bottom-[3rem] pc:w-[64rem] pc:-translate-x-1/2">
        <Text
          type="B7"
          className="mb-[1rem] flex w-[8rem] items-center justify-center rounded-full border-[1px] border-white py-[0.3rem] px-[1rem] text-white"
        >
          가전백과
        </Text>
        <Heading level={3} className="text-white pc:text-heading-1">
          {data.title}
        </Heading>
      </div>
    </div>
  );
};

export default EncyclopediaThumbnail;
