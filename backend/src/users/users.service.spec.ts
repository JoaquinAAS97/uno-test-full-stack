import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: jest.Mocked<Repository<User>>;

  const mockCreateUserDto = {
    name: 'Juan',
    email: 'juan@test.com',
    rut: '12345678-9',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user successfully', async () => {
    userRepository.create.mockReturnValue(mockCreateUserDto as any);
    userRepository.save.mockResolvedValue(mockCreateUserDto as any);

    const result = await service.create(mockCreateUserDto);

    expect(userRepository.create).toHaveBeenCalledWith(mockCreateUserDto);
    expect(userRepository.save).toHaveBeenCalled();
    expect(result).toBe('The user has been registered successfully');
  });

  it('should throw BadRequestException when duplicate user exists', async () => {
    userRepository.create.mockReturnValue(mockCreateUserDto as any);
    userRepository.save.mockRejectedValue({
      code: '23505',
      detail: 'User already exists',
    });

    await expect(service.create(mockCreateUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw InternalServerErrorException on unexpected error', async () => {
    userRepository.create.mockReturnValue(mockCreateUserDto as any);
    userRepository.save.mockRejectedValue(new Error('DB error'));

    await expect(service.create(mockCreateUserDto)).rejects.toThrow(
      InternalServerErrorException,
    );
  });
});
