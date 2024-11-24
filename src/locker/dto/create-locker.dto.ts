import { IsDefined, IsNotEmpty } from "class-validator";
import { LockerStatus } from "../locker.interface";

export class CreateLockerDto {
  id?: string;
  @IsNotEmpty()
  bloqId: string;
  @IsDefined()
  @IsNotEmpty()
  status: LockerStatus;
  @IsNotEmpty()
  isOccupied: boolean;
}
