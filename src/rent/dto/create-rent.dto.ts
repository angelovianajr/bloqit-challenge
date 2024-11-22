import { RentSize } from "../rent.interface"
import { IsNotEmpty } from 'class-validator';

export class CreateRentDto {
  weight: number
  size: RentSize
}

export class RentLinkLockerDto {
  id: string

  @IsNotEmpty()
  lockerId: string
}
