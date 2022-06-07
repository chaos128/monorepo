import axios from "axios";
import { useQuery } from "react-query";
import { BASE_URL } from "../../shared/variables";

const fetchOgTagDataEncyclopedia = async (id: string | number) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/ogTag?type=appliancesInfoDetail&id=${id}`
  );
  return data;
};

const fetchOgTagDataGuide = async (key: string) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/ogTag?type=purchaseGuideDetail&categoryKey=${key}`
  );
  return data;
};

const fetchOgTagDataProduct = async (key: string, modelName: string) => {
  const { data } = await axios(
    `${BASE_URL}/ns_api/v1/ogTag?type=productDetail&categoryKey=${key}&modelName=${modelName}`
  );
  return data;
};

const OGTAG_KEY = "ogtagUsage";

interface IOgTagDataProps {
  key?: string;
  modelName?: string;
  id?: string | number;
  type?: string;
}
const useOgTagData = (props: IOgTagDataProps | null) => {
  const { data, isLoading, isSuccess } = useQuery(OGTAG_KEY + props, () => {
    if (!props || !props.type) {
      return null;
    }

    switch (props.type) {
      case "appliancesInfoDetail":
        return props.id && fetchOgTagDataEncyclopedia(props.id);
      case "purchaseGuideDetail":
        return props.key && fetchOgTagDataGuide(props.key);
      case "productDetail":
        return (
          props.modelName &&
          props.key &&
          fetchOgTagDataProduct(props.key, props.modelName)
        );
    }
  });

  return {
    data,
    isLoading,
    isSuccess,
  };
};

export { useOgTagData };
