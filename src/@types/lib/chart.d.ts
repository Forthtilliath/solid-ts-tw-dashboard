declare global {
  namespace Chart {
    type ColumnData = { name: string; data: number[] }[];
    type RadarData = { name: string; data: number[] }[];
    // type RadarData = number[];
  }
}

export {};
