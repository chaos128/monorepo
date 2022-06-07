import { Button, Heading, Text } from "@nosearch/ui";
import { IKeySpec } from "ns-ts-interfaces";
import Link from "../../../components/Link";
import { useMobileDetect } from "../../../hooks/useMobileDetect";
import { IProductDetailProps } from "./type";

interface IKeySpecsProps extends IProductDetailProps {
  data: IKeySpec[] | null | undefined;
}

const KeySpecs = ({
  data: keySpecsData,
  parentCategoryKey: storeCategoryKey,
  productCategoryKey,
  modelName,
}: IKeySpecsProps) => {
  const { isMobile } = useMobileDetect();

  if (!keySpecsData) {
    return null;
  }

  return (
    <article className="mx-[2rem] mt-[4rem] pb-[6rem]">
      <div className="pc:flex pc:justify-between">
        <Heading level={2} className="text-gray-10">
          주요 스펙
        </Heading>
        {!isMobile && (
          <SpecButton
            storeCategoryKey={storeCategoryKey}
            productCategoryKey={productCategoryKey}
            modelName={modelName}
          />
        )}
      </div>
      <div className="my-[2rem] grid grid-cols-2 gap-x-[2rem] gap-y-[1.6rem] pc:grid-cols-5">
        <KeySpecsData keySpecsData={keySpecsData} />
      </div>
      {isMobile && (
        <SpecButton
          storeCategoryKey={storeCategoryKey}
          productCategoryKey={productCategoryKey}
          modelName={modelName}
        />
      )}
    </article>
  );
};

export default KeySpecs;

const SpecButton = ({
  storeCategoryKey,
  productCategoryKey,
  modelName,
}: {
  storeCategoryKey: any;
  productCategoryKey: any;
  modelName: any;
}) => {
  return (
    <Link
      href={`/product/${storeCategoryKey}/${productCategoryKey}/spec/${modelName}`}
      passHref
    >
      <Button
        type="outline"
        color="gray"
        size="m"
        className="w-full pc:w-[18rem]"
      >
        <Text type="B8" className="text-gray-10">
          스펙 전체보기
        </Text>
      </Button>
    </Link>
  );
};

const KeySpecsData = ({ keySpecsData }: { keySpecsData: any }) => {
  return keySpecsData.map((keySpec: any, i: number) => {
    return (
      <div key={`key_spec_${i}`}>
        <Text type="B10" className="line-clamp-1 break-all text-gray-10">
          {keySpec.title}
        </Text>
        <Text type="B2" className="line-clamp-1 break-all text-gray-10">
          {keySpec.value}
        </Text>
      </div>
    );
  });
};
