import request from 'supertest';
import app from '../../app';
import AuthService from '../../services/AuthService';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('../../services/AuthService');

describe('AuthController', () => {
  const mockedAuthService = AuthService as jest.Mocked<typeof AuthService>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar token ao fazer login com credenciais válidas', async () => {
    mockedAuthService.prototype.login.mockResolvedValue('mocked-token');

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked-token');
  });

  it('deve retornar erro ao fazer login com credenciais inválidas', async () => {
    mockedAuthService.prototype.login.mockRejectedValue(
      new Error('Invalid credentials')
    );

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
