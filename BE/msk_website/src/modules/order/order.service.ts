
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { OrderFactoryService } from './factory';
import { ProductRepository } from 'src/models';
import { OrderRepository } from 'src/models/order/order.repository';



interface VerifiedOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
  totalPrice: number;
}

@Injectable()
export class OrderService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderFactoryService: OrderFactoryService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const products: VerifiedOrderProduct[] = [];

 
    for (const item of createOrderDto.products) {
      const product = await this.productRepository.getOne({
        _id: item.productId,
      });

  
      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

  
      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Not enough stock for "${product.name}". Available stock: ${product.stock}`,
        );
      }

    
      const price = product.price;

      /*
       * Calculate product total
       */
      const totalPrice = price * item.quantity;

      products.push({
        productId: product._id,
        quantity: item.quantity,
        price,
        totalPrice,
      });
    }

    const order = this.orderFactoryService.createOrder(
      createOrderDto,
      products,
    );

   
    const savedOrder = await this.orderRepository.create(order);

    for (const item of products) {
      await this.productRepository.findOneAndUpdate(
        {
          _id: item.productId,
        },
        {
          $inc: {
            stock: -item.quantity,
            sold: item.quantity,
          },
        },
      );
    }

    return savedOrder;
  }
}

