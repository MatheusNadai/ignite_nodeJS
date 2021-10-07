import { Router } from "express";
import { v4 as uuidV4 } from "uuid";
import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  categoriesRepository.create({ name, description });

  const categoriesAlreadyExists = categoriesRepository.findByName(name);

  if (categoriesAlreadyExists) {
    return response.status(400).json({ error: "Category already Exist" });
  }

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoutes };
