import { PartialType } from '@nestjs/mapped-types';
import { PickType } from '@nestjs/swagger';
import { CreateLockerDto } from './create-locker.dto';

export class UpdateLockerDto extends PartialType(CreateLockerDto) {}

export class UpdateLockerStatusDTO extends PickType(UpdateLockerDto, ['status']) {}

export class UpdateLockerOccupationDTO extends PickType(UpdateLockerDto, ['isOccupied']) {}

