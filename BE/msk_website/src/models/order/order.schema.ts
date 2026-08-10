import { NestFactory } from "@nestjs/core";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";
import { PaymentMethod } from "src/common/types";



@Schema()
export class OrderProduct {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId!: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity!: number;

  @Prop({ type: Number, required: true })
  price!: number;

  @Prop({ type: Number, required: true })
  totalPrice!: number;
}

@Schema()
export class Address {
  @Prop({ type: String, required: true })
  street!: string;

  @Prop({ type: String, required: true })
  city!: string;

  @Prop({ type: String, required: true })
  country!: string;

  @Prop({ type: String, required: true })
  phoneNumber!: string;
}

@Schema({ timestamps: true })
export class Order {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Address, required: true })
  address!: Address;

  @Prop({ type: [OrderProduct], required: true })
  products!: OrderProduct[];

  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod!: PaymentMethod;

 @Prop({ type: String ,default:"pending"})
   status!:string;

   @Prop({ type: String, required: true, trim: true }) 
   email!: string;

   @Prop({ type: String, required: true, trim: true })
    fullName!: string;

  @Prop({ type: Number, required: true })
  totalAmount!: number;

}

export const orderSchema = SchemaFactory.createForClass(Order);
