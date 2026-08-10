import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryFactoryService } from './factory';
// import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService,
 private readonly categoryFactoryService: CategoryFactoryService,
  ) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryFactoryService.createCategory(createCategoryDto)
    return this.categoryService.create(category);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
