import prisma from '../config/database';
import { IUserRepository } from '../interfaces/IUserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export default class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO) {
    return prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}
