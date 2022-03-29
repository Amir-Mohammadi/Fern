import { ProductItemProps } from '@Components/product-item';
import { BrandInfo } from '@Components/screens/brand-screen';
import { STATIC_FILE } from '@Utils/statics';
import { SeoData } from '@Utils/types';
import api from 'api';
import { IBrand, IGetMarketBriefStuffs, IProductCategories } from 'api/models';

export default class BrandService {
  async getBrandInfo(brandId: number): Promise<{ brand: BrandInfo; seoData: SeoData }> {
    try {
      const res = await api.v1.marketApi.getMarketBrand(brandId);
      return this.brandInfoAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async getBrandCategories(brandId: number): Promise<{ title: string; id: number }[]> {
    try {
      const res = await api.v1.marketApi.getMarketBrandStuffCategories(brandId);
      return this.brandCategoryAdapter(res.data);
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

  private brandCategoryAdapter(categoryList: Array<IProductCategories>): Array<{ title: string; id: number }> {
    const categories: Array<{ title: string; id: number }> = [];
    categoryList.forEach((category) => {
      categories.push({ id: category.id, title: category.name });
    });
    return categories;
  }

  private brandInfoAdapter(brandData: IBrand): { brand: BrandInfo; seoData: SeoData } {
    const brand: BrandInfo = {
      id: brandData.id,
      title: brandData.name,
      image: {
        src: STATIC_FILE(brandData.image_id, brandData.row_version),
        alt: brandData.image_alt,
        title: brandData.image_title,
      },
    };

    const seoData: SeoData = { metaDescription: brandData.meta_description, pageTitle: brandData.browser_title };

    return { brand, seoData };
  }
}
