  import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { ProductFactoryService } from './factory';


  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService
      ,private readonly productFactoryService:ProductFactoryService
    ) {}

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
      const produt = this.productFactoryService.createProduct(createProductDto)

      return this.productService.create(produt);
    }

    // @Get()
    // findAll() {
    //   return this.productService.findAll();
    // }

    @Get('category/:categoryId')
    findByCategory(@Param('categoryId') categoryId: string) {
      return this.productService.findByCategory(categoryId);
    }

      @Get(':id')
    findOne(
      @Param('id') id: string
    ) {

      return this.productService.findOne(id);

    }


      @Get(':id/related')
    findRelated(@Param('id') id: string) {
      return this.productService.findRelated(id);
    }




  }
