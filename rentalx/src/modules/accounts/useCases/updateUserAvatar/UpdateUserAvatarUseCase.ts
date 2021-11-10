import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_file: any;
}

@injectable()
class UpdateUserAvatarUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUserUseCase };
