import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderFactoryService } from './factory';

import { OrderRepository } from 'src/models/order/order.repository';
import { orderSchema } from 'src/models/order/order.schema';

import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: orderSchema,
      },
    ]),

    ProductModule,
  ],

  controllers: [
    OrderController,
  ],

  providers: [
    OrderService,
    OrderRepository,
    OrderFactoryService,
  ],

  exports: [
    OrderService,
    OrderRepository,
  ],
})
export class OrderModule {}

