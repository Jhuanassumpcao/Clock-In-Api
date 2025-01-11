import { ITimeEntryRepository } from '../../interfaces/ITimeEntryRepository';
import {
  CreateTimeEntryDTO,
  UpdateTimeEntryDTO,
} from '../../dtos/CreateTimeEntryDTO';
import TimeEntryService from '../../services/TimeEntryService';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

const mockTimeEntryRepository: jest.Mocked<ITimeEntryRepository> = {
  findOngoingEntry: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  list: jest.fn(),
};

describe('TimeEntryService', () => {
  let timeEntryService: TimeEntryService;

  beforeEach(() => {
    timeEntryService = new TimeEntryService(mockTimeEntryRepository);
    jest.clearAllMocks();
  });

  describe('startEntry', () => {
    it('deve criar uma nova sessão de trabalho se nenhuma estiver em andamento', async () => {
      mockTimeEntryRepository.findOngoingEntry.mockResolvedValue(null);
      const startTime = new Date();
      mockTimeEntryRepository.create.mockResolvedValue({
        id: 1,
        userId: 1,
        startTime,
        status: 'ongoing',
      });

      const data: CreateTimeEntryDTO = {
        userId: 1,
        startTime,
      };

      const result = await timeEntryService.startEntry(data);

      expect(mockTimeEntryRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual({
        id: 1,
        userId: 1,
        startTime,
        status: 'ongoing',
      });
    });
  });

  describe('endEntry', () => {
    it('deve atualizar a sessão em andamento com o horário de término e total de horas', async () => {
      const startTime = new Date('2025-01-01T10:00:00Z');
      const endTime = new Date('2025-01-01T14:00:00Z');

      mockTimeEntryRepository.findOngoingEntry.mockResolvedValue({
        id: 1,
        startTime,
        status: 'ongoing',
      });

      mockTimeEntryRepository.update.mockResolvedValue({
        id: 1,
        totalHours: 4,
        status: 'completed',
      });

      const data: UpdateTimeEntryDTO = {
        userId: 1,
        endTime: endTime,
      };

      const result = await timeEntryService.endEntry(data);

      expect(mockTimeEntryRepository.update).toHaveBeenCalledWith(1, {
        endTime,
        totalHours: 4,
        status: 'completed',
      });

      expect(result).toEqual({
        id: 1,
        totalHours: 4,
        status: 'completed',
      });
    });
  });

  describe('list', () => {
    it('deve retornar uma lista de entradas de tempo para um usuário', async () => {
      const timeEntries = [
        {
          id: 1,
          userId: 1,
          startTime: new Date('2025-01-01T10:00:00Z'),
          endTime: new Date('2025-01-01T14:00:00Z'),
          totalHours: 4,
          status: 'completed',
        },
      ];

      mockTimeEntryRepository.list.mockResolvedValue(timeEntries);

      const result = await timeEntryService.list(1);

      expect(mockTimeEntryRepository.list).toHaveBeenCalledWith(1);
      expect(result).toEqual(timeEntries);
    });
  });
});
