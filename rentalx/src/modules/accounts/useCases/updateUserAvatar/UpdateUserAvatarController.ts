import { container } from "tsyringe";
import { Response, Request } from "express";
import { UpdateUserAvatarUserUseCase } from "./UpdateUserAvatarUseCase";
import "reflect-metadata";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const avatar_file = req.file?.filename;

    const updateUserAvatarUserUseCase = container.resolve(
      UpdateUserAvatarUserUseCase
    );

    await updateUserAvatarUserUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return res.status(204).send();
  }
}

export { UpdateUserAvatarController };
