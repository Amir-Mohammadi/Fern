import { AuthenticateType } from '@Components/login';
import { CityModel, Gender, UserType } from '@Interfaces';
import { AuthenticateLoginType } from '@Interfaces/common';

export interface IAuthenticateReq {
  login_id: string;
}

export interface IAuthenticateRes {
  token: string;
  authenticate_type: AuthenticateType;
  authenticate_login_type: AuthenticateLoginType;
  is_optional_authenticate_type: boolean;
}

export interface IGetProvince {
  id: number;
  name: string;
  area_code: number;
  row_version: string;
}
export interface IGetCity {
  id: number;
  name: string;
  province: {
    id: number;
    name: string;
    area_code: number;
    row_version: string;
  };
  row_version: string;
  province_id: number;
}

export interface IProductCategories {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  explanation: string;
  parent_id: number;
  row_version: string;
}

export interface IVerifyAuthenticateReq {
  authenticate_type: AuthenticateType;
  password: string;
  verification_token: string;
}
export interface IVerifyAuthenticateRes {
  token: string;
}

export interface IGetLikedProducts {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  category_id: number;
  brand_id: number;
  default_product_color: {
    product_id: number;
    color_id: number;
    color: {
      id: number;
      name: string;
      code: number;
      row_version: string;
    };
  };
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string;
  };
  row_version: string;
  brief_description: string;
  brand_name: string;
  price: number;
  discount: number;
}

export interface IGetAddresses {
  id: number;
  city: {
    id: number;
    name: string;
    province: {
      id: number;
      name: string;
      area_code: number;
      row_version: string;
    };
    row_version: string;
    province_id: number;
  };
  description: string;
  postal_code: string;
  phone: string;
  address_owner_name: string;
  is_default: boolean;
  row_version: string;
}

export interface IGetAccountInfo {
  id: number;
  enabled: boolean;
  roles: UserType;
  email: string;
  phone: string;
  national_code: string;
  birthday: string;
  economic_code: string;
  father_name: string;
  first_name: string;
  city: CityModel;
  gender: Gender;
  last_name: string;
  picture_id: string;
  city_id: number;
  row_version: string;
}

export interface IEditAccountInfo {
  id: number;
  email?: string;
  phone?: string;
  national_code?: string;
  city_id?: number | null;
  birthday?: string;
  economic_code?: string | null;
  father_name?: string | null;
  first_name?: string;
  gender?: number | null;
  last_name?: string | null;
  picture_id?: string | null;
  row_version: string | null;
}

export interface IChangePhone {
  phone: string;
  row_version: string | null;
}
export interface IChangeEmail {
  email: string;
  row_version: string | null;
}
export interface IChangePassword {
  old_password: string;
  new_password: string;
}

export interface IGetRecentVisit {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  category_id: number;
  brand_id: number;
  default_product_color: {
    product_id: number;
    color_id: number;
    color: {
      id: number;
      name: string;
      code: number;
      row_version: string;
    };
  };
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string;
  };
  row_version: string;
  brief_description: string;
  brand_name: string;
  price: number;
  discount: number;
}

export interface IAddAddress {
  city_id: number;
  description: string;
  postal_code: string;
  phone: string;
  address_owner_name: string;
  row_version: string | null;
}

export interface IGetOrders {
  id: number;
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string;
  };
  product_name: string;
  product_category_name: string;
  brand_name: string;
  ordered_color: {
    id: number;
    name: string;
    code: number;
    row_version: string;
  };
  product_price: string;
  status: number;
  city: string;
  row_version: string;
}

export interface IGetUserComments {
  id: number;
  author: {
    id: number;
    profile_id: number;
    full_name: string;
    role: number;
  };
  text: string;
  created_at: string;
  update_at: string;
  product_name: string;
  preview_product_image: {
    id: number;
    image_id: string;
    order: number;
    image_alt: string;
    image_title: string;
    row_version: string;
  };
  default_product_color: {
    product_id: number;
    color_id: number;
    color: {
      id: number;
      name: string;
      code: string;
      row_version: string;
    };
  };
  product_id: number;
  brand_name: string;
}

export interface IGetMarketBriefStuffs {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  brand_name: string;
  price: number;
  discount: number;
  preview_market_stuff_image: {
    id: number;
    image_alt: string;
    order: number;
    image_title: string;
    image_id: string;
    row_version: string;
  };
  meta_description: string;
  brief_description: string;
}

export interface IGetMarketStuff {
  id: number;
  name: string;
  alt_title: string;
  preview_product_image: {
    id: number;
    image_alt: string;
    order: number;
    image_title: string;
    image_id: string;
    row_version: string;
  };
  row_version: string;
  brand: {
    id: number;
    name: string;
    url_title: string;
    browser_title: string;
    meta_description: string;
    image_alt: string;
    image_title: string;
    image_id: number;
    profile_id: number;
    row_version: string;
  };
  product_category: {
    id: number;
    name: string;
    url_title: string;
    browser_title: string;
    meta_description: string;
    explanation: string;
    parent_id: number;
    row_version: string;
  };
  default_color_id: number;
  liked_by_me: boolean;
  brief_description: string;
}

export interface IGetMarketStuffProperties {
  id: number;
  value: string;
  order: number;
  catalog_item_id: number;
  row_version: string;
  reference_id: number;
  catalog_item_key_name: string;
  extra_key_name: string;
  is_main: boolean;
  reference: {
    id: number;
    type: number;
    order: number;
    is_main: boolean;
    has_multiple: boolean;
    value: string;
    catalog_id: number;
    reference_id: number;
    row_version: string;
  } | null;
}

export interface IFiltrableProperties {
  id: number;
  title: string;
  type: number;
  has_multiple: boolean;
  catalog_id: number;
  reference_id: number;
  is_main: true;
  order: number;
  row_version: string;
  show_in_filter: boolean;
}

export interface IPropertyValue {
  key: string;
  value: string;
}

export interface IBrand {
  id: number;
  name: string;
  url_title: string;
  browser_title: string;
  meta_description: string;
  image_alt: string;
  image_title: string;
  image_id: string;
  profile_id: number;
  row_version: string;
}
