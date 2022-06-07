import { IScoreMetaMap } from "../NosearchPick/NosearchPick.types";

export interface ScoreProps {
  data: { [key: string]: IScoreMetaMap };
  type?: string;
}
