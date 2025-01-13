import { CreateUserDTO } from '../dtos/CreateUserDTO';

export interface IAuthService {
  login(email: string, password: string): Promise<{ token: string, name: string, id: number }>;
  register(data: CreateUserDTO): Promise<{ id: number; email: string }>;
}
