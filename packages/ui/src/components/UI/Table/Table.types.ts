// Generated with util/create-component.js
export interface TableProps {
  data: ISection;
}

export interface ISection {
  id?: string | number;
  name?: string;
  specCategories: ISpecCategory[];
}

export interface ISpecCategory {
  symbol?: string;
  visualStatus?: number;
  name: string;
  value: string | number;
  unit?: string | null;
}
