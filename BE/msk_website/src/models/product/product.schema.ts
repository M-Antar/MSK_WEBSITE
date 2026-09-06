
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, required: true, trim: true })
    name!: string;
    @Prop({ type: String, required: true, trim: true })
    description!: string;
    @Prop({ type: Number, required: true, min: 1 })
    price!: number;
    @Prop({ type: String, required: true, trim: true })
    size!: string;
    @Prop({ type: Number, required: true, min: 1 })
    stock!: number;
    @Prop({ type: Number, required: true, min: 0 })
    sold!: number;
    @Prop({ type: [String] })
    color!: string[]
    @Prop({
        type: [String],
        default: [],
    })
    photoLinks!: string[];

    @Prop({ type: String, required: true, trim: true })
    slug!: string;

    @Prop({
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
    })
    categoryId!: Types.ObjectId;

}


export const productSchema = SchemaFactory.createForClass(Product)