import { Button, Caret, Heading, Text } from "@nosearch/ui";
import Image from "next/image";
import { useRouter } from "next/router";
import { IDocumentWithSpec, ISpecCategory } from "ns-ts-interfaces";

interface ICompareProductHeaderProps
  extends Pick<IDocumentWithSpec, "imageUrl" | "pickType"> {
  currentModelName: string;
  modelName: string;
  specCategories: ISpecCategory[];
}

const CompareProductHeader = ({
  currentModelName,
  modelName,
  imageUrl,
  specCategories,
  pickType,
}: ICompareProductHeaderProps) => {
  const router = useRouter();
  const onShowDetailButton = () => {
    router.push(
      `/product/${router.query.parentCategory}/${router.query.category}/detail/${modelName}`
    );
  };

  return (
    <div
      className={`px-[1rem] py-[1.5rem] ${
        currentModelName === modelName ? "bg-blue-1" : "bg-gray-1"
      }`}
    >
      <Text
        type="D2"
        className={`mb-[0.5rem] text-blue-7 pc:text-body-8 ${
          currentModelName !== modelName && "invisible"
        }`}
      >
        지금 보는 제품
      </Text>
      {imageUrl && (
        <div className="relative mx-auto mb-[0.2rem] h-[10rem] w-[10rem]">
          <Image src={imageUrl} layout="fill" alt={modelName} />
        </div>
      )}
      {specCategories.map((itemHeaderInfo) => {
        if (
          itemHeaderInfo?.name === "상세정보" ||
          itemHeaderInfo?.symbol === "spec_common_8"
        )
          return null;

        // price : spec_common_9
        if (itemHeaderInfo?.symbol === "spec_common_9")
          return (
            <Heading
              key={`${modelName}_${itemHeaderInfo?.symbol}`}
              level={6}
              className="line-clamp-1 break-all text-gray-10"
            >
              {getItemPrice(itemHeaderInfo?.value)}
            </Heading>
          );
        // brand : spec_common_4
        // model : spec_common_5
        // model name : spec_common_6
        else
          return (
            <Text
              key={`${modelName}_${itemHeaderInfo?.symbol}`}
              type={`${
                itemHeaderInfo?.symbol === "spec_common_4" ? "D1" : "B8"
              }`}
              className={`line-clamp-1 break-all text-gray-10 ${
                itemHeaderInfo?.symbol === "spec_common_4" && "pc:text-body-10"
              }`}
            >
              {itemHeaderInfo?.value}
            </Text>
          );
      })}

      <Button
        size="s"
        type="primary"
        color="gray"
        className={`mt-[0.5rem] whitespace-nowrap ${
          currentModelName === modelName && "invisible"
        }`}
        suffix={<Caret size={"1.5rem"} />}
        onClick={onShowDetailButton}
      >
        자세히 보기
      </Button>
    </div>
  );
};

export default CompareProductHeader;

function getItemPrice(price: string) {
  const priceNumber = parseInt(price);
  if (isNaN(priceNumber)) {
    return "가격 확인 중";
  }

  const priceNumberWon = priceNumber * 10000;
  return priceNumberWon.toLocaleString() + "원~";
}
