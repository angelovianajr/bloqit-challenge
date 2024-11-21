import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rent } from './entities/rent.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rent])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentModule {}
