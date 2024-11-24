import { RentSize } from "../rent.interface"
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  weight: number
  @IsNotEmpty()
  @IsEnum(RentSize)
  size: RentSize
}

export class RentLinkLockerDto {
  id: string

  @IsNotEmpty()
  @IsDefined()
  lockerId: string
}
