import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/order.dto';
import { Order, OrderDocument } from 'src/models/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private OrderModel: Model<OrderDocument>,
  ) {}
  //updateOrderToPaid
  async updateOrderToPaid(id: string) {
    const order = await this.OrderModel.findById(id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      return order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }
  //updateOrderToDelivered
  async updateOrderToDelivered(id: string) {
    const order = await this.OrderModel.findById(id);
    if (order) {
      order.isShipped = true;
      order.shippedAt = Date.now();
      return await order.save();
    } else {
      throw new InternalServerErrorException('Order not found');
    }
  }
  //getAllOrder
  async getAllOrder() {
    return await this.OrderModel.find({});
  }
  //getOneOrder
  async getOneOrder(id: string) {
    return await this.OrderModel.findById({ _id: id });
  }
  //createOrder
  async createOrder(createOrder: OrderDto, user: any) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = createOrder;
    if (orderItems && orderItems.length === 0) {
      throw new InternalServerErrorException('Order items cannot be empty');
    } else {
      const order = new this.OrderModel({
        orderItems,
        userId: user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      try {
        return await order.save();
      } catch (error) {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  //deleteOrder
  async deleteOrder(id: string) {
    return await this.OrderModel.remove({ _id: id });
  }
}
