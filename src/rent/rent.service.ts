import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentDto, RentLinkLockerDto } from './dto/create-rent.dto';
import { Rent } from './entities/rent.entity';
import { LockerService } from '../locker/locker.service';
import { UpdateLockerOccupationDTO } from '../locker/dto/update-locker.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectRepository(Rent)
    private rentRepository: Repository<Rent>,
    private lockerService: LockerService,
  ) {}

  create(createRentDto: CreateRentDto) {
    let rentEntity = new Rent()
    rentEntity.size = createRentDto.size
    rentEntity.weight = createRentDto.weight

    return this.rentRepository.save(rentEntity)
  }

  async linkLocker(id: string, linkLocker: RentLinkLockerDto) {
    let rentEntity: Rent = await this.rentRepository.findOne({
      where: {
        id
      },
      relations: {
        locker: true
      }
    })

    const locker = await this.lockerService.findOne(linkLocker.lockerId)
    if (!locker) {
      return new Error("Locker don't exist")
    }

    if (locker.isOccupied) {
      return new Error("Locker is occupied")
    }

    rentEntity.locker = locker

    return this.rentRepository.save(rentEntity)
  }

  async dropOff(id: string) {
    let rentEntity: Rent = await this.rentRepository.findOne({
      where: {
        id
      },
      relations: {
        locker: true
      }
    })

    if(!rentEntity) {
      return new Error("Rent don't exists")
    }
    
    if(!rentEntity.locker) {
      return new Error("A Locker must be allocated to drop off the parcel")
    }

    rentEntity.droppedOffAt = new Date();
    this.lockerService.updateLockerOccupation(rentEntity.locker.id, { isOccupied: true } as UpdateLockerOccupationDTO)

    return this.rentRepository.save(rentEntity)
  }

  async pickUp(id: string) {
    let rentEntity: Rent = await this.rentRepository.findOne({
      where: {
        id
      },
      relations: {
        locker: true
      }
    })

    if(!rentEntity) {
      return new Error("Rent don't exists")
    }

    rentEntity.pickedUpAt = new Date();
    this.lockerService.updateLockerOccupation(rentEntity.locker.id, { isOccupied: false } as UpdateLockerOccupationDTO)

    return this.rentRepository.save(rentEntity)
  }

  findAll() {
    return this.rentRepository.find({
      relations: {
        locker: true
      }
    })
  }

  findOne(id: string) {
    return this.rentRepository.findOne({
      where:{
        id
      },
      relations: {
        locker: true
      } })
  }
}
