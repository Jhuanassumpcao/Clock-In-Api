import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IAuthService {
  login(email: string, password: string): Promise<string>;
  register(data: CreateUserDTO): Promise<{ id: number; email: string }>;
}
