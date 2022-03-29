import { OrderModel, SortByModel } from '@Services';
import { ISortBy } from '@Stores';

export const transformSortByInterface = (
  productSortBy?: ISortBy,
): [SortByModel | undefined, OrderModel | undefined] => {
  switch (productSortBy) {
    case ISortBy.BESTSELLING: {
      return [SortByModel.SALES, OrderModel.DESC];
    }
    case ISortBy.CHEAPEST: {
      return [SortByModel.PRICE, OrderModel.ASC];
    }
    case ISortBy.MOST_EXPENSIVE: {
      return [SortByModel.PRICE, OrderModel.DESC];
    }
    case ISortBy.POPULAR: {
      return [SortByModel.POPULARITY, OrderModel.DESC];
    }
    case ISortBy.MOST_VISITED: {
      return [SortByModel.VISITS, OrderModel.DESC];
    }
    case ISortBy.OFFERED: {
      return [SortByModel.OFFERED, OrderModel.DESC];
    }
    default: {
      return [undefined, undefined];
    }
  }
};
