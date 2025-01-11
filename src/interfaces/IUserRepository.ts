import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IUserRepository {
  findByEmail(
    email: string
  ): Promise<{ id: number; email: string; password: string } | null>;
  create(user: CreateUserDTO): Promise<{ id: number; email: string }>;
}
