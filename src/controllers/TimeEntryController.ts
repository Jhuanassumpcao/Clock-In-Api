import { Request, Response } from 'express';
import TimeEntryService from '../services/TimeEntryService';

export default class TimeEntryController {
  static async start(req: Request, res: Response) {
    try {
      const entry = await TimeEntryService.startEntry(req.body);
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async end(req: Request, res: Response) {
    try {
      const entry = await TimeEntryService.endEntry(req.body);
      res.status(200).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    const entries = await TimeEntryService.list();
    res.json(entries);
  }
}
