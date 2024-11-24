import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { CreateLockerDto } from './create-locker.dto';
import { LockerStatus } from '../locker.interface';
import { IsBoolean, IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateLockerDto extends PartialType(CreateLockerDto) {}

export class UpdateLockerStatusDTO extends PickType(UpdateLockerDto, ['status'] as const) {
  @IsEnum(LockerStatus)
  @IsDefined()
  @IsNotEmpty()
  status: LockerStatus;
}

export class UpdateLockerOccupationDTO extends PickType(UpdateLockerDto, ['isOccupied']) {
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  isOccupied: boolean;
}

