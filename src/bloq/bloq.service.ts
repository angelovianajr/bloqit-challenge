import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBloqDto } from './dto/create-bloq.dto';
import { UpdateBloqDto } from './dto/update-bloq.dto';
import { Bloq } from './entities/bloq.entity';

@Injectable()
export class BloqService {
  constructor(
    @InjectRepository(Bloq)
    private bloqRepository: Repository<Bloq>,
  ) {}


  create(createBloqDto: CreateBloqDto) {
    let bloqEntity = new Bloq()
    bloqEntity.title = createBloqDto.title
    bloqEntity.address = createBloqDto.address

    return this.bloqRepository.create(bloqEntity)
  }

  findAll() {
    return this.bloqRepository.find();
  }

  findOne(id: string) {
    return this.bloqRepository.findOneBy({ id })
  }

  async update(id: string, updateBloqDto: UpdateBloqDto) {
    let bloqEntity = await this.bloqRepository.findOneBy({ id });

    bloqEntity.title = updateBloqDto.title
    bloqEntity.address = updateBloqDto.address
    
    return await this.bloqRepository.save(bloqEntity);
  }

  remove(id: string) {
    return this.bloqRepository.delete({ id })
  }
}
