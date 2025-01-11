import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import UserRepository from '../repositories/UserRepository';
import { ErrorMessages } from '../constants/errorMessages';

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res.json({ token });
    } catch (error: any) {
      res
        .status(401)
        .json({ message: error.message || ErrorMessages.INVALID_CREDENTIALS });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
