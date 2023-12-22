import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { Order } from '../interfaces/order.interface';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  findAll(): Order[] {
    return this.orderService.findAll();
  }
}
