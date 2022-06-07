import { Heading, Text } from "@nosearch/ui";

const SpecErrorNotice = () => {
  const contentArray = [
    "노써치는 정확하고 신뢰할 수 있는 정보를 제공하기 위해 노력합니다. 하지만 그 과정에서 발생할 수 있는 정보의 부정확성에 대해서는 보증하지 않습니다.",
    "제품 구매 전 제조/판매자의 표기 정보를 한번 더 확인하는 것을 권장합니다.",
    "노써치 서비스에서 제공하는 정보를 허가없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.",
  ];

  return (
    <article className="bg-gray-1 px-[2rem] py-[3rem] ">
      <div className="pc:mx-auto pc:w-[80rem]">
        <Heading level={6} className="mb-[2rem] text-gray-7">
          노써치의 스펙 분석은 제조사·판매처에서 <br />
          고지한 정보를 기반으로 작성됩니다.
        </Heading>
        {contentArray.map((content: string, i: number) => {
          return (
            <Text key={`specError_${i}`} type="B7" className="text-gray-7">
              {i + 1}. {content}
            </Text>
          );
        })}
      </div>
    </article>
  );
};
export default SpecErrorNotice;
