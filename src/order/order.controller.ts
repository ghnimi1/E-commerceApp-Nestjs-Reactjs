import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OrderDto } from 'src/dto/order.dto';
import { GetCurrentUser } from 'src/utils/getCurrentUser.decorator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @UseGuards(JwtGuard)
  @Get('/:id/paid')
  updateOrderToPaid(@Param('id') id: string) {
    return this.service.updateOrderToPaid(id);
  }
  //getAllOrder
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Get()
  getAllOrder() {
    return this.service.getAllOrder();
  }
  //getOneOrder
  @UseGuards(JwtGuard)
  @Get(':id')
  getOneOrder(@Param('id') id: string) {
    return this.service.getOneOrder(id);
  }
  //updateOrderToPaid

  //updateOrderToDelivered
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Get('/:id/delivered')
  updateOrderToDelivered(@Param('id') id: string) {
    return this.service.updateOrderToDelivered(id);
  }
  //createOrder
  @UseGuards(JwtGuard)
  @Post()
  createOrder(@Body() createOrder: OrderDto, @GetCurrentUser() user: any) {
    return this.service.createOrder(createOrder, user);
  }
  //deleteOrder
  @UseGuards(AdminRoleGuard)
  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteOrder(@Param('id') id: string) {
    return this.service.deleteOrder(id);
  }
}
