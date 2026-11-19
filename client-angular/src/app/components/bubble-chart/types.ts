export interface BubbleData {
  id: string;
  name: string;
  value: number;
  r: number;
  x: number;
  y: number;
  [key: string]: string | number | null | undefined;
}

export interface BubbleChartConfig {
  colorByProp: string;
  groupByProp: string;
  colorMap: Record<string, string>;
}

export interface BubbleGroupData {
  data: BubbleData[];
  column: number;
  row: number;
  centerX: number;
  centerY: number;
  title: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}
