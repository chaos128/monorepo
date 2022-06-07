// Generated with util/create-component.js
export interface CommentProps {
  data: ICommentData;
  isAdminUser?: boolean;
  isLoginedUser?: boolean;
  isMine?: boolean;
}

export interface ICommentData {
  id: number;
  user: {
    nickName: string;
    profileImage: string;
    profileImageWrapper?: JSX.Element;
    isAdmin: boolean;
  };
  content: string;
  likeStatus: boolean;
  createdAt: string;
  answerCommentsCount: number;
  answerComments: ICommentData[];
  onLikeComment: Function;
  onReplyComment: Function;
  onEditComment?: Function;
  onDeleteComment?: Function;
}
