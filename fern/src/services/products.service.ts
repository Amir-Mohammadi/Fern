import { ProductItemProps } from '@Components/product-item';
import { STATIC_FILE } from '@Utils/statics';
import { IGetMarketBriefStuffs } from 'api/models';
import api from '../api';

export default class ProductsService {
  async likeProduct(marketStuffId: number) {
    try {
      await api.v1.marketCustomerApi.likeProduct(marketStuffId);
    } catch (error) {
      throw error;
    }
  }
  async unLikeProduct(marketStuffId: number) {
    try {
      await api.v1.marketCustomerApi.unLikeProduct(marketStuffId);
    } catch (error) {
      throw error;
    }
  }

  async getMarketBriefStuffs(params: URLSearchParams): Promise<ProductItemProps[]> {
    try {
      const res = await api.v1.marketApi.getAllMarketBriefStuff(params);

      return this.marketBriefStuffsAdapter(res.data);
    } catch (error) {
      throw error;
    }
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
}
