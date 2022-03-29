export interface IMarketMainProperty {
  id: number;
  value: string;
  order: number | null;
  catalogItemId: number | null;
  rowVersion: string | null;
  referenceId: number | null;
  catalogItemKeyName: string | null;
  extraKeyName: string | null;
  isMain: Boolean;
}
