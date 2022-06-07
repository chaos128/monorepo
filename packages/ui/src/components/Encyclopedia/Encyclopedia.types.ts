export interface EncyclopediaProps {
  data: IEncyclopediaItemData;
  type: "row" | "column";
  fluid?: boolean;
}

export interface IEncyclopediaItemData {
  title: string;
  categoryKr: string;
  thumbnail: string;
  ImageWrapper?: JSX.Element;
  isVideo?: boolean;
  isNew?: boolean;
}
