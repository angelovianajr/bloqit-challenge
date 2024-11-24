import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BloqService } from '../bloq/bloq.service';
import { Repository } from 'typeorm';
import { CreateLockerDto } from './dto/create-locker.dto';
import { UpdateLockerDto, UpdateLockerOccupationDTO, UpdateLockerStatusDTO } from './dto/update-locker.dto';
import { Locker } from './entities/locker.entity';

@Injectable()
export class LockerService {
  constructor(
    @InjectRepository(Locker)
    private lockerRepository: Repository<Locker>,
    private bloqService: BloqService,
  ) {}

  //Locker managment, the routes would be protected
  async create(createLockerDto: CreateLockerDto) {
    let lockerEntity = new Locker()
    lockerEntity.status = createLockerDto.status
    lockerEntity.isOccupied = createLockerDto.isOccupied

    const bloq = await this.bloqService.findOne(createLockerDto.bloqId)
    if (!bloq) {
      return new Error("Bloq don't exist")
    }
    lockerEntity.bloq = bloq
    
    return this.lockerRepository.create(lockerEntity)
  }

  findAll() {
    return this.lockerRepository.find({
      relations: {
        bloq: true
      }
    })
  }

  findOne(id: string) {
    return this.lockerRepository.findOne({
      where:{
        id
      },
      relations: {
        bloq: true
      } })
  }

  async update(id: string, updateLockerDto: UpdateLockerDto) {
    let lockerEntity = await this.lockerRepository.findOneBy({ id })
    lockerEntity.status = updateLockerDto.status
    lockerEntity.isOccupied = updateLockerDto.isOccupied

    const bloq = await this.bloqService.findOne(updateLockerDto.bloqId)
    if (!bloq) {
      return new Error("Bloq don't exist")
    }
    lockerEntity.bloq = bloq
    
    return this.lockerRepository.create(lockerEntity)
  }

  remove(id: string) {
    return this.lockerRepository.delete({ id })
  }

  async updateLockerStatus(id: string, updateLockerStatusDTO: UpdateLockerStatusDTO) {
    let lockerEntity = await this.lockerRepository.findOneBy({ id });
    if(!lockerEntity) return new Error("Locker don't exists")

    lockerEntity.status = updateLockerStatusDTO.status
    
    return await this.lockerRepository.save(lockerEntity);
  }

  async updateLockerOccupation(id: string, updateLockerOccupationDTO: UpdateLockerOccupationDTO) {
    let lockerEntity = await this.lockerRepository.findOneBy({ id });
    if(!lockerEntity) return new Error("Locker don't exists")

    lockerEntity.isOccupied = updateLockerOccupationDTO.isOccupied
    
    return await this.lockerRepository.save(lockerEntity);
  }
}
