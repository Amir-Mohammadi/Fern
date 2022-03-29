export interface OrderCheckoutCargoModel {
  product_name: string;
  product_color_name: string;
  product_brand_name: string;
  shipping_date_time: string | null;
  price: number;
  discount: number;
  amount: number;
}
