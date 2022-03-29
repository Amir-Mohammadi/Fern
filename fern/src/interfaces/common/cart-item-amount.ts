export interface ICartItemEdit {
  id: number;
  amount: number;
  productId: number;
  colorId: number;
  rowVersion: string | null;
}
