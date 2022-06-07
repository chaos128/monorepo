import { Button, Heading, Text } from "@nosearch/ui";
import Image from "next/image";
import Link from "next/link";

const FeedbackSuccessPage = ({
  onClickResettingFeedback,
}: {
  onClickResettingFeedback: () => void;
}) => {
  return (
    <div className="mt-[10rem] mb-[18rem] flex flex-col items-center">
      <div className="relative mb-[2rem] h-[25.5rem] w-[25.5rem] pc:h-[30rem] pc:w-[30rem]">
        <Image src="/static/images/feedback_success.png" layout="fill" alt="" />
      </div>
      <Heading level={5} className="text-gray-10">
        의견 전송 완료!
      </Heading>
      <Text type="B4" className="mt-[2rem] text-center text-gray-10">
        소중한 의견을 보내주셔서 감사합니다.
        <br />
        보내주신 의견은 서비스를 개선하는 데 도움이 됩니다.
      </Text>
      <div className="mt-[2rem] flex gap-[1.5rem] pc:flex-col pc:gap-[2rem]">
        <Button
          type="outline"
          size="xl"
          className="w-[16rem] pc:w-[36rem]"
          onClick={onClickResettingFeedback}
        >
          의견 보내기
        </Button>
        <Link href="/" passHref>
          <Button type="cta" size="xl" className="w-[16rem] pc:w-[36rem]">
            홈으로 가기
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default FeedbackSuccessPage;
