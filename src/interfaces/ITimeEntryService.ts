import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../dtos/CreateTimeEntryDTO';

export interface ITimeEntryService {
  startEntry(
    data: CreateTimeEntryDTO
  ): Promise<{ id: number; userId: number; startTime: Date; status: string }>;
  endEntry(
    data: UpdateTimeEntryDTO
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
