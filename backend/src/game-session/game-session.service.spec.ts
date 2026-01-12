import { Test, TestingModule } from '@nestjs/testing';
import { GameSessionService } from './game-session.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameSession } from './entities/game-session.entity';
import { Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('GameSessionService', () => {
  let service: GameSessionService;
  let repository: jest.Mocked<Repository<GameSession>>;

  const mockGameSession = {
    id: 'session-1',
    user: {
      rut: '12345678-9',
    },
  } as GameSession;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameSessionService,
        {
          provide: getRepositoryToken(GameSession),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GameSessionService>(GameSessionService);
    repository = module.get(getRepositoryToken(GameSession));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* ===============================
     CREATE
     =============================== */

  it('should create and save a game session successfully', async () => {
    repository.create.mockReturnValue(mockGameSession);
    repository.save.mockResolvedValue(mockGameSession);

    const result = await service.create(mockGameSession as any);

    expect(repository.create).toHaveBeenCalledWith(mockGameSession);
    expect(repository.save).toHaveBeenCalledWith(mockGameSession);
    expect(result).toBe('the registered game has been saved successfully');
  });

  it('should throw BadRequestException on duplicate key error', async () => {
    repository.create.mockReturnValue(mockGameSession);
    repository.save.mockRejectedValue({
      code: '23505',
      detail: 'Duplicate key value violates unique constraint',
    });

    await expect(service.create(mockGameSession as any))
      .rejects
      .toThrow(BadRequestException);
  });

  it('should throw InternalServerErrorException on unknown DB error', async () => {
    repository.create.mockReturnValue(mockGameSession);
    repository.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create(mockGameSession as any))
      .rejects
      .toThrow(InternalServerErrorException);
  });

  /* ===============================
     FIND BY RUT
     =============================== */

  it('should return game sessions by user rut', async () => {
    repository.find.mockResolvedValue([mockGameSession]);

    const result = await service.findByRut('12345678-9');

    expect(repository.find).toHaveBeenCalledWith({
      where: {
        user: {
          rut: '12345678-9',
        },
      },
      relations: ['user'],
    });

    expect(result).toHaveLength(1);
    expect(result[0].user.rut).toBe('12345678-9');
  });
});
