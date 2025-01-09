import prisma from '../config/database';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

export default class UserRepository {
  static async create(data: CreateUserDTO) {
    return prisma.user.create({ data });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
}
