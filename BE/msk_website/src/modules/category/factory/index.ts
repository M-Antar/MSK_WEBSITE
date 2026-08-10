import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryFactoryService {
    createCategory(createCategoryDto: CreateCategoryDto): Category {
        const category = new Category()

        category.name = createCategoryDto.name;
        category.slug = slugify(createCategoryDto.name, {
            lower: true,
            strict: true,
        });

        category.description = createCategoryDto.description;

        category.active = createCategoryDto.active ?? true;

        return category;
    }
}