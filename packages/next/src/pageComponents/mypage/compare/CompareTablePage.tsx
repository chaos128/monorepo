import { useRouter } from "next/router";
import { useEffect } from "react";
import CompareTable from "../../../components/compare/compareTable";
import { useCompareTable } from "../../../components/compare/compareTableHooks";

const CompareTablePage = () => {
  const router = useRouter();
  const { category } = router.query;
  const { onResetCompareAtoms } = useCompareTable(category as string);

  useEffect(() => {
    return () => {
      onResetCompareAtoms();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>compare</div>
      <CompareTable category={category as string} />
    </>
  );
};

export default CompareTablePage;
