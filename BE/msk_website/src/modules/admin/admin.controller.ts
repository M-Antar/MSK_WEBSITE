import {
  Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards,
} from '@nestjs/common';

import { ProductRepository } from 'src/models/product/product.repository';
import { OrderRepository } from 'src/models/order/order.repository';
import { ProductService } from '../product/product.service';
import { ProductFactoryService } from '../product/factory';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { AdminGuard } from './gurad/gurad';


const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly productFactory: ProductFactoryService,
  ) {}

  // ---------- ORDERS ----------
  @Get('orders')
  getOrders() {
    return this.orderRepository.getAll({}, undefined, {
      sort: { createdAt: -1 },
      populate: { path: 'products.productId', select: 'name' },
    });
  }

  @Patch('orders/:id/status')
  async setOrderStatus(@Param('id') id: string, @Body('status') status: string) {
    if (!ORDER_STATUSES.includes(status)) throw new NotFoundException('Invalid status');
    const order = await this.orderRepository.findOneAndUpdate({ _id: id }, { status });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  // ---------- PRODUCTS ----------
  @Get('products')
  getProducts() {
    return this.productRepository.getAll({}, undefined, { sort: { createdAt: -1 } });
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.productService.create(this.productFactory.createProduct(dto));
  }

  @Patch('products/:id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const product = await this.productRepository.findOneAndUpdate({ _id: id }, { $set: dto as any });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Patch('products/:id/stock')
  async setStock(@Param('id') id: string, @Body('stock') stock: number) {
    const product = await this.productRepository.findOneAndUpdate({ _id: id }, { $set: { stock: Number(stock) } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id') id: string) {
    const res = await this.productRepository.deleteOne({ _id: id });
    if (!res.deletedCount) throw new NotFoundException('Product not found');
    return { deleted: true };
  }
}