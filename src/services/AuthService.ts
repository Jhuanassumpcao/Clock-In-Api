import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';

import dotenv from 'dotenv';

dotenv.config();

export default class AuthService {
  static async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  }

  static async register(data: CreateUserDTO) {
    data.password = await bcrypt.hash(data.password, 10);
    return UserRepository.create(data);
  }
}
