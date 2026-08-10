import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from 'src/models/category/category.repository';


@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
  ) { }

  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });

    if (categoryExist) {
      throw new ConflictException('This category already exists');
    }

    return await this.categoryRepository.create(category);
  }
  
async findAll() {
  const categories = await this.categoryRepository.getAll();

  return categories.map((category: any) => ({
    id: category._id.toString(),
    name: category.name,
    description: category.description,
  }));
}

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
