export interface ExhibitionProps {
  data: IExhibitionItemData;
  fluid?: boolean;
}

export interface IExhibitionItemData {
  title: string;
  startAt: string;
  endAt: string;
  imageUrl: string;
  ImageWrapper?: JSX.Element;
}
