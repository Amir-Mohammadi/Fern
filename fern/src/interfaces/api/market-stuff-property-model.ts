import { CatalogItemModel } from './catalog-item-model';

export interface MarketStuffPropertyModel {
  id: number;
  value: string | null;
  order: number | null;
  catalog_item_id: number;
  catalog_item_key_name: string | null;
  extra_key_name: string | null;
  reference_id: number | null;
  is_main: boolean | null;
  row_version: string;
  reference: CatalogItemModel;
}
