import prisma from '../config/database';
import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';
import { ITimeEntryRepository } from '../interfaces/ITimeEntryRepository';

export default class TimeEntryRepository implements ITimeEntryRepository {
  async create(data: CreateTimeEntryDTO) {
    return prisma.timeEntry.create({ data });
  }

  async findOngoingEntry(userId: number) {
    return prisma.timeEntry.findFirst({
      where: { userId, status: 'ongoing' },
    });
  }

  async update(
    id: number,
    data: Partial<UpdateTimeEntryDTO & { totalHours: number; status: string }>
  ) {
    return prisma.timeEntry.update({
      where: { id },
      data,
    });
  }

  async list() {
    return prisma.timeEntry.findMany();
  }
}
