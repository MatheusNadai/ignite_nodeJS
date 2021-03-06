import { container } from "tsyringe";
import { Response, Request } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, username, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      email,
      driver_license,
      password,
    });

    return res.status(201).send();
  }
}

export { CreateUserController };
