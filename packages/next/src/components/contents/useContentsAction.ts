import { useShareView } from "../../hooks/api/useShare";
import { useUserFavoriteOperations } from "../../hooks/api/useUserFavorite";

export const useContentsAction = ({
  contentId,
  contentType,
}: {
  contentId: number;
  contentType: string;
}) => {
  const { putUserFavorite } = useUserFavoriteOperations(contentId, contentType);

  const onLikeItem = () => {
    if (!contentId) {
      return;
    }
    putUserFavorite();
  };

  const { setShare } = useShareView();
  const onShareItem = () => {
    setShare();
  };

  const onClickComment = () => {
    console.log("comment");
  };

  return { onLikeItem, onShareItem, onClickComment };
};
