import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AbstractRepository } from '../abstractRepository';
import { Order } from './order.schema';

@Injectable()
export class OrderRepository extends AbstractRepository<Order> {

   constructor(@InjectModel(Order.name) ordertModel: Model<Order>) {
    super(ordertModel);
  }
  
}