import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';

export interface ITimeEntryRepository {
  create(
    data: CreateTimeEntryDTO
  ): Promise<{ id: number; userId: number; startTime: Date; status: string }>;
  findOngoingEntry(
    userId: number
  ): Promise<{ id: number; startTime: Date; status: string } | null>;
  update(
    id: number,
    data: Partial<UpdateTimeEntryDTO & { totalHours: number; status: string }>
  ): Promise<{ id: number; totalHours: number | null; status: string }>;
  list(): Promise<
    Array<{
      id: number;
      userId: number;
      startTime: Date;
      endTime?: Date | null;
      status: string;
    }>
  >;
}
