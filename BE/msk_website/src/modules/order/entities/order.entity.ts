
import { Types } from 'mongoose';
import { PaymentMethod } from 'src/common/types';

export class Order {
  readonly _id!: Types.ObjectId;

  fullName!: string;

  email!: string;

  address!: {
    street: string;
    city: string;
    country: string;
    phoneNumber: string;
  };

  products!: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];

  paymentMethod!: PaymentMethod;

  status!: string;

  totalAmount!: number;

  readonly createdAt!: Date;

  readonly updatedAt!: Date;
}

