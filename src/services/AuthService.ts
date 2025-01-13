import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IAuthService } from '../interfaces/IAuthService';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { ErrorMessages } from '../constants/errorMessages';

export default class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string): Promise<{ token: string, name: string, id: number }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error(ErrorMessages.INVALID_CREDENTIALS);
    }
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
  
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    });
  
    return { token, name: user.name, id: user.id };  // Retorna o token e o nome do usuário
  }
  

  async register(data: CreateUserDTO): Promise<{ id: number; email: string }> {
    data.password = await bcrypt.hash(data.password, 10);
    return this.userRepository.create(data);
  }
}
