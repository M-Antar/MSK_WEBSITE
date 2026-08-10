import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ONE_SIZE } from 'src/common/types';
import slugify from "slugify"
export class ProductFactoryService {
  createProduct(createProductDto: CreateProductDto) {
    const product = new Product();

    product.name = createProductDto.name;
    product.slug = slugify(createProductDto.name);
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.sold = 0;
    product.color = createProductDto.color;
    product.size = createProductDto.size ?? ONE_SIZE;
    product.photoLinks=createProductDto.photoLinks;
    product.stock=createProductDto.stock;
    product.categoryId=createProductDto.categoryId;

    return product;
  }
}