import {
  BookmarkDefault,
  BookmarkPressed,
  Button,
  IconComment,
  Share,
  Text,
} from "@nosearch/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IEncyclopediaDetail } from "../../hooks/api/useAppliancesDetailInfo";
import { IPurchaseGuideDetail } from "../../hooks/api/usePurchaseGuide";
import { useContentsAction } from "./useContentsAction";

interface IContentsFooterProps {
  data: IPurchaseGuideDetail | IEncyclopediaDetail;
  commentCount: number;
  parentCategory: string;
  productCategory: string;
}

const ContentsFooter = ({
  data,
  commentCount,
  parentCategory,
  productCategory,
}: IContentsFooterProps) => {
  return (
    <div className="fixed bottom-0 z-[200] flex h-[5.8rem] w-full max-w-[1200px] content-around items-center justify-around border-t border-gray-3 bg-white pc:hidden">
      <div>
        <ActionButtons data={data} commentCount={commentCount} />
      </div>
      <Link
        href={`/recommendation/pick/${parentCategory}/${productCategory}`}
        passHref
      >
        <Button size="l" type="outline" className="w-[42vw]">
          추천제품 보기
        </Button>
      </Link>
    </div>
  );
};

export default ContentsFooter;

const ActionButtons = ({
  data,
  commentCount,
}: {
  data: IPurchaseGuideDetail | IEncyclopediaDetail;
  commentCount: number;
}) => {
  const { onLikeItem, onShareItem, onClickComment } = useContentsAction({
    contentId: data.id,
    contentType: "purchaseGuide",
  });
  const [isLiked, setIsLiked] = useState<boolean>(data.likeStatus ?? false);

  const onLikeStatus = (likeStatus: boolean) => {
    setIsLiked(likeStatus);
  };

  useEffect(() => {
    onLikeStatus(data.likeStatus ?? false);
  }, [data.likeStatus]);

  return (
    <div className="flex items-center justify-center space-x-[3.5rem]">
      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onLikeItem();
            onLikeStatus(!isLiked);
          }
        }}
      >
        <div className="flex flex-col items-center">
          {isLiked ? (
            <BookmarkPressed size="2.4rem" />
          ) : (
            <BookmarkDefault size="2.4rem" />
          )}
          <Text
            type="D3"
            className={`mt-[0.1rem] whitespace-nowrap ${
              isLiked ? "text-primary" : "text-gray-10"
            }`}
          >
            {data.favoriteCount}
          </Text>
        </div>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onShareItem();
          }
        }}
      >
        <Share size="2.4rem" />
        <Text type="D3" className="mt-[0.1rem] text-gray-10">
          공유
        </Text>
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          if ((e.target as Element).nodeName === "svg" || "path") {
            onClickComment();
          }
        }}
      >
        <IconComment size="2.4rem" />
        <Text type="D3" className="mt-[0.1rem] text-gray-10">
          {commentCount ?? 0}
        </Text>
      </button>
    </div>
  );
};
