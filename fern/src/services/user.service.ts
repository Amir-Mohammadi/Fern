import { BriefProductProps } from '@Components/brief-product';
import { ProductItemProps } from '@Components/product-item';
import { UserInfoValuesProps } from '@Components/screens/user-panel-screen/user-information';
import { IAddress, ICity, IProvince } from '@Interfaces/common';
import { IUserComment } from '@Interfaces/common/user-comment';
import { IUserOrder } from '@Interfaces/common/user-orders';
import { STATIC_FILE } from '@Utils/statics';
import api from 'api';
import {
  IAddAddress,
  IChangeEmail,
  IChangePassword,
  IChangePhone,
  IEditAccountInfo,
  IGetAccountInfo,
  IGetAddresses,
  IGetCity,
  IGetLikedProducts,
  IGetOrders,
  IGetProvince,
  IGetRecentVisit,
  IGetUserComments,
} from 'api/models';
import moment from 'jalali-moment';

export default class UserService {
  async editAccountInfo(info: IEditAccountInfo): Promise<void> {
    try {
      const res = await api.v1.userApi.editSelfProfile(info);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getLikedProducts(): Promise<ProductItemProps[]> {
    try {
      const res = await api.v1.userApi.getLikedProducts();

      return this.likedProductToProductItem(res.data);
    } catch (error) {
      throw error;
    }
  }

  async changePhone(data: IChangePhone): Promise<void> {
    try {
      const res = await api.v1.userApi.changeSelfPhone(data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async changeEmail(data: IChangeEmail): Promise<void> {
    try {
      const res = await api.v1.userApi.changeSelfEmail(data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }
  async changePassword(data: IChangePassword): Promise<void> {
    try {
      const res = await api.v1.userApi.changePassword(data);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getAddresses(): Promise<IAddress[]> {
    try {
      const res = await api.v1.userApi.getSelfProfileAddresses();
      return this.addressAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async addAddress(address: IAddAddress): Promise<void> {
    try {
      await api.v1.userApi.createSelfProfileAddress(address);
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(address: IAddAddress, id: number): Promise<void> {
    try {
      await api.v1.userApi.editSelfProfileAddress(address, id);
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(id: number): Promise<void> {
    try {
      await api.v1.userApi.deleteSelfProfileAddress(id);
    } catch (error) {
      throw error;
    }
  }

  async setDefaultAddress(id: number): Promise<void> {
    try {
      await api.v1.userApi.setSelfDefaultProfileAddress(id);
    } catch (error) {
      throw error;
    }
  }

  async getUserComments(): Promise<IUserComment[]> {
    try {
      const res = await api.v1.userApi.getUserComments();

      return this.commentsAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(productId: number, commentId: number): Promise<void> {
    try {
      const res = await api.v1.productApi.deleteProductComment(productId, commentId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserRecentVisits(): Promise<BriefProductProps[]> {
    try {
      const res = await api.v1.userApi.getUserRecentProductVisits();
      return this.recentVisitsAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }
  async getAccountInfo(): Promise<UserInfoValuesProps> {
    try {
      const res = await api.v1.userApi.getSelfUser();

      return this.accountInfoAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }
  async getOrders(): Promise<IUserOrder[]> {
    try {
      const res = await api.v1.userApi.getSelfOrders();
      return this.ordersAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }
  async getProvinces(): Promise<IProvince[]> {
    try {
      const res = await api.v1.commonApi.getProvinces();
      return this.provincesAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }
  async getProvinceCities(provinceId: number): Promise<ICity[]> {
    try {
      const res = await api.v1.commonApi.getProvinceCities(provinceId);
      return this.citiesAdapter(res.data);
    } catch (error) {
      throw error;
    }
  }
  private likedProductToProductItem(products: Array<IGetLikedProducts>): Array<ProductItemProps> {
    const productItem: Array<ProductItemProps> = [];

    products.forEach((product) => {
      productItem.push({
        id: product.id,
        discountPrice: product.discount && product.discount > 0 ? (product.price * (100 - product.discount)) / 100 : 0,
        metaDescription: product.meta_description,
        realPrice: product.price,
        text: product.name,
        hasSellingStock: true,
        offer: product.discount && product.discount > 0 ? true : false,
        discountRate: product.discount,
        image: {
          src: STATIC_FILE(product.preview_product_image.image_id, product.preview_product_image.row_version),
          alt: product.preview_product_image.image_alt,
          title: product.preview_product_image.image_title,
        },
      });
    });
    return productItem;
  }
  private commentsAdapter(comments: Array<IGetUserComments>): Array<IUserComment> {
    const commentsList: Array<IUserComment> = [];

    comments.forEach((comment) => {
      commentsList.push({
        id: comment.id,
        brandName: comment.brand_name,
        defaultProductColor: {
          color: {
            id: comment.default_product_color.color.id,
            name: comment.default_product_color.color.name,
            HexCode: comment.default_product_color.color.code,
            rowVersion: comment.default_product_color.color.row_version,
          },
          colorId: comment.default_product_color.color_id,
          productId: comment.default_product_color.product_id,
        },
        text: comment.text,
        imageUrl: STATIC_FILE(comment.preview_product_image.image_id, comment.preview_product_image.row_version),
        previewProductImage: {
          id: comment.preview_product_image.id,
          imageAlt: comment.preview_product_image.image_alt,
          imageId: comment.preview_product_image.image_id,
          imageTitle: comment.preview_product_image.image_title,
          imageUrl: STATIC_FILE(comment.preview_product_image.image_id, comment.preview_product_image.row_version),
          rowVersion: comment.preview_product_image.row_version,
        },
        productName: comment.product_name,
        productId: comment.product_id,
        createdAt: comment.created_at,
        updateAt: comment.update_at,
      });
    });

    return commentsList;
  }
  private recentVisitsAdapter(products: Array<IGetRecentVisit>): Array<BriefProductProps> {
    const productsList: Array<BriefProductProps> = [];

    products.forEach((product) => {
      productsList.push({
        product: {
          id: product.id,
          brand: product.brand_name,
          title: product.name,
          image: STATIC_FILE(product.preview_product_image.image_id, product.preview_product_image.row_version),
          metaDescription: product.meta_description,
        },
      });
    });

    return productsList;
  }
  private addressAdapter(addresses: Array<IGetAddresses>): Array<IAddress> {
    const addressList: Array<IAddress> = [];

    addresses.forEach((address) => {
      addressList.push({
        id: address.id,
        addressOwnerName: address.address_owner_name,
        cityId: address.city.id,
        city: {
          id: address.city.id,
          name: address.city.name,
          province: {
            id: address.city.province.id,
            areaCode: address.city.province.area_code,
            name: address.city.province.name,
            rowVersion: address.city.province.row_version,
          },
          rowVersion: address.city.row_version,
        },
        description: address.description,
        isDefault: address.is_default,
        phone: address.phone,
        postalCode: address.postal_code,
        rowVersion: address.row_version,
      });
    });

    return addressList;
  }
  private accountInfoAdapter(info: IGetAccountInfo): UserInfoValuesProps {
    return {
      id: info.id,
      birthDate: info.birthday ? moment(info.birthday, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD') : '',
      cardNumber: '',
      email: info.email,
      job: '',
      nationalCode: info.national_code,
      phoneNumber: info.phone,
      nameAndLastName: `${info.first_name} ${info.last_name}`,
      rowVersion: info.row_version,
      cityId: info.city_id,
      economicCode: info.economic_code,
      fatherName: info.father_name,
      firstName: info.first_name,
      gender: info.gender,
      lastName: info.last_name,
      pictureId: info.picture_id,
    };
  }
  private ordersAdapter(orders: Array<IGetOrders>): Array<IUserOrder> {
    const orderList: Array<IUserOrder> = [];
    orders.forEach((order) => {
      orderList.push({
        id: order.id,
        brandName: order.brand_name,
        city: order.city,
        colorCode: order.ordered_color.code.toString(16),
        colorName: order.ordered_color.name,
        imageUrl: STATIC_FILE(order.preview_product_image.image_id, order.preview_product_image.row_version),
        productCategoryName: order.product_category_name,
        productName: order.product_name,
        productPrice: order.product_price,
        purchasedAt: '',
        rowVersion: order.row_version,
        status: order.status,
      });
    });
    return orderList;
  }
  private provincesAdapter(provinces: Array<IGetProvince>): Array<IProvince> {
    const provinceList: Array<IProvince> = [];
    provinces.forEach((province) => {
      provinceList.push({
        id: province.id,
        name: province.name,
        areaCode: province.area_code,
        rowVersion: province.row_version,
      });
    });
    return provinceList;
  }
  private citiesAdapter(cities: Array<IGetCity>): Array<ICity> {
    const citiesList: Array<ICity> = [];
    cities.forEach((city) => {
      citiesList.push({
        id: city.id,
        name: city.name,
        province: {
          id: city.province.id,
          name: city.province.name,
          areaCode: city.province.area_code,
          rowVersion: city.province.row_version,
        },
        rowVersion: city.row_version,
      });
    });
    return citiesList;
  }
}
