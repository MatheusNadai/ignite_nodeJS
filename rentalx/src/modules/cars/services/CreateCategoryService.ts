import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: IRequest): void {
    const categoriesAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoriesAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
