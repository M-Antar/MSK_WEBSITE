import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { AbstractRepository } from '../abstractRepository';

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {

   constructor(@InjectModel(Product.name) productModel: Model<Product>) {
    super(productModel);
  }
  
}