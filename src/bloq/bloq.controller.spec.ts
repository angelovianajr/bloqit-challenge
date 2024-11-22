import { Test, TestingModule } from '@nestjs/testing';
import { BloqController } from './bloq.controller';
import { BloqService } from './bloq.service';
import { CreateBloqDto } from './dto/create-bloq.dto';
import { UpdateBloqDto } from './dto/update-bloq.dto';

describe('BloqController', () => {
  let bloqController: BloqController;
  let bloqService: BloqService;

  const mockBloqService = {
    create: jest.fn(dto => ({ id: 'RANDOM_UUID', ...dto })),
    findAll: jest.fn(() => [{ id: 'RANDOM_UUID', title: 'Test Bloq', address: "address" }]),
    findOne: jest.fn(id => ({ id, title: 'Test Bloq', address: "address" })),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn(id => ({ id, deleted: true })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloqController],
      providers: [{ provide: BloqService, useValue: mockBloqService }],
    }).compile();

    bloqController = module.get<BloqController>(BloqController);
    bloqService = module.get<BloqService>(BloqService);
  });

  it('should be defined', () => {
    expect(bloqController).toBeDefined();
  });

  describe('create', () => {
    it('should create a bloq', async () => {
      const dto: CreateBloqDto = { title: 'New Bloq', address: 'address' };
      expect(await bloqController.create(dto)).toEqual({
        id: 'RANDOM_UUID',
        ...dto,
      });
      expect(mockBloqService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of bloqs', async () => {
      expect(await bloqController.findAll()).toEqual([{ id: 'RANDOM_UUID', title: 'Test Bloq', address: 'address' }]);
      expect(mockBloqService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single bloq', async () => {
      const id = 'RANDOM_UUID';
      expect(await bloqController.findOne(id)).toEqual({ id, title: 'Test Bloq', address: "address" });
      expect(mockBloqService.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a bloq', async () => {
      const id = 'RANDOM_UUID';
      const dto: UpdateBloqDto = { title: 'Updated Bloq', address: 'address' };
      expect(await bloqController.update(id, dto)).toEqual({
        id,
        ...dto,
      });
      expect(mockBloqService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should delete a bloq', async () => {
      const id = 'RANDOM_UUID';
      expect(await bloqController.remove(id)).toEqual({ id, deleted: true });
      expect(mockBloqService.remove).toHaveBeenCalledWith(id);
    });
  });
});
