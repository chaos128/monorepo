import { motion } from "framer-motion";

const RecommendationPage = () => {
  return (
    <div className="text-5xl">
      <p className="font-thin">안녕하세요 노써치 입니다</p>
      <p className="font-extralight">안녕하세요 노써치 입니다</p>
      <p className="font-light">안녕하세요 노써치 입니다</p>
      <p className="font-normal">안녕하세요 노써치 입니다</p>
      <p className="font-medium">안녕하세요 노써치 입니다</p>
      <p className="font-semibold">안녕하세요 노써치 입니다</p>
      <p className="font-bold">안녕하세요 노써치 입니다</p>
      <style jsx>{`
        p {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default RecommendationPage;
