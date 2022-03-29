import { PageUrls } from '@Constants/page-urls';
import productQueryStringService from '@Services/stores/product-query-string.service';
import { IProductsSearchParameters } from '@Stores';
import QueryString from 'qs';
import { BaseUrlService } from './base-url.service';

class SearchUrlService extends BaseUrlService {
  public createSearchUrl(parameters: IProductsSearchParameters): string {
    // {search?sortBy = 1  or  search/1   or   search?brand = 1 }
    var searchQueryTransformer = productQueryStringService.transformProductsSearchParametersQueryString(parameters);
    const searchQueryString = QueryString.stringify(searchQueryTransformer);

    if (parameters.categoryId) {
      return PageUrls.Search + '/' + parameters.categoryId;
    } else {
      return PageUrls.Search + '?' + searchQueryString;
    }
  }
}

export { SearchUrlService };
