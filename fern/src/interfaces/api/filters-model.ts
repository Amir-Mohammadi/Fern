import { OrderModel } from './order-model';
import { SortByModel } from './sort-by-model';

export interface FiltersModel {
  q?: string;
  page_index?: number;
  page_size?: number;
  sort_by?: SortByModel;
  order?: OrderModel;
}
