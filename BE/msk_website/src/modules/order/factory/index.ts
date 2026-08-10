
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

interface VerifiedOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
}

@Injectable()
export class OrderFactoryService {
  createOrder(
    createOrderDto: CreateOrderDto,
    products: VerifiedOrderProduct[],
  ): Order {
    const order = new Order();

    order.fullName = createOrderDto.fullName;
    order.email = createOrderDto.email;

    order.address = {
      street: createOrderDto.address.street,
      city: createOrderDto.address.city,
      country: createOrderDto.address.country,
      phoneNumber: createOrderDto.address.phoneNumber,
    };

    order.products = products;

    order.paymentMethod = createOrderDto.paymentMethod;

    order.status = 'pending';

    order.totalAmount = products.reduce(
      (total, product) => total + product.totalPrice,
      0,
    );

    return order;
  }
}

