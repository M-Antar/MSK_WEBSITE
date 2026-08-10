import { Optional } from "@nestjs/common";
import { IsArray, isArray, IsMongoId, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name!: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    description!: string;

    @IsString()
    @IsNotEmpty()
    price!: number;

    @IsString()
    @IsNotEmpty()
    size!: string;

    @IsNumber()
    @Optional()
    stock!: number;

    @IsArray()
    @IsString({ each: true })
    color!: string[];

    @IsArray()
    @IsString({ each: true })
    photoLinks!: string[];

    @IsMongoId()
    @IsNotEmpty()
    categoryId!: Types.ObjectId;
}
