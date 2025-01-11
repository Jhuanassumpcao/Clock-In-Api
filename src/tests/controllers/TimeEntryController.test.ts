import request from 'supertest';
import app from '../../app';
import TimeEntryService from '../../services/TimeEntryService';
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('../../services/TimeEntryService');

jest.mock('../../middlewares/ensureAuthenticated', () => ({
  __esModule: true,
  default: (req: any, res: any, next: any) => {
    req.user = { id: 1 };
    next();
  },
}));

describe('TimeEntryController', () => {
  const mockedTimeEntryService = TimeEntryService as jest.Mocked<
    typeof TimeEntryService
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /time-entries/start', () => {
    it('deve criar uma entrada de tempo com sucesso', async () => {
      const mockEntry = {
        id: 1,
        userId: 1,
        startTime: new Date('2025-01-11T08:00:00.000Z'),
        status: 'started',
      };
      mockedTimeEntryService.prototype.startEntry.mockResolvedValue(mockEntry);

      const response = await request(app)
        .post('/time-entries/start')
        .send({ startTime: '2025-01-11T08:00:00Z' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...mockEntry,
        startTime: mockEntry.startTime.toISOString(),
      });
    });

    it('deve retornar erro ao tentar criar uma entrada de tempo inválida', async () => {
      mockedTimeEntryService.prototype.startEntry.mockRejectedValue(
        new Error('Invalid time entry')
      );

      const response = await request(app).post('/time-entries/start').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid time entry');
    });
    it('deve retornar erro ao tentar iniciar uma nova entrada sem encerrar a anterior', async () => {
      mockedTimeEntryService.prototype.startEntry.mockRejectedValue(
        new Error('An open time entry already exists')
      );

      const response = await request(app)
        .post('/time-entries/start')
        .send({ startTime: '2025-01-11T08:00:00Z' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'error',
        'An open time entry already exists'
      );
    });
  });

  describe('POST /time-entries/end', () => {
    it('deve encerrar uma entrada de tempo com sucesso', async () => {
      const mockEntry = {
        id: 1,
        endTime: '2025-01-11T17:00:00.000Z',
        totalHours: 7.5,
        status: 'ended',
      };
      mockedTimeEntryService.prototype.endEntry.mockResolvedValue(mockEntry);

      const response = await request(app)
        .post('/time-entries/end')
        .send({ id: 1, endTime: '2025-01-11T17:00:00Z' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEntry);
    });

    it('deve retornar erro ao tentar encerrar uma entrada de tempo inválida', async () => {
      mockedTimeEntryService.prototype.endEntry.mockRejectedValue(
        new Error('Invalid time entry')
      );

      const response = await request(app).post('/time-entries/end').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid time entry');
    });
  });

  describe('GET /time-entries/list', () => {
    it('deve listar as entradas de tempo do usuário', async () => {
      const mockEntries = [
        {
          id: 1,
          userId: 1,
          startTime: new Date('2025-01-11T08:00:00.000Z'),
          endTime: new Date('2025-01-11T17:00:00.000Z'),
          status: 'ended',
        },
      ];
      mockedTimeEntryService.prototype.list.mockResolvedValue(mockEntries);

      const response = await request(app)
        .get('/time-entries/list')
        .set('Authorization', 'Bearer mock-token');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        mockEntries.map(entry => ({
          ...entry,
          startTime: entry.startTime.toISOString(),
          endTime: entry.endTime?.toISOString(),
        }))
      );
    });

    it('deve retornar erro ao tentar listar entradas de tempo sem autenticação', async () => {
      mockedTimeEntryService.prototype.list.mockRejectedValue(
        new Error('Unauthorized')
      );

      const response = await request(app).get('/time-entries/list');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Unauthorized');
    });
  });
});
