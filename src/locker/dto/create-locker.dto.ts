import { LockerStatus } from "../locker.interface";

export class CreateLockerDto {
  id?: string;
  bloqId: string;
  status: LockerStatus;
  isOccupied: boolean;
}
