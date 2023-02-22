/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/models/product.model';

export interface OrderItems {
  productName: string;
  qty: number;
  imgUrl: string;
  price: number;
  cartQuantity: number;
  _id: Product;
}
export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export class OrderDto {
  @IsNotEmpty()
  orderItems: OrderItems[];
  @IsNotEmpty()
  shippingAddress: ShippingAddress;
  @IsNotEmpty()
  paymentMethod: string;
  @IsNotEmpty()
  itemsPrice: number;
  taxPrice?: number;
  @IsNotEmpty()
  shippingPrice: number;
  @IsNotEmpty()
  totalPrice: number;
}
