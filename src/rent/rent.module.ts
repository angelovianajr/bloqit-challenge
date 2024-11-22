import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';
import { Locker } from 'src/locker/entities/locker.entity';
import { LockerModule } from 'src/locker/locker.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rent, Locker]), LockerModule],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
