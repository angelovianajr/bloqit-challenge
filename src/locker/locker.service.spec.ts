import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LockerService } from './locker.service';
import { Locker } from './entities/locker.entity';
import { BloqService } from '../bloq/bloq.service';
import { Repository } from 'typeorm';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto, UpdateLockerOccupationDTO, UpdateLockerStatusDTO } from './dto/update-locker.dto';
import { LockerStatus } from './locker.interface';

describe('LockerService', () => {
  let service: LockerService;
  let lockerRepository: Repository<Locker>;
  let bloqService: BloqService;

  const mockLockerRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  const mockBloqService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LockerService,
        { provide: getRepositoryToken(Locker), useValue: mockLockerRepository },
        { provide: BloqService, useValue: mockBloqService },
      ],
    }).compile();

    service = module.get<LockerService>(LockerService);
    lockerRepository = module.get<Repository<Locker>>(getRepositoryToken(Locker));
    bloqService = module.get<BloqService>(BloqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a locker successfully', async () => {
      const createLockerDto: CreateLockerDto = {
        status: LockerStatus.OPEN,
        isOccupied: false,
        bloqId: 'RANDOM_BLOQ_UUID',
      };

      const bloq = { id: 'RANDOM_BLOQ_UUID' };
      const lockerEntity = new Locker();
      mockBloqService.findOne.mockResolvedValue(bloq);
      mockLockerRepository.create.mockReturnValue(lockerEntity);

      const result = await service.create(createLockerDto);

      expect(mockBloqService.findOne).toHaveBeenCalledWith(createLockerDto.bloqId);
      expect(mockLockerRepository.create).toHaveBeenCalledWith({
        status: createLockerDto.status,
        isOccupied: createLockerDto.isOccupied,
        bloq,
      });
      expect(result).toEqual(lockerEntity);
    });

    it('should return an error if bloq does not exist', async () => {
      const createLockerDto: CreateLockerDto = {
        status: LockerStatus.OPEN,
        isOccupied: false,
        bloqId: 'RANDOM_BLOQ_UUID',
      };

      mockBloqService.findOne.mockResolvedValue(null);

      const result = await service.create(createLockerDto);

      expect(mockBloqService.findOne).toHaveBeenCalledWith(createLockerDto.bloqId);
      expect(result).toEqual(new Error("Bloq don't exist"));
    });
  });

  describe('findAll', () => {
    it('should return all lockers with their bloqs', async () => {
      const lockers = [{ id: 'RANDOM_LOCKER_UUID', bloq: {} }, { id: 'RANDOM_LOCKER_UUID_2', bloq: {} }];
      mockLockerRepository.find.mockResolvedValue(lockers);

      const result = await service.findAll();

      expect(mockLockerRepository.find).toHaveBeenCalledWith({ relations: { bloq: true } });
      expect(result).toEqual(lockers);
    });
  });

  describe('findOne', () => {
    it('should return a locker by id with its bloq', async () => {
      const locker = { id: 'RANDOM_LOCKER_UUID', bloq: {} };
      mockLockerRepository.findOne.mockResolvedValue(locker);

      const result = await service.findOne('RANDOM_LOCKER_UUID');

      expect(mockLockerRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'RANDOM_LOCKER_UUID' },
        relations: { bloq: true },
      });
      expect(result).toEqual(locker);
    });
  });

  describe('update', () => {
    it('should update a locker successfully', async () => {
      const id = 'RANDOM_LOCKER_UUID';
      const updateLockerDto: UpdateLockerDto = {
        status: LockerStatus.OPEN,
        isOccupied: true,
        bloqId: 'bloq-456',
      };

      const lockerEntity = { id, bloq: {} } as Locker;
      const bloq = { id: 'bloq-456' };
      mockLockerRepository.findOneBy.mockResolvedValue(lockerEntity);
      mockBloqService.findOne.mockResolvedValue(bloq);
      mockLockerRepository.create.mockReturnValue({
        ...lockerEntity,
        ...updateLockerDto,
        bloq,
      });

      const result = await service.update(id, updateLockerDto);

      expect(mockLockerRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockBloqService.findOne).toHaveBeenCalledWith(updateLockerDto.bloqId);
      expect(result).toEqual({ ...lockerEntity, ...updateLockerDto, bloq });
    });

    it('should return an error if bloq does not exist', async () => {
      const id = 'RANDOM_LOCKER_UUID';
      const updateLockerDto: UpdateLockerDto = {
        status: LockerStatus.OPEN,
        isOccupied: true,
        bloqId: 'bloq-456',
      };

      mockLockerRepository.findOneBy.mockResolvedValue({});
      mockBloqService.findOne.mockResolvedValue(null);

      const result = await service.update(id, updateLockerDto);

      expect(result).toEqual(new Error("Bloq don't exist"));
    });
  });

  describe('remove', () => {
    it('should remove a locker by id', async () => {
      const id = 'RANDOM_LOCKER_UUID';
      mockLockerRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id);

      expect(mockLockerRepository.delete).toHaveBeenCalledWith({ id });
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('updateLockerStatus', () => {
    it('should update the status of a locker', async () => {
      const id = 'RANDOM_LOCKER_UUID';
      const updateLockerStatusDTO: UpdateLockerStatusDTO = { status: LockerStatus.CLOSED };
      const lockerEntity = { id, status: LockerStatus.OPEN } as Locker;

      mockLockerRepository.findOneBy.mockResolvedValue(lockerEntity);
      mockLockerRepository.save.mockResolvedValue({ ...lockerEntity, status: updateLockerStatusDTO.status });

      const result = await service.updateLockerStatus(id, updateLockerStatusDTO);

      expect(mockLockerRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockLockerRepository.save).toHaveBeenCalledWith({
        ...lockerEntity,
        status: updateLockerStatusDTO.status,
      });
      expect(result).toEqual({ ...lockerEntity, status: updateLockerStatusDTO.status });
    });

    it('should return an error if locker does not exist', async () => {
      mockLockerRepository.findOneBy.mockResolvedValue(null);

      const result = await service.updateLockerStatus('RANDOM_LOCKER_UUID', { status: LockerStatus.CLOSED });

      expect(result).toEqual(new Error("Locker don't exists"));
    });
  });

  describe('updateLockerOccupation', () => {
    it('should update the occupation status of a locker', async () => {
      const id = 'RANDOM_LOCKER_UUID';
      const updateLockerOccupationDTO: UpdateLockerOccupationDTO = { isOccupied: true };
      const lockerEntity = { id, isOccupied: false } as Locker;

      mockLockerRepository.findOneBy.mockResolvedValue(lockerEntity);
      mockLockerRepository.save.mockResolvedValue({ ...lockerEntity, isOccupied: updateLockerOccupationDTO.isOccupied });

      const result = await service.updateLockerOccupation(id, updateLockerOccupationDTO);

      expect(mockLockerRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(mockLockerRepository.save).toHaveBeenCalledWith({
        ...lockerEntity,
        isOccupied: updateLockerOccupationDTO.isOccupied,
      });
      expect(result).toEqual({ ...lockerEntity, isOccupied: updateLockerOccupationDTO.isOccupied });
    });

    it('should return an error if locker does not exist', async () => {
      mockLockerRepository.findOneBy.mockResolvedValue(null);

      const result = await service.updateLockerOccupation('RANDOM_LOCKER_UUID', { isOccupied: true });

      expect(result).toEqual(new Error("Locker don't exists"));
    });
  });
});
