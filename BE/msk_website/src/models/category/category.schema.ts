import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    unique: true,
  })
  slug!: string;

  @Prop({
    required: true,
  })
  description!: string;

  @Prop({
    default: true,
  })
  active!: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);