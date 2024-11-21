import { Module } from '@nestjs/common';
import { LockerService } from './locker.service';
import { LockerController } from './locker.controller';
import { Locker } from './entities/locker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BloqService } from 'src/bloq/bloq.service';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockerController],
  providers: [LockerService, BloqService],
})
export class LockerModule {}
