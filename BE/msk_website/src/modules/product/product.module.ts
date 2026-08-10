import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductFactoryService } from './factory';
import { ProductRepository } from 'src/models/product/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from 'src/models';

@Module({
   imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductFactoryService,ProductRepository],
   exports:[ProductService,ProductRepository]
})
export class ProductModule {}
