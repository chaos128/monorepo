import { Button, Heading, Text } from "@nosearch/ui";
import Link from "../../../components/Link";
import { IProductDetailProps } from "./type";

const ModificationRequest = ({
  productCategoryKey,
  modelName,
}: IProductDetailProps) => {
  return (
    <article className="px-[2rem] py-[3rem] pc:w-full pc:text-center">
      <div>
        <Heading level={4} className="text-gray-10">
          잘못된 정보가 있다면 알려주세요!
        </Heading>
        <Text type="B7" className="text-gray-10">
          제품의 스펙, 제품명, 이미지 등 잘못된 정보를 말씀해주시면 <br />
          검토 후 신속하게 처리하겠습니다.
        </Text>
      </div>
      <Link
        href={`/productFeedback?productCategoryKey=${productCategoryKey}&modelName=${modelName}`}
      >
        <Button
          size="m"
          type="outline"
          radius="s"
          color="gray"
          className="mt-[2rem] w-full text-gray-10 pc:w-[74rem]"
        >
          <Text type="B5" className="text-gray-10">
            수정 요청
          </Text>
        </Button>
      </Link>
    </article>
  );
};

export default ModificationRequest;
