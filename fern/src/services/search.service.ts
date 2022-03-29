import { CheckBoxProps } from '@Components/check-box';
import { EspFilterProps } from '@Components/esp-filters';
import { ProductItemProps } from '@Components/product-item';
import { Mark } from '@material-ui/core';
import { STATIC_FILE } from '@Utils/statics';
import api from 'api';
import { IBrand, IFiltrableProperties, IGetMarketBriefStuffs, IPropertyValue } from 'api/models';

export default class SearchService {
  async getFilterableProperties(categoryId: number): Promise<EspFilterProps[]> {
    try {
      const res = await api.v1.marketApi.getFiltrableProperties(categoryId);
      return this.getShowInFilterProperties(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getFiltrablePropertiesValues(propertyId: number, categoryId: number): Promise<CheckBoxProps[]> {
    try {
      const res = await api.v1.marketApi.getFiltrablePropertiesValues(categoryId, propertyId);
      return this.propertyValueAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getCategoryBrands(categoryId: number): Promise<CheckBoxProps[]> {
    try {
      const res = await api.v1.marketApi.getMarketStuffCategoryBrands(categoryId);

      return this.brandsToFilterOptionAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getCategoryPrices(categoryId: number): Promise<Mark[]> {
    try {
      const res = await api.v1.marketApi.getMarketStuffCategoryStuffPrices(categoryId);

      return this.categoryPricesAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getProducts(params: URLSearchParams, esp?: string): Promise<ProductItemProps[]> {
    try {
      const res = await api.v1.marketApi.getAllMarketBriefStuff(params, esp);

      return this.marketBriefStuffsAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  private getShowInFilterProperties(properties: Array<IFiltrableProperties>): Array<EspFilterProps> {
    const filter: Array<EspFilterProps> = [];
    properties.forEach((property) => {
      if (property.show_in_filter) {
        filter.push({ propertyId: property.id, header: property.title, options: [] });
      }
    });
    return filter;
  }

  private propertyValueAdapter(values: Array<IPropertyValue>): Array<CheckBoxProps> {
    const options: Array<CheckBoxProps> = [];

    values.forEach((value) => {
      options.push({ id: value.key, checked: false, text: value.value });
    });

    return options;
  }

  private brandsToFilterOptionAdapter(brands: Array<IBrand>): Array<CheckBoxProps> {
    const options: Array<CheckBoxProps> = [];

    brands.forEach((brand) => {
      options.push({ id: brand.id, checked: false, text: brand.name });
    });

    return options;
  }

  private marketBriefStuffsAdapter(marketBriefStuffs: Array<IGetMarketBriefStuffs>): Array<ProductItemProps> {
    const marketBriefStuffsList: Array<ProductItemProps> = [];

    marketBriefStuffs.forEach((stuff) => {
      marketBriefStuffsList.push({
        id: stuff.id,
        discountPrice: stuff.discount && stuff.discount > 0 ? (stuff.price * (100 - stuff.discount)) / 100 : 0,
        metaDescription: stuff.meta_description,
        realPrice: stuff.price,
        text: stuff.name,
        hasSellingStock: true,
        offer: stuff.discount && stuff.discount > 0 ? true : false,
        discountRate: stuff.discount,
        image: {
          src: STATIC_FILE(stuff.preview_market_stuff_image.image_id, stuff.preview_market_stuff_image.row_version),
          alt: stuff.preview_market_stuff_image.image_alt,
          title: stuff.preview_market_stuff_image.image_title,
        },
      });
    });
    return marketBriefStuffsList;
  }

  private categoryPricesAdapter(prices: Array<number>): Array<Mark> {
    const pricesList: Array<Mark> = [];
    prices.forEach((price) => {
      pricesList.push({ value: price });
    });

    return pricesList;
  }
}
