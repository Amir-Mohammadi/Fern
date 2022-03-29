import { FiltersModel } from './filters-model';

export interface MarketBriefStuffSearchParametersModel extends FiltersModel {
  brand?: Array<number>;
  categories?: Array<number>;
  has_selling_stock?: boolean;
  min_price?: string;
  max_price?: string;
  discounted?: boolean;
  q?: string;
}
