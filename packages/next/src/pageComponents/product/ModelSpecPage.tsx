import { useRouter } from "next/router";
import ModelSpec from "../../components/modelSpec";

const ModelSpecPage = () => {
  const router = useRouter();
  const { parentCategory, category, modelName } = router.query;

  return (
    <>
      <ModelSpec
        productCategoryKey={category as string}
        modelName={modelName as string}
      />
    </>
  );
};

export default ModelSpecPage;
