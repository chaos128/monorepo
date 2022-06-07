import axios from 'axios';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

async function getScoringRulesApi(productCategoryKey: string) {
  const { data } = await axios.get(
    `/scoringRules?productCategoryKey=${productCategoryKey}`,
  );
  return data;
}
interface IScoringRuleTool {
  key: string;
  label: string;
  title: string | null;
  detail: {
    __html: string;
  } | null;
}

const defaultSortingRulePrev: IScoringRuleTool[] = [
  {
    label: '추천순',
    key: 'recommendation',
    title: null,
    detail: null,
  },
  {
    /* 추천순(가격 상관 없이) */
    label: '성능순',
    key: 'recommendation_without_price',
    title: null,
    detail: null,
  },
];
const defaultSortingRuleAfter: IScoringRuleTool[] = [
  {
    label: '낮은 가격순',
    key: 'cheap',
    title: null,
    detail: null,
  },
  {
    label: '높은 가격순',
    key: 'expensive',
    title: null,
    detail: null,
  },
];
const useScoringRule = (props: {
  productCategoryKey: string | null;
  withDefault?: boolean;
  bannedRules?: string[];
}) => {
  const { productCategoryKey, withDefault, bannedRules } = props;
  const { data, isLoading } = useQuery(
    ['scoringRules', productCategoryKey],
    () => {
      if (productCategoryKey) {
        return getScoringRulesApi(productCategoryKey);
      }
    },
    {
      onError: (error) => {
        // necessary console.log
        console.log(error);
      },
    },
  );

  const bannedRuleSet = useMemo(() => {
    if (!bannedRules || bannedRules.length < 1) {
      return null;
    }

    return new Set(bannedRules);
  }, [bannedRules]);

  const arrData: IScoringRuleTool[] = useMemo(() => {
    const result = data
      ? (data.data as { key: string; name: string; description: string }[])
      : [];
    let scroingRuleArray = result.map((row) => {
      const obj: IScoringRuleTool = {
        key: row.key,
        label: row.name,
        title: '',
        detail: {
          __html: '',
        },
      };
      const splited = row.description.split('<br>');
      if (splited.length > 0) {
        obj.title = splited[0];
        if (splited.length > 1 && obj.detail) {
          obj.detail.__html = splited.slice(1, splited.length).join('<br>');
        }
      }
      return obj;
    });

    if (withDefault) {
      scroingRuleArray = [
        ...defaultSortingRulePrev,
        ...scroingRuleArray,
        ...defaultSortingRuleAfter,
      ];
    }

    return scroingRuleArray.filter((rule) => {
      if (bannedRuleSet?.has(rule.key)) {
        return false;
      }

      return true;
    });
  }, [data, withDefault, bannedRuleSet]);

  return {
    data: arrData,
    isLoading: isLoading,
  };
};

export {
  useScoringRule,
  getScoringRulesApi,
}
