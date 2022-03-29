export interface CatalogItemModel {
  id: number;
  type: number;
  order: number;
  is_main: boolean;
  has_multiple: boolean;
  value: string;
  catalog_id: number;
  reference_id: number;
  row_version: string;
}
