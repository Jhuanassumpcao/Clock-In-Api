import prisma from '../config/database';
import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';

export default class TimeEntryRepository {
  static async create(data: CreateTimeEntryDTO) {
    return prisma.timeEntry.create({ data });
  }

  static async findOngoingEntry(userId: number) {
    return prisma.timeEntry.findFirst({
      where: { userId, status: 'ongoing' },
    });
  }

  static async update(
    id: number,
    data: Partial<UpdateTimeEntryDTO & { totalHours: number; status: string }>
  ) {
    return prisma.timeEntry.update({
      where: { id },
      data,
    });
  }

  static async list() {
    return prisma.timeEntry.findMany();
  }
}
