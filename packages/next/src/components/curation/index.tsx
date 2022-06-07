import Link from "../../components/Link";
import { useCategories } from "../../hooks/api/useCategories";
import { koreanPostWord } from "../../shared/functions";

const Curation = ({
  parentCategory,
  category,
}: {
  parentCategory: string;
  category: string;
}) => {
  const { categoryMap } = useCategories();

  let categoryKr = "제품";
  if (categoryMap && categoryMap[category])
    categoryKr = categoryMap[category].name;

  if (!categoryMap) {
    return null;
  }

  return (
    <div>
      <div>
        <div>어떤 {koreanPostWord(categoryKr)} 찾고 계신가요?</div>
        <div>원하는 조건을 알려주시면</div>
        <div>나에게 딱 알맞는 {koreanPostWord(categoryKr)}</div>
        <div>골라서 추천해드려요</div>
      </div>
      <Link
        href={`/curation/${parentCategory}/${category}/question?questionNumber=0`}
        passHref
      >
        <button type="button">맞춤 추천받기</button>
      </Link>
    </div>
  );
};

export default Curation;
