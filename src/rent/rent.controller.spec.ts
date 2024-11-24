import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { CreateRentDto, RentLinkLockerDto } from './dto/create-rent.dto';
import { RentSize } from './rent.interface';

describe('RentController', () => {
  let controller: RentController;
  let service: RentService;

  const mockRentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    linkLocker: jest.fn(),
    dropOff: jest.fn(),
    pickUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
      providers: [
        {
          provide: RentService,
          useValue: mockRentService,
        },
      ],
    }).compile();

    controller = module.get<RentController>(RentController);
    service = module.get<RentService>(RentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call RentService.create with the correct payload', () => {
      const createRentDto: CreateRentDto = { weight: 10, size: RentSize.M };
      controller.create(createRentDto);
      expect(service.create).toHaveBeenCalledWith(createRentDto);
    });
  });

  describe('findAll', () => {
    it('should call RentService.findAll', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call RentService.findOne with the correct id', () => {
      const id = 'RANDOM_UUID';
      controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('linkLocker', () => {
    it('should call RentService.linkLocker with the correct id and payload', () => {
      const id = 'RANDOM_UUID';
      const rentLinkLockerDto: RentLinkLockerDto = { id, lockerId: 'locker-456' };
      controller.linkLocker(id, rentLinkLockerDto);
      expect(service.linkLocker).toHaveBeenCalledWith(id, rentLinkLockerDto);
    });
  });

  describe('dropOffParcel', () => {
    it('should call RentService.dropOff with the correct id', () => {
      const id = 'RANDOM_UUID';
      controller.dropOffParcel(id);
      expect(service.dropOff).toHaveBeenCalledWith(id);
    });
  });

  describe('pickUpParcel', () => {
    it('should call RentService.pickUp with the correct id', () => {
      const id = 'RANDOM_UUID';
      controller.pickUpParcel(id);
      expect(service.pickUp).toHaveBeenCalledWith(id);
    });
  });
});
