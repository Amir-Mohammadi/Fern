import { IProductsQueryString as IProductsQueryString } from '@Interfaces';
import { IProductsSearchParameters as IProductsSearchParameters, ISortBy } from '@Stores';
import { parseStringToNumber } from '@Utils/common';

class ProductsQueryStringService {
  public transformProductsQueryStringToSearchParameters(
    query: IProductsQueryString,
    categoryId: number | null,
  ): IProductsSearchParameters {
    var brands = this._transformBrandsQueryStringToArray(query.brand);
    var maxPrice = query.max_price ? parseStringToNumber(query.max_price) : undefined;
    var minPrice = query.min_price ? parseStringToNumber(query.min_price) : undefined;
    var sortBy = query.sortBy ? this._transformSortByQueryStringToNumber(query.sortBy) : undefined;
    var hasSellingStock = query.only_in_stock;
    var discounted = query.discounted;
    var categories = categoryId ? [categoryId] : undefined;
    var q = query.q;

    return {
      ...(brands && { brands: brands }),
      ...(maxPrice && { maxPrice: maxPrice }),
      ...(minPrice && { minPrice: minPrice }),
      ...(sortBy && { sortBy: sortBy }),
      ...(hasSellingStock && { hasSellingStock: hasSellingStock }),
      ...(categories && { categories: categories }),
      ...(discounted && { discounted: discounted }),
      ...(q && { q: q }),
    };
  }

  public transformProductsSearchParametersQueryString(
    productsSearchParameters: IProductsSearchParameters,
  ): IProductsQueryString {
    var brands = productsSearchParameters.brands?.map((value) => value + '');
    var maxPrice = productsSearchParameters.maxPrice ? productsSearchParameters.maxPrice + '' : undefined;
    var minPrice = productsSearchParameters.minPrice ? productsSearchParameters.minPrice + '' : undefined;
    var sortBy = productsSearchParameters.sortBy ? productsSearchParameters.sortBy + '' : undefined;
    var hasSellingStock = productsSearchParameters.hasSellingStock
      ? productsSearchParameters.hasSellingStock
      : undefined;
    var discounted = productsSearchParameters.discounted ? productsSearchParameters.discounted : undefined;
    var categoryId = productsSearchParameters.categoryId ? productsSearchParameters.categoryId + '' : undefined;
    var query = productsSearchParameters.query ? productsSearchParameters.query : undefined;

    return {
      ...(brands && { brand: brands }),
      ...(maxPrice && { max_price: maxPrice }),
      ...(minPrice && { min_price: minPrice }),
      ...(sortBy && { sortBy: sortBy }),
      ...(hasSellingStock && { has_selling_stock: hasSellingStock }),
      ...(discounted && { discounted: discounted }),
      ...(categoryId && { categoryId: categoryId }),
      ...(query && { q: query }),
    };
  }

  //#region private methods

  private _transformSortByQueryStringToNumber(input: string): ISortBy | undefined {
    if (typeof input == 'undefined') return;

    if (!isNaN(Number(input))) {
      if (Object.values(ISortBy).includes(Number(input))) {
        return Number(input);
      }
    }
    return undefined;
  }

  private _transformBrandsQueryStringToArray(input: string[] | string | undefined) {
    if (typeof input == 'undefined') return undefined;

    var stringBrands = this._transformQueryStringArrayToJSArray(input);
    var brands = this._stringArrayToNumberArray(stringBrands);

    return brands;
  }

  private _transformQueryStringArrayToJSArray(input: string[] | string) {
    let array: string[] = [];

    if (!Array.isArray(input)) {
      array = Array(input);
    } else {
      array = input;
    }

    return array;
  }

  private _stringArrayToNumberArray(input: string[]) {
    let numberArray: Array<number> = [];
    input.forEach((value) => {
      if (!isNaN(Number(value))) {
        numberArray.push(Number(value));
      }
    });
    return numberArray;
  }
  //#endregion
}

const productQueryStringService = new ProductsQueryStringService();
export default productQueryStringService;
