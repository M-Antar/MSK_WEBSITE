import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/models/category/category.schema';
import { CategoryRepository } from 'src/models/category/category.repository';
import { CategoryFactoryService } from './factory';


@Module({
    imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository,CategoryFactoryService],
  exports:[CategoryService,CategoryRepository]
})
export class CategoryModule {}
