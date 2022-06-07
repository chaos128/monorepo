import axios from "axios";
import { IGoods } from "ns-ts-interfaces";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

export interface IStoreGoods extends IGoods {
  brandName: string;
}

const generateStoreGoodsListKey = (cateCd: string) => {
  return ["getStoreGoodsList", cateCd];
};

const fetchStoreGoodsList = async (size: any, cateCd: any) => {
  const { data } = await axios.get<IStoreGoods[]>(
    `${BASE_URL}/ns_api/v1/store/getDealGoods?size=${size}&cateCd=${cateCd}`
  );
  return data;
};

interface IStoreGoodsListProps {
  size: number;
  cateCd: string | null;
}
export default function useStoreGoodsList({
  size,
  cateCd,
}: IStoreGoodsListProps) {
  const key = generateStoreGoodsListKey(cateCd as string);

  const { data, isLoading } = useQuery(key, () => {
    return fetchStoreGoodsList(size, cateCd);
  });

  return {
    storeGoodsData: data ? data : null,
    isLoading: isLoading,
  };
}
