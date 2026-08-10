
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { PaymentMethod } from 'src/common/types';

export class OrderProductDto {
  @IsMongoId()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @Min(1)
  quantity!: number;
}

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products!: OrderProductDto[];

  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}

