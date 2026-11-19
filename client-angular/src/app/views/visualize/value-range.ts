export interface ValueRange {
  lower: number;
  upper: number;
}

export const valueRangeMin = 1;

export const maxValue = (items: { value: number }[]) =>
  items.reduce((max, item) => Math.max(max, item.value), valueRangeMin);

export const filterByValue = <T extends { value: number }>(items: T[], range: ValueRange) =>
  items.filter((item) => item.value >= range.lower && item.value <= range.upper);
