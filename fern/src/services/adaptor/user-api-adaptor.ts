//#region imports
import { getStaticURl } from '@Config';
import {
  AuthenticationModel,
  CityModel,
  ProvinceModel,
  UserAddressModel,
  UserModel,
  VerifyAuthenticateModel,
  VerifyModel,
} from '@Interfaces';
import { ChangeEmailModel } from '@Interfaces/api/change-email-model';
import { ChangePasswordModel } from '@Interfaces/api/change-password-model';
import { ChangePhoneModel } from '@Interfaces/api/change-phone-model';
import { CurrentUserModel } from '@Interfaces/api/current-user-model';
import { EditCurrentUserModel } from '@Interfaces/api/edit-current-user-model';
import { LikedProductModel } from '@Interfaces/api/liked-product-model';
import { SaveUserAddressModel } from '@Interfaces/api/save-user-address-model';
import { UserCommentModel } from '@Interfaces/api/user-comment-model';
import { UserOrderModel } from '@Interfaces/api/user-order-model';
import { VisitedProductModel } from '@Interfaces/api/visited-product-model';
import {
  IAddress,
  IAuthentication,
  IChangePassword,
  IChangePhone,
  ICity,
  IEditCurrentUser,
  IProductColor,
  IProductImage,
  IProvince,
  IUser,
  IVerify,
  IVerifyAuthenticate,
} from '@Interfaces/common';
import { IChangeEmail } from '@Interfaces/common/change-email';
import { ICurrentUser } from '@Interfaces/common/current-user';
import { ILikedProduct } from '@Interfaces/common/liked-product';
import { ISaveUserAddress } from '@Interfaces/common/save-user-address';
import { IUserComment } from '@Interfaces/common/user-comment';
import { IUserOrder } from '@Interfaces/common/user-orders';
import { IVisitedProduct } from '@Interfaces/common/visited-product';
import { ProductColorModel, ProductImageModel } from '@Services';
//#endregion
class UserApiAdaptor {
  public reverseTransformAuthenticationModel(authentication: IAuthentication): AuthenticationModel {
    return {
      login_id: authentication.loginId,
    };
  }
  public reverseTransformSaveUserAddressModel(saveUserAddress: ISaveUserAddress): SaveUserAddressModel {
    return {
      city_id: saveUserAddress.cityId,
      phone: saveUserAddress.phone,
      address_owner_name: saveUserAddress.addressOwnerName,
      description: saveUserAddress.description,
      postal_code: saveUserAddress.postalCode,
      row_version: saveUserAddress.rowVersion,
    };
  }
  public transformVerifyModel(authenticateResponse: VerifyModel): IVerify {
    return {
      token: authenticateResponse.token,
      authenticateType: authenticateResponse.authenticate_type,
      authenticateLoginType: authenticateResponse.authenticate_login_type,
      isOptionalAuthenticateType: authenticateResponse.is_optional_authenticate_type,
    };
  }

  public reverseTransformVerifyAuthenticateModel(verifyAuthenticate: IVerifyAuthenticate): VerifyAuthenticateModel {
    return {
      authenticate_type: verifyAuthenticate.authenticateType,
      password: verifyAuthenticate.password,
      verification_token: verifyAuthenticate.verificationToken,
    };
  }

  public transformLikedProducts(likedProducts: Array<LikedProductModel>) {
    return likedProducts.map((likedProduct) => {
      return this._transformLikedProduct(likedProduct);
    });
  }

  public transformRecentlyVisitedProducts(visitedProducts: Array<VisitedProductModel>) {
    return visitedProducts.map((visitedProduct) => {
      return this._transformVisitedProduct(visitedProduct);
    });
  }

  public transformUserOrders(userOrders: Array<UserOrderModel>) {
    return userOrders.map((userOrder) => {
      return this._transformUserOrder(userOrder);
    });
  }
  public transformUserInfoValues(currentUser: CurrentUserModel): ICurrentUser {
    const nameAndLastName = currentUser.first_name + ' ' + currentUser.last_name;
    return {
      nameAndLastName: nameAndLastName ?? '',
      nationalCode: currentUser.national_code ?? '',
      phoneNumber: currentUser.phone ?? '',
      email: currentUser.email ?? '',
      birthDate: currentUser.birthday,
      job: '',
      cardNumber: '',
    };
  }

  public transformUserComments(userComments: Array<UserCommentModel>) {
    return userComments.map((userComment) => {
      return this._transformUserComment(userComment);
    });
  }

  public transformAddresses(addresses: Array<UserAddressModel>) {
    return addresses.map((address) => {
      return this._transformAddress(address);
    });
  }

  public transformUser(user: UserModel): IUser {
    return {
      id: user.id ?? 0,
      enabled: user.enabled,
      roles: user.roles,
      email: user.email,
      phone: user.phone,
      nationalCode: user.national_code,
      birthday: user.birthday,
      economicCode: user.economic_code,
      fatherName: user.father_name,
      firstName: user.first_name ?? '',
      city: user.city,
      gender: user.gender,
      lastName: user.last_name,
      pictureId: user.picture_id,
      rowVersion: user.row_version,
      cityId: user.city_id ?? 0,
    };
  }

  private _transformUserComment(userComment: UserCommentModel): IUserComment {
    var imageUrl = '';
    if (userComment.preview_product_image?.image_id && userComment.preview_product_image?.row_version) {
      imageUrl = getStaticURl(
        userComment.preview_product_image.image_id,
        userComment.preview_product_image.row_version,
      );
    }
    return {
      id: userComment.id,
      text: userComment.text,
      createdAt: userComment.created_at,
      updateAt: userComment.update_at,
      productName: userComment.product_name ?? '',
      previewProductImage: this._transformProductImageModel(userComment.preview_product_image) ?? null,
      defaultProductColor: this._transformProductColorModel(userComment.default_product_color) ?? null,
      imageUrl: imageUrl,
      productId: userComment.product_id ?? 0,
      brandName: userComment.brand_name ?? '',
    };
  }

  private _transformVisitedProduct(visitedProduct: VisitedProductModel): IVisitedProduct {
    var imageUrl = '';
    if (visitedProduct.preview_product_image?.image_id && visitedProduct.preview_product_image?.row_version) {
      imageUrl = getStaticURl(
        visitedProduct.preview_product_image.image_id,
        visitedProduct.preview_product_image.row_version,
      );
    }
    return {
      product: {
        id: visitedProduct.id,
        title: visitedProduct.name ?? '',
        brand: visitedProduct.brand_name ?? '',
        color: visitedProduct.default_product_color?.color?.name ?? '',
        productColor: this._transformProductColorModel(visitedProduct.default_product_color) ?? null,
        image: imageUrl ?? '',
      },
    };
  }

  private _transformUserOrder(userOrder: UserOrderModel): IUserOrder {
    var imageUrl = '';
    if (userOrder.preview_product_image?.image_id && userOrder.preview_product_image?.row_version) {
      imageUrl = getStaticURl(userOrder.preview_product_image.image_id, userOrder.preview_product_image.row_version);
    }
    return {
      id: userOrder.id,
      productName: userOrder.product_name,
      productCategoryName: userOrder.product_category_name,
      colorCode: userOrder.ordered_color.code.toString(),
      colorName: userOrder.ordered_color.name,
      brandName: userOrder.brand_name,
      productPrice: userOrder.product_price,
      rowVersion: userOrder.row_version,
      imageUrl: imageUrl,
      status: userOrder.status,
      purchasedAt: '',
      city: userOrder.city ?? '',
    };
  }

  private _transformAddress(address: UserAddressModel): IAddress {
    return {
      addressOwnerName: address.address_owner_name,
      city: this._transformCityModel(address.city),
      cityId: address.city_id ?? 0,
      description: address.description,
      id: address.id,
      phone: address.phone,
      postalCode: address.postal_code,
      isDefault: address.is_default,
      rowVersion: address.row_version,
    };
  }

  private _transformProductColorModel(productColors: ProductColorModel): IProductColor {
    return {
      color: {
        HexCode: this._transformIntegerColorToHexColor(productColors?.color?.code ?? 0),
        id: productColors?.color?.id ?? productColors?.color_id ?? 0,
        name: productColors?.color?.name ?? 'white',
        rowVersion: productColors?.color?.row_version ?? 'empty',
      },
      colorId: productColors?.color_id ?? 0,
      productId: productColors?.product_id ?? 0,
    };
  }

  private _transformCityModel(city: CityModel): ICity {
    return {
      id: city.id,
      name: city.name,
      province: this._transformProvinceModel(city.province),
      rowVersion: city.row_version,
    };
  }
  private _transformProvinceModel(province: ProvinceModel): IProvince {
    return {
      id: province.id,
      name: province.name,
      areaCode: province.area_code,
      rowVersion: province.row_version,
    };
  }
  private _transformLikedProduct(likedProduct: LikedProductModel): ILikedProduct {
    var imageUrl = '';
    if (likedProduct.preview_product_image?.image_id && likedProduct.preview_product_image?.row_version) {
      imageUrl = getStaticURl(
        likedProduct.preview_product_image.image_id,
        likedProduct.preview_product_image.row_version,
      );
    }
    let offer = false;
    let discountPrice;
    if (likedProduct.discount && likedProduct.discount > 0) {
      discountPrice = (likedProduct.price * (100 - likedProduct.discount)) / 100;
      offer = true;
    }
    return {
      text: likedProduct.name ?? '',
      previewProductImage: this._transformProductImageModel(likedProduct.preview_product_image),
      realPrice: likedProduct.price ?? 0,
      discountRate: likedProduct.discount ?? 0,
      discountType: likedProduct.discount_type ?? 0,
      offer: offer ?? false,
      image: imageUrl,
      discountPrice: discountPrice ?? 0,
      hasSellingStock: likedProduct.has_selling_stock ?? false,
    };
  }

  private _transformIntegerColorToHexColor(code: number) {
    return '#' + code.toString(16);
  }

  private _transformProductImageModel(productImageModel: ProductImageModel): IProductImage {
    const imageUrl = getStaticURl(productImageModel?.image_id, productImageModel?.row_version) ?? '';
    return {
      imageUrl: imageUrl,
      id: productImageModel?.id ?? 0,
      imageAlt: productImageModel?.image_alt ?? '',
      imageId: productImageModel?.image_id ?? '',
      imageTitle: productImageModel?.image_title ?? '',
      order: productImageModel?.order ?? 0,
      rowVersion: productImageModel?.row_version ?? '',
      tooltip: productImageModel?.image_title ?? '',
    };
  }
  public reverseTransformChangeEmailModel(changeEmail: IChangeEmail): ChangeEmailModel {
    return {
      email: changeEmail.email,
      row_version: changeEmail.rowVersion,
    };
  }
  public reverseTransformChangePhoneModel(changePhone: IChangePhone): ChangePhoneModel {
    return {
      phone: changePhone.phone,
      row_version: changePhone.rowVersion,
    };
  }
  public reverseTransformChangePasswordModel(changePassword: IChangePassword): ChangePasswordModel {
    return {
      old_password: changePassword.oldPassword,
      new_password: changePassword.newPassword,
    };
  }
  public reverseTransformEditCurrentUserModel(editCurrentUser: IEditCurrentUser): EditCurrentUserModel {
    return {
      id: editCurrentUser.id,
      email: editCurrentUser.email,
      phone: editCurrentUser.phone,
      national_code: editCurrentUser.nationalCode,
      city_id: editCurrentUser.cityId ?? 0,
      birthday: editCurrentUser.birthday,
      economic_code: editCurrentUser.economicCode,
      father_name: editCurrentUser.fatherName,
      first_name: editCurrentUser.firstName,
      gender: editCurrentUser.gender,
      last_name: editCurrentUser.lastName,
      picture_id: editCurrentUser.pictureId,
      row_version: editCurrentUser.rowVersion,
    };
  }
}

export { UserApiAdaptor };
