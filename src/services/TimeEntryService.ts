import TimeEntryRepository from '../repositories/TimeEntryRepository';
import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';

export default class TimeEntryService {
  static async startEntry(data: CreateTimeEntryDTO) {
    const ongoingEntry = await TimeEntryRepository.findOngoingEntry(
      data.userId
    );
    if (ongoingEntry) {
      throw new Error('A work session is already ongoing.');
    }
    return TimeEntryRepository.create(data);
  }

  static async endEntry(data: UpdateTimeEntryDTO) {
    const ongoingEntry = await TimeEntryRepository.findOngoingEntry(
      data.userId
    );
    if (!ongoingEntry) {
      throw new Error('No ongoing work session found.');
    }
    const endTime = new Date(data.endTime);
    const totalHours =
      (endTime.getTime() - ongoingEntry.startTime.getTime()) / 3600000;
    return TimeEntryRepository.update(ongoingEntry.id, {
      endTime,
      totalHours,
      status: 'completed',
    });
  }

  static async list() {
    return TimeEntryRepository.list();
  }
}
