interface IPickHowItemProps {
  title: string;
  content: string;
  index?: number;
}

const pickHowData: IPickHowItemProps[] = [
  {
    title: "아이템별 50 ~ 400개 모델 스펙 데이터 가공",
    content:
      "판매순위, 평점, 출시시점 등을 고려하여 현재 판매되고 있는 모델 중 50~400개 제품을 선정하여 스펙을 데이터화합니다.",
  },
  {
    title: "3~5가지 핵심 기준을 적용하여 1차 후보군 선정",
    content:
      "노써치 구매가이드의 핵심 선택 기준 3~5가지와 부가기능, 가격대를 고려하여 1차 후보군을 3~5배수 정도로 선정합니다.",
  },
  {
    title: "소비자 후기, 평점을 반영하여 최종 후보군 선정",
    content:
      "1차 후보군에 선정된 제품에 대한 장단점과 소비자 후기 및 평점을 반영하여 정말 추천할 만한 제품인지 한 번 더 검토하여 1.5~2배수 정도로 선정합니다.",
  },
  {
    title: "후보 제품군 비교 분석 및 실제 사용하며 테스트",
    content:
      "후보 제품군을 구입하여 핵심 성능을 테스트하고, 2~4주간 실제로 사용해보고 베스트/가성비/프리미엄/플러스픽으로 최종 선정합니다.",
  },
];

const NSPickHow = () => {
  return (
    <>
      <span>노써치픽은 이렇게 선정됩니다.</span>
      <div>
        {pickHowData.map((data, index) => {
          return (
            <div key={index}>
              <div>{data.title}</div>
              <div>{data.content}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NSPickHow;
