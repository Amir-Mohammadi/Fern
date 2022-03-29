import { ProductItemProps } from '@Components/product-item';
import { ComparePropertiesType } from '@Components/screens/compare-screen';
import { STATIC_FILE } from '@Utils/statics';
import api from 'api';
import { IGetMarketBriefStuffs, IGetMarketStuffProperties } from 'api/models';

export default class CompareService {
  async getProduct(id: number): Promise<ProductItemProps> {
    try {
      const res = await api.v1.marketApi.getMarketBriefStuffById(id);
      return this.marketBriefStuffAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getCategoryId(id: number): Promise<number> {
    try {
      const res = await api.v1.marketApi.getMarketStuffById(id);

      return res.data.product_category.id;
    } catch (error) {
      throw error;
    }
  }

  async getProductsWithCategoryId(categoryId: number): Promise<Array<ProductItemProps>> {
    var params: URLSearchParams = new URLSearchParams();
    params.append('categories', categoryId.toString());

    try {
      const res = await api.v1.marketApi.getAllMarketBriefStuff(params);
      return this.marketBriefStuffsAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getMarketStuffFields(id: number): Promise<ComparePropertiesType[]> {
    try {
      const res = await api.v1.marketApi.getMarketStuffsProperties(id);
      return this.marketStuffPropertiesAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getMarketStuffProperties(fields: ComparePropertiesType[], id: number): Promise<ComparePropertiesType[]> {
    try {
      const res = await api.v1.marketApi.getMarketStuffsProperties(id);
      return this.FillProperties(fields, res.data, id);
    } catch (error) {
      throw error;
    }
  }

  private marketBriefStuffsAdapter(marketBriefStuffs: Array<IGetMarketBriefStuffs>): Array<ProductItemProps> {
    const marketBriefStuffsList: Array<ProductItemProps> = [];

    marketBriefStuffs.forEach((stuff) => {
      marketBriefStuffsList.push(this.marketBriefStuffAdapter(stuff));
    });
    return marketBriefStuffsList;
  }

  private marketBriefStuffAdapter(marketBriefStuff: IGetMarketBriefStuffs): ProductItemProps {
    return {
      id: marketBriefStuff.id,
      discountPrice:
        marketBriefStuff.discount && marketBriefStuff.discount > 0
          ? (marketBriefStuff.price * (100 - marketBriefStuff.discount)) / 100
          : 0,
      metaDescription: marketBriefStuff.meta_description,
      realPrice: marketBriefStuff.price,
      text: marketBriefStuff.name,
      hasSellingStock: true,
      offer: marketBriefStuff.discount && marketBriefStuff.discount > 0 ? true : false,
      discountRate: marketBriefStuff.discount,
      image: {
        src: STATIC_FILE(
          marketBriefStuff.preview_market_stuff_image.image_id,
          marketBriefStuff.preview_market_stuff_image.row_version,
        ),
        alt: marketBriefStuff.preview_market_stuff_image.image_alt,
        title: marketBriefStuff.preview_market_stuff_image.image_title,
      },
    };
  }

  private FillProperties(
    fields: ComparePropertiesType[],
    properties: IGetMarketStuffProperties[],
    productId: number,
  ): ComparePropertiesType[] {
    fields = this.compareProperties(fields, properties);
    properties.forEach((property) => {
      fields.forEach((prop) => {
        prop.items.forEach((field) => {
          if (property.catalog_item_id == field.id) {
            field.values.push({ productId: productId, value: property.value });
          }
        });
      });
    });

    return [...fields];
  }

  private marketStuffPropertiesAdapter(properties: IGetMarketStuffProperties[]) {
    const prop: ComparePropertiesType[] = this.getMainKeys(properties);

    properties.forEach((property) => {
      prop.forEach((p) => {
        if (property.reference?.id == p.id) {
          if (!p.items.some((propItem) => propItem.id == property.catalog_item_id)) {
            p.items.push({ id: property.catalog_item_id, key: property.catalog_item_key_name, values: [] });
          }
        }
      });
    });

    return prop;
  }

  private getMainKeys(properties: IGetMarketStuffProperties[]): ComparePropertiesType[] {
    const prop: ComparePropertiesType[] = [];
    properties.forEach((property) => {
      if (property.reference) {
        if (!prop.some((p) => p.id == property.reference?.id)) {
          prop.push({
            id: property.reference?.id,
            mainKey: property.reference.value,
            items: [],
          });
        }
      }
    });

    return prop;
  }
  private compareProperties(fields: ComparePropertiesType[], properties: IGetMarketStuffProperties[]) {
    properties.forEach((property) => {
      fields.forEach((p) => {
        if (property.reference?.id == p.id) {
          if (!p.items.some((propItem) => propItem.id == property.catalog_item_id)) {
            p.items.push({ id: property.catalog_item_id, key: property.catalog_item_key_name, values: [] });
          }
        }
      });
    });

    return [...fields];
  }
}
