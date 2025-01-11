import { Request, Response } from 'express';
import TimeEntryService from '../services/TimeEntryService';
import TimeEntryRepository from '../repositories/TimeEntryRepository';

const timeEntryRepository = new TimeEntryRepository();
const timeEntryService = new TimeEntryService(timeEntryRepository);

export default class TimeEntryController {
  static async start(req: Request, res: Response) {
    try {
      const entry = await timeEntryService.startEntry(req.body);
      res.status(201).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async end(req: Request, res: Response) {
    try {
      const entry = await timeEntryService.endEntry(req.body);
      res.status(200).json(entry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async list(req: Request, res: Response) {
    try {
      const entries = await timeEntryService.list();
      res.json(entries);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
