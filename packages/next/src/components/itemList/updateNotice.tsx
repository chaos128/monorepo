import { Text } from "@nosearch/ui";

const UpdateNotice = () => {
  return (
    <div className="absolute bottom-[5.8rem] mt-[4rem] flex w-full items-center justify-between bg-blue-1 py-[1.2rem] px-[2rem] pc:static">
      <Text type="B10" className="text-gray-10">
        📌 <span className="font-bold">구강세정기, 키보드</span>가 추가되었어요
      </Text>
      <Text type="D3" className="text-gray-6">
        22.2.18 update
      </Text>
    </div>
  );
};

export default UpdateNotice;
