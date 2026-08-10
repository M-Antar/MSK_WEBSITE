import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import devConfig from './config/dev.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { OrderModule } from './modules/order/order.module';


@Module({
  imports: [ProductModule,
    CategoryModule,
    OrderModule,
    ConfigModule.forRoot({ load: [devConfig], isGlobal: true, }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get('db').url
      })
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
