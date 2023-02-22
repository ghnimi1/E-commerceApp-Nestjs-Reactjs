/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from './product.model';
import { User } from './user.model';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;
  @Prop({
    type: [
      {
        productName: { type: String, required: true },
        cartQuantity: { type: Number, required: true },
        imgUrl: { type: String, required: true },
        price: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
  })
  orderItems: {
    name: string;
    qty: number;
    image: string;
    price: number;
    productId: Product;
  }[];

  @Prop({
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  })
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  @Prop({ required: true })
  paymentMethod: string;
  @Prop({
    type: {
      _id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
  })
  paymentResult?: {
    _id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  @Prop({ type: Number, required: true, default: 0.0 })
  itemsPrice: number;

  @Prop({ type: Number, required: true, default: 0.0 })
  taxPrice: number;
  @Prop({ type: Number, required: true, default: 0.0 })
  shippingPrice: number;
  @Prop({ type: Number, required: true, default: 0.0 })
  totalPrice: number;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;
  @Prop({ type: Date })
  paidAt: number;

  @Prop({ type: Boolean, required: true, default: false })
  isShipped: boolean;
  @Prop({ type: Date })
  shippedAt: number;
  @Prop({ type: Date, default: Date.now })
  createdAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
