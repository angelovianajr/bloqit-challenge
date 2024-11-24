import { Test, TestingModule } from '@nestjs/testing';
import { RentService } from './rent.service';
import { Repository } from 'typeorm';
import { LockerService } from '../locker/locker.service';
import { Rent } from './entities/rent.entity';
import { Locker } from '../locker/entities/locker.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRentDto, RentLinkLockerDto } from './dto/create-rent.dto';
import { UpdateLockerOccupationDTO } from '../locker/dto/update-locker.dto';
import { RentSize } from './rent.interface';

describe('RentService', () => {
  let service: RentService;
  let rentRepository: Repository<Rent>;
  let lockerService: LockerService;

  const mockRentRepository = {
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockLockerService = {
    findOne: jest.fn(),
    updateLockerOccupation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentService,
        { provide: getRepositoryToken(Rent), useValue: mockRentRepository },
        { provide: LockerService, useValue: mockLockerService },
      ],
    }).compile();

    service = module.get<RentService>(RentService);
    rentRepository = module.get<Repository<Rent>>(getRepositoryToken(Rent));
    lockerService = module.get<LockerService>(LockerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save a new rent entity', async () => {
      const createRentDto: CreateRentDto = { weight: 10, size: RentSize.M };
      const savedRent = { id: 'RANDOM_UUID', ...createRentDto };
      mockRentRepository.save.mockResolvedValue(savedRent);

      const result = await service.create(createRentDto);

      expect(mockRentRepository.save).toHaveBeenCalledWith({
        size: createRentDto.size,
        weight: createRentDto.weight,
      });
      expect(result).toEqual(savedRent);
    });
  });

  describe('linkLocker', () => {
    it('should link a locker to a rent', async () => {
      const id = 'RANDOM_UUID';
      const linkLockerDto: RentLinkLockerDto = { id, lockerId: 'locker-123' };
      const rentEntity = { id, locker: null } as Rent;
      const locker = { id: 'locker-123', isOccupied: false } as Locker;

      mockRentRepository.findOne.mockResolvedValue(rentEntity);
      mockLockerService.findOne.mockResolvedValue(locker);
      mockRentRepository.save.mockResolvedValue({ ...rentEntity, locker });

      const result = await service.linkLocker(id, linkLockerDto);

      expect(mockRentRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: { locker: true },
      });
      expect(mockLockerService.findOne).toHaveBeenCalledWith(linkLockerDto.lockerId);
      expect(mockRentRepository.save).toHaveBeenCalledWith({
        ...rentEntity,
        locker,
      });
      expect(result).toEqual({ ...rentEntity, locker });
    });

    it('should return error if locker does not exist', async () => {
      const id = 'RANDOM_UUID';
      const linkLockerDto: RentLinkLockerDto = { id, lockerId: 'locker-123' };

      mockRentRepository.findOne.mockResolvedValue({});
      mockLockerService.findOne.mockResolvedValue(null);

      const result = await service.linkLocker(id, linkLockerDto);

      expect(result).toEqual(new Error("Locker don't exist"));
    });

    it('should return error if locker is occupied', async () => {
      const id = 'RANDOM_UUID';
      const linkLockerDto: RentLinkLockerDto = { id, lockerId: 'locker-123' };
      const locker = { id: 'locker-123', isOccupied: true } as Locker;

      mockRentRepository.findOne.mockResolvedValue({});
      mockLockerService.findOne.mockResolvedValue(locker);

      const result = await service.linkLocker(id, linkLockerDto);

      expect(result).toEqual(new Error('Locker is occupied'));
    });
  });

  describe('dropOff', () => {
    it('should mark a rent as dropped off and occupy the locker', async () => {
      const id = 'RANDOM_UUID';
      const rentEntity = { id, locker: { id: 'locker-123' }, droppedOffAt: null } as Rent;

      mockRentRepository.findOne.mockResolvedValue(rentEntity);
      mockRentRepository.save.mockResolvedValue({
        ...rentEntity,
        droppedOffAt: new Date(),
      });

      const result = await service.dropOff(id);

      expect(mockLockerService.updateLockerOccupation).toHaveBeenCalledWith(
        'locker-123',
        { isOccupied: true } as UpdateLockerOccupationDTO,
      );
      expect(mockRentRepository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('droppedOffAt');
    });

    it('should return error if rent does not exist', async () => {
      mockRentRepository.findOne.mockResolvedValue(null);

      const result = await service.dropOff('RANDOM_UUID');

      expect(result).toEqual(new Error("Rent don't exists"));
    });

    it('should return error if no locker is allocated', async () => {
      const rentEntity = { id: 'RANDOM_UUID', locker: null } as Rent;
      mockRentRepository.findOne.mockResolvedValue(rentEntity);

      const result = await service.dropOff('RANDOM_UUID');

      expect(result).toEqual(new Error('A Locker must be allocated to drop off the parcel'));
    });
  });

  describe('pickUp', () => {
    it('should mark a rent as picked up and free the locker', async () => {
      const id = 'RANDOM_UUID';
      const rentEntity = { id, locker: { id: 'locker-123' }, pickedUpAt: null } as Rent;

      mockRentRepository.findOne.mockResolvedValue(rentEntity);
      mockRentRepository.save.mockResolvedValue({
        ...rentEntity,
        pickedUpAt: new Date(),
      });

      const result = await service.pickUp(id);

      expect(mockLockerService.updateLockerOccupation).toHaveBeenCalledWith(
        'locker-123',
        { isOccupied: false } as UpdateLockerOccupationDTO,
      );
      expect(mockRentRepository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('pickedUpAt');
    });

    it('should return error if rent does not exist', async () => {
      mockRentRepository.findOne.mockResolvedValue(null);

      const result = await service.pickUp('RANDOM_UUID');

      expect(result).toEqual(new Error("Rent don't exists"));
    });
  });

  describe('findAll', () => {
    it('should return all rents with lockers', async () => {
      const rents = [{ id: 'RANDOM_UUID', locker: {} }, { id: '2', locker: {} }];
      mockRentRepository.find.mockResolvedValue(rents);

      const result = await service.findAll();

      expect(mockRentRepository.find).toHaveBeenCalledWith({
        relations: { locker: true },
      });
      expect(result).toEqual(rents);
    });
  });

  describe('findOne', () => {
    it('should return a specific rent with locker', async () => {
      const rent = { id: 'RANDOM_UUID', locker: {} };
      mockRentRepository.findOne.mockResolvedValue(rent);

      const result = await service.findOne('RANDOM_UUID');

      expect(mockRentRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'RANDOM_UUID' },
        relations: { locker: true },
      });
      expect(result).toEqual(rent);
    });
  });
});
