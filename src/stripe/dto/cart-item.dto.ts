export interface CartItemDTO {
  product: { id: string; name: string; price: number };
  quantity: number;
}
