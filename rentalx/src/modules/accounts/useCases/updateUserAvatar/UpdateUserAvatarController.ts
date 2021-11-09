import { container } from "tsyringe";
import { Response, Request } from "express";
import { UpdateUserAvatarUserUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const avatar_file = null;

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
