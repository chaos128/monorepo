import dynamic from "next/dynamic";

const ItemListPage = dynamic(
  () => import("../../pageComponents/recommendation/ItemListPage")
);

export default ItemListPage;
