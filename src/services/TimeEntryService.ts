import { ITimeEntryService } from '../interfaces/ITimeEntryService';
import { ITimeEntryRepository } from '../interfaces/ITimeEntryRepository';
import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';

export default class TimeEntryService implements ITimeEntryService {
  private timeEntryRepository: ITimeEntryRepository;

  constructor(timeEntryRepository: ITimeEntryRepository) {
    this.timeEntryRepository = timeEntryRepository;
  }

  async startEntry(data: CreateTimeEntryDTO) {
    const ongoingEntry = await this.timeEntryRepository.findOngoingEntry(
      data.userId
    );
    if (ongoingEntry) {
      throw new Error('A work session is already ongoing.');
    }
    return this.timeEntryRepository.create(data);
  }

  async endEntry(data: UpdateTimeEntryDTO) {
    const ongoingEntry = await this.timeEntryRepository.findOngoingEntry(
      data.userId
    );
    if (!ongoingEntry) {
      throw new Error('No ongoing work session found.');
    }
    const endTime = new Date(data.endTime);
    const totalHours =
      (endTime.getTime() - ongoingEntry.startTime.getTime()) / 3600000;
    return this.timeEntryRepository.update(ongoingEntry.id, {
      endTime,
      totalHours,
      status: 'completed',
    });
  }

  async list() {
    return this.timeEntryRepository.list();
  }
}
