import { Test, TestingModule } from '@nestjs/testing';
import { BloqService } from './bloq.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bloq } from './entities/bloq.entity';
import { Repository } from 'typeorm';
import { CreateBloqDto } from './dto/create-bloq.dto';
import { UpdateBloqDto } from './dto/update-bloq.dto';

describe('BloqService', () => {
  let service: BloqService;
  let repository: Repository<Bloq>;

  const mockBloqRepository = {
    save: jest.fn(entity => ({ id: 'RANDOM_UUID', ...entity })),
    find: jest.fn(() => [{ id: 'RANDOM_UUID', title: 'Test Title', address: 'Test Address' }]),
    findOneBy: jest.fn(criteria => ({ id: criteria.id, title: 'Test Title', address: 'Test Address' })),
    delete: jest.fn(criteria => ({ affected: 1 })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BloqService,
        {
          provide: getRepositoryToken(Bloq),
          useValue: mockBloqRepository,
        },
      ],
    }).compile();

    service = module.get<BloqService>(BloqService);
    repository = module.get<Repository<Bloq>>(getRepositoryToken(Bloq));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new Bloq entity', async () => {
      const dto: CreateBloqDto = { title: 'New Bloq', address: '123 Street' };

      expect(await service.create(dto)).toEqual({
        id: 'RANDOM_UUID',
        title: 'New Bloq',
        address: '123 Street',
      });

      expect(mockBloqRepository.save).toHaveBeenCalledWith({
        title: 'New Bloq',
        address: '123 Street',
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of Bloq entities', async () => {
      expect(await service.findAll()).toEqual([
        { id: 'RANDOM_UUID', title: 'Test Title', address: 'Test Address' },
      ]);

      expect(mockBloqRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single Bloq entity by id', async () => {
      const id = 'RANDOM_UUID';

      expect(await service.findOne(id)).toEqual({
        id: 'RANDOM_UUID',
        title: 'Test Title',
        address: 'Test Address',
      });

      expect(mockBloqRepository.findOneBy).toHaveBeenCalledWith({ id });
    });
  });

  describe('update', () => {
    it('should update and save an existing Bloq entity', async () => {
      const id = 'RANDOM_UUID';
      const dto: UpdateBloqDto = { title: 'Updated Title', address: 'Updated Address' };

      mockBloqRepository.findOneBy.mockImplementationOnce(() => ({
        id: 'RANDOM_UUID',
        title: 'Old Title',
        address: 'Old Address',
      }));

      expect(await service.update(id, dto)).toEqual({
        id: 'RANDOM_UUID',
        title: 'Updated Title',
        address: 'Updated Address',
      });

      expect(mockBloqRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockBloqRepository.save).toHaveBeenCalledWith({
        id: 'RANDOM_UUID',
        title: 'Updated Title',
        address: 'Updated Address',
      });
    });
  });

  describe('remove', () => {
    it('should delete a Bloq entity by id', async () => {
      const id = 'RANDOM_UUID';

      expect(await service.remove(id)).toEqual({ affected: 1 });

      expect(mockBloqRepository.delete).toHaveBeenCalledWith({ id });
    });
  });
});
