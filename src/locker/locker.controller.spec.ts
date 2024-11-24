import { Test, TestingModule } from '@nestjs/testing';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto, UpdateLockerStatusDTO } from './dto/update-locker.dto';
import { LockerStatus } from './locker.interface';

describe('LockerController', () => {
  let controller: LockerController;
  let service: LockerService;

  const mockLockerService = {
    create: jest.fn(dto => ({ id: 'RANDOM_UUID', ...dto })),
    findAll: jest.fn(() => [
      { id: 'RANDOM_UUID', bloqId: 'RANDOM_BLOCK_UUID', status: LockerStatus.CLOSED, isOccupied: false },
    ]),
    findOne: jest.fn(id => ({
      id,
      bloqId: 'RANDOM_BLOCK_UUID',
      status: LockerStatus.CLOSED,
      isOccupied: false,
    })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    updateLockerStatus: jest.fn((id, dto) => ({ id, status: dto.status })),
    remove: jest.fn(id => ({ id, deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LockerController],
      providers: [{ provide: LockerService, useValue: mockLockerService }],
    }).compile();

    controller = module.get<LockerController>(LockerController);
    service = module.get<LockerService>(LockerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new locker', async () => {
      const dto: CreateLockerDto = {
        bloqId: 'RANDOM_BLOCK_UUID',
        status: LockerStatus.CLOSED,
        isOccupied: false,
      };

      expect(await controller.create(dto)).toEqual({
        id: 'RANDOM_UUID',
        ...dto,
      });

      expect(mockLockerService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of lockers', async () => {
      expect(await controller.findAll()).toEqual([
        { id: 'RANDOM_UUID', bloqId: 'RANDOM_BLOCK_UUID', status: LockerStatus.CLOSED, isOccupied: false },
      ]);

      expect(mockLockerService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single locker by id', async () => {
      const id = 'RANDOM_UUID';

      expect(await controller.findOne(id)).toEqual({
        id: 'RANDOM_UUID',
        bloqId: 'RANDOM_BLOCK_UUID',
        status: LockerStatus.CLOSED,
        isOccupied: false,
      });

      expect(mockLockerService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateLockerStatus', () => {
    it('should update the status of a locker', async () => {
      const id = 'RANDOM_UUID';
      const dto: UpdateLockerStatusDTO = { status: LockerStatus.OPEN };

      expect(await controller.updateLockerStatus(id, dto)).toEqual({
        id: 'RANDOM_UUID',
        status: LockerStatus.OPEN,
      });

      expect(mockLockerService.updateLockerStatus).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('update', () => {
    it('should update a locker', async () => {
      const id = 'RANDOM_UUID';
      const dto: UpdateLockerDto = {
        bloqId: '456',
        status: LockerStatus.CLOSED,
        isOccupied: true,
      };

      expect(await controller.update(id, dto)).toEqual({
        id: 'RANDOM_UUID',
        ...dto,
      });

      expect(mockLockerService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a locker', async () => {
      const id = 'RANDOM_UUID';

      expect(await controller.remove(id)).toEqual({
        id: 'RANDOM_UUID',
        deleted: true,
      });

      expect(mockLockerService.remove).toHaveBeenCalledWith(id);
    });
  });
});
