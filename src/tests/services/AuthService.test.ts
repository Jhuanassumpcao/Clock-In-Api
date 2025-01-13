import AuthService from '../../services/AuthService';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { ErrorMessages } from '../../constants/errorMessages';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
process.env.JWT_SECRET = 'test-key';

const mockUserRepository: jest.Mocked<IUserRepository> = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(mockUserRepository);
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('deve lançar um erro se o usuário não for encontrado', async () => {
      mockUserRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login('test@example.com', 'password')
      ).rejects.toThrow(ErrorMessages.INVALID_CREDENTIALS);
    });

    it('deve lançar um erro se a senha estiver incorreta', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'test'
      });

      await expect(
        authService.login('test@example.com', 'wrongpassword')
      ).rejects.toThrow(ErrorMessages.INVALID_CREDENTIALS);
    });

    it('deve retornar um token JWT se as credenciais forem válidas', async () => {
      mockUserRepository.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'test'
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      (jwt.sign as jest.Mock).mockReturnValue('mockedToken');
      const token = await authService.login('test@example.com', 'password');
      expect(token).toBeDefined();
    });
  });

  describe('register', () => {
    it('deve hash a senha antes de criar o usuário', async () => {
      const userData: CreateUserDTO = {
        email: 'new@example.com',
        password: 'password',
        name: 'new',
      };
      mockUserRepository.create.mockResolvedValue({
        id: 1,
        email: userData.email,
      });

      await authService.register(userData);

      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...userData,
      });
    });

    it('deve retornar o usuário criado sem a senha', async () => {
      const userData: CreateUserDTO = {
        email: 'new@example.com',
        password: 'password',
        name: 'new',
      };
      mockUserRepository.create.mockResolvedValue({
        id: 1,
        email: userData.email,
      });

      const result = await authService.register(userData);

      expect(result).toEqual({ id: 1, email: 'new@example.com' });
    });
  });
});
