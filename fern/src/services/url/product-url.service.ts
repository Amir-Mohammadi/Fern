import { PageUrls } from '@Constants/page-urls';
import { UrlsConfig } from '@Constants/url-config';
import { parseStringToNumber } from '@Utils/common';
import { BaseUrlService, UrlQuery } from './base-url.service';

class ProductUrlService extends BaseUrlService {
  public createProductUrl(productId: number, productMeta: string = 'elesell-product'): string {
    // {product/elp-12/samsung-fridge-ms-124}
    return (
      PageUrls.Product +
      '/' +
      UrlsConfig.UrlPrefixes.productPrefix +
      '-' +
      productId +
      '/' +
      this.replaceUnsafeCharactersFromUrl(productMeta)
    );
  }

  public createCategoryUrl(categoryId: number, categoryMeta: string = 'elesell-category'): string {
    // {category/1/samsung-fridge-ms-124}
    return PageUrls.Search + '/' + +categoryId + '/' + this.replaceUnsafeCharactersFromUrl(categoryMeta);
  }

  public extractProductIdFromProductUrl(url: UrlQuery): number {
    if (url == undefined) throw new Error('product id is not provided');
    if (typeof url != 'string') throw new Error('product id is not valid string');
    if (!url.match(UrlsConfig.UrlPrefixes.productPrefix + '-')) throw new Error("url don't contain the product prefix");

    try {
      const productId = url.replace(UrlsConfig.UrlPrefixes.productPrefix + '-', '');
      return parseStringToNumber(productId);
    } catch (error) {
      throw new Error('id is not a number');
    }
  }
}
export { ProductUrlService };
