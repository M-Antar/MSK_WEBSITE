
import { Body, Controller, Post } from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) {}

  @Post('place')
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}

