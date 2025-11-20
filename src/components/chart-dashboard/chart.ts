export interface Chart {
  id: string;
  label: string;
  category: Category;
  data: DataPoint[];
}

export const Category = {
  Primary: 'Primary',
  Secondary: 'Secondary',
  Tertiary: 'Tertiary'
} as const
export type Category = (typeof Category)[keyof typeof Category]

export interface DataPoint {
  date: Date,
  value: number,
}
  