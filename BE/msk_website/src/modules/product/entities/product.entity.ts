import { Types } from 'mongoose';

export class Product {
  readonly _id!: Types.ObjectId;

  name!: string;

  description!: string;

  price!: number;

  stock!:number;

  size!: string;

  sold!:number;

  color!:string[];

  slug!: string;

  photoLinks!:string[];


  categoryId!: Types.ObjectId;

}