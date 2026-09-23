import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from 'src/models/product/product.repository';
import { Product } from './entities/product.entity';
import { Types } from 'mongoose';


@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository:ProductRepository){

    }
  async create(product: Product) {
    const productExist = await this.productRepository.getOne({slug:product.slug})
    if(productExist)
      throw new ConflictException("This product already exist")
    
      return await this.productRepository.create(product);

  }

async findByCategory(categoryId: string) {
  const products = await this.productRepository.getAll(
    { categoryId },
    undefined,
    { populate: 'categoryId' },
  );

  return products.map((product: any) => {
    const category = product.categoryId;

    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.photoLinks[0],
      stock: product.stock,
      categorySlug: category?.slug,
    };
  });
}

async findAll() {
  const products = await this.productRepository.getAll();

  return products.map((product: any) => ({
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    image: product.photoLinks[0],
    stock: product.stock, 
  }));
}

async findOne(id: string) {
  // Populate categoryId so we can read the category's slug (e.g. "isdal")
  // without a second query. `getOne` forwards `options` straight to
  // Model.findOne(filter, projection, options), and Mongoose's findOne
  // options support a `populate` key, so this works with the existing
  // AbstractRepository as-is - no repository changes needed.
  const product = await this.productRepository.getOne(
    { _id: id },
    undefined,
    { populate: 'categoryId' },
  );

  if (!product) {
    throw new NotFoundException("Product not found");
  }

 
  const category = (product as any).categoryId;

  return {
    id: product._id.toString(),
    name: product.name,
    description: product.description,
    price: product.price,
    images: product.photoLinks,
    sizes: product.size,
    stock: product.stock, 
    color: product.color, 
    categorySlug: category?.slug, // e.g. "isdal"
  };
}

async findRelated(id: string) {
  const product = await this.productRepository.getOne({
    _id: id,
  } as any);

  if (!product) {
    throw new NotFoundException(`Product ${id} not found`);
  }

  const related = await this.productRepository.getAll(
    {
      categoryId: product.categoryId,
      _id: { $ne: id },
    } as any,
    undefined,
    { limit: 2 },
  );

  return related.map((item: any) => ({
    id: item._id.toString(),
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.photoLinks[0],
    stock: item.stock, 
  }));
}
}