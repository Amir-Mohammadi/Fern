export interface ProductAttributeModel {
  id: number;
  value: string;
  order: number | null;
  catalog_item_id: number | null;
  row_version: string | null;
  reference_id: number | null;
  catalog_item_key_name: string | null;
  extra_key_name: string | null;
  is_main: Boolean;
}
