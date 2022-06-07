import { PurchaseGuide as NrcPurchaseGuide } from "@nosearch/ui";
import Image from "next/image";
import Link from "../../components/Link";
import { IPurchaseGuide } from "../../hooks/api/usePurchaseGuide";
import NextImageWrapper from "../../shared/components/next-image";

export type PurchaseGuideLocationType = "productDetail" | "pick" | "home";
function NewPurchaseGuide({
  viewType,
  data,
}: {
  viewType: PurchaseGuideLocationType;
  data: IPurchaseGuide;
}) {
  const purchaseGuideData = {
    ...data,
    categoryKey: data.key,
    categoryName: data.name,
    description: data.outline,
    ImageWrapper: (
      <NextImageWrapper
        nextjsRenderer={() => (
          <Image
            src={data.thumbnail}
            alt={data.title}
            layout="fill"
            className="object-cover"
          />
        )}
      />
    ),
  };
  return (
    <Link
      href={`/contents/guide/overview/${data.parentCategoryKey}/${data.key}`}
      passHref
    >
      <a>
        <NrcPurchaseGuide viewType={viewType} data={purchaseGuideData} />
      </a>
    </Link>
  );
}
export default NewPurchaseGuide;
