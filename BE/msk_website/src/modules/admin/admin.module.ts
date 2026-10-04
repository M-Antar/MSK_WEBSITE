import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
import { AdminGuard } from './gurad/gurad';

@Module({
  imports: [ProductModule, OrderModule],
  controllers: [AdminController],
  providers: [AdminGuard],
})
export class AdminModule {}