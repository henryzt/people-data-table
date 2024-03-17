export const textSorter = (a: string, b: string) => a.localeCompare(b);
export const numberSorter = (a: number, b: number) => a - b;
export const dateSorter = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();
export const booleanSorter = (a: boolean, b: boolean) => (a === b ? 0 : a ? 1 : -1);
export type Sorter =
  | typeof textSorter
  | typeof numberSorter
  | typeof dateSorter
  | typeof booleanSorter;

export const booleanFormatter = (value: boolean) => (value ? "Yes" : "No");
export const numberFormatter = (value: number) =>
  value.toLocaleString(undefined, {
    maximumFractionDigits: 0,
  });
export type Formatter = typeof booleanFormatter | typeof numberFormatter;
