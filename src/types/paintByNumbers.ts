export interface PaintByNumbersRegion {
  id: number;
  colorNumber: number;
  path: string;
  isPainted?: boolean;
}

export interface PaintByNumbersColor {
  number: number;
  hex: string;
  name: string;
}

export interface PaintByNumbersData {
  regions: PaintByNumbersRegion[];
  colors: PaintByNumbersColor[];
  dimensions: {
    width: number;
    height: number;
  };
}