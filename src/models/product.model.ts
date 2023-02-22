/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.model';

export type ProductDocument = Product & Document;

class Reviews {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  comment: string;
}

@Schema()
export class Product {
  @Prop({ type: String, required: true })
  productName: string;
  @Prop({ required: true })
  imgUrl: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  shortDesc: string;
  @Prop({ required: true })
  description: string;
  @Prop({ default: 0 })
  avgRating: number;
  @Prop([Reviews])
  reviews: Reviews[];
  @Prop({ default: Date.now() })
  createdAt: Date;
  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
